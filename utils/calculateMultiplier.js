export function calculateMultiplier(tokenHolding) {
  const c = 70;
  return 1 + (Math.log10(tokenHolding + 1) * c) / 100;
}
