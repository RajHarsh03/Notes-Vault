import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const NoteForm = ({ editingNote, setEditingNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [buttonState, setButtonState] = useState('idle'); // idle, saving, success, error

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setButtonState('saving');

    try {
      if (editingNote) {
        await updateDoc(doc(db, 'notes', editingNote.id), {
          title: title.trim(),
          content: content.trim(),
          timestamp: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'notes'), {
          title: title.trim(),
          content: content.trim(),
          timestamp: serverTimestamp(),
        });
      }

      setButtonState('success');
      setTitle('');
      setContent('');
      setEditingNote(null);

      setTimeout(() => {
        setButtonState('idle');
      }, 1200);
    } catch (error) {
      console.error('Error saving note:', error);
      setButtonState('error');
      setTimeout(() => {
        setButtonState('idle');
      }, 2000);
    }
  };

  const getButtonContent = () => {
    switch (buttonState) {
      case 'saving':
        return (
          <>
            <span className="btn-spinner"></span> Saving...
          </>
        );
      case 'success':
        return (
          <>
            <span className="btn-check">✓</span> Saved!
          </>
        );
      case 'error':
        return '⚠ Error — Try Again';
      default:
        return editingNote ? 'Update Note' : 'Save to Vault';
    }
  };

  const getButtonClass = () => {
    let baseClass = 'w-full glow-btn text-white py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-amber-500/15';
    if (buttonState === 'saving') baseClass += ' btn-saving';
    if (buttonState === 'success') baseClass += ' btn-success';
    if (buttonState === 'error') baseClass += ' btn-error';
    return baseClass;
  };

  return (
    <section className="animate-entry max-w-2xl mx-auto mt-6">
      <div className="glass-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent opacity-50"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/[0.08] border border-amber-500/[0.12] text-amber-400 text-xs font-medium uppercase tracking-widest mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Compose
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Snap It</h2>
          <p className="text-sm text-gray-400">Save your code snippets & notes to the vault</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 ml-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title your stuff"
              className="w-full p-3.5 rounded-xl custom-input text-sm text-gray-100 placeholder-gray-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2 ml-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your code or notes here..."
              className="w-full h-52 p-3.5 rounded-xl custom-input text-sm text-gray-100 placeholder-gray-500 focus:outline-none leading-relaxed resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={buttonState === 'saving' || buttonState === 'success'}
            className={getButtonClass()}
          >
            {getButtonContent()}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NoteForm;
