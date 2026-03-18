import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function MemoryShield() {
  const navigate = useNavigate();
  const { notes, addNote, deleteNote } = useStore();
  const [text, setText] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addNote(text);
    setText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header */}
      <header className="p-6 flex justify-between items-center bg-white border-b">
        <button onClick={() => navigate('/')} className="text-blue-600 font-bold">← BACK</button>
        <h1 className="text-xl font-black tracking-tight">SYSTEM JUNCTION</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="flex-1 p-6 max-w-2xl mx-auto w-full">
        {/* Input Area: Optimized for High-Arousal entry */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-2">Deposit Thought</label>
          <form onSubmit={handleSave}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Brain Fog / Realization / Symptom..."
              className="w-full p-4 text-lg bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-400 outline-none"
              rows="3"
            />
            <button 
              type="submit" 
              className="w-full mt-3 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-transform"
            >
              SECURE TO JUNCTION
            </button>
          </form>
        </div>

        {/* The Ledger: View Saved Items */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-400 uppercase ml-2">Active Ledger</h2>
          {notes.length === 0 ? (
            <div className="text-center py-12 opacity-30 italic">No entries in the junction.</div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
                <div>
                  <p className="text-slate-800 text-lg leading-relaxed">{note.content}</p>
                  <span className="text-[10px] text-slate-400 font-bold uppercase mt-2 block">{note.timestamp}</span>
                </div>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="text-red-200 hover:text-red-500 p-2"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
