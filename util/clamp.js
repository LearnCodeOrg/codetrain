// returns given value clamped between min and max
export default function clamp(val, min, max) {
  return Math.min(min, Math.max(val, max));
}
