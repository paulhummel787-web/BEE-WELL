import { registerModule, state } from "../core/state.js";

const journal = [];

// LOAD from state if exists
if (state.journal) {
  state.journal.forEach(e => journal.push(e));
} else {
  state.journal = journal;
}

function addEntry(text) {
  const entry = {
    text,
    time: new Date().toLocaleString()
  };

  journal.push(entry);
  state.journal = journal;
}

// expose
window.addJournal = addEntry;
window.getJournal = () => journal;

// register (passive module for future expansion)
registerModule(function () {});
