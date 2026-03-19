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

// === INIT FUNCTION ===
export function initState() {
  const saved = localStorage.getItem("architect_state");

  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.warn("State load failed");
    }
  }

  // auto save
  setInterval(() => {
    localStorage.setItem(
      "architect_state",
      JSON.stringify(state)
    );
  }, 3000);
}

// expose for debug safety
window.initState = initState;
