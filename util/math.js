// returns given value clamped between min and max
export function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

// returns whether given value is between min and max
export function between(val, min, max) {
  return val >= min && val <= max;
}
