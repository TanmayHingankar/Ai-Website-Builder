export default async function extractJson(raw) {
  if (!raw || typeof raw !== "string") return null;

  const candidates = [];

  // Find balanced JSON object candidates
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === "{") {
      let depth = 0;
      for (let j = i; j < raw.length; j++) {
        if (raw[j] === "{") depth++;
        else if (raw[j] === "}") depth--;
        if (depth === 0) {
          candidates.push(raw.slice(i, j + 1));
          i = j;
          break;
        }
      }
    }
  }

  // If none found, try arrays
  if (candidates.length === 0) {
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] === "[") {
        let depth = 0;
        for (let j = i; j < raw.length; j++) {
          if (raw[j] === "[") depth++;
          else if (raw[j] === "]") depth--;
          if (depth === 0) {
            candidates.push(raw.slice(i, j + 1));
            i = j;
            break;
          }
        }
      }
    }
  }

  // Try parsing candidates
  for (const c of candidates) {
    try {
      const parsed = JSON.parse(c);
      return parsed;
    } catch (e) {
      // ignore and try next
    }
  }

  // Fallback: regex attempt to capture first { ... }
  try {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) {
      return JSON.parse(m[0]);
    }
  } catch (e) {}

  return null;
}
