import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const ACCENT_COLORS = [
  { id: 'amber',  label: 'Amber',  hex: '#f59e0b' },
  { id: 'violet', label: 'Violet', hex: '#8b5cf6' },
  { id: 'teal',   label: 'Teal',   hex: '#14b8a6' },
  { id: 'rose',   label: 'Rose',   hex: '#f43f5e' },
  { id: 'blue',   label: 'Blue',   hex: '#3b82f6' },
  { id: 'green',  label: 'Green',  hex: '#22c55e' },
];

const NoteForm = ({ editingNote, setEditingNote, setActiveView, addToast }) => {
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags,    setTags]    = useState([]);
  const [color,   setColor]   = useState('amber');
  const [buttonState, setButtonState] = useState('idle');
  const contentRef = useRef(null);

  // Populate form when editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content || '');
      setTags(editingNote.tags || []);
      setColor(editingNote.color || 'amber');
    }
  }, [editingNote]);

  // Keyboard shortcut: Ctrl+Enter to submit
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        contentRef.current?.closest('form')?.requestSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Tag input — press Enter or comma to add
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, '').toLowerCase();
      if (newTag && !tags.includes(newTag)) {
        setTags(prev => [...prev, newTag]);
      }
      setTagInput('');
    }
    if (e.key === 'Backspace' && !tagInput && tags.length) {
      setTags(prev => prev.slice(0, -1));
    }
  };

  const removeTag = (tag) => setTags(prev => prev.filter(t => t !== tag));

  // Char & line count
  const charCount = content.length;
  const lineCount = content ? content.split('\n').length : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setButtonState('saving');

    try {
      const payload = {
        title:   title.trim(),
        content: content.trim(),
        tags,
        color,
        timestamp: serverTimestamp(),
      };

      if (editingNote) {
        await updateDoc(doc(db, 'notes', editingNote.id), payload);
        setEditingNote(null);
        addToast('Note updated!', 'success');
      } else {
        await addDoc(collection(db, 'notes'), payload);
        addToast('Saved to vault!', 'success');
      }

      setButtonState('success');
      setTitle('');
      setContent('');
      setTags([]);
      setColor('amber');

      setTimeout(() => {
        setButtonState('idle');
        if (editingNote) setActiveView('library');
      }, 1000);

    } catch (err) {
      console.error(err);
      setButtonState('error');
      addToast('Something went wrong!', 'error');
      setTimeout(() => setButtonState('idle'), 2000);
    }
  };

  const getButtonContent = () => {
    switch (buttonState) {
      case 'saving':  return <><span className="btn-spinner"></span> Saving...</>;
      case 'success': return <><span className="btn-check">✓</span> Saved!</>;
      case 'error':   return '⚠ Error — Try Again';
      default:        return editingNote ? 'Update Note' : 'Save to Vault';
    }
  };

  const getBtnClass = () => {
    let base = 'w-full glow-btn text-white py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-amber-500/15';
    if (buttonState === 'saving') base += ' btn-saving';
    if (buttonState === 'success') base += ' btn-success';
    if (buttonState === 'error')   base += ' btn-error';
    return base;
  };

  const selectedColor = ACCENT_COLORS.find(c => c.id === color);

  return (
    <section className="animate-entry max-w-2xl mx-auto mt-6">
      <div className="glass-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden">

        {/* Top accent line — color matches selected accent */}
        <div
          className="absolute top-0 left-0 w-full h-[2px] opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${selectedColor.hex}, transparent)` }}
        />

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/[0.08] border border-amber-500/[0.12] text-amber-400 text-xs font-medium uppercase tracking-widest mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Compose
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Snap It</h2>
          <p className="text-sm text-gray-400">Save your code snippets & notes to the vault</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title your stuff"
              className="w-full p-3.5 rounded-xl custom-input text-sm focus:outline-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="form-label">Content</label>
              {content && (
                <span className="text-xs font-mono text-gray-500">
                  {charCount} chars · {lineCount} {lineCount === 1 ? 'line' : 'lines'}
                </span>
              )}
            </div>
            <textarea
              ref={contentRef}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste your code or notes here..."
              className="w-full h-52 p-3.5 rounded-xl custom-input text-sm focus:outline-none leading-relaxed resize-none"
              required
            />
            <p className="text-right text-xs text-gray-600 mt-1">Ctrl + Enter to save</p>
          </div>

          {/* Tags */}
          <div>
            <label className="form-label">Tags</label>
            <div className="tag-input-box">
              {tags.map(tag => (
                <span key={tag} className="tag-chip">
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} className="tag-remove">✕</button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length === 0 ? 'Add tags — press Enter or comma' : ''}
                className="tag-input-field"
              />
            </div>
          </div>

          {/* Color Accent */}
          <div>
            <label className="form-label">Accent Color</label>
            <div className="flex gap-2.5 mt-2">
              {ACCENT_COLORS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  title={c.label}
                  className="color-dot"
                  style={{ background: c.hex, boxShadow: color === c.id ? `0 0 0 2px #1a1a2e, 0 0 0 4px ${c.hex}` : 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={buttonState === 'saving' || buttonState === 'success'}
            className={getBtnClass()}
          >
            {getButtonContent()}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NoteForm;
