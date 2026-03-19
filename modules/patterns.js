import { registerModule, state } from "../core/state.js";

// === PATTERN DETECTION ===

function detectPatterns() {
  const history = state.patterns || [];

  if (history.length < 10) return;

  const recent = history.slice(-10);

  const avgWave = recent.reduce((a, b) => a + b.wave, 0) / recent.length;
  const avgIntegrity = recent.reduce((a, b) => a + b.integrity, 0) / recent.length;

  // ===== PATTERN FLAGS =====
  state.patternFlags = {
    overloadLoop: false,
    lowEnergyLoop: false,
    stagnation: false
  };

  // OVERLOAD LOOP
  if (avgWave > 80 && avgIntegrity < 40) {
    state.patternFlags.overloadLoop = true;
  }

  // LOW ENERGY LOOP
  if (avgWave < 35) {
    state.patternFlags.lowEnergyLoop = true;
  }

  // STAGNATION (no progress)
  const noFoxProgress = state.daily?.fox && !state.daily?.completed;
  const noMVSProgress = !state.mvs || state.mvs.every(m => !m.done);

  if (noFoxProgress && noMVSProgress) {
    state.patternFlags.stagnation = true;
  }
}

// === MODIFY AI OUTPUT ===

function enhanceSuggestion() {
  if (!state.patternFlags) return;

  const flags = state.patternFlags;

  if (flags.overloadLoop) {
    state.suggestion = "Pattern detected: overload loop → reduce inputs, enforce recovery cycle.";
  }

  else if (flags.lowEnergyLoop) {
    state.suggestion = "Pattern detected: low energy loop → prioritize movement, hydration, sunlight.";
  }

  else if (flags.stagnation) {
    state.suggestion = "Pattern detected: stagnation → shrink task until action is unavoidable.";
  }
}

// === ESCALATION SYSTEM ===

function escalateIfNeeded() {
  if (!state.patternFlags) return;

  if (state.patternFlags.overloadLoop) {
    state.integrity -= 0.5; // system penalty
  }

  if (state.patternFlags.stagnation) {
    state.pressure += 0.5;
  }
}

// === MODULE LOOP ===

registerModule(() => {
  detectPatterns();
  enhanceSuggestion();
  escalateIfNeeded();
});
