import { state } from "../core/state.js";

export function renderMVS() {
  const list = state.mvs || [];

  return `
    <div class="glass">
      <h2 class="text-xl mb-4">MVS</h2>

      <button onclick="addMVS()" class="mb-4 px-3 py-1 bg-white/10 rounded">
        + Add Step
      </button>

      <div class="space-y-2">
        ${list.map((m, i) => `
          <div class="flex justify-between ${m.done ? 'opacity-40 line-through' : ''}">
            <span>${m.text}</span>
            <button onclick="toggleMVS(${i})">✓</button>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

window.addMVS = function () {
  const text = prompt("Enter step:");
  if (!text) return;

  if (!state.mvs) state.mvs = [];

  state.mvs.push({ text, done: false });
};

window.toggleMVS = function (i) {
  state.mvs[i].done = !state.mvs[i].done;
};
