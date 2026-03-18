import React from 'react';
import { useNavigate } from 'react-router-dom';
// This line below is what the error is complaining about:
import { statesData } from '../data/states'; 

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-6 max-w-lg mx-auto w-full">
      <header className="py-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Bee Well</h1>
        <p className="text-slate-500 mt-2">What is your internal weather?</p>
      </header>

      <main className="flex-1 flex flex-col gap-4">
        {Object.values(statesData).map((state) => (
          <button
            key={state.id}
            onClick={() => navigate(`/flow/${state.id}`)}
            className={`w-full ${state.color} p-6 rounded-2xl shadow-sm flex flex-col items-start border border-black/5`}
          >
            <span className="text-2xl font-bold">{state.name}</span>
            <span className="text-sm font-medium opacity-70 mt-1">{state.desc}</span>
          </button>
        ))}
      </main>

      <footer className="mt-8 grid grid-cols-2 gap-4 pb-8">
        <button onClick={() => navigate('/shield')} className="bg-white border-2 border-slate-100 py-4 rounded-2xl font-bold">🛡️ Shield</button>
        <button onClick={() => navigate('/emergency')} className="bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg">🚨 LEVEL 0</button>
      </footer>
    </div>
  );
}
