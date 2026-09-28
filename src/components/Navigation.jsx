import React from 'react';

const Navigation = ({ activeView, setActiveView }) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#1a1a2e]/85 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Notes<span className="text-gradient">Vault</span>
          </h1>
        </div>

        <div className="nav-pill">
          <button
            onClick={() => setActiveView('upload')}
            className={`${
              activeView === 'upload' ? 'nav-active' : 'text-gray-300 hover:text-white'
            } px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">New Note</span>
          </button>
          <button
            onClick={() => setActiveView('view')}
            className={`${
              activeView === 'view' ? 'nav-active' : 'text-gray-300 hover:text-white'
            } px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <span className="hidden sm:inline">Library</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
