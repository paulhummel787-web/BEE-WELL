import { registerModule, state } from "../core/state.js";

// === INIT ===

if (!state.missions) {
  state.missions = {
    daily: [],
    completed: [],
    lastReset: new Date().toDateString(),
    xp: 0,
    level: 1
  };
}

// === GENERATE MISSIONS ===

function generateDaily() {
  const today = new Date().toDateString();

  if (state.missions.lastReset === today) return;

  state.missions.lastReset = today;

  state.missions.daily = [
    { id: 1, text: "Complete 1 MVS", done: false },
    { id: 2, text: "Lock a Fox target", done: false },
    { id: 3, text: "Run a reset (any)", done: false },
    { id: 4, text: "Log 1 journal entry", done: false }
  ];
}

// === TRACK COMPLETION ===

function checkCompletion() {
  // MVS
  if (state.mvs?.some(m => m.done)) {
    completeMission(1);
  }

  // FOX
  if (state.daily?.fox) {
    completeMission(2);
  }

  // JOURNAL
  if (state.journal?.length > 0) {
    completeMission(4);
  }
}

// === COMPLETE ===

function completeMission(id) {
  const m = state.missions.daily.find(x => x.id === id);

  if (!m || m.done) return;

  m.done = true;

  state.missions.xp += 10;

  checkLevelUp();
}

// === LEVEL SYSTEM ===

function checkLevelUp() {
  if (state.missions.xp >= state.missions.level * 50) {
    state.missions.level++;
    state.missions.xp = 0;

    spawnLevelUp();
  }
}

// === UI ===

window.openMissions = function () {
  const overlay = document.createElement("div");

  overlay.className =
    "fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-6";

  overlay.innerHTML = `
    <div class="glass w-full max-w-md">

      <div class="flex justify-between mb-4">
        <div class="text-xs uppercase opacity-50">Daily Missions</div>
        <button onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
      </div>

      <div class="space-y-2">
        ${state.missions.daily
          .map(
            m => `
          <div class="flex justify-between text-sm ${
            m.done ? "opacity-40 line-through" : ""
          }">
            <span>${m.text}</span>
            <span>${m.done ? "✓" : ""}</span>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="mt-6 text-xs opacity-60">
        Level ${state.missions.level} • XP ${state.missions.xp}
      </div>

    </div>
  `;

  document.body.appendChild(overlay);
};

// === LEVEL UP FX ===

function spawnLevelUp() {
  const el = document.createElement("div");

  el.className =
    "fixed inset-0 flex items-center justify-center text-3xl text-green-400 z-[9999]";

  el.innerText = "LEVEL UP";

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 2000);
}

// === LOOP ===

registerModule(() => {
  generateDaily();
  checkCompletion();
});
