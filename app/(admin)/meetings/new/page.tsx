import Link from 'next/link';
import { CreateMeetingForm } from '@/components/CreateMeetingForm';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <Link href="/meetings" className="text-sm underline">
          &larr; Back to Meetings
        </Link>
        <h1 className="mt-2 text-2xl font-bold">New Sacrament Meeting</h1>
      </div>

      <CreateMeetingForm />
    </main>
  );
}