import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Copy, ArrowLeft, Check, Trash2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import TextareaAutosize from 'react-textarea-autosize';
import { parseLyricsWithChords } from '@/lib/chordParser';

export const Route = createFileRoute('/editor')({
  component: Editor,
});

function Editor() {
  const navigate = useNavigate();
  const [songData, setSongData] = useState(() => {
    // Load from localStorage or use default values
    const saved = localStorage.getItem('song-editor-data');
    return saved
      ? JSON.parse(saved)
      : {
          id: '',
          title: '',
          artist: '',
          lyrics: '',
        };
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const handleInputChange = (field: keyof typeof songData, value: string) => {
    setSongData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save to localStorage whenever songData changes
  useEffect(() => {
    localStorage.setItem('song-editor-data', JSON.stringify(songData));
  }, [songData]);

  const handleClearAll = () => {
    setSongData({
      id: '',
      title: '',
      artist: '',
      lyrics: '',
    });
    setIsCleared(true);
    // Reset the cleared state after 2 seconds
    setTimeout(() => setIsCleared(false), 2000);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(songData, null, 2));
      setIsCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  const handleBackToHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-4'>
          <Button onClick={handleBackToHome} variant='outline'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Songs
          </Button>
          <h1 className='text-3xl font-bold'>Song Editor</h1>
        </div>
        <Button
          onClick={handleClearAll}
          variant={isCleared ? 'default' : 'outline'}
          size='sm'
        >
          {isCleared ? (
            <Check className='h-4 w-4 mr-2' />
          ) : (
            <Trash2 className='h-4 w-4 mr-2' />
          )}
          {isCleared ? 'Cleared!' : 'Clear All'}
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Left Column - Form */}
        <Card>
          <CardHeader>
            <CardTitle>Song Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label htmlFor='id' className='block text-sm font-medium mb-2'>
                Song ID
              </label>
              <input
                id='id'
                type='text'
                value={songData.id}
                onChange={e => handleInputChange('id', e.target.value)}
                placeholder='e.g., my-song-id'
                className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>

            <div>
              <label htmlFor='title' className='block text-sm font-medium mb-2'>
                Title
              </label>
              <input
                id='title'
                type='text'
                value={songData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                placeholder='e.g., My Amazing Song'
                className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>

            <div>
              <label
                htmlFor='artist'
                className='block text-sm font-medium mb-2'
              >
                Artist
              </label>
              <input
                id='artist'
                type='text'
                value={songData.artist}
                onChange={e => handleInputChange('artist', e.target.value)}
                placeholder='e.g., John Doe'
                className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>

            <div>
              <label
                htmlFor='lyrics'
                className='block text-sm font-medium mb-2'
              >
                Lyrics (with chords)
              </label>
              <TextareaAutosize
                id='lyrics'
                value={songData.lyrics}
                onChange={e => handleInputChange('lyrics', e.target.value)}
                placeholder='Enter lyrics with chords in square brackets, e.g., [C] Hello world [G] this is a song'
                minRows={8}
                maxRows={28}
                className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none'
              />
              <p className='text-sm text-muted-foreground mt-2'>
                Use square brackets for chords: [C], [Am], [F], [G], etc.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Song Preview */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Song Preview</CardTitle>
              <Button
                onClick={handleCopyJson}
                size='sm'
                variant={isCopied ? 'default' : 'outline'}
              >
                {isCopied ? (
                  <Check className='h-4 w-4 mr-2' />
                ) : (
                  <Copy className='h-4 w-4 mr-2' />
                )}
                {isCopied ? 'Copied!' : 'Copy JSON'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {songData.title || songData.artist || songData.lyrics ? (
              <div className='space-y-4'>
                {/* Song Header */}
                {(songData.title || songData.artist) && (
                  <div className='text-center border-b pb-4'>
                    {songData.title && (
                      <h3 className='text-xl font-bold text-foreground mb-2'>
                        {songData.title}
                      </h3>
                    )}
                    {songData.artist && (
                      <p className='text-muted-foreground'>
                        by {songData.artist}
                      </p>
                    )}
                  </div>
                )}

                {/* Song Lyrics Preview */}
                {songData.lyrics && (
                  <div className='leading-relaxed'>
                    {songData.lyrics
                      .split('\n\n')
                      .map((section, sectionIndex) => (
                        <div key={sectionIndex} className='mb-4'>
                          {section.split('\n').map(line => {
                            const parsed = parseLyricsWithChords(line);
                            return parsed;
                          })}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <div className='text-center text-muted-foreground py-8'>
                <p>Start typing to see your song preview...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
