import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">Meeting not found</h1>
      <p className="mt-2 text-sm">
        The sacrament meeting you are trying to edit could not be found. It may
        have been removed or the link may be invalid.
      </p>

      <div className="mt-6">
        <Link href="/meetings" className="underline">
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}