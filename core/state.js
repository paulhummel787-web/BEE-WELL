// === GLOBAL STATE ===
export const state = {
  wave: 70,
  integrity: 50,
  personality: "architect",
  mvs: [],
  journal: [],
  daily: {
    fox: ""
  }
};

// === INIT ===
export function initState() {
  const saved = localStorage.getItem("architect_state");

  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }

  // auto save loop
  setInterval(() => {
    localStorage.setItem(
      "architect_state",
      JSON.stringify(state)
    );
  }, 3000);
}

// === SETTERS ===
window.setPersonality = function (p) {
  state.personality = p;
};
