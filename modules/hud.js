let currentTab = "dashboard";

export function getTab() {
  return currentTab;
}

window.switchTab = function (t) {
  currentTab = t;
  window.renderApp();
};

export function renderLayout(content) {
  return `
    <div class="max-w-4xl mx-auto space-y-6">

      <div class="flex gap-4 text-sm opacity-60 flex-wrap">

        <button onclick="switchTab('dashboard')">Home</button>
        <button onclick="switchTab('mvs')">MVS</button>
        <button onclick="switchTab('fox')">Fox</button>
        <button onclick="switchTab('stats')">Stats</button>
        <button onclick="switchTab('terminal')">Terminal</button>
        <button onclick="switchTab('journal')">Journal</button>

        <button onclick="openBook()" class="text-indigo-400">
          Book
        </button>

        <button onclick="openAnchor()" class="text-purple-400">
          Anchor
        </button>

        <button onclick="triggerPanic()" class="text-red-500 font-bold">
          PANIC
        </button>

      </div>

      <div id="view">
        ${content}
      </div>

    </div>
  `;
}
