import { registerModule, state } from "../core/state.js";

// prevent spam triggers
let lastIntervention = 0;

// === CORE INTERVENTION LOGIC ===

function checkCriticalState() {
  const now = Date.now();

  // cooldown (avoid constant firing)
  if (now - lastIntervention < 15000) return;

  const { wave, integrity, pressure, patternFlags } = state;

  // ===== HARD OVERLOAD =====
  if (wave > 90 && integrity < 30) {
    triggerIntervention("overload");
    lastIntervention = now;
    return;
  }

  // ===== PATTERN OVERLOAD =====
  if (patternFlags?.overloadLoop) {
    triggerIntervention("pattern_overload");
    lastIntervention = now;
    return;
  }

  // ===== STAGNATION ESCALATION =====
  if (patternFlags?.stagnation && pressure > 75) {
    triggerIntervention("stagnation");
    lastIntervention = now;
    return;
  }
}

// === INTERVENTION TYPES ===

function triggerIntervention(type) {
  if (type === "overload") {
    state.suggestion = "⚠ SYSTEM OVERRIDE: STOP. Breathe. Starting BIO reset.";
    startAudit("biological");
  }

  if (type === "pattern_overload") {
    state.suggestion = "⚠ LOOP DETECTED: forced reset required.";
    startAudit("mental");
  }

  if (type === "stagnation") {
    state.suggestion = "⚠ STAGNATION BREAK: forced action required.";
    injectEmergencyStep();
  }
}

// === ACTIONS ===

function startAudit(type) {
  if (window.startAudit) {
    window.startAudit(type);
  }
}

function injectEmergencyStep() {
  if (!state.mvs) state.mvs = [];

  state.mvs.unshift({
    task: "DO ONE THING RIGHT NOW (no thinking)",
    done: false,
    emergency: true
  });
}

// === MODULE LOOP ===

registerModule(() => {
  checkCriticalState();
});
