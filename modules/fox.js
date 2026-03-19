import { registerModule, state } from "../core/state.js";

function today() {
  return new Date().toDateString();
}

// INIT
if (!state.daily) {
  state.daily = {
    date: today(),
    fox: null,
    completed: false
  };
}

// RESET DAILY
function checkReset() {
  if (state.daily.date !== today()) {
    state.daily = {
      date: today(),
      fox: null,
      completed: false
    };
  }
}

// COMPLETE FOX
function completeFox() {
  if (!state.daily.fox || state.daily.completed) return;

  state.daily.completed = true;

  // rewards
  state.integrity += 15;
  state.xp += 15;

  // streak
  state.streak = (state.streak || 0) + 1;

  // achievement
  if (state.streak === 3) state.achievements.push("3 Day Streak");
  if (state.streak === 7) state.achievements.push("7 Day Streak");
}

// SET FOX
function setFox(task) {
  state.daily.fox = task;
  state.daily.completed = false;
}

// expose
window.setDailyFox = setFox;
window.completeDailyFox = completeFox;

// MODULE LOOP
registerModule(() => {
  checkReset();
});
