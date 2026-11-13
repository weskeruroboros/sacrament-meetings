'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4 mt-8">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 text-sm font-medium text-gray-700"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded-lg bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
          Previous
        </span>
      )}

      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 text-sm font-medium text-gray-700"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded-lg bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  );
}