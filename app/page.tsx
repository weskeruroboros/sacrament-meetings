import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900">
        Welcome to Sacrament Meeting Planner
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        A streamlined tool for bishoprics and branch leaders to plan agendas, coordinate speakers, and review weekly programs.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Link
          href="/meetings"
          className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          View All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="bg-white border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          View Current Sunday Program
        </Link>
      </div>
    </div>
  );
}