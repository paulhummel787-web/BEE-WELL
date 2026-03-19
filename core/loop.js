import { state, modules } from "./state.js";
import { render } from "../ui/render.js";
import { saveState, loadState } from "./storage.js";

// LOAD ON START
loadState();

function updateWave() {
  state.wave += state.wave > 50 ? -0.4 : 0.2;
  state.wave = Math.max(0, Math.min(100, state.wave));
}

function updateMode() {
  const w = state.wave;
  const i = state.integrity;

  if (w < 30) state.mode = "low";
  else if (w > 80 && i < 40) state.mode = "overloaded";
  else if (w > 70 && i > 60) state.mode = "sharp";
  else state.mode = "steady";
}

function updateColor() {
  if (state.wave < 30) state.color = "blue";
  else if (state.wave < 50) state.color = "purple";
  else if (state.wave < 70) state.color = "yellow";
  else if (state.wave < 85) state.color = "red";
  else state.color = "green";
}

function updatePressure() {
  state.pressure += state.wave > 80 ? 1 : -0.3;
  state.pressure = Math.max(0, state.pressure);
}

function loop() {
  updateWave();
  updateMode();
  updateColor();
  updatePressure();

  modules.forEach(m => {
    try { m(state); } catch (e) { console.error(e); }
  });

  render();

  // AUTO SAVE
  saveState();
}

setInterval(loop, 3000);
