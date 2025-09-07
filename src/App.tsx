import { useState } from 'react';
import { Music, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SongList } from '@/components/SongList';
import type { Song } from '@/types/song';
import songsData from '@/data/songs.json';

function App() {
  const [songs] = useState<Song[]>(songsData);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
  };

  const handleBackToHome = () => {
    setSelectedSong(null);
  };

  if (selectedSong) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='container mx-auto px-4 py-8'>
          <div className='mb-6'>
            <Button
              onClick={handleBackToHome}
              variant='outline'
              className='mb-4'
            >
              ← Back to Songs
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className='text-2xl'>{selectedSong.title}</CardTitle>
                <CardDescription>{selectedSong.artist}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='whitespace-pre-line text-sm leading-relaxed'>
                  {selectedSong.lyrics}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-primary/10 rounded-xl'>
              <Music className='h-8 w-8 text-primary' />
            </div>
            <h1 className='text-4xl font-bold'>Chords App</h1>
          </div>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Discover and play your favorite songs with chords and lyrics.
            Perfect for musicians and music lovers.
          </p>
        </div>

        {/* Search Bar */}
        <div className='max-w-md mx-auto mb-8'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <input
              type='text'
              placeholder='Search songs...'
              className='w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
            />
          </div>
        </div>

        {/* Songs Grid */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            Available Songs ({songs.length})
          </h2>
          <SongList songs={songs} onSongSelect={handleSongSelect} />
        </div>

        {/* Footer */}
        <div className='text-center text-sm text-muted-foreground'>
          <p>Built with React, TypeScript, Tailwind CSS, and Shadcn UI</p>
        </div>
      </div>
    </div>
  );
}

export default App;
