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
  ChevronDown,
  ChevronUp,
  Edit,
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
    const saved = localStorage.getItem(`chords-transposition-${songId}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [showChords, setShowChords] = useState(() => {
    // Load from localStorage or use default (true = show chords)
    const saved = localStorage.getItem('chords-visibility');
    return saved ? saved === 'true' : true;
  });

  const [showExpandedControls, setShowExpandedControls] = useState(false);
  const [capoPosition, setCapoPosition] = useState(() => {
    // Load from localStorage or use default (0 = no capo)
    const saved = localStorage.getItem(`chords-capo-${songId}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save font size to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chords-font-size', fontSize.toString());
  }, [fontSize]);

  // Save transposition to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `chords-transposition-${songId}`,
      transpositionSemitones.toString()
    );
  }, [transpositionSemitones, songId]);

  // Save chord visibility to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chords-visibility', showChords.toString());
  }, [showChords]);

  // Save capo position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`chords-capo-${songId}`, capoPosition.toString());
  }, [capoPosition, songId]);

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
        <div className='flex items-start justify-between mb-4'>
          <Button onClick={handleBackToHome} variant='outline'>
            <span className='hidden sm:inline'>← Back to Songs</span>
            <span className='sm:hidden'>←</span>
          </Button>

          {/* Controls Container */}
          <div className='flex flex-col gap-3'>
            {/* First Row - Main Controls */}
            <div className='flex items-center gap-3 sm:gap-6'>
              {/* Transposition Controls - Only show when chords are visible */}
              {showChords && (
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
              )}

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

              {/* Expand Button */}
              <Button
                onClick={() => setShowExpandedControls(!showExpandedControls)}
                variant='outline'
                size='sm'
                title={
                  showExpandedControls
                    ? 'Hide more controls'
                    : 'Show more controls'
                }
              >
                {showExpandedControls ? (
                  <ChevronUp className='h-4 w-4' />
                ) : (
                  <ChevronDown className='h-4 w-4' />
                )}
              </Button>
            </div>

            {/* Second Row - Expanded Controls */}
            {showExpandedControls && (
              <div className='flex items-center gap-3 sm:gap-6 justify-end'>
                {/* Capo Dropdown - Only show when chords are visible */}
                {showChords && (
                  <div className='relative'>
                    <select
                      value={capoPosition}
                      onChange={e =>
                        setCapoPosition(parseInt(e.target.value, 10))
                      }
                      className='appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
                    >
                      <option value={0}>No Capo</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          Capo {num}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
                  </div>
                )}

                {/* Chord Visibility Toggle */}
                <div className='flex items-center'>
                  <Button
                    onClick={() => setShowChords(false)}
                    variant={!showChords ? 'default' : 'outline'}
                    size='sm'
                    title='Show lyrics only'
                    className='rounded-r-none border-r-0'
                  >
                    <LetterText className='h-4 w-4' />
                  </Button>
                  <Button
                    onClick={() => setShowChords(true)}
                    variant={showChords ? 'default' : 'outline'}
                    size='sm'
                    title='Show lyrics with chords'
                    className='rounded-l-none'
                  >
                    <ListMusic className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}
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

        {/* Editor Button */}
        <div className='mt-8 pt-6 border-t'>
          <div className='flex justify-center'>
            <Button
              onClick={() => navigate({ to: '/editor' })}
              variant='outline'
              className='flex items-center gap-2'
            >
              <Edit className='h-4 w-4' />
              Edit Song
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
