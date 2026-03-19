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

export function renderDashboard() {
  const color = getColor();

  return `
    <div style="text-align:center;">

      <h1 style="
        font-size:40px;
        color:${color};
        transition:all .3s ease;
      ">
        ${getLabel()}
      </h1>

      <p>Wave: ${Math.round(state.wave)}</p>
      <p>Integrity: ${Math.round(state.integrity)}</p>

    </div>
  `;
}
