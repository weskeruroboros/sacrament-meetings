import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EditMeetingForm } from '@/components/EditMeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <Link href="/meetings" className="text-sm underline">
          &larr; Back to Meetings
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Edit Sacrament Meeting</h1>
      </div>

      <EditMeetingForm meeting={meeting} />
    </main>
  );
}