import { registerModule, state } from "../core/state.js";

// === INIT ===

function initFocus() {
  if (!state.focus) {
    state.focus = {
      locked: false,
      target: null,
      startTime: null,
      violations: 0
    };
  }
}

// === LOCK TARGET ===

function lockFocusTarget() {
  if (!state.modeSystem) return;

  if (state.modeSystem.current !== "focus") {
    state.focus.locked = false;
    state.focus.target = null;
    return;
  }

  if (state.focus.locked) return;

  // priority: FOX → first incomplete MVS
  if (state.daily?.fox && !state.daily?.completed) {
    state.focus.target = state.daily.fox;
    state.focus.locked = true;
    state.focus.startTime = Date.now();
    return;
  }

  const next = state.mvs?.find(m => !m.done);

  if (next) {
    state.focus.target = next.task;
    state.focus.locked = true;
    state.focus.startTime = Date.now();
  }
}

// === DETECT DISTRACTION ===

function detectViolation() {
  if (!state.focus.locked) return;

  const now = Date.now();

  // if user switches tabs or no progress after time
  if (state.lastInteraction && now - state.lastInteraction > 15000) {
    state.focus.violations += 1;
    applyPenalty();
  }
}

// === PENALTY ===

function applyPenalty() {
  state.pressure += 2;

  if (state.focus.violations > 3) {
    state.suggestion = "⚠ FOCUS BREACH: return to target immediately.";
  }
}

// === REWARD ===

function rewardFocus() {
  if (!state.focus.locked) return;

  const elapsed = Date.now() - state.focus.startTime;

  if (elapsed > 20000) {
    state.integrity += 1;
    state.xp += 2;
  }
}

// === OVERRIDE SUGGESTION ===

function enforceFocus() {
  if (!state.focus.locked || !state.focus.target) return;

  state.suggestion = `FOCUS LOCK → ${state.focus.target}`;
}

// === TRACK INTERACTION ===

window.trackInteraction = function () {
  state.lastInteraction = Date.now();
};

// === MODULE LOOP ===

registerModule(() => {
  initFocus();
  lockFocusTarget();
  detectViolation();
  rewardFocus();
  enforceFocus();
});
