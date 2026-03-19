import { registerModule } from "../core/state.js";

registerModule(function (state) {

  // HARD INTERVENTION
  if (state.wave > 90) {
    state.wave = 80;
    state.integrity -= 5;
  }

  // RECOVERY BOOST
  if (state.wave < 30) {
    state.integrity += 0.3;
  }

  // STUCK DETECTION
  const unfinished = state.mvs.filter(m => !m.done).length;

  if (unfinished > 5) {
    // force simplify
    state.mvs = state.mvs.slice(0, 3);
  }

});
