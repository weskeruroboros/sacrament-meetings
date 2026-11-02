import { Suspense } from 'react';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function MeetingDetailContent({ id }: { id: string }) {
  const numericId = parseInt(id, 10);
  const meeting = isNaN(numericId) ? null : await getMeetingById(numericId);

  if (!meeting) {
    return (
      <div className="bg-white shadow rounded-lg p-8 border text-center space-y-4">
        <h2 className="text-xl font-semibold text-red-600">Meeting Not Found</h2>
        <p className="text-gray-600">The meeting you are looking for does not exist or has been removed.</p>
        <Link 
          href="/meetings" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium text-sm"
        >
          Back to Meetings
        </Link>
      </div>
    );
  }

  return <MeetingDetail meeting={meeting} />;
}

export default async function MeetingPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <div className="space-y-6">
      <div>
        <Link 
          href="/meetings" 
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          &larr; Back to all meetings
        </Link>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading meeting details...</div>}>
        <MeetingDetailContent id={id} />
      </Suspense>
    </div>
  );
}