import { state, registerModule } from "../core/state.js";

function engine(state) {

  // ===== SOFT DRIFT (not chaotic) =====
  const target = 60; // natural baseline

  if (state.wave > target) {
    state.wave -= 0.2;
  } else {
    state.wave += 0.1;
  }

  // ===== CLAMP =====
  if (state.wave < 0) state.wave = 0;
  if (state.wave > 100) state.wave = 100;

  // ===== INTEGRITY REACTION =====
  if (state.wave > 80) {
    state.integrity -= 0.15;
  } else if (state.wave < 50) {
    state.integrity += 0.1;
  }

  if (state.integrity < 0) state.integrity = 0;
  if (state.integrity > 100) state.integrity = 100;
}

// plug into system
registerModule(engine);
