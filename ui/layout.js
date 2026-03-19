let currentTab = "dashboard";

export function getTab() {
  return currentTab;
}

window.switchTab = function (t) {
  currentTab = t;
  window.renderApp();
};

// === OS LAYOUT ===

export function renderLayout(content) {
  return `
  <div class="flex h-screen">

    <!-- SIDEBAR -->
    <div class="w-56 bg-black/40 border-r border-white/10 p-4 flex flex-col">

      <div class="text-sm font-bold mb-6 opacity-70">
        ARCHITECT OS
      </div>

      <nav class="flex flex-col gap-2 text-sm">

        ${navBtn("dashboard", "Home")}
        ${navBtn("mvs", "MVS")}
        ${navBtn("fox", "Fox")}
        ${navBtn("stats", "Stats")}
        ${navBtn("terminal", "Terminal")}
        ${navBtn("journal", "Journal")}

        <div class="h-px bg-white/10 my-2"></div>

        <button onclick="openMissions()" class="text-left opacity-70 hover:opacity-100">
          Missions
        </button>

        <button onclick="openAnalytics()" class="text-left opacity-70 hover:opacity-100">
          Analytics
        </button>

        <button onclick="openAnchor()" class="text-left text-purple-400">
          Anchor
        </button>

        <button onclick="openBook()" class="text-left text-indigo-400">
          Book
        </button>

        <button onclick="triggerPanic()" class="text-left text-red-500 font-bold mt-4">
          PANIC
        </button>

      </nav>

      <!-- PERSONALITY -->
      <div class="mt-auto">
        <select 
          onchange="setPersonality(this.value)"
          class="w-full bg-black border border-white/20 text-xs px-2 py-2 rounded"
        >
          <option value="architect">Architect</option>
          <option value="coach">Coach</option>
          <option value="calm">Calm</option>
        </select>
      </div>

    </div>

    <!-- MAIN -->
    <div class="flex-1 p-6 overflow-y-auto">

      <div class="max-w-5xl mx-auto fade-in">
        ${content}
      </div>

    </div>

  </div>
  `;
}

// === NAV BUTTON ===

function navBtn(id, label) {
  const active = currentTab === id
    ? "opacity-100 text-indigo-400"
    : "opacity-50";

  return `
    <button 
      onclick="switchTab('${id}')"
      class="text-left ${active} hover:opacity-100"
    >
      ${label}
    </button>
  `;
}
