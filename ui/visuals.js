import { state } from "../core/state.js";

// APPLY VISUAL STATE
function applyVisuals() {

  const body = document.body;

  // reset classes
  body.classList.remove("blue","purple","yellow","red","green");
  body.classList.remove("low","steady","sharp","overloaded");

  // apply color
  body.classList.add(state.color);

  // apply mode
  body.classList.add(state.mode);

  // ambient glow
  const intensity = Math.round(state.wave);

  body.style.boxShadow = `
    inset 0 0 ${50 + intensity}px rgba(255,255,255,0.03)
  `;
}

// LOOP HOOK
setInterval(() => {
  applyVisuals();
}, 500);
