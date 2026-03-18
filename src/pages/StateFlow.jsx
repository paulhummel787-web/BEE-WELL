import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { statesData } from '../data/states';
import { useStore } from '../store/useStore';

export default function StateFlow() {
  const { colorId } = useParams();
  const navigate = useNavigate();
  const addLog = useStore((state) => state.addLog);
  const [step, setStep] = useState('fix'); // 'fix' or 'mvs'

  const stateInfo = statesData[colorId];

  const handleComplete = () => {
    addLog(stateInfo.name, 'Action Completed');
    navigate('/');
  };

  if (!stateInfo) return null;

  return (
    <div className={`flex-1 flex flex-col p-8 transition-colors duration-500 ${stateInfo.color}`}>
      <div className="flex-1 flex flex-col justify-center text-center">
        {step === 'fix' ? (
          <>
            <h2 className="text-lg font-bold uppercase tracking-widest opacity-50 mb-4">The Fix</h2>
            <p className="text-4xl font-black leading-tight mb-12">{stateInfo.fix}</p>
            <button 
              onClick={() => setStep('mvs')}
              className="bg-black text-white w-full py-6 rounded-3xl text-xl font-bold shadow-2xl"
            >
              I HAVE DONE THIS
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold uppercase tracking-widest opacity-50 mb-4">The Next Step</h2>
            <p className="text-4xl font-black leading-tight mb-12">{stateInfo.step}</p>
            <button 
              onClick={handleComplete}
              className="bg-black text-white w-full py-6 rounded-3xl text-xl font-bold shadow-2xl mb-4"
            >
              COMPLETE
            </button>
            <button onClick={() => setStep('fix')} className="text-sm font-bold opacity-40">GO BACK</button>
          </>
        )}
      </div>
    </div>
  );
}
