import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';

const NotesList = ({ onEdit }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const notesRef = collection(db, 'notes');
    const q = query(notesRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  const handleView = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('Delete this note from the vault?')) {
      try {
        await deleteDoc(doc(db, 'notes', noteId));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleEdit = (note) => {
    onEdit(note);
  };

  return (
    <section className="animate-entry mt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">
          Library{' '}
          <span className="text-sm font-normal text-gray-300 ml-2 bg-white/5 px-2 py-1 rounded-full border border-white/8">
            Vault
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            index={index}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isModalOpen && selectedNote && (
        <NoteModal
          note={selectedNote}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default NotesList;
