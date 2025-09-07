import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { Search, Music, Edit } from 'lucide-react';
import { SongList } from '@/components/SongList';
import { Button } from '@/components/ui/button';
import type { Song } from '@/types/song';
import songsData from '@/data/songs.json';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [songs] = useState<Song[]>(songsData);
  const navigate = useNavigate();

  const handleSongSelect = (song: Song) => {
    navigate({ to: '/song/$songId', params: { songId: song.id } });
  };

  return (
    <div>
      {/* Header */}
      <div className='text-center mb-8'>
        <Link
          to='/'
          className='flex items-center justify-center gap-3 mb-4 no-underline'
        >
          <div className='p-3 bg-primary/10 rounded-xl'>
            <Music className='h-8 w-8 text-primary' />
          </div>
          <h1 className='text-4xl font-bold text-foreground'>Chords App</h1>
        </Link>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Discover and play your favorite songs with chords and lyrics.
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
      <div className='text-center text-sm text-muted-foreground mt-12 space-y-4'>
        <div>
          <Link to='/editor'>
            <Button variant='outline' size='sm'>
              <Edit className='h-4 w-4 mr-2' />
              Song Editor
            </Button>
          </Link>
        </div>
        <p>Built with React, TypeScript, Tailwind CSS, and Shadcn UI</p>
      </div>
    </div>
  );
}
