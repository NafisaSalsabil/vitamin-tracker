export type TextSegment = { text: string; bold: boolean };
export type ParsedBullet = { segments: TextSegment[] };

/**
 * Parses a Gemini response containing "*   **Bold:** text" style bullets
 * (with or without real newlines between them) into structured bullets,
 * each broken into bold/non-bold text segments.
 */
export function parseMarkdownBullets(raw: string): {
  intro: string;
  bullets: ParsedBullet[];
  outro: string;
} {
  if (!raw) return { intro: '', bullets: [], outro: '' };

  // Normalize: some responses come back with real \n, others don't.
  // Split on a bullet marker: "*" followed by spaces then "**" (bold start),
  // which is how Gemini formats each list item.
  const bulletMarker = /\*\s+(?=\*\*)/g;

  const firstMarkerIndex = raw.search(bulletMarker);
  const intro = firstMarkerIndex > 0 ? raw.slice(0, firstMarkerIndex).trim() : '';
  const rest = firstMarkerIndex >= 0 ? raw.slice(firstMarkerIndex) : raw;

  const rawBullets = rest
    .split(bulletMarker)
    .map((b) => b.trim())
    .filter(Boolean);

  // The last "bullet" often contains the closing disclaimer sentence
  // tacked on after the list — split it off if it doesn't start with **
  let outro = '';
  const cleanedBullets = rawBullets.filter((b, i) => {
    if (i === rawBullets.length - 1 && !b.startsWith('**')) {
      outro = b;
      return false;
    }
    return true;
  });

  const bullets: ParsedBullet[] = cleanedBullets.map((bulletText) => ({
    segments: parseBoldSegments(bulletText),
  }));

  return { intro, bullets, outro };
}

function parseBoldSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }
  return segments;
}