import React from 'react';

/**
 * Parses lyrics with chord notation and returns JSX with styled chords
 * Chords are denoted by square brackets: [C], [Am], [F], etc.
 */
export function parseLyricsWithChords(lyrics: string): React.ReactNode[] {
  // Regex to match chords in square brackets
  const chordRegex = /\[([^\]]+)\]/g;
  const parts = lyrics.split(chordRegex);

  const result: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Even indices are text parts
      if (parts[i]) {
        result.push(parts[i]);
      }
    } else {
      // Odd indices are chord parts
      result.push(
        <span
          key={`chord-${i}`}
          className='inline-block px-2 py-1 mx-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20'
        >
          {parts[i]}
        </span>
      );
    }
  }

  return result;
}
