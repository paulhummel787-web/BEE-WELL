import { registerModule, state } from "../core/state.js";

// === MEMORY ===

if (!state.ai) {
  state.ai = {
    lastAdvice: "",
    history: [],
    personalityBias: 1 // evolves over time
  };
}

// === CONTEXT BUILDER ===

function buildContext() {
  return {
    wave: state.wave,
    integrity: state.integrity,
    pressure: state.pressure,
    mode: state.modeSystem?.current,
    focus: state.focus?.locked,
    fox: state.daily?.fox,
    mvsPending: state.mvs?.filter(m => !m.done).length || 0,
    streak: state.streak || 0
  };
}

// === DECISION ENGINE ===

function generateAdvice(ctx) {
  // PRIORITY 1 — survival
  if (ctx.wave > 85) {
    return "System overload. Stop. Breathe. Run panic reset.";
  }

  if (ctx.wave < 35) {
    return "Energy collapse detected. Reduce expectations. Do one tiny action.";
  }

  // PRIORITY 2 — focus
  if (!ctx.focus && ctx.mvsPending > 0) {
    return "You are drifting. Lock onto one step now.";
  }

  // PRIORITY 3 — execution
  if (ctx.mvsPending > 3) {
    return "Too many tasks. Cut down to ONE.";
  }

  // PRIORITY 4 — growth
  if (ctx.integrity > 70 && ctx.wave < 70) {
    return "You are stable. Push forward. Execute your target.";
  }

  // fallback
  return "Maintain state. Continue current action.";
}

// === LEARNING LOOP ===

function learn(advice) {
  state.ai.history.push({
    time: Date.now(),
    advice
  });

  if (state.ai.history.length > 50) {
    state.ai.history.shift();
  }

  state.ai.lastAdvice = advice;
}

// === APPLY ===

function runAI() {
  const ctx = buildContext();
  const advice = generateAdvice(ctx);

  // prevent spam
  if (advice !== state.ai.lastAdvice) {
    state.suggestion = "AI → " + advice;
    learn(advice);
  }
}

// === LOOP ===

registerModule(() => {
  runAI();
});
