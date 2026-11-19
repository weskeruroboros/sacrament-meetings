'use client';

import { Suspense, useSyncExternalStore } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

const emptySubscribe = () => () => {};

function formatCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Header() {
  const dateString = useSyncExternalStore(
    emptySubscribe,
    formatCurrentDate,
    () => ''
  );

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <Link href="/" className="text-xl font-bold hover:text-blue-200 transition">
            Sacrament Meeting Planner
          </Link>
          {dateString && (
            <p className="text-xs text-blue-200 mt-0.5">{dateString}</p>
          )}
        </div>
        <Suspense fallback={<div className="text-sm text-blue-200">Loading...</div>}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}