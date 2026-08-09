// Simple Levenshtein fuzzy string distance ratio — shared by drill.js
// (typed-translation rounds) and conjugation-drill.js (type-English test
// variant), extracted so both stay in sync with one implementation.
export function getFuzzyRatio(s1, s2) {
  const a = s1.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "");
  const b = s2.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "");

  if (a === b) return 1.0;

  const m = a.length;
  const n = b.length;
  if (m === 0 || n === 0) return 0.0;

  const d = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = (a[i - 1] === b[j - 1]) ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }
  return 1.0 - (d[m][n] / Math.max(m, n));
}
