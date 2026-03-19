import { registerModule, state } from "../core/state.js";

// === INIT MODES ===

function initModes() {
  if (!state.modeSystem) {
    state.modeSystem = {
      current: "normal", // normal | focus | recovery | sanctuary
      lastSwitch: Date.now()
    };
  }
}

// === DETERMINE MODE ===

function evaluateMode() {
  const { wave, integrity, pressure } = state;

  // RECOVERY MODE
  if (wave > 85 || integrity < 35) {
    setMode("recovery");
    return;
  }

  // FOCUS MODE
  if (wave > 65 && integrity > 60 && pressure < 60) {
    setMode("focus");
    return;
  }

  // SANCTUARY MODE (low state)
  if (wave < 35) {
    setMode("sanctuary");
    return;
  }

  // DEFAULT
  setMode("normal");
}

// === SET MODE ===

function setMode(mode) {
  if (!state.modeSystem) return;

  if (state.modeSystem.current === mode) return;

  state.modeSystem.current = mode;
  state.modeSystem.lastSwitch = Date.now();

  applyModeEffects(mode);
}

// === MODE EFFECTS ===

function applyModeEffects(mode) {

  // RESET BASE
  state.focusLock = false;
  state.suggestionPrefix = "";

  if (mode === "focus") {
    state.focusLock = true;
    state.suggestionPrefix = "FOCUS: ";
  }

  if (mode === "recovery") {
    state.suggestionPrefix = "RECOVER: ";
    state.wave -= 1;
  }

  if (mode === "sanctuary") {
    state.suggestionPrefix = "SAFE MODE: ";
    state.pressure -= 1;
  }

  if (mode === "normal") {
    state.suggestionPrefix = "";
  }
}

// === MODIFY SUGGESTION OUTPUT ===

function applyModeToSuggestion() {
  if (!state.suggestion) return;

  if (state.suggestionPrefix) {
    state.suggestion = state.suggestionPrefix + state.suggestion;
  }
}

// === MODULE LOOP ===

registerModule(() => {
  initModes();
  evaluateMode();
  applyModeToSuggestion();
});
