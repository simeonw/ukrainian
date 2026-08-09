// Install-to-homescreen support, mirroring apps/mail's footer.php pattern —
// adapted for a static SPA (no server templating, so sw.js/manifest.json
// are plain files instead of PHP-generated routes).
let deferredPrompt = null;
let installAvailable = false;
const listeners = new Set();

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}
function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function isMobile() {
  return isIos() || /android/i.test(navigator.userAgent);
}

function notify() {
  listeners.forEach((fn) => fn());
}

// Subscribe to availability changes (fires after beforeinstallprompt/appinstalled,
// which can land after the Home screen has already rendered).
export function onInstallAvailabilityChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

let initialized = false;
export function initPwaInstall() {
  if (initialized) return;
  initialized = true;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/apps/ukrainian/sw.js', { scope: '/apps/ukrainian/' }).catch(() => {});
  }

  // iOS has no beforeinstallprompt API at all — if it's not already
  // installed, always offer the (manual, Share-sheet) install path.
  if (isIos() && !isStandalone()) {
    installAvailable = true;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installAvailable = true;
    notify();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    installAvailable = false;
    notify();
  });
}

export function canInstall() {
  return installAvailable && !isStandalone();
}

const NUDGE_DISMISS_KEY = 'ukrainian_pwa_nudge_dismissed';
export function shouldShowNudge() {
  return canInstall() && isMobile() && !sessionStorage.getItem(NUDGE_DISMISS_KEY);
}
export function dismissNudge() {
  sessionStorage.setItem(NUDGE_DISMISS_KEY, '1');
}

// Returns 'native' (Android/Chrome prompt shown), 'ios-tip' (caller should
// show the Share-sheet instructions), or 'none'.
export function triggerInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
    return 'native';
  }
  if (isIos()) return 'ios-tip';
  return 'none';
}
