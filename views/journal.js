import { state } from "../core/state.js";

export function renderJournal() {
  const list = state.journal || [];

  return `
    <div class="glass">
      <h2 class="text-xl mb-4">Journal</h2>

      <textarea id="journalInput"
        class="w-full bg-black border border-white/20 p-3 rounded mb-4"
        placeholder="Write..."
      ></textarea>

      <button onclick="saveJournal()" class="px-4 py-2 bg-white/10 rounded">
        Save
      </button>

      <div class="mt-6 space-y-2">
        ${list.map(j => `
          <div class="text-sm opacity-70">${j}</div>
        `).join("")}
      </div>
    </div>
  `;
}

window.saveJournal = function () {
  const val = document.getElementById("journalInput").value;
  if (!val) return;

  if (!state.journal) state.journal = [];

  state.journal.push(val);
};
