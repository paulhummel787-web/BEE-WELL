import { state } from "../core/state.js";

function getColor() {
  const w = state.wave;

  if (w < 30) return "BLUE";
  if (w < 50) return "PURPLE";
  if (w < 70) return "YELLOW";
  if (w < 85) return "RED";
  return "GREEN";
}

function getGuidance() {
  const w = state.wave;
  const i = state.integrity;

  if (w < 30) return "Reduce input.";
  if (w > 85 && i < 40) return "Overload risk.";
  if (w > 70 && i > 60) return "Execute.";
  return "Stable.";
}

const hud = document.createElement("div");
hud.style.position = "fixed";
hud.style.top = "10px";
hud.style.right = "10px";
hud.style.fontSize = "12px";
hud.style.opacity = "0.7";

document.body.appendChild(hud);

function updateHUD() {
  hud.innerText =
    getColor() +
    " | " +
    getGuidance();
}

setInterval(updateHUD, 1000);
