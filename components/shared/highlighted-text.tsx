/** Highlights specific phrases in gold within a text string */
export function HighlightedText({ text, highlights }: { text: string; highlights: string[] }) {
  let parts: { text: string; highlighted: boolean }[] = [{ text, highlighted: false }];

  for (const phrase of highlights) {
    const newParts: typeof parts = [];
    for (const part of parts) {
      if (part.highlighted) {
        newParts.push(part);
        continue;
      }
      const idx = part.text.indexOf(phrase);
      if (idx === -1) {
        newParts.push(part);
        continue;
      }
      if (idx > 0) newParts.push({ text: part.text.slice(0, idx), highlighted: false });
      newParts.push({ text: phrase, highlighted: true });
      if (idx + phrase.length < part.text.length)
        newParts.push({ text: part.text.slice(idx + phrase.length), highlighted: false });
    }
    parts = newParts;
  }

  return (
    <>
      {parts.map((part, i) =>
        part.highlighted ? (
          <span key={i} className="text-gold">{part.text}</span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}
