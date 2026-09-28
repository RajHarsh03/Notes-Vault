import React from 'react';
import NoteForm from './components/NoteForm';

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Ambient Background Orbs */}
      <div className="fixed top-16 left-0 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/[0.03] rounded-full blur-[180px] -z-10 pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[130px] -z-10 pointer-events-none"></div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#1a1a2e]/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Notes<span className="text-gradient">Vault</span>
          </h1>
        </div>
      </nav>

      <main className="flex-grow max-w-5xl mx-auto w-full p-4 sm:p-8">
        <NoteForm />
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        NotesVault Cosmic Edition &copy; 2026
      </footer>

    </div>
  );
}

export default App;
