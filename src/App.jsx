import React, { useState } from 'react';
import Navigation from './components/Navigation';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
  const [activeView, setActiveView] = useState('upload');
  const [editingNote, setEditingNote] = useState(null);

  const handleEdit = (note) => {
    setEditingNote(note);
    setActiveView('upload');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-grow max-w-5xl mx-auto w-full p-4 sm:p-8 relative">
        {/* Ambient Background Orbs */}
        <div className="fixed top-16 left-0 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[150px] -z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/[0.03] rounded-full blur-[180px] -z-10 pointer-events-none"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[130px] -z-10 pointer-events-none"></div>

        {activeView === 'upload' && (
          <NoteForm
            editingNote={editingNote}
            setEditingNote={setEditingNote}
          />
        )}

        {activeView === 'view' && <NotesList onEdit={handleEdit} />}
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        NotesVault Cosmic Edition &copy; 2026
      </footer>
    </div>
  );
}

export default App;
