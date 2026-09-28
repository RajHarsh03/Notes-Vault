import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const NoteModal = ({ note, onClose, addToast }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(note.content);
    setCopied(true);
    addToast('Copied to clipboard!', 'success', 2000);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div
      className="note-modal-overlay"
      onClick={onClose}
    >
      <div
        className="note-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="note-modal-header">
          {/* macOS dots */}
          <div className="flex items-center gap-1.5">
            <button onClick={onClose} className="mac-dot bg-[#ff5f57] hover:brightness-110" />
            <span className="mac-dot bg-[#febc2e]" />
            <span className="mac-dot bg-[#28c840]" />
          </div>

          {/* Title */}
          <span className="note-modal-title">{note.title}</span>

          {/* Copy + Close */}
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="modal-action-btn">
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button onClick={onClose} className="modal-action-btn text-red-400 hover:text-red-300 hover:border-red-500/30">
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="note-modal-body">
          <pre className="note-modal-pre">{note.content}</pre>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
