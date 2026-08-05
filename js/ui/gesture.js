// Pointer Events drag/swipe controller — unifies mouse, touch and pen with one code path.
const FLY_OFF = {
  up: 'translate(0, -140%) rotate(0deg)',
  down: 'translate(0, 140%) rotate(0deg)',
  left: 'translate(-140%, 0) rotate(-12deg)',
  right: 'translate(140%, 0) rotate(12deg)',
};

export function attachSwipeGesture(el, { onCommit, threshold = 70 } = {}) {
  let startX = 0;
  let startY = 0;
  let dx = 0;
  let dy = 0;
  let dragging = false;

  function onPointerDown(e) {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    el.setPointerCapture(e.pointerId);
    el.style.transition = '';
    el.classList.add('is-dragging');
  }

  function onPointerMove(e) {
    if (!dragging) return;
    dx = e.clientX - startX;
    dy = e.clientY - startY;
    el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.04}deg)`;
  }

  function positionFromDelta() {
    return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('is-dragging');
    const dist = Math.hypot(dx, dy);
    if (dist > threshold) {
      const position = positionFromDelta();
      el.style.transition = 'transform 220ms ease-in';
      el.style.transform = FLY_OFF[position];
      onCommit && onCommit(position);
    } else {
      el.style.transition = 'transform 180ms ease-out';
      el.style.transform = 'translate(0, 0) rotate(0deg)';
    }
    dx = 0;
    dy = 0;
  }

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointercancel', onPointerUp);

  return {
    reset() {
      el.style.transition = '';
      el.style.transform = 'translate(0, 0) rotate(0deg)';
    },
    destroy() {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    },
  };
}

const ARROW_TO_POSITION = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

// Keyboard fallback: same 4 positions, first-class input path (not an afterthought).
export function attachKeyboardNav(onCommit) {
  function handler(e) {
    const position = ARROW_TO_POSITION[e.key];
    if (!position) return;
    e.preventDefault();
    onCommit(position);
  }
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}
