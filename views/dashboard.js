import { state } from "../core/state.js";

function getColor() {
  const w = state.wave;

  if (w < 25) return "#3b82f6";
  if (w < 45) return "#6366f1";
  if (w < 65) return "#22c55e";
  if (w < 80) return "#eab308";
  if (w < 90) return "#f97316";
  return "#ef4444";
}

function getLabel() {
  const w = state.wave;

  if (w < 25) return "LOW";
  if (w < 45) return "RECOVER";
  if (w < 65) return "STABLE";
  if (w < 80) return "ACTIVE";
  if (w < 90) return "INTENSE";
  return "OVERLOAD";
}

function getGuidance() {
  const w = state.wave;
  const i = state.integrity;

  if (w < 25) return "Reduce everything.";
  if (w > 90 && i < 40) return "Overload.";
  if (w > 70 && i > 60) return "Execute.";
  return "Steady.";
}

// ✅ IMPORTANT: NAMED FUNCTION
function renderDashboard() {
  const color = getColor();

  return `
    <div style="padding:20px; max-width:600px; margin:auto;">

      <div style="
        background:#111;
        border-radius:16px;
        padding:30px;
        text-align:center;
      ">

        <h1 style="
          font-size:40px;
          color:${color};
          transition: all 0.4s ease;
        ">
          ${getLabel()}
        </h1>

        <p>${getGuidance()}</p>

      </div>

      <div style="margin-top:20px;text-align:center;">
        <button onclick="boost()">BOOST</button>
        <button onclick="calm()">CALM</button>
      </div>

    </div>
  `;
}

// ✅ IMPORTANT: EXPORT
export { renderDashboard };

// ===== ACTIONS =====
window.boost = function () {
  state.wave += 5;
};

window.calm = function () {
  state.wave -= 5;
};
