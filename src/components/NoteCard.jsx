import React from 'react';

const ACCENT_COLORS = {
  amber:  '#f59e0b',
  violet: '#8b5cf6',
  teal:   '#14b8a6',
  rose:   '#f43f5e',
  blue:   '#3b82f6',
  green:  '#22c55e',
};

const NoteCard = ({ note, index, onOpen, onEdit, onDelete }) => {
  const accentHex = ACCENT_COLORS[note.color] || ACCENT_COLORS.amber;

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString([], {
      month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div
      className="note-card"
      style={{
        animationDelay: `${index * 60}ms`,
        borderColor: `${accentHex}22`,
      }}
    >
      {/* Top shimmer line — accent color */}
      <div
        className="note-card-line"
        style={{ background: `linear-gradient(90deg, transparent, ${accentHex}88, transparent)` }}
      />

      {/* Color dot top-right */}
      <div
        className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full"
        style={{ background: accentHex, boxShadow: `0 0 6px ${accentHex}` }}
      />

      <div className="flex flex-col h-full">
        {/* Title + Date */}
        <div className="mb-2 pr-4">
          <h3 className="text-white font-bold text-lg truncate mb-1">{note.title}</h3>
          <span className="text-xs font-mono text-gray-500">{formatDate(note.timestamp)}</span>
        </div>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {note.tags.map(tag => (
              <span
                key={tag}
                className="note-tag"
                style={{ color: accentHex, borderColor: `${accentHex}40`, background: `${accentHex}10` }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Preview */}
        <p className="text-gray-400 text-sm font-mono line-clamp-3 flex-1 leading-relaxed">
          {note.content.substring(0, 120)}...
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/[0.06]">
          <button
            onClick={() => onOpen(note)}
            className="note-btn-open"
            style={{ borderColor: `${accentHex}33`, color: accentHex }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open
          </button>

          <div className="flex gap-1">
            <button onClick={() => onEdit(note)} className="note-icon-btn text-gray-400 hover:text-amber-400" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
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
