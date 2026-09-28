import React, { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';

const NotesList = ({ notes, loading, onEdit }) => {
  const [openNote, setOpenNote] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this note?')) {
      await deleteDoc(doc(db, 'notes', id));
    }
  };

  return (
    <section className="animate-entry mt-6">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-white">Library</h2>
        <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
          {loading ? '...' : `${notes.length} notes`}
        </span>
      </div>

      {loading ? null : notes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No notes yet</p>
          <p className="text-sm mt-1">Create your first note from New Note tab</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map((note, i) => (
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
        <NoteModal note={openNote} onClose={() => setOpenNote(null)} />
      )}
    </section>
  );
};

export default NotesList;
