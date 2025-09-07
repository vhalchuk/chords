import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Main Content */}
        <Outlet />
      </div>

      {/* Dev Tools */}
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
