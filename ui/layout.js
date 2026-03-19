import { state } from "../core/state.js";

let currentTab = "dashboard";

export function renderLayout(inner) {

  return `
  <div class="max-w-4xl mx-auto space-y-6">

    <div class="flex gap-4 text-xs uppercase opacity-60 flex-wrap">
      ${tabBtn("dashboard")}
      ${tabBtn("mvs")}
      ${tabBtn("fox")}
      ${tabBtn("stats")}
      ${tabBtn("terminal")}
      ${tabBtn("journal")}
    </div>

    <div class="border border-white/10 p-4 rounded">
      ${inner}
    </div>

  </div>
  `;
}

function tabBtn(name) {
  return `
    <button 
      onclick="window.switchTab('${name}')"
      class="${currentTab === name ? 'opacity-100 underline' : 'opacity-40'}"
    >
      ${name}
    </button>
  `;
}

window.switchTab = function (t) {
  currentTab = t;
  window.renderApp();
};

export function getTab() {
  return currentTab;
}
