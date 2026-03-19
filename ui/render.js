import { state } from "../core/state.js";
import { renderLayout, getTab } from "./layout.js";

// cache DOM instead of full replace
let mounted = false;

export function render() {
  window.renderApp();
}

window.renderApp = function () {
  const root = document.getElementById("app");
  const tab = getTab();

  // FIRST LOAD → full render
  if (!mounted) {
    root.innerHTML = renderLayout(getView(tab));
    mounted = true;
    return;
  }

  // UPDATE ONLY VALUES (NO REBUILD)
  updateDashboard();
};

// ===== VIEW SWITCH =====

function getView(tab) {
  if (tab === "dashboard") return dashboard();
  if (tab === "mvs") return mvsView();
  if (tab === "fox") return foxView();
  if (tab === "stats") return statsView();
  if (tab === "terminal") return terminalView();
  if (tab === "journal") return journalView();
  return dashboard();
}

// ===== DASHBOARD =====

function dashboard() {
  return `
    <div class="space-y-4 glow ${state.color} energy">

      <div class="text-lg">
        Wave: <span id="wave-val"></span>
        (<span id="mode-val"></span>)
      </div>

      <div>
        Integrity: <span id="integrity-val"></span>
      </div>

      <div>
        Pressure: <span id="pressure-val"></span>
      </div>

      <div>
        Level: <span id="level-val"></span> |
        XP: <span id="xp-val"></span>
      </div>

      <div class="border border-white/10 p-3 rounded">
        <div class="text-xs opacity-50">Today's Fox</div>
        <div id="fox-val" class="text-lg"></div>
        <div id="fox-status" class="text-sm"></div>
      </div>

      <div class="border border-white/10 p-3 rounded">
        <div class="text-xs opacity-50 mb-2">AI Suggestion</div>
        <div id="suggestion-val"></div>
      </div>

      <button onclick="window.startAudit()" class="bg-white text-black px-3 py-1 rounded">
        Run Audit
      </button>

    </div>
  `;
}

// ===== LIVE UPDATE (NO REFLOW) =====

function updateDashboard() {
  setText("wave-val", Math.round(state.wave));
  setText("mode-val", state.mode);
  setText("integrity-val", Math.round(state.integrity));
  setText("pressure-val", Math.round(state.pressure));
  setText("level-val", state.level);
  setText("xp-val", state.xp);

  setText("fox-val", state.daily?.fox || "None");
  setText("fox-status", state.daily?.completed ? "✔ Completed" : "");

  setText("suggestion-val", state.suggestion || "");
}

// helper
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && el.innerText !== String(value)) {
    el.innerText = value;
  }
}

// ===== OTHER VIEWS (unchanged) =====

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

function foxView() {
  return `
    <div class="space-y-4 glow ${state.color}">
      <input 
        value="${state.daily?.fox || ""}" 
        placeholder="Set ONE target"
        class="bg-black border p-2 w-full rounded"
        onchange="window.setDailyFox(this.value)"
      >

      <button onclick="window.completeDailyFox()" class="bg-green-500 px-3 py-1 rounded">
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
