import { state } from "../core/state.js";

export function runEngine() {
  // wave auto regulation
  if (state.wave > 50) state.wave -= 0.2;
  else state.wave += 0.1;

  if (state.wave < 0) state.wave = 0;
  if (state.wave > 100) state.wave = 100;

  // integrity passive drift
  if (!state.integrity) state.integrity = 50;

  if (state.wave > 80) state.integrity -= 0.1;
  else state.integrity += 0.05;

  if (state.integrity < 0) state.integrity = 0;
  if (state.integrity > 100) state.integrity = 100;
}

// run loop
setInterval(runEngine, 2000);
