import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Music } from 'lucide-react';

const RootLayout = () => (
  <div className='min-h-screen bg-background'>
    <div className='container mx-auto px-4 py-8'>
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

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <div className='text-center text-sm text-muted-foreground mt-12'>
        <p>Built with React, TypeScript, Tailwind CSS, and Shadcn UI</p>
      </div>
    </div>

    {/* Dev Tools */}
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({
  component: RootLayout,
});
