import { registerModule } from "../core/state.js";

function addStep(state, task) {
  if (!state.mvs.some(m => m.task === task)) {
    state.mvs.push({ task, done: false });
  }
}

registerModule(function (state) {

  if (state.mode === "low") {
    addStep(state, "Drink water");
    addStep(state, "Stand up");
  }

  if (state.mode === "overloaded") {
    addStep(state, "Breathe slowly");
    addStep(state, "Reduce input");
  }

  if (state.mode === "sharp" && state.mvs.length === 0) {
    addStep(state, "Start main task");
  }

});
