export function renderLayout(content) {
  return `
    <div style="display:flex;height:100vh;">

      <div style="
        width:200px;
        background:#111;
        padding:20px;
      ">
        <button onclick="go('dashboard')">Dashboard</button><br><br>
        <button onclick="go('mvs')">MVS</button><br><br>
        <button onclick="go('journal')">Journal</button>
      </div>

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
