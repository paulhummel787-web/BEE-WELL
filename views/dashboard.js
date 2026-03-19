import { state } from "../core/state.js";

function getColor() {
  const w = state.wave;

  if (w < 30) return "blue";
  if (w < 50) return "purple";
  if (w < 70) return "yellow";
  if (w < 85) return "red";
  return "green";
}

function getGuidance() {
  const w = state.wave;
  const i = state.integrity;

  if (w < 30) return "Reduce everything. Small movement.";
  if (w > 85 && i < 40) return "Too much. Remove input.";
  if (w > 70 && i > 60) return "High clarity. Execute.";
  return "Maintain steady pace.";
}

export function renderDashboard() {
  const color = getColor();

  return `
    <div class="space-y-6">

      <div class="glass text-center">
        <p class="text-xs opacity-50">STATE</p>
        <p class="text-4xl">${color.toUpperCase()}</p>
        <p class="text-sm opacity-60 mt-2">${getGuidance()}</p>
      </div>

      <div class="grid grid-cols-2 gap-4">

        <div class="glass text-center">
          <p class="text-xs opacity-50">WAVE</p>
          <p class="text-3xl">${Math.round(state.wave)}%</p>
        </div>

        <div class="glass text-center">
          <p class="text-xs opacity-50">INTEGRITY</p>
          <p class="text-3xl">${Math.round(state.integrity)}%</p>
        </div>

      </div>

      <div class="glass text-center">
        <button onclick="triggerPanic()" 
          class="bg-red-600 px-6 py-3 rounded font-bold">
          PANIC RESET
        </button>
      </div>

    </div>
  `;
}
