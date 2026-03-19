import { registerModule, state } from "../core/state.js";

// === INIT ===

if (!state.predictor) {
  state.predictor = {
    warning: "",
    riskLevel: 0
  };
}

// === DETECTION ===

function analyzeTrends() {
  if (!state.metrics || state.metrics.length < 10) return;

  const last = state.metrics.slice(-10);

  const waveTrend =
    last[last.length - 1].wave - last[0].wave;

  const integrityTrend =
    last[last.length - 1].integrity - last[0].integrity;

  // === RISK CALC ===

  let risk = 0;

  if (waveTrend > 15) risk += 2;
  if (integrityTrend < -10) risk += 2;
  if (state.wave > 80) risk += 2;
  if (state.integrity < 40) risk += 2;

  state.predictor.riskLevel = risk;

  // === WARNINGS ===

  if (risk >= 6) {
    state.predictor.warning =
      "⚠ Crash likely. Reduce load immediately.";
  } else if (risk >= 4) {
    state.predictor.warning =
      "⚠ Instability rising. Slow down.";
  } else {
    state.predictor.warning = "";
  }
}

// === APPLY ===

function applyPrediction() {
  if (state.predictor.warning) {
    state.suggestion =
      "PREDICT → " + state.predictor.warning;
  }
}

// === LOOP ===

registerModule(() => {
  analyzeTrends();
  applyPrediction();
});
