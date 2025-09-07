import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Song } from '@/types/song';
import songsData from '@/data/songs.json';
import { useMemo } from 'react';

export const Route = createFileRoute('/song/$songId')({
  component: SongDetail,
});

function SongDetail() {
  const { songId } = useParams({ from: '/song/$songId' });
  const navigate = useNavigate();

  const song = useMemo(() => {
    return songsData.find((s: Song) => s.id === songId);
  }, [songId]);

  const handleBackToHome = () => {
    navigate({ to: '/' });
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
        <Button onClick={handleBackToHome} variant='outline' className='mb-4'>
          ← Back to Songs
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>{song.title}</CardTitle>
            <CardDescription>{song.artist}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='whitespace-pre-line text-sm leading-relaxed'>
              {song.lyrics}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
