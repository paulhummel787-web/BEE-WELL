import { state } from "../core/state.js";
import { renderLayout, getTab } from "./layout.js";

export function render() {
  window.renderApp();
}

window.renderApp = function () {

  let content = "";
  const tab = getTab();

  if (tab === "dashboard") content = dashboard();
  if (tab === "mvs") content = mvsView();
  if (tab === "fox") content = foxView();
  if (tab === "stats") content = statsView();
  if (tab === "terminal") content = terminalView();
  if (tab === "journal") content = journalView();

  document.getElementById("app").innerHTML = renderLayout(content);
};

// ===== VIEWS =====

function dashboard() {
  return `
    <div class="space-y-4">
      <div>Wave: ${Math.round(state.wave)} (${state.mode})</div>
      <div>Integrity: ${Math.round(state.integrity)}</div>
      <div>Pressure: ${Math.round(state.pressure)}</div>
      <div>Level: ${state.level} | XP: ${state.xp}</div>

      <div class="border border-white/10 p-2">
        <div class="text-xs opacity-50">Today's Fox</div>
        <div>${state.daily?.fox || "None"}</div>
        <div>${state.daily?.completed ? "✔ Completed" : ""}</div>
      </div>

      <button onclick="window.startAudit()" class="bg-white text-black px-3 py-1">
        Run Audit
      </button>
    </div>
  `;
}

function mvsView() {
  return `
    <div class="space-y-3">
      ${state.mvs.map((m, i) => `
        <div onclick="window.toggleMVS(${i})" class="cursor-pointer">
          ${m.done ? "✔" : "•"} ${m.task}
        </div>
      `).join("")}

      <button onclick="window.addMVS()" class="bg-white text-black px-3 py-1">
        Add Step
      </button>
    </div>
  `;
}

function foxView() {
  return `
    <div class="space-y-4">

      <input 
        value="${state.daily?.fox || ""}" 
        placeholder="Set ONE target"
        class="bg-black border p-2 w-full"
        onchange="window.setDailyFox(this.value)"
      >

      <button 
        onclick="window.completeDailyFox()" 
        class="bg-green-500 px-3 py-1"
      >
        Complete Target
      </button>

      <div class="text-sm opacity-60">
        Status: ${state.daily?.completed ? "✔ Completed" : "Pending"}
      </div>

    </div>
  `;
}

function statsView() {
  return `
    <div class="space-y-2 text-sm">
      <div>Achievements: ${state.achievements.join(", ")}</div>
      <div>Streak: ${state.streak}</div>
    </div>
  `;
}

function terminalView() {
  return `
    <div class="space-y-2">
      <div id="terminal-output" class="text-sm h-48 overflow-y-auto border p-2 bg-black"></div>

      <input 
        id="terminal-input"
        class="w-full bg-black border p-2"
        placeholder="/command"
        onkeydown="window.handleTerminal(event)"
      >
    </div>
  `;
}

function journalView() {
  return `
    <div class="space-y-4">

      <textarea 
        id="journal-input"
        class="w-full bg-black border p-2 h-24"
        placeholder="Dump thoughts..."
      ></textarea>

      <button onclick="window.saveJournal()" class="bg-white text-black px-3 py-1">
        Save Entry
      </button>

      <div class="space-y-2 text-sm max-h-60 overflow-y-auto">
        ${state.journal?.map(j => `
          <div class="border border-white/10 p-2">
            <div class="opacity-40 text-xs">${j.time}</div>
            <div>${j.text}</div>
          </div>
        `).reverse().join("") || ""}
      </div>

    </div>
  `;
}

// ===== ACTIONS =====

window.saveJournal = function () {
  const val = document.getElementById("journal-input").value;
  if (!val) return;

  window.addJournal(val);
  window.renderApp();
};

window.handleTerminal = function (e) {
  if (e.key !== "Enter") return;

  const val = e.target.value;
  if (!val) return;

  const res = window.runCommand(val);

  const out = document.getElementById("terminal-output");
  out.innerHTML += `<div>> ${val}</div>`;
  if (res) out.innerHTML += `<div>${res}</div>`;

  out.scrollTop = out.scrollHeight;
  e.target.value = "";
};

window.clearTerminal = function () {
  const out = document.getElementById("terminal-output");
  if (out) out.innerHTML = "";
};

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
