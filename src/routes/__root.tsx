import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Music, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RootLayout = () => {
  const location = useLocation();
  const isSongPage = location.pathname.startsWith('/song/');
  const isEditorPage = location.pathname === '/editor';

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header - only show on homepage */}
        {!isSongPage && !isEditorPage && (
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
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-6'>
              Discover and play your favorite songs with chords and lyrics.
            </p>
            <Link to='/editor'>
              <Button variant='outline'>
                <Edit className='h-4 w-4 mr-2' />
                Song Editor
              </Button>
            </Link>
          </div>
        )}

        {/* Main Content */}
        <Outlet />

        {/* Footer - only show on homepage */}
        {!isSongPage && !isEditorPage && (
          <div className='text-center text-sm text-muted-foreground mt-12'>
            <p>Built with React, TypeScript, Tailwind CSS, and Shadcn UI</p>
          </div>
        )}
      </div>

      {/* Dev Tools */}
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
