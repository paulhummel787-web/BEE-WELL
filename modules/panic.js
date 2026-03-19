import { state } from "../core/state.js";

// === TRIGGER PANIC ===

window.triggerPanic = function () {
  state.wave = 90;
  state.pressure += 10;

  renderPanicOverlay();
};

// === OVERLAY ===

function renderPanicOverlay() {
  const overlay = document.createElement("div");

  overlay.id = "panic-overlay";
  overlay.className =
    "fixed inset-0 bg-red-900/95 z-[10000] flex flex-col items-center justify-center text-center p-10";

  overlay.innerHTML = `
    <div class="space-y-8 max-w-xl">

      <div class="text-5xl font-bold">STOP</div>

      <div class="text-lg opacity-80">
        Do nothing. You are safe.
      </div>

      <div id="breath" class="text-3xl mt-6">
        Breathe In
      </div>

      <button onclick="startReset()" class="bg-white text-black px-6 py-3 rounded mt-8">
        Start Reset
      </button>

    </div>
  `;

  document.body.appendChild(overlay);

  startBreathing();
}

// === BREATHING ENGINE ===

let breathInterval;

function startBreathing() {
  const el = document.getElementById("breath");
  if (!el) return;

  let inhale = true;

  breathInterval = setInterval(() => {
    inhale = !inhale;
    el.innerText = inhale ? "Breathe In" : "Breathe Out";
  }, 3000);
}

// === RESET SEQUENCE ===

window.startReset = function () {
  clearInterval(breathInterval);

  const overlay = document.getElementById("panic-overlay");

  overlay.innerHTML = `
    <div class="space-y-6 max-w-xl">

      <div class="text-2xl">Resetting System...</div>

      <div class="opacity-70 text-sm">
        Follow the steps below
      </div>

      <div id="step" class="text-lg mt-6"></div>

      <button onclick="nextStep()" class="bg-white/10 px-4 py-2 rounded mt-6">
        Next
      </button>

    </div>
  `;

  window.resetStep = 0;
  runStep();
};

// steps
const STEPS = [
  "Drink water.",
  "Relax your shoulders.",
  "Take 5 slow breaths.",
  "Look around. Name 3 things you see.",
  "You are back in control."
];

window.nextStep = function () {
  window.resetStep++;
  runStep();
};

function runStep() {
  const stepEl = document.getElementById("step");

  if (window.resetStep >= STEPS.length) {
    finishReset();
    return;
  }

  stepEl.innerText = STEPS[window.resetStep];
}

// === FINISH ===

function finishReset() {
  const overlay = document.getElementById("panic-overlay");

  overlay.innerHTML = `
    <div class="space-y-6 text-center">

      <div class="text-xl">System Stabilized</div>

      <button onclick="exitPanic()" class="bg-green-500 px-6 py-2 rounded">
        Return
      </button>

    </div>
  `;

  // recover state
  state.wave = Math.max(40, state.wave - 30);
  state.pressure = Math.max(0, state.pressure - 10);

  // trigger anchor
  setTimeout(() => {
    if (window.openAnchor) window.openAnchor();
  }, 500);
}

window.exitPanic = function () {
  document.getElementById("panic-overlay")?.remove();

  // optional: go to dashboard
  if (window.switchTab) window.switchTab("dashboard");
};
