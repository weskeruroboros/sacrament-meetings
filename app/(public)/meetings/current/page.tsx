import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetingByDate } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  const sundayIso = `${year}-${month}-${day}`;

  const meeting = await getMeetingByDate(sundayIso);

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Current Week's Meeting</h1>
      <p className="text-gray-600">
        No sacrament meeting found for this week ({sundayIso}). Please check your database seed dates or view <a href="/meetings" className="text-blue-600 underline">All Meetings</a>.
      </p>
    </main>
  );
}