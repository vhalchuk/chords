import { Music, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { parseLyricsWithChords } from '@/lib/chordParser';
import type { Song } from '@/types/song';

interface SongCardProps {
  song: Song;
  onSelect?: (song: Song) => void;
}

export function SongCard({ song, onSelect }: SongCardProps) {
  const handleClick = () => {
    onSelect?.(song);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Get first line of lyrics for preview
  const firstLine = song.lyrics.split('\n')[0];

  return (
    <Card
      className='hover:shadow-lg transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role='button'
      aria-label={`View song: ${song.title} by ${song.artist}`}
    >
      <CardHeader className='pb-3'>
        <div className='flex items-start gap-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Music className='h-5 w-5 text-primary' />
          </div>
          <div className='flex-1 min-w-0'>
            <CardTitle className='text-lg leading-tight'>
              {song.title}
            </CardTitle>
            <CardDescription className='flex items-center gap-1 mt-1'>
              <User className='h-3 w-3' />
              {song.artist}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-0'>
        <div className='text-sm text-muted-foreground line-clamp-2'>
          {parseLyricsWithChords(firstLine)}...
        </div>
      </CardContent>
    </Card>
  );
}
