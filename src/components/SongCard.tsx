import { Music, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Song } from '@/types/song';

interface SongCardProps {
  song: Song;
  onSelect?: (song: Song) => void;
}

export function SongCard({ song, onSelect }: SongCardProps) {
  const handleClick = () => {
    onSelect?.(song);
  };

  return (
    <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
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
        <div className='space-y-3'>
          <div className='text-sm text-muted-foreground line-clamp-2'>
            {song.lyrics.split('\n')[0]}...
          </div>

          <Button onClick={handleClick} className='w-full' size='sm'>
            View Song
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
