import { registerModule, state } from "../core/state.js";

// color map
const COLORS = {
  blue: "#3b82f6",
  purple: "#8b5cf6",
  yellow: "#facc15",
  red: "#ef4444",
  green: "#10b981"
};

// determine color from wave
function computeColor() {
  const w = state.wave;

  if (w < 30) state.color = "blue";
  else if (w < 50) state.color = "purple";
  else if (w < 70) state.color = "yellow";
  else if (w < 85) state.color = "red";
  else state.color = "green";
}

// apply visuals
function applyVisuals() {
  const color = COLORS[state.color] || "#10b981";

  document.body.style.background = `radial-gradient(circle at top, ${color}20, #000)`;

  // intensity glow
  const intensity = Math.min(0.25, state.wave / 400);

  document.body.style.boxShadow = `
    inset 0 0 120px rgba(255,255,255,${intensity})
  `;

  // mode class
  document.body.dataset.mode = state.modeSystem?.current || "normal";
}

// subtle motion dampening
function stabilizeVisuals() {
  if (!state.visual) {
    state.visual = { lastWave: state.wave };
  }

  // smooth transitions
  state.wave = state.visual.lastWave + (state.wave - state.visual.lastWave) * 0.2;
  state.visual.lastWave = state.wave;
}

// loop
registerModule(() => {
  computeColor();
  stabilizeVisuals();
  applyVisuals();
});
