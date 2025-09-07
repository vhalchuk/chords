import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Minus,
  AArrowDown,
  AArrowUp,
  LetterText,
  ListMusic,
  MoreHorizontal,
} from 'lucide-react';
import type { Song } from '@/types/song';
import songsData from '@/data/songs.json';
import {
  parseLyricsWithChords,
  parseLyricsWithoutChords,
} from '@/lib/chordParser';
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

  const [showChords, setShowChords] = useState(() => {
    // Load from localStorage or use default (true = show chords)
    const saved = localStorage.getItem('chords-visibility');
    return saved ? saved === 'true' : true;
  });

  const [showSettings, setShowSettings] = useState(false);

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

  // Save chord visibility to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chords-visibility', showChords.toString());
  }, [showChords]);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showSettings && !target.closest('.settings-dropdown')) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSettings]);

  const song = useMemo(() => {
    return songsData.find((s: Song) => s.id === songId);
  }, [songId]);

  const parsedLyrics = useMemo(() => {
    if (!song) return [];

    // Split by double newlines to preserve verse/chorus boundaries
    const sections = song.lyrics.split('\n\n');

    return sections.map((section, sectionIndex) => (
      <div key={sectionIndex} className='mb-4'>
        {section.split('\n').map((line, lineIndex) => {
          if (showChords) {
            return parseLyricsWithChords(line, transpositionSemitones);
          } else if (line.startsWith('## ')) {
            return (
              <h2 key={lineIndex} className='font-bold text-foreground mb-2'>
                {line.substring(3)}
              </h2>
            );
          } else {
            const text = parseLyricsWithoutChords(line);
            return (
              <p key={lineIndex} className='mb-1'>
                {text || '\u00A0'}
              </p>
            );
          }
        })}
      </div>
    ));
  }, [song, transpositionSemitones, showChords]);

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
            <span className='hidden sm:inline'>← Back to Songs</span>
            <span className='sm:hidden'>←</span>
          </Button>

          {/* Controls Container */}
          <div className='flex items-center gap-3 sm:gap-6'>
            {/* Font Size Controls */}
            <div className='flex items-center'>
              <Button
                onClick={decreaseFontSize}
                variant='outline'
                size='sm'
                disabled={fontSize <= 10}
                className='rounded-r-none border-r-0'
              >
                <AArrowDown className='h-5 w-5' />
              </Button>
              <Button
                onClick={increaseFontSize}
                variant='outline'
                size='sm'
                disabled={fontSize >= 24}
                className='rounded-l-none'
              >
                <AArrowUp className='h-7 w-7' />
              </Button>
            </div>

            {/* Transposition Controls */}
            <div className='flex items-center'>
              <Button
                onClick={decreaseTransposition}
                variant='outline'
                size='sm'
                disabled={transpositionSemitones <= -12}
                className='rounded-r-none'
              >
                <Minus className='h-4 w-4' />
              </Button>

              {/* Transposition Display */}
              <div className='flex items-center justify-center text-foreground w-8 h-9 text-sm font-mono border-t border-b border-border bg-background'>
                {transpositionSemitones > 0 ? '+' : ''}
                {transpositionSemitones}
              </div>

              <Button
                onClick={increaseTransposition}
                variant='outline'
                size='sm'
                disabled={transpositionSemitones >= 12}
                className='rounded-l-none'
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>

            {/* Settings Dropdown */}
            <div className='relative settings-dropdown'>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  setShowSettings(!showSettings);
                }}
                variant='outline'
                size='sm'
                title='Settings'
              >
                <MoreHorizontal className='h-4 w-4' />
              </Button>

              {showSettings && (
                <div className='absolute right-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg z-10 min-w-48'>
                  <div className='p-2'>
                    <div className='text-sm font-medium text-foreground mb-2'>
                      Display Options
                    </div>
                    <div className='space-y-1'>
                      <button
                        onClick={() => {
                          setShowChords(false);
                          setShowSettings(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded text-sm flex items-center gap-2 ${
                          !showChords
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <LetterText className='h-4 w-4' />
                        Lyrics Only
                      </button>
                      <button
                        onClick={() => {
                          setShowChords(true);
                          setShowSettings(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded text-sm flex items-center gap-2 ${
                          showChords
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <ListMusic className='h-4 w-4' />
                        Lyrics with Chords
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Song Header */}
        <div className='text-center border-b pb-4 mb-6'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            {song.title}
          </h1>
          <p className='text-lg text-muted-foreground'>by {song.artist}</p>
        </div>

        <div className='leading-relaxed' style={{ fontSize: `${fontSize}px` }}>
          {parsedLyrics}
        </div>
      </div>
    </div>
  );
}
