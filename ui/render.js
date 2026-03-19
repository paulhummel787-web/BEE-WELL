import { state } from "../core/state.js";
import { renderLayout, getTab } from "./layout.js";

let lastRenderKey = "";

// MAIN RENDER
export function render() {
  window.renderApp();
}

window.renderApp = function () {

  const tab = getTab();

  const renderKey = JSON.stringify({
    tab,
    wave: Math.round(state.wave),
    integrity: Math.round(state.integrity),
    fox: state.daily?.fox,
    completed: state.daily?.completed,
    mvs: state.mvs?.length,
    journal: state.journal?.length
  });

  // prevent unnecessary re-render
  if (renderKey === lastRenderKey) return;
  lastRenderKey = renderKey;

  let content = "";

  if (tab === "dashboard") content = dashboard();
  if (tab === "mvs") content = mvsView();
  if (tab === "fox") content = foxView();
  if (tab === "stats") content = statsView();
  if (tab === "terminal") content = terminalView();
  if (tab === "journal") content = journalView();

  document.getElementById("app").innerHTML = renderLayout(content);
};

// ===== DASHBOARD =====

function dashboard() {
  return `
    <div class="space-y-4 glow ${state.color} energy">

      <div class="text-lg">Wave: ${Math.round(state.wave)} (${state.mode})</div>
      <div>Integrity: ${Math.round(state.integrity)}</div>
      <div>Pressure: ${Math.round(state.pressure)}</div>
      <div>Level: ${state.level} | XP: ${state.xp}</div>

      <div class="border border-white/10 p-3 rounded">
        <div class="text-xs opacity-50">Today's Fox</div>
        <div class="text-lg">${state.daily?.fox || "None"}</div>
        <div class="text-sm">${state.daily?.completed ? "✔ Completed" : ""}</div>
      </div>

      <div class="border border-white/10 p-3 rounded">
        <div class="text-xs opacity-50 mb-2">AI Suggestion</div>
        <div>${state.suggestion || "Stabilize system first."}</div>
      </div>

      <button onclick="window.startAudit()" class="bg-white text-black px-3 py-1 rounded">
        Run Audit
      </button>

    </div>
  `;
}

// ===== MVS =====

function mvsView() {
  return `
    <div class="space-y-3">
      ${state.mvs.map((m, i) => `
        <div onclick="window.toggleMVS(${i})" class="cursor-pointer">
          ${m.done ? "✔" : "•"} ${m.task}
        </div>
      `).join("")}

      <button onclick="window.addMVS()" class="bg-white text-black px-3 py-1 rounded">
        Add Step
      </button>
    </div>
  `;
}

// ===== FOX =====

function foxView() {
  return `
    <div class="space-y-4 glow ${state.color}">

      <input 
        value="${state.daily?.fox || ""}" 
        placeholder="Set ONE target"
        class="bg-black border p-2 w-full rounded"
        onchange="window.setDailyFox(this.value)"
      >

      <button 
        onclick="window.completeDailyFox()" 
        class="bg-green-500 px-3 py-1 rounded"
      >
        Complete Target
      </button>

      <div class="text-sm opacity-60">
        Status: ${state.daily?.completed ? "✔ Completed" : "Pending"}
      </div>

    </div>
  `;
}

// ===== STATS =====

function statsView() {
  return `
    <div class="space-y-2 text-sm">
      <div>Achievements: ${state.achievements.join(", ")}</div>
      <div>Streak: ${state.streak}</div>
    </div>
  `;
}

// ===== TERMINAL =====

function terminalView() {
  return `
    <div class="space-y-2">
      <div id="terminal-output" class="text-sm h-48 overflow-y-auto border p-2 bg-black rounded"></div>

      <input 
        id="terminal-input"
        class="w-full bg-black border p-2 rounded"
        placeholder="/command"
        onkeydown="window.handleTerminal(event)"
      >
    </div>
  `;
}

// ===== JOURNAL =====

function journalView() {
  return `
    <div class="space-y-4">

      <textarea 
        id="journal-input"
        class="w-full bg-black border p-2 h-24 rounded"
        placeholder="Dump thoughts..."
      ></textarea>

      <button onclick="window.saveJournal()" class="bg-white text-black px-3 py-1 rounded">
        Save Entry
      </button>

      <div class="space-y-2 text-sm max-h-60 overflow-y-auto">
        ${state.journal?.map(j => `
          <div class="border border-white/10 p-2 rounded">
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
