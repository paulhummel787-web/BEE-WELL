import { state } from "./state.js";

const KEY = "architect_os_state";

// LOAD
export function loadState() {
  try {
    const saved = localStorage.getItem(KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    Object.assign(state, data);

  } catch (e) {
    console.error("Load failed", e);
  }
}

// SAVE
export function saveState() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Save failed", e);
  }
}
