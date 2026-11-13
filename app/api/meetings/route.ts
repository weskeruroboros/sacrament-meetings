import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || url.searchParams.get('date') || '';

  const meetings = await getMeetings(query);
  return Response.json(meetings);
}