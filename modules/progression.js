import { registerModule } from "../core/state.js";

const achievements = [
  { id: "first_step", check: s => s.mvs.some(m => m.done) },
  { id: "5_steps", check: s => s.mvs.filter(m => m.done).length >= 5 },
  { id: "focus_set", check: s => !!s.fox },
  { id: "high_integrity", check: s => s.integrity > 80 },
  { id: "recovered", check: s => s.wave < 40 && s.integrity > 60 }
];

function unlock(state, id) {
  if (!state.achievements.includes(id)) {
    state.achievements.push(id);
    state.xp += 10;
    notify(`Achievement unlocked: ${id}`);
  }
}

function notify(msg) {
  const el = document.createElement("div");
  el.className = "fixed bottom-4 right-4 bg-white text-black px-4 py-2 text-sm";
  el.innerText = msg;
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 3000);
}

registerModule(function (state) {

  // Achievement checks
  achievements.forEach(a => {
    if (a.check(state)) unlock(state, a.id);
  });

  // XP → LEVEL
  if (state.xp > state.level * 50) {
    state.level++;
    state.xp = 0;
    notify(`Level Up → ${state.level}`);
  }

  // STREAK SYSTEM
  const today = new Date().toDateString();

  if (state.last !== today) {
    state.streak++;
    state.last = today;
  }

});
