import { state } from "../core/state.js";

export function renderStats() {
  return `
    <div class="glass">
      <h2 class="text-xl mb-4">Stats</h2>

      <div>Wave: ${Math.round(state.wave || 0)}</div>
      <div>Integrity: ${Math.round(state.integrity || 0)}</div>

      <button onclick="openAnalytics()" class="mt-4 px-3 py-1 bg-white/10 rounded">
        Open Analytics
      </button>
    </div>
  `;
}
