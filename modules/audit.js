import { registerModule } from "../core/state.js";

// Audit State (local to module)
const audit = {
  active: false,
  step: 0,
  type: null
};

const AUDITS = {
  biological: [
    "Drink water",
    "Stand up",
    "Stretch body",
    "Breathe slowly",
    "Relax shoulders"
  ],
  mental: [
    "Name your state",
    "Drop the story",
    "Focus on breath",
    "Wait 10 seconds",
    "Return to one step"
  ],
  execution: [
    "Close distractions",
    "Pick ONE task",
    "Break into 1 step",
    "Start for 30 seconds",
    "Ignore outcome"
  ]
};

// ===== MODULE =====
registerModule(function (state) {

  // Auto trigger audit when overloaded
  if (!audit.active && state.mode === "overloaded") {
    startAudit("biological");
  }

});

// ===== UI FUNCTIONS =====

function renderAudit() {
  if (!audit.active) return;

  const steps = AUDITS[audit.type];
  const current = steps[audit.step];

  document.getElementById("app").innerHTML += `
    <div class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center text-center z-50">
      <div class="text-sm opacity-50 mb-4">
        ${audit.type.toUpperCase()} • Step ${audit.step + 1}/${steps.length}
      </div>

      <div class="text-2xl mb-8">${current}</div>

      <button onclick="window.nextAudit()" class="bg-white text-black px-6 py-2">
        ${audit.step === steps.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  `;
}

// ===== GLOBAL CONTROL =====

window.startAudit = function (type = "biological") {
  audit.active = true;
  audit.type = type;
  audit.step = 0;
  renderAudit();
};

window.nextAudit = function () {
  const steps = AUDITS[audit.type];
  audit.step++;

  if (audit.step >= steps.length) {
    audit.active = false;

    // reward
    window.__STATE__.integrity += 10;
    window.__STATE__.xp += 10;

    return;
  }

  renderAudit();
};

// expose state safely
import { state } from "../core/state.js";
window.__STATE__ = state;
