import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Emergency() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-8 text-white text-center">
      <h1 className="text-5xl font-black mb-8">LEVEL 0</h1>
      <div className="bg-white/10 p-6 rounded-2xl mb-8">
        <p className="text-2xl font-bold mb-4">STOP MOVING.</p>
        <p className="text-lg">Exhale for 6 seconds. Repeat 3 times.</p>
      </div>
      <button 
        onClick={() => navigate('/')}
        className="bg-white text-red-600 px-12 py-4 rounded-full font-bold text-xl shadow-xl"
      >
        I am grounded
      </button>
    </div>
  );
}
