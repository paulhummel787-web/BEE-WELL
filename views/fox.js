import { state } from "../core/state.js";

export function renderFox() {
  return `
    <div class="glass text-center">
      <h2 class="text-xl mb-4">Chase the Fox</h2>

      <input 
        id="foxInput"
        value="${state.daily?.fox || ""}"
        placeholder="Target..."
        class="bg-black border border-white/20 px-3 py-2 rounded w-full mb-4 text-center"
      />

      <button onclick="setFox()" class="px-4 py-2 bg-indigo-500/20 rounded">
        Lock Target
      </button>
    </div>
  `;
}

window.setFox = function () {
  const val = document.getElementById("foxInput").value;
  if (!state.daily) state.daily = {};
  state.daily.fox = val;
};
