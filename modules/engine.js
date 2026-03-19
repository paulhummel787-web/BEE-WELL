import { registerModule } from "../core/state.js";

function engine(state) {

  const target = 60;

  if (state.wave > target) state.wave -= 0.2;
  else state.wave += 0.1;

  if (state.wave > 80) state.integrity -= 0.2;
  else if (state.wave < 50) state.integrity += 0.1;

  state.wave = Math.max(0, Math.min(100, state.wave));
  state.integrity = Math.max(0, Math.min(100, state.integrity));
}

registerModule(engine);
