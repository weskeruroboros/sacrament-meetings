import Link from 'next/link';
import type { SacramentMeeting } from '../lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
      <div>
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
            {meeting.meetingType}
          </span>
          <span className="text-sm font-medium text-gray-500">{meeting.date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mt-3">
          Sacrament Meeting &bull; {meeting.date}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Presiding:</span> {meeting.presiding} |{' '}
          <span className="font-medium">Conducting:</span> {meeting.conducting}
        </p>
      </div>
      <div>
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-medium text-sm"
        >
          View Full Program & Agenda
        </Link>
      </div>
    </div>
  );
}