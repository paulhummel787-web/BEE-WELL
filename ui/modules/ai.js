import { registerModule, state } from "../core/state.js";

// === CORE DECISION ENGINE ===

function evaluateState() {
  const { wave, integrity, pressure, daily, mvs } = state;

  // --- PRIORITY ORDER ---
  // 1. Survival (overloaded / crash)
  // 2. Stabilization
  // 3. Execution
  // 4. Optimization

  // ===== OVERLOAD =====
  if (wave > 85 && integrity < 40) {
    return "System overloaded → reduce input, breathe, run BIO audit.";
  }

  // ===== LOW STATE =====
  if (wave < 30) {
    return "Low energy → drink water, stand up, one small movement.";
  }

  // ===== HIGH PRESSURE =====
  if (pressure > 70) {
    return "Pressure spike → remove expectations, do 1 tiny step only.";
  }

  // ===== NO FOX =====
  if (!daily?.fox) {
    return "No target set → define today's FOX (1 high-impact task).";
  }

  // ===== FOX NOT DONE =====
  if (daily?.fox && !daily?.completed) {
    return `Execute FOX → ${daily.fox}`;
  }

  // ===== NO MVS =====
  if (!mvs || mvs.length === 0) {
    return "No steps → create 1 Minimum Viable Step.";
  }

  // ===== DEFAULT FLOW =====
  return "System stable → continue execution.";
}

// === ADAPTIVE MEMORY (simple learning layer) ===

function learnPattern() {
  if (!state.patterns) state.patterns = [];

  state.patterns.push({
    wave: Math.round(state.wave),
    integrity: Math.round(state.integrity),
    time: Date.now()
  });

  // limit memory
  if (state.patterns.length > 50) {
    state.patterns.shift();
  }
}

// === APPLY OUTPUT ===

function applySuggestion() {
  const suggestion = evaluateState();
  state.suggestion = suggestion;
}

// === MODULE LOOP ===

registerModule(() => {
  applySuggestion();
  learnPattern();
});
