// Free, zero-backend pronunciation playback via the browser's built-in
// speechSynthesis API — no API key, no server round-trip. Deliberately does
// NOT attempt speech-recognition-based pronunciation scoring: STT quality
// for accent/pronunciation assessment (vs. plain transcription) isn't
// reliable enough to give honest feedback, so this module is playback-only.

let voicesReady = null;

function loadVoices() {
  if (voicesReady) return voicesReady;
  voicesReady = new Promise((resolve) => {
    if (!isSpeechSupported()) {
      resolve([]);
      return;
    }
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }
    // Voice list often loads asynchronously — Chrome fires 'voiceschanged'
    // once the OS/browser voice catalog is ready, sometimes only after a
    // short delay. Fall back to whatever's available after a timeout so a
    // slow/never-firing event can't hang the caller forever.
    const onChange = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onChange);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', onChange);
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onChange);
      resolve(window.speechSynthesis.getVoices());
    }, 1000);
  });
  return voicesReady;
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

// Resolves to a uk-UA voice if the browser/OS has one installed, otherwise
// null — callers use this to decide whether to show a speaker button at
// all, rather than fall back to a non-Ukrainian voice mispronouncing text.
export async function getUkrainianVoice() {
  const voices = await loadVoices();
  return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('uk')) || null;
}

export async function canSpeakUkrainian() {
  if (!isSpeechSupported()) return false;
  return (await getUkrainianVoice()) !== null;
}

// rate < 1 = slower than natural pace, a small concession to learners
// without distorting the word into something unrecognizable.
export async function speakUkrainian(text, { rate = 0.85 } = {}) {
  if (!isSpeechSupported() || !text) return false;
  const voice = await getUkrainianVoice();
  if (!voice) return false;

  window.speechSynthesis.cancel(); // don't stack overlapping utterances
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
  return true;
}
