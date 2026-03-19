import { state } from "../core/state.js";

window.triggerPanic = function () {
  state.wave = 90;

  const overlay = document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(120,0,0,0.95)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.color = "white";
  overlay.style.zIndex = "9999";

  overlay.innerHTML = `
    <h1 style="font-size:48px;margin-bottom:20px;">STOP</h1>
    <p style="margin-bottom:40px;">Breathe. You are safe.</p>
    <button onclick="this.parentElement.remove()" 
      style="padding:12px 24px;background:white;color:black;">
      Continue
    </button>
  `;

  document.body.appendChild(overlay);
};
