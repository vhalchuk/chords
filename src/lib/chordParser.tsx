import React from 'react';
import { transposeLine } from './chordTransposer';

/**
 * Parses lyrics with chord notation and returns JSX with styled chords
 * Chords are denoted by square brackets: [C], [Am], [F], etc.
 * @param lyrics The lyrics string with chord notation
 * @param transpositionSemitones Number of semitones to transpose chords (default: 0)
 */
export function parseLyricsWithChords(
  lyrics: string,
  transpositionSemitones: number = 0
): React.ReactNode[] {
  // Apply transposition to the lyrics line
  const transposedLyrics =
    transpositionSemitones !== 0
      ? transposeLine(lyrics, transpositionSemitones)
      : lyrics;

  // Regex to match chords in square brackets
  const chordRegex = /\[([^\]]+)\]/g;
  const parts = transposedLyrics.split(chordRegex);

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
          className='inline-block bg-primary/10 text-primary border border-primary/20'
          style={{
            fontSize: '0.75em',
            padding: '0.1em 0.5em',
            borderRadius: '0.625em',
          }}
        >
          {parts[i]}
        </span>
      );
    }
  }

  return result;
}

/**
 * Parses lyrics and returns plain text without chord notation
 * Removes all chord brackets: [C], [Am], [F], etc.
 * @param lyrics The lyrics string with chord notation
 * @returns Plain text lyrics without chords
 */
export function parseLyricsWithoutChords(lyrics: string): string {
  // Remove all chord notation (square brackets and their contents)
  return lyrics.replace(/\[([^\]]+)\]/g, '');
}
