import React from 'react';

const NoteCard = ({ note, onOpen, onEdit, onDelete }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString([], {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="note-card">
      {/* Top shimmer line */}
      <div className="note-card-line"></div>

      <div className="flex flex-col h-full">
        {/* Title + Date */}
        <div className="mb-3">
          <h3 className="text-white font-bold text-lg truncate mb-1">{note.title}</h3>
          <span className="text-xs font-mono text-gray-400">{formatDate(note.timestamp)}</span>
        </div>

        {/* Preview */}
        <p className="text-gray-400 text-sm font-mono line-clamp-3 flex-1 leading-relaxed">
          {note.content.substring(0, 120)}...
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/[0.06]">
          {/* Open button */}
          <button onClick={() => onOpen(note)} className="note-btn-open">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open
          </button>

          <div className="flex gap-1">
            {/* Edit */}
            <button onClick={() => onEdit(note)} className="note-icon-btn text-gray-400 hover:text-amber-400" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            {/* Delete */}
            <button onClick={() => onDelete(note.id)} className="note-icon-btn text-gray-400 hover:text-red-400" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
