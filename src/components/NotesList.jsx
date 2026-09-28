import React, { useState, useMemo } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';

const NotesList = ({ notes, loading, onEdit, addToast }) => {
  const [openNote, setOpenNote] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this note?')) {
      await deleteDoc(doc(db, 'notes', id));
      addToast('Note deleted', 'info');
    }
  };

  // All unique tags across notes
  const allTags = useMemo(() => {
    const set = new Set();
    notes.forEach(n => (n.tags || []).forEach(t => set.add(t)));
    return [...set];
  }, [notes]);

  // Filter by search + active tag
  const filtered = useMemo(() => {
    return notes.filter(n => {
      const matchSearch = search.trim() === '' ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase()) ||
        (n.tags || []).some(t => t.includes(search.toLowerCase()));
      const matchTag = !activeTag || (n.tags || []).includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [notes, search, activeTag]);

  return (
    <section className="animate-entry mt-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold text-white">Library</h2>
        <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
          {loading ? '...' : `${notes.length} notes`}
        </span>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search notes, tags..."
          className="search-input"
        />
        {search && (
          <button onClick={() => setSearch('')} className="search-clear">✕</button>
        )}
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTag(null)}
            className={`filter-tag ${!activeTag ? 'filter-tag-active' : ''}`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`filter-tag ${activeTag === tag ? 'filter-tag-active' : ''}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Notes grid */}
      {loading ? null : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          {search || activeTag ? (
            <>
              <p className="text-lg">No results found</p>
              <p className="text-sm mt-1">Try a different search or tag</p>
            </>
          ) : (
            <>
              <p className="text-lg">No notes yet</p>
              <p className="text-sm mt-1">Create your first note from New Note tab</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((note, i) => (
            <NoteCard
              key={note.id}
              note={note}
              index={i}
              onOpen={setOpenNote}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {openNote && (
        <NoteModal note={openNote} onClose={() => setOpenNote(null)} addToast={addToast} />
      )}
    </section>
  );
};

export default NotesList;
