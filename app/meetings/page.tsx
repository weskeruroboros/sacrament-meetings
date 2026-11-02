import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sacrament Meeting Schedule</h2>
        <p className="text-sm text-gray-600">Select a meeting below to view or print the full agenda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}