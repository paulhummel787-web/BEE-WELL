import { registerModule, state } from "../core/state.js";

// === INIT PROFILE ===

function initProfile() {
  if (!state.profile) {
    state.profile = {
      actions: {},     // success tracking
      avoids: {},      // ignored actions
      boosts: {},      // what improves integrity
    };
  }
}

// === TRACK ACTION SUCCESS ===

function trackSuccess() {
  if (!state.lastAction) return;

  const action = state.lastAction;

  if (!state.profile.actions[action]) {
    state.profile.actions[action] = 0;
  }

  state.profile.actions[action] += 1;

  // reward system
  state.integrity += 0.2;
}

// === TRACK AVOIDANCE ===

function trackAvoidance() {
  if (!state.suggestion) return;

  const suggestion = state.suggestion;

  if (!state.profile.avoids[suggestion]) {
    state.profile.avoids[suggestion] = 0;
  }

  state.profile.avoids[suggestion] += 1;
}

// === DETECT BOOSTS ===

function detectBoosts() {
  if (!state.patterns || state.patterns.length < 2) return;

  const last = state.patterns[state.patterns.length - 1];
  const prev = state.patterns[state.patterns.length - 2];

  const delta = last.integrity - prev.integrity;

  if (delta > 2 && state.lastAction) {
    if (!state.profile.boosts[state.lastAction]) {
      state.profile.boosts[state.lastAction] = 0;
    }

    state.profile.boosts[state.lastAction] += 1;
  }
}

// === ADAPT SUGGESTIONS ===

function adaptSuggestions() {
  if (!state.profile) return;

  const boosts = state.profile.boosts || {};

  let bestAction = null;
  let bestScore = 0;

  for (let action in boosts) {
    if (boosts[action] > bestScore) {
      bestScore = boosts[action];
      bestAction = action;
    }
  }

  if (bestAction && Math.random() > 0.5) {
    state.suggestion = `Optimal action (learned): ${bestAction}`;
  }
}

// === MODULE LOOP ===

registerModule(() => {
  initProfile();
  trackSuccess();
  trackAvoidance();
  detectBoosts();
  adaptSuggestions();
});
