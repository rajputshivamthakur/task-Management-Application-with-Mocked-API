'use client';

import { useEffect, useState } from 'react';

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mswReady, setMswReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initMocks() {
      if (typeof window !== 'undefined') {
        try {
          const { worker } = await import('@/mocks/browser');
          
          // Start MSW with better configuration
          await worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
          });
          
          console.log('[MSW] Service worker started successfully');
          console.log('[MSW] Ready to intercept requests');
          setMswReady(true);
        } catch (err) {
          console.error('[MSW] Failed to start:', err);
          setError(err instanceof Error ? err.message : 'Failed to start MSW');
          // Still set ready to true to allow the app to work
          setMswReady(true);
        }
      }
    }

    initMocks();
  }, []);

  if (!mswReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Initializing Mock API...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            <p className="font-semibold">MSW Initialization Warning</p>
            <p className="text-sm mt-2">{error}</p>
            <p className="text-xs mt-2 text-muted-foreground">
              The app will continue, but mock APIs may not work.
            </p>
          </div>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}