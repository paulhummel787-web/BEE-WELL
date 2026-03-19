const state = {
  wave: 70,
  integrity: 50,
  personality: "architect",
  mvs: [],
  journal: [],
  daily: {
    fox: ""
  }
};

function initState() {
  const saved = localStorage.getItem("architect_state");

  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.warn("State load failed");
    }
  }

  setInterval(() => {
    localStorage.setItem(
      "architect_state",
      JSON.stringify(state)
    );
  }, 3000);
}

// 🔥 CRITICAL: attach to window (no import confusion)
window.state = state;
window.initState = initState;

// also export for modules
export { state, initState };
