import { state } from "../core/state.js";

export function render() {

  document.getElementById("app").innerHTML = `
  <div class="space-y-4">

    <div>
      Wave: ${Math.round(state.wave)} | ${state.mode}
    </div>

    <div>
      Integrity: ${Math.round(state.integrity)}
    </div>

    <div>
      Level: ${state.level} | XP: ${state.xp}
    </div>

    <input 
      value="${state.fox || ""}" 
      placeholder="Fox Target"
      class="bg-black border p-2 w-full"
      onchange="window.setFox(this.value)"
    >

    <div>
      ${state.mvs.map((m, i) => `
        <div onclick="window.toggleMVS(${i})" class="cursor-pointer">
          ${m.done ? "✔" : "•"} ${m.task}
        </div>
      `).join("")}
    </div>

    <button onclick="window.addMVS()" class="bg-white text-black px-3 py-1">
      Add Step
    </button>

    <button onclick="window.completeFox()" class="bg-green-500 px-3 py-1">
      Complete Fox
    </button>

  </div>
  `;
}

// ===== GLOBAL UI ACTIONS =====

window.addMVS = function () {
  const t = prompt("Step:");
  if (t) state.mvs.push({ task: t, done: false });
};

window.toggleMVS = function (i) {
  const m = state.mvs[i];
  m.done = !m.done;

  if (m.done) {
    state.integrity += 5;
    state.xp += 5;
  }
};

window.setFox = function (v) {
  state.fox = v;
};

window.completeFox = function () {
  if (!state.fox) return;

  state.integrity += 10;
  state.xp += 10;
  state.fox = null;
};
