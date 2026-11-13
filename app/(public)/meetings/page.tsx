import Link from 'next/link';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  const meetings = await getMeetings(query, currentPage);
  const totalPages = await getMeetingsTotalPages(query);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">All Sacrament Meetings</h1>
        
        {/* Search Bar */}
        <div className="w-full md:w-auto">
          <form method="GET" className="flex gap-2">
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder="Search presiding, speakers..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Meetings Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presiding</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conducting</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meeting.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{meeting.meetingType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{meeting.presiding}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{meeting.conducting}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/meetings/${meeting.id}`} className="text-blue-600 hover:text-blue-900 font-semibold">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {meetings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 py-12">
                  No sacrament meetings found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Links */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 items-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/meetings?query=${encodeURIComponent(query)}&page=${p}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                p === currentPage
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}