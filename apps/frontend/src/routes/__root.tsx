import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

const RootLayout = () => {
    const router = useRouter();

    useEffect(() => {
        // Configure NProgress
        NProgress.configure({
            showSpinner: false,
            speed: 500,
            minimum: 0.08,
            trickleSpeed: 100,
        });

        // Custom CSS for black progress bar
        const style = document.createElement("style");
        style.textContent = `
      #nprogress .bar {
        background: #000000 !important;
        height: 3px !important;
      }
      #nprogress .peg {
        box-shadow: none !important;
      }
    `;
        document.head.appendChild(style);

        let timeoutId: NodeJS.Timeout | null = null;

        // Handle navigation start
        const handleNavigationStart = () => {
            // Delay showing progress bar to only show for slow connections
            timeoutId = setTimeout(() => {
                NProgress.start();
            }, 500);
        };

        // Handle navigation end
        const handleNavigationEnd = () => {
            // Clear the timeout if navigation completes before delay
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            NProgress.done();
        };

        // Listen to router events
        const unsubscribe = router.subscribe(
            "onBeforeLoad",
            handleNavigationStart
        );
        const unsubscribeEnd = router.subscribe("onLoad", handleNavigationEnd);

        return () => {
            unsubscribe();
            unsubscribeEnd();
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            document.head.removeChild(style);
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
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
