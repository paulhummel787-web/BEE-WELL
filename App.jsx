import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Context
const SystemContext = createContext();

// Custom hook for easy access across the app
export const useSystem = () => useContext(SystemContext);

export const SystemJunction = ({ children }) => {
  // Core UI State
  const [theme, setTheme] = useState('dark'); // Defaults to dark mode
  const [isSpiritualMode, setIsSpiritualMode] = useState(false); // The Sanctuary mode
  const [activeTab, setActiveTab] = useState('dashboard'); 
  
  // Biological / System Metrics
  const [govValue, setGovValue] = useState(70); // The 70% Governor
  const [integrity, setIntegrity] = useState(0);
  const [shifts, setShifts] = useState(0);
  
  // Storage arrays
  const [logs, setLogs] = useState([]);
  const [mvs, setMvs] = useState(["Splash cold water", "Open workspace"]);
  const [activeBodyguards, setActiveBodyguards] = useState(new Set());

  // Global Actions
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSpiritual = () => {
    setIsSpiritualMode((prev) => !prev);
  };

  const logNectar = (text) => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <SystemContext.Provider
      value={{
        theme,
        toggleTheme,
        isSpiritualMode,
        toggleSpiritual,
        activeTab,
        setActiveTab,
        govValue,
        setGovValue,
        integrity,
        setIntegrity,
        shifts,
        setShifts,
        logs,
        logNectar,
        mvs,
        setMvs,
        activeBodyguards,
        setActiveBodyguards
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};
