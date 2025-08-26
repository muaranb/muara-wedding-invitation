// utils/smoothScroll.ts

export function smoothScrollTo(targetY: number, duration: number = 1000) {
  if (typeof window === "undefined") return;

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function animationStep(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeInOutQuad
    const easeInOutQuad = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + distance * easeInOutQuad);

    if (elapsed < duration) {
      window.requestAnimationFrame(animationStep);
    }
  }

  window.requestAnimationFrame(animationStep);
}
