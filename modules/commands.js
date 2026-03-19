import { registerModule, state } from "../core/state.js";

// command history (simple)
const history = [];

function runCommand(input) {
  const parts = input.trim().split(" ");
  const cmd = parts[0];
  const args = parts.slice(1);

  history.push(input);

  switch (cmd) {

    case "/help":
      return "Commands: /wave [0-100], /audit, /fox [task], /clear";

    case "/wave":
      const w = parseInt(args[0]);
      if (!isNaN(w)) {
        state.wave = Math.max(0, Math.min(100, w));
        return "Wave set to " + state.wave;
      }
      return "Invalid wave value";

    case "/audit":
      window.startAudit();
      return "Audit started";

    case "/fox":
      state.fox = args.join(" ");
      return "Fox set";

    case "/clear":
      window.clearTerminal();
      return "";

    default:
      return "Unknown command";
  }
}

// expose globally
window.runCommand = runCommand;
window.commandHistory = history;

// no loop logic needed, but keeps module registered
registerModule(function () {});
