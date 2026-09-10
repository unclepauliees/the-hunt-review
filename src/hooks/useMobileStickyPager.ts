import { useEffect } from "react";

type SnapTarget = {
  y: number;
  id: string;
};

const MOBILE_QUERY = "(max-width: 767px), (pointer: coarse)";
const INTERACTIVE_IGNORE = ".gallery-detail, .export-cluster, [data-gallery-close]";

function clampScrollY(y: number) {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.max(0, Math.min(max, y));
}

function collectSnapTargets(): SnapTarget[] {
  const targets: SnapTarget[] = [];
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > [data-act-index]"));

  sections.forEach((section) => {
    const top = clampScrollY(window.scrollY + section.getBoundingClientRect().top);
    const id = section.id || `act-${section.dataset.actIndex ?? targets.length}`;
    targets.push({ y: top, id });

    if (!section.classList.contains("carousel-act")) return;

    const cardCount = section.querySelectorAll(".carousel-progress .stamp").length;
    const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
    if (cardCount < 2 || scrollRange < 80) return;

    for (let index = 1; index < cardCount; index += 1) {
      targets.push({
        y: clampScrollY(top + scrollRange * (index / cardCount)),
        id: `${id}-card-${index + 1}`,
      });
    }
  });

  return targets
    .sort((a, b) => a.y - b.y)
    .filter((target, index, sorted) => index === 0 || Math.abs(target.y - sorted[index - 1].y) > 12);
}

function nearestTarget(targets: SnapTarget[], y: number) {
  return targets.reduce((closest, target) => (
    Math.abs(target.y - y) < Math.abs(closest.y - y) ? target : closest
  ), targets[0]);
}

export function useMobileStickyPager() {
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches || reducedMotion.matches) return;

    let touchStart: { x: number; y: number } | null = null;
    let touchStartScrollY = 0;
    let touchDirection = 0;
    let wheelStartScrollY: number | null = null;
    let wheelDirection = 0;
    let snapTimer = 0;
    let settleTimer = 0;
    let isProgrammatic = false;

    const shouldIgnoreTarget = (target: EventTarget | null) => (
      target instanceof Element && target.closest(INTERACTIVE_IGNORE)
    );

    const selectTarget = (direction: number, startY: number | null) => {
      const targets = collectSnapTargets();
      if (!targets.length) return null;

      const currentY = window.scrollY;
      if (direction > 0 && startY !== null) {
        return targets.find((target) => target.y > startY + 24) ?? targets[targets.length - 1];
      }
      if (direction < 0 && startY !== null) {
        return [...targets].reverse().find((target) => target.y < startY - 24) ?? targets[0];
      }
      return nearestTarget(targets, currentY);
    };

    const snapToTarget = (direction: number, startY: number | null) => {
      const target = selectTarget(direction, startY);
      if (!target || Math.abs(window.scrollY - target.y) < 4) return;

      isProgrammatic = true;
      window.scrollTo({ top: target.y, behavior: "smooth" });
      window.setTimeout(() => { isProgrammatic = false; }, 520);
    };

    const settleToTarget = (direction: number, startY: number | null) => {
      const target = selectTarget(direction, startY);
      if (!target) return;

      const snap = () => {
        isProgrammatic = true;
        window.scrollTo({ top: target.y, behavior: "smooth" });
        window.setTimeout(() => { isProgrammatic = false; }, 520);
      };

      snap();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(snap, 260);
    };

    const queueSnap = (direction: number, startY: number | null, delay = 130) => {
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => snapToTarget(direction, startY), delay);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (shouldIgnoreTarget(event.target)) return;
      const touch = event.touches[0];
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
      touchStartScrollY = window.scrollY;
      touchDirection = 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStart || shouldIgnoreTarget(event.target)) return;
      const touch = event.touches[0];
      if (!touch) return;

      const dx = touch.clientX - touchStart.x;
      const dy = touchStart.y - touch.clientY;
      if (Math.abs(dy) < 10 || Math.abs(dy) <= Math.abs(dx)) return;

      touchDirection = dy > 0 ? 1 : -1;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!touchStart || shouldIgnoreTarget(event.target)) return;
      const endY = event.changedTouches[0]?.clientY ?? touchStart.y;
      const deltaY = touchStart.y - endY;
      touchStart = null;

      if (Math.abs(deltaY) < 34) {
        queueSnap(0, null, 160);
        return;
      }

      touchDirection = deltaY > 0 ? 1 : -1;
      settleToTarget(touchDirection, touchStartScrollY);
    };

    const handleWheel = (event: WheelEvent) => {
      if (shouldIgnoreTarget(event.target) || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (wheelStartScrollY === null) wheelStartScrollY = window.scrollY;
      wheelDirection = event.deltaY > 0 ? 1 : -1;
      queueSnap(wheelDirection, wheelStartScrollY, 180);
    };

    const handleScroll = () => {
      if (isProgrammatic) return;
      if (touchDirection) queueSnap(touchDirection, touchStartScrollY, 120);
      if (wheelDirection && wheelStartScrollY !== null) queueSnap(wheelDirection, wheelStartScrollY, 120);
    };

    const resetWheel = () => {
      wheelStartScrollY = null;
      wheelDirection = 0;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", resetWheel);

    return () => {
      window.clearTimeout(snapTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", resetWheel);
    };
  }, []);
}
