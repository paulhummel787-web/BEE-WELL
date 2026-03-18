import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StateFlow from './pages/StateFlow';
import Emergency from './pages/Emergency';
import MemoryShield from './pages/MemoryShield';

/**
 * The Logic Controller:
 * This ensures that the transition between "Home" and "State" 
 * is seamless and maintains the "One decision per screen" rule.
 */

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans antialiased text-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flow/:colorId" element={<StateFlow />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/shield" element={<MemoryShield />} />
        </Routes>
      </div>
    </Router>
  );
}
