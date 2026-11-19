import { deleteMeeting } from '@/lib/actions';
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
      <div className="space-y-2">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-medium text-sm"
        >
          View Full Program & Agenda
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="flex-1 text-center rounded border border-gray-300 text-gray-700 py-1.5 px-3 rounded hover:bg-gray-50 transition font-medium text-sm"
          >
            Edit
          </Link>

          <form action={deleteMeeting.bind(null, meeting.id)} className="flex-1">
            <button
              type="submit"
              className="w-full rounded border border-red-300 text-red-700 py-1.5 px-3 hover:bg-red-50 transition font-medium text-sm"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}