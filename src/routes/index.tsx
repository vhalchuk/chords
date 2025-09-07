import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { SongList } from '@/components/SongList';
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
    </div>
  );
}
