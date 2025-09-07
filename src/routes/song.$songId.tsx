import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Type } from 'lucide-react';
import type { Song } from '@/types/song';
import songsData from '@/data/songs.json';
import { parseLyricsWithChords } from '@/lib/chordParser';
import { useMemo, useState, useEffect } from 'react';

export const Route = createFileRoute('/song/$songId')({
  component: SongDetail,
});

function SongDetail() {
  const { songId } = useParams({ from: '/song/$songId' });
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('chords-font-size');
    return saved ? parseInt(saved, 10) : 14;
  });

  const [transpositionSemitones, setTranspositionSemitones] = useState(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('chords-transposition');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save font size to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chords-font-size', fontSize.toString());
  }, [fontSize]);

  // Save transposition to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'chords-transposition',
      transpositionSemitones.toString()
    );
  }, [transpositionSemitones]);

  const song = useMemo(() => {
    return songsData.find((s: Song) => s.id === songId);
  }, [songId]);

  const parsedLyrics = useMemo(() => {
    if (!song) return [];

    // Split by double newlines to preserve verse/chorus boundaries
    const sections = song.lyrics.split('\n\n');

    return sections.map((section, sectionIndex) => (
      <div key={sectionIndex} className='mb-4'>
        {section.split('\n').map((line, lineIndex) => (
          <div key={lineIndex}>
            {parseLyricsWithChords(line, transpositionSemitones)}
          </div>
        ))}
      </div>
    ));
  }, [song, transpositionSemitones]);

  const handleBackToHome = () => {
    navigate({ to: '/' });
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 10)); // Min 10px
  };

  const increaseTransposition = () => {
    setTranspositionSemitones(prev => Math.min(prev + 1, 12)); // Max +12 semitones
  };

  const decreaseTransposition = () => {
    setTranspositionSemitones(prev => Math.max(prev - 1, -12)); // Min -12 semitones
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24)); // Max 24px
  };

  if (!song) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-semibold mb-4'>Song Not Found</h2>
        <p className='text-muted-foreground mb-6'>
          The song you're looking for doesn't exist.
        </p>
        <Button onClick={handleBackToHome}>← Back to Songs</Button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <Button onClick={handleBackToHome} variant='outline'>
            ← Back to Songs
          </Button>

          {/* Controls Container */}
          <div className='flex items-center gap-6'>
            {/* Font Size Controls */}
            <div className='flex items-center gap-2'>
              <Button
                onClick={decreaseFontSize}
                variant='outline'
                size='sm'
                disabled={fontSize <= 10}
              >
                <Minus className='h-4 w-4' />
              </Button>

              {/* Dynamic Type Icon */}
              <div className='flex items-center justify-center text-muted-foreground w-8 h-8'>
                <Type
                  style={{
                    fontSize: `${Math.max(fontSize * 0.8, 8)}px`,
                    width: `${Math.max(fontSize * 0.8, 8)}px`,
                    height: `${Math.max(fontSize * 0.8, 8)}px`,
                  }}
                />
              </div>

              <Button
                onClick={increaseFontSize}
                variant='outline'
                size='sm'
                disabled={fontSize >= 24}
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>

            {/* Transposition Controls */}
            <div className='flex items-center gap-2'>
              <Button
                onClick={decreaseTransposition}
                variant='outline'
                size='sm'
                disabled={transpositionSemitones <= -12}
              >
                <Minus className='h-4 w-4' />
              </Button>

              {/* Transposition Display */}
              <div className='flex items-center justify-center text-muted-foreground w-8 h-8 text-sm font-mono'>
                {transpositionSemitones >= 0 ? '+' : ''}
                {transpositionSemitones}
              </div>

              <Button
                onClick={increaseTransposition}
                variant='outline'
                size='sm'
                disabled={transpositionSemitones >= 12}
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        <div className='leading-relaxed' style={{ fontSize: `${fontSize}px` }}>
          {parsedLyrics}
        </div>
      </div>
    </div>
  );
}
