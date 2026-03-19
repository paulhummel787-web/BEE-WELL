import { registerModule } from "../core/state.js";

registerModule(function (state) {

  // PANIC CONTROL
  if (state.pressure > 10) {
    state.wave = 90;
    state.pressure = 0;
  }

  // MODE BEHAVIOR
  if (state.mode === "low") {
    state.integrity += 0.1;
  }

  if (state.mode === "overloaded") {
    state.integrity -= 0.2;
  }

  if (state.mode === "sharp") {
    state.integrity += 0.2;

    if (!state.fox) {
      state.fox = "Define main task";
    }
  }

});
