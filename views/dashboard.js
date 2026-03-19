import { state } from "../core/state.js";

function getColor() {
  const w = state.wave;

  if (w < 30) return "#3b82f6"; // blue
  if (w < 50) return "#8b5cf6"; // purple
  if (w < 70) return "#eab308"; // yellow
  if (w < 85) return "#ef4444"; // red
  return "#22c55e"; // green
}

function getLabel() {
  const w = state.wave;

  if (w < 30) return "LOW";
  if (w < 50) return "RECOVER";
  if (w < 70) return "STABLE";
  if (w < 85) return "INTENSE";
  return "OVERDRIVE";
}

function getGuidance() {
  const w = state.wave;
  const i = state.integrity;

  if (w < 30) return "Reduce everything. Just exist.";
  if (w > 85 && i < 40) return "Overload. Remove input.";
  if (w > 70 && i > 60) return "You are clear. Execute.";
  return "Hold steady.";
}

export function renderDashboard() {
  const color = getColor();

  return `
    <div style="padding:20px; max-width:600px; margin:auto;">

      <div style="
        background:#111;
        border-radius:16px;
        padding:30px;
        text-align:center;
        border:1px solid rgba(255,255,255,0.08);
      ">

        <p style="opacity:.5;">STATE</p>

        <h1 style="
          font-size:40px;
          margin:10px 0;
          color:${color};
        ">
          ${getLabel()}
        </h1>

        <p style="opacity:.6;">
          ${getGuidance()}
        </p>

      </div>

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:15px;
        margin-top:20px;
      ">

        <div style="background:#111;padding:20px;border-radius:12px;text-align:center;">
          <p style="opacity:.5;">WAVE</p>
          <h2 style="font-size:28px;">${Math.round(state.wave)}</h2>
        </div>

        <div style="background:#111;padding:20px;border-radius:12px;text-align:center;">
          <p style="opacity:.5;">INTEGRITY</p>
          <h2 style="font-size:28px;">${Math.round(state.integrity)}</h2>
        </div>

      </div>

      <div style="margin-top:20px;text-align:center;">
        <button onclick="boost()" style="
          padding:10px 20px;
          background:#22c55e;
          border:none;
          border-radius:8px;
          margin-right:10px;
        ">
          BOOST
        </button>

        <button onclick="calm()" style="
          padding:10px 20px;
          background:#3b82f6;
          border:none;
          border-radius:8px;
          margin-right:10px;
        ">
          CALM
        </button>

        <button onclick="triggerPanic()" style="
          padding:10px 20px;
          background:#ef4444;
          border:none;
          border-radius:8px;
        ">
          PANIC
        </button>
      </div>

    </div>
  `;
}

// ===== ACTIONS =====
window.boost = function () {
  state.wave += 5;
};

window.calm = function () {
  state.wave -= 5;
};
