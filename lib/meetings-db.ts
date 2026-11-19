import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                    AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                    AS "openingHymn",
      opening_prayer                  AS "openingPrayer",
      ward_business                   AS "wardBusiness",
      stake_business                  AS "stakeBusiness",
      sacrament_hymn                  AS "sacramentHymn",
      speakers,
      closing_hymn                    AS "closingHymn",
      closing_prayer                  AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                    AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                    AS "openingHymn",
      opening_prayer                  AS "openingPrayer",
      ward_business                   AS "wardBusiness",
      stake_business                  AS "stakeBusiness",
      sacrament_hymn                  AS "sacramentHymn",
      speakers,
      closing_hymn                    AS "closingHymn",
      closing_prayer                  AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getMeetingByDate(
  dateStr: string
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                    AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                    AS "openingHymn",
      opening_prayer                  AS "openingPrayer",
      ward_business                   AS "wardBusiness",
      stake_business                  AS "stakeBusiness",
      sacrament_hymn                  AS "sacramentHymn",
      speakers,
      closing_hymn                    AS "closingHymn",
      closing_prayer                  AS "closingPrayer"
    FROM meetings WHERE to_char(date, 'YYYY-MM-DD') = ${dateStr}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const speakersJson = JSON.stringify(data.speakers ?? []);

  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date}::date,
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? null},
      ${data.openingHymn ?? null},
      ${data.openingPrayer ?? null},
      ${data.wardBusiness ?? null},
      ${data.stakeBusiness ?? null},
      ${data.sacramentHymn ?? null},
      ${speakersJson}::jsonb,
      ${data.closingHymn ?? null},
      ${data.closingPrayer ?? null}
    )
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                    AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                    AS "openingHymn",
      opening_prayer                  AS "openingPrayer",
      ward_business                   AS "wardBusiness",
      stake_business                  AS "stakeBusiness",
      sacrament_hymn                  AS "sacramentHymn",
      speakers,
      closing_hymn                    AS "closingHymn",
      closing_prayer                  AS "closingPrayer"
  `;

  return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<Omit<SacramentMeeting, 'id'>>
): Promise<SacramentMeeting | null> {
  const existing = await getMeetingById(id);
  if (!existing) {
    return null;
  }

  const next = {
    date: updates.date ?? existing.date,
    meetingType: updates.meetingType ?? existing.meetingType,
    presiding: updates.presiding ?? existing.presiding,
    conducting: updates.conducting ?? existing.conducting,
    announcements:
      updates.announcements !== undefined
        ? updates.announcements
        : existing.announcements,
    openingHymn:
      updates.openingHymn !== undefined
        ? updates.openingHymn
        : existing.openingHymn,
    openingPrayer:
      updates.openingPrayer !== undefined
        ? updates.openingPrayer
        : existing.openingPrayer,
    wardBusiness:
      updates.wardBusiness !== undefined
        ? updates.wardBusiness
        : existing.wardBusiness,
    stakeBusiness:
      updates.stakeBusiness !== undefined
        ? updates.stakeBusiness
        : existing.stakeBusiness,
    sacramentHymn:
      updates.sacramentHymn !== undefined
        ? updates.sacramentHymn
        : existing.sacramentHymn,
    speakers:
      updates.speakers !== undefined ? updates.speakers : existing.speakers,
    closingHymn:
      updates.closingHymn !== undefined
        ? updates.closingHymn
        : existing.closingHymn,
    closingPrayer:
      updates.closingPrayer !== undefined
        ? updates.closingPrayer
        : existing.closingPrayer,
  };

  const speakersJson = JSON.stringify(next.speakers ?? []);

  const rows = await sql`
    UPDATE meetings
    SET
      date = ${next.date}::date,
      meeting_type = ${next.meetingType},
      presiding = ${next.presiding},
      conducting = ${next.conducting},
      announcements = ${next.announcements ?? null},
      opening_hymn = ${next.openingHymn ?? null},
      opening_prayer = ${next.openingPrayer ?? null},
      ward_business = ${next.wardBusiness ?? null},
      stake_business = ${next.stakeBusiness ?? null},
      sacrament_hymn = ${next.sacramentHymn ?? null},
      speakers = ${speakersJson}::jsonb,
      closing_hymn = ${next.closingHymn ?? null},
      closing_prayer = ${next.closingPrayer ?? null}
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                    AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                    AS "openingHymn",
      opening_prayer                  AS "openingPrayer",
      ward_business                   AS "wardBusiness",
      stake_business                  AS "stakeBusiness",
      sacrament_hymn                  AS "sacramentHymn",
      speakers,
      closing_hymn                    AS "closingHymn",
      closing_prayer                  AS "closingPrayer"
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}