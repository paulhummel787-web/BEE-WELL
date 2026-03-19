import { registerModule, state } from "../core/state.js";

// === INIT ===

function initAnalytics() {
  if (!state.metrics) {
    state.metrics = [];
  }
}

// === RECORD METRICS ===

let lastRecord = 0;

function recordMetrics() {
  const now = Date.now();

  if (now - lastRecord < 5000) return;

  state.metrics.push({
    time: new Date().toLocaleTimeString(),
    wave: state.wave,
    integrity: state.integrity,
    pressure: state.pressure
  });

  if (state.metrics.length > 50) {
    state.metrics.shift();
  }

  lastRecord = now;
}

// === PATTERN DETECTION ===

function detectPatterns() {
  if (state.metrics.length < 10) return;

  const last = state.metrics.slice(-10);

  const avgWave =
    last.reduce((sum, m) => sum + m.wave, 0) / last.length;

  const avgIntegrity =
    last.reduce((sum, m) => sum + m.integrity, 0) / last.length;

  // patterns
  if (avgWave > 75) {
    state.insight = "⚠ Sustained high stress detected.";
  } else if (avgWave < 40) {
    state.insight = "Low energy trend. Reduce load.";
  } else if (avgIntegrity > 70) {
    state.insight = "Strong stability trend.";
  }
}

// === OPEN ANALYTICS ===

window.openAnalytics = function () {
  renderAnalyticsOverlay();
};

// === RENDER ===

function renderAnalyticsOverlay() {
  const overlay = document.createElement("div");

  overlay.className =
    "fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-6";

  overlay.innerHTML = `
    <div class="w-full max-w-3xl">

      <div class="flex justify-between mb-4">
        <div class="text-xs opacity-50 uppercase">System Analytics</div>
        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-xs opacity-50">
          Close
        </button>
      </div>

      <canvas id="chart" height="150"></canvas>

      <div class="mt-6 text-sm opacity-70">
        ${state.insight || "No insight yet."}
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  drawChart();
}

// === DRAW CHART ===

function drawChart() {
  const ctx = document.getElementById("chart");
  if (!ctx) return;

  if (!window.Chart) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: state.metrics.map(m => m.time),
      datasets: [
        {
          label: "Wave",
          data: state.metrics.map(m => m.wave),
          borderColor: "#ef4444",
          tension: 0.3
        },
        {
          label: "Integrity",
          data: state.metrics.map(m => m.integrity),
          borderColor: "#818cf8",
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { min: 0, max: 100 }
      }
    }
  });
}

// === LOOP ===

registerModule(() => {
  initAnalytics();
  recordMetrics();
  detectPatterns();
});
