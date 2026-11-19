'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type MeetingsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8" role="alert">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm">
        {error.message || 'We could not load or save the sacrament meeting data.'}
      </p>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded border px-4 py-2 font-medium"
        >
          Try Again
        </button>
        <Link href="/meetings" className="underline">
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}