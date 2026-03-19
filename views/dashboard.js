function getColor() {
  const w = state.wave;

  if (w < 25) return "#3b82f6";   // blue
  if (w < 45) return "#6366f1";   // indigo
  if (w < 65) return "#22c55e";   // green (STABLE ZONE)
  if (w < 80) return "#eab308";   // yellow
  if (w < 90) return "#f97316";   // orange
  return "#ef4444";               // red
}
