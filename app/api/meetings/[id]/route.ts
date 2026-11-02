import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return Response.json({ error: 'Invalid ID parameter' }, { status: 400 });
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return Response.json({ error: 'Meeting not found' }, { status: 404 });
  }

  return Response.json(meeting);
}