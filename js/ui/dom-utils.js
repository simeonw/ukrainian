// Was copy-pasted identically in lessons-ui.js, drill.js, and calibration-ui.js.
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
