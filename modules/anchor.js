import { registerModule, state } from "../core/state.js";

// === DATA (FROM YOUR ORIGINAL SYSTEM) ===

const ANCHORS = [
  {
    category: "identity",
    color: "blue",
    lie: "I am broken",
    truth: "I am not broken. I am adapting."
  },
  {
    category: "identity",
    color: "blue",
    lie: "I am a failure",
    truth: "I am learning and building."
  },
  {
    category: "safety",
    color: "purple",
    lie: "I am in danger",
    truth: "This is a signal, not a threat."
  },
  {
    category: "safety",
    color: "purple",
    lie: "I can't handle this",
    truth: "I can handle one step."
  },
  {
    category: "control",
    color: "yellow",
    lie: "Everything is chaos",
    truth: "I only need to control the next step."
  },
  {
    category: "control",
    color: "yellow",
    lie: "I must fix everything",
    truth: "One small action is enough."
  },
  {
    category: "strength",
    color: "red",
    lie: "This is too much",
    truth: "Pause. Breathe. Then act."
  },
  {
    category: "strength",
    color: "red",
    lie: "I am overwhelmed",
    truth: "This will pass. Stay steady."
  },
  {
    category: "flow",
    color: "green",
    lie: "I might lose this momentum",
    truth: "Stay present. Keep moving."
  }
];

// === STATE INIT ===

if (!state.anchor) {
  state.anchor = {
    current: null,
    lastUsed: 0
  };
}

// === SELECT ANCHOR BASED ON STATE ===

function pickAnchor() {
  const matches = ANCHORS.filter(a => a.color === state.color);

  if (!matches.length) return ANCHORS[0];

  return matches[Math.floor(Math.random() * matches.length)];
}

// === AUTO SUGGESTION ===

function autoAnchor() {
  const now = Date.now();

  // only trigger occasionally
  if (now - state.anchor.lastUsed < 20000) return;

  if (state.modeSystem?.current === "recovery" || state.wave < 50) {
    const a = pickAnchor();
    state.suggestion = `TRUTH → ${a.truth}`;
    state.anchor.current = a;
    state.anchor.lastUsed = now;
  }
}

// === MANUAL OPEN ===

window.openAnchor = function () {
  const a = pickAnchor();
  state.anchor.current = a;
  renderAnchorOverlay();
};

// === FORCE OVERRIDE ===

window.forceTruth = function () {
  renderOverrideOverlay();
};

// === RENDER ANCHOR ===

function renderAnchorOverlay() {
  const a = state.anchor.current;
  if (!a) return;

  let overlay = document.getElementById("anchor-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "anchor-overlay";
    overlay.className =
      "fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center text-center p-6";
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="max-w-xl space-y-6">

      <div class="text-xs opacity-40 uppercase">
        ${a.category} anchor
      </div>

      <div class="text-red-400 text-sm italic">
        "${a.lie}"
      </div>

      <div class="text-2xl text-indigo-300">
        "${a.truth}"
      </div>

      <div class="flex gap-4 justify-center mt-6">
        <button onclick="openAnchor()" class="bg-white/10 px-4 py-2 rounded">
          Next
        </button>

        <button onclick="forceTruth()" class="bg-red-500/20 px-4 py-2 rounded">
          Override
        </button>

        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="opacity-50 text-sm">
          Close
        </button>
      </div>

    </div>
  `;
}

// === OVERRIDE MODE (IDENTITY BLAST) ===

function renderOverrideOverlay() {
  const identity = ANCHORS.filter(a => a.category === "identity");

  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center text-center p-10";

  overlay.innerHTML = `
    <div class="space-y-6 max-w-xl">

      <div class="text-xs uppercase opacity-40 text-red-500">
        System Override
      </div>

      ${identity.map(a => `
        <div class="text-lg opacity-90">${a.truth}</div>
      `).join("")}

      <button onclick="this.parentElement.parentElement.remove()" class="mt-6 bg-white px-6 py-2 text-black rounded">
        Acknowledge
      </button>

    </div>
  `;

  document.body.appendChild(overlay);
}

// === LOOP ===

registerModule(() => {
  autoAnchor();
});
