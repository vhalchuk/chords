import { useState } from 'react';
import { Music, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen bg-background flex flex-col items-center justify-center p-8'>
      <div className='flex gap-8 mb-8'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <Music className='h-8 w-8' />
          <span className='text-lg font-medium'>Chords App</span>
        </div>
      </div>

      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='flex items-center justify-center gap-2'>
            <Heart className='h-6 w-6 text-red-500' />
            You Are My Sunshine
          </CardTitle>
          <CardDescription>
            A beautiful song with chords and lyrics
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='text-center'>
            <p className='text-sm text-muted-foreground mb-2'>
              Interactive Demo
            </p>
            <Button
              onClick={() => setCount(count => count + 1)}
              className='w-full'
            >
              Count is {count}
            </Button>
          </div>

          <div className='text-center text-sm text-muted-foreground'>
            <p>
              Edit{' '}
              <code className='bg-muted px-2 py-1 rounded text-xs'>
                src/App.tsx
              </code>{' '}
              and save to test HMR
            </p>
          </div>
        </CardContent>
      </Card>

      <div className='mt-8 text-center'>
        <p className='text-sm text-muted-foreground'>
          Built with React, TypeScript, Tailwind CSS, and Shadcn UI
        </p>
      </div>
    </div>
  );
}

export default App;
