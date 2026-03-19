export function renderLayout(content) {
  return `
    <div style="display:flex;height:100vh;">

      <!-- SIDEBAR -->
      <div style="
        width:200px;
        background:#111;
        padding:20px;
        border-right:1px solid rgba(255,255,255,0.1);
      ">

        <h2 style="margin-bottom:20px;">Architect</h2>

        <button onclick="go('dashboard')" style="display:block;margin-bottom:10px;">
          Dashboard
        </button>

        <button onclick="go('mvs')" style="display:block;margin-bottom:10px;">
          MVS
        </button>

        <button onclick="go('journal')" style="display:block;">
          Journal
        </button>

      </div>

      <!-- CONTENT -->
      <div style="flex:1;padding:20px;">
        ${content}
      </div>

    </div>
  `;
}

export function getTab() {
  return window.currentTab || "dashboard";
}

window.go = function(tab) {
  window.currentTab = tab;
};
