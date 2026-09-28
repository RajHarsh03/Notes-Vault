import React, { useState, useEffect } from 'react';

const NoteModal = ({ note, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="window-dots">
            <div
              className="dot dot-red cursor-pointer"
              onClick={onClose}
              title="Close"
            ></div>
            <div className="dot dot-yellow"></div>
            <div className="dot dot-green"></div>
          </div>

          <div className="modal-title flex-1">{note.title}</div>

          <div className="modal-actions">
            <button
              onClick={handleCopy}
              className={`copy-btn ${
                copied ? 'border-green-500/30 text-green-400' : ''
              }`}
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="hidden sm:inline ml-1">Copied</span>
                </>
              ) : (
                <>
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="hidden sm:inline ml-1">Copy</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="copy-btn text-red-400 hover:text-red-300 hover:bg-red-500/10"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <pre id="modal-pre">
          <code className="language-plaintext">{note.content}</code>
        </pre>
      </div>
    </div>
  );
};

export default NoteModal;
