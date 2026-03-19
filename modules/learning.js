import { registerModule } from "../core/state.js";

// Internal memory (lightweight learning layer)
const memory = {
  waveHistory: [],
  integrityHistory: [],
  lastModes: [],
  patterns: {}
};

function record(state) {
  memory.waveHistory.push(state.wave);
  memory.integrityHistory.push(state.integrity);
  memory.lastModes.push(state.mode);

  if (memory.waveHistory.length > 20) memory.waveHistory.shift();
  if (memory.integrityHistory.length > 20) memory.integrityHistory.shift();
  if (memory.lastModes.length > 20) memory.lastModes.shift();
}

function detectTrends() {
  if (memory.waveHistory.length < 5) return null;

  const recent = memory.waveHistory.slice(-5);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;

  return avg;
}

function detectModeLoop() {
  const last = memory.lastModes.slice(-5);

  const counts = {};
  last.forEach(m => counts[m] = (counts[m] || 0) + 1);

  for (let k in counts) {
    if (counts[k] >= 4) return k;
  }

  return null;
}

function learnPattern(key) {
  memory.patterns[key] = (memory.patterns[key] || 0) + 1;
}

registerModule(function (state) {

  // RECORD
  record(state);

  // TREND DETECTION
  const trend = detectTrends();

  if (trend !== null) {
    if (trend > 75) {
      learnPattern("high_wave_cluster");
    }
    if (trend < 35) {
      learnPattern("low_wave_cluster");
    }
  }

  // LOOP DETECTION
  const loop = detectModeLoop();

  if (loop === "overloaded") {
    state.integrity -= 0.5;

    // force simplify system
    state.mvs = state.mvs.slice(0, 2);
  }

  if (loop === "low") {
    state.integrity += 0.3;
  }

  // PATTERN RESPONSE
  if (memory.patterns["high_wave_cluster"] > 3) {
    // pre-empt overload
    if (state.wave > 70) {
      state.wave -= 2;
    }
  }

  if (memory.patterns["low_wave_cluster"] > 3) {
    // recovery bias
    state.integrity += 0.2;
  }

});
