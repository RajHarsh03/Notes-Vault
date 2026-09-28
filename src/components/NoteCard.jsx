import React from 'react';

const NoteCard = ({ note, onView, onEdit, onDelete, index }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className="note-card glass-panel rounded-xl p-5 flex flex-col justify-between min-h-[220px] relative overflow-hidden group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-1 truncate">{note.title}</h3>

        <span className="text-xs font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/8">
          {formatDate(note.timestamp)}
        </span>

        <p className="text-gray-300 text-sm mt-3 line-clamp-3 font-mono opacity-85">
          {note.content.substring(0, 100)}...
        </p>
      </div>

      <div className="relative z-10 flex justify-between items-center mt-4 border-t border-white/5 pt-3">
        <button
          onClick={() => onView(note)}
          className="view-btn group-hover:bg-white group-hover:text-black bg-white/10 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300"
        >
          Open
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="edit-btn text-gray-300 hover:text-yellow-300 transition-colors p-1"
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="delete-btn text-gray-400 hover:text-red-400 transition-colors p-1"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
