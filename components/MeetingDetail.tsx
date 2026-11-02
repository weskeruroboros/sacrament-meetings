'use client';

import type { SacramentMeeting } from '../lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="bg-white shadow rounded-lg border p-8 space-y-8 print:shadow-none print:border-none">
      {/* Header Info */}
      <div className="border-b pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
            {meeting.meetingType} Meeting
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">Riverdale Ward Program</h2>
          <p className="text-gray-600 text-sm mt-1">Date: {meeting.date}</p>
        </div>
        <button
          onClick={() => window.print()}
          className="print:hidden bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded transition"
        >
          🖨️ Print Program
        </button>
      </div>

      {/* Leadership */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">Presiding</p>
          <p className="text-gray-900 font-medium">{meeting.presiding}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">Conducting</p>
          <p className="text-gray-900 font-medium">{meeting.conducting}</p>
        </div>
      </div>

      {/* Announcements */}
      {meeting.announcements && meeting.announcements.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-md font-bold text-gray-900 border-b pb-1">Announcements</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {meeting.announcements.map((ann, idx) => (
              <li key={idx}>{ann}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Agenda Items */}
      <div className="space-y-4 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Opening Hymn (Hymn #{meeting.openingHymn.number})</span>
          <span className="text-gray-900 italic">&ldquo;{meeting.openingHymn.title}&rdquo;</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Opening Prayer</span>
          <span className="text-gray-900">{meeting.openingPrayer}</span>
        </div>

        {meeting.wardBusiness.length > 0 && (
          <div className="border-b pb-2 space-y-1">
            <span className="font-semibold text-gray-700 block">Ward Business</span>
            <ul className="list-disc list-inside pl-2 text-gray-900">
              {meeting.wardBusiness.map((item, idx) => (
                <li key={idx}>{item.description}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Sacrament Hymn (Hymn #{meeting.sacramentHymn.number})</span>
          <span className="text-gray-900 italic">&ldquo;{meeting.sacramentHymn.title}&rdquo;</span>
        </div>

        <div className="text-center py-2 bg-blue-50/50 rounded text-xs text-blue-800 font-medium uppercase tracking-wider">
          Administration of the Sacrament
        </div>

        {/* Speakers / Musical Numbers */}
        {meeting.speakers.length > 0 && (
          <div className="space-y-3 border-b pb-4">
            <span className="font-semibold text-gray-700 block">Speakers &amp; Musical Numbers</span>
            <div className="space-y-2 pl-2">
              {meeting.speakers.map((speaker, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <div>
                    <p className="font-medium text-gray-900">{speaker.name}</p>
                    {speaker.topic && <p className="text-xs text-gray-500">Topic: {speaker.topic}</p>}
                  </div>
                  <span className="text-xs uppercase bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-semibold">
                    {speaker.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Closing Hymn (Hymn #{meeting.closingHymn.number})</span>
          <span className="text-gray-900 italic">&ldquo;{meeting.closingHymn.title}&rdquo;</span>
        </div>

        <div className="flex justify-between pb-2">
          <span className="font-semibold text-gray-700">Closing Prayer</span>
          <span className="text-gray-900">{meeting.closingPrayer}</span>
        </div>
      </div>
    </div>
  );
}