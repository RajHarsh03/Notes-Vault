import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config/firebase';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
  const [activeView, setActiveView] = useState('upload');
  const [editingNote, setEditingNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);

  // Fetch notes immediately on app load — not when Library tab is opened
  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setNotesLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = (note) => {
    setEditingNote(note);
    setActiveView('upload');
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Ambient Background Orbs */}
      <div className="fixed top-16 left-0 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/[0.03] rounded-full blur-[180px] -z-10 pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[130px] -z-10 pointer-events-none"></div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#1a1a2e]/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Notes<span className="text-gradient">Vault</span>
          </h1>

          <div className="nav-tabs">
            <button
              onClick={() => setActiveView('upload')}
              className={`nav-tab ${activeView === 'upload' ? 'nav-tab-active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Note</span>
            </button>
            <button
              onClick={() => setActiveView('library')}
              className={`nav-tab ${activeView === 'library' ? 'nav-tab-active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <span className="hidden sm:inline">Library</span>
            </button>

            {/* Sliding underline indicator */}
            <div
              className="nav-indicator"
              style={{ transform: activeView === 'upload' ? 'translateX(0%)' : 'translateX(100%)' }}
            ></div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto w-full p-4 sm:p-8">
        {activeView === 'upload' && <NoteForm editingNote={editingNote} setEditingNote={setEditingNote} setActiveView={setActiveView} />}
        {activeView === 'library' && <NotesList notes={notes} loading={notesLoading} onEdit={handleEdit} />}
      </main>

      <footer className="text-center py-4 sm:py-8 text-gray-500 text-xs sm:text-sm">
        NotesVault Cosmic Edition &copy; 2026
      </footer>

    </div>
  );
}

export default App;
