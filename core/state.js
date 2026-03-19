// ===== GLOBAL STATE =====
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

// ===== MODULE REGISTRY =====
const modules = [];

// allow modules to register themselves
export function registerModule(fn) {
  modules.push(fn);
}

// ===== INIT =====
function initState() {
  const saved = localStorage.getItem("architect_state");

  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.warn("State load failed");
    }
  }

  // run all registered modules
  setInterval(() => {
    modules.forEach(fn => {
      try {
        fn(state);
      } catch (e) {
        console.warn("Module error:", e);
      }
    });

    localStorage.setItem(
      "architect_state",
      JSON.stringify(state)
    );

  }, 2000);
}

// ===== GLOBAL ACCESS =====
window.state = state;
window.initState = initState;

// ===== EXPORTS =====
export { state, initState };
