import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getFilteredMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const [totalPages, meetings] = await Promise.all([
    getMeetingsTotalPages(query),
    getFilteredMeetings(query, currentPage),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sacrament Meeting Schedule</h2>
        <p className="text-sm text-gray-600">Select a meeting below to view or print the full agenda.</p>
      </div>

      <Suspense fallback={<div className="h-10 bg-gray-100 rounded-lg animate-pulse" />}>
        <MeetingSearch />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-8">No meetings found.</p>
        ) : (
          meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        )}
      </div>

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}