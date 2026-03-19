import { state } from "../core/state.js";
import { registerModule } from "../core/state.js";

const colorMap = {
  blue: "#3b82f6",
  purple: "#8b5cf6",
  yellow: "#facc15",
  red: "#ef4444",
  green: "#10b981"
};

registerModule(function () {
  const color = state.color;
  const hex = colorMap[color];

  // background tint
  document.body.style.background = `radial-gradient(circle at center, ${hex}15, #000000)`;

  // glow class
  document.body.classList.remove(
    "glow-blue",
    "glow-purple",
    "glow-yellow",
    "glow-red",
    "glow-green"
  );

  document.body.classList.add(`glow-${color}`);
});
