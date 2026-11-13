import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' },
      { name: 'Brother Johnson', topic: 'Following the Savior', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10', 'Youth conference next Saturday']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Bishop Smith',
    openingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    openingPrayer: 'Brother Garcia',
    wardBusiness: [{ description: 'Release of Relief Society counselor' }],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [],
    closingHymn: { number: 193, title: 'I Stand All Amazed' },
    closingPrayer: 'Sister Martinez',
    announcements: ['Fast and testimony meeting guidelines']
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'President Taylor',
    conducting: 'Brother Clark',
    openingHymn: { number: 67, title: 'Glory to God on High' },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humble Prayer' },
    speakers: [
      { name: 'Elder White', topic: 'Missionary Service', type: 'speaker' }
    ],
    closingHymn: { number: 252, title: 'Put Your Shoulder to the Wheel' },
    closingPrayer: 'Brother Lee',
    announcements: ['Ward service project on Saturday at 9 AM']
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'Stake President Young',
    conducting: 'Stake President Young',
    openingHymn: { number: 33, title: 'Our Mountain Home' },
    openingPrayer: 'Stake High Councilor',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      { name: 'Sister Jensen', topic: 'Covenant Path', type: 'speaker' },
      { name: 'President Young', topic: 'Unity in Christ', type: 'speaker' }
    ],
    closingHymn: { number: 27, title: 'Praise to the Man' },
    closingPrayer: 'Stake Relief Society President',
    announcements: ['Stake Conference evening session tonight']
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Robinson',
    wardBusiness: [{ description: 'Welcome new move-ins' }],
    stakeBusiness: false,
    sacramentHymn: { number: 196, title: 'Jesus, Once of Humble Birth' },
    speakers: [
      { name: 'Brother Adams', topic: 'Personal Revelation', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'God Be With You Till We Meet Again' },
    closingPrayer: 'Sister Clark',
    announcements: ['Ward BBQ on Friday']
  }
];

const ITEMS_PER_PAGE = 5;

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter(m => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}

// Helper to filter meetings by query (matching presiding, conducting, or speakers)
function filterMeetings(query: string) {
  if (!query) return meetings;
  const lowerQuery = query.toLowerCase();
  return meetings.filter(m => {
    const matchPresiding = m.presiding?.toLowerCase().includes(lowerQuery);
    const matchConducting = m.conducting?.toLowerCase().includes(lowerQuery);
    const matchSpeaker = m.speakers?.some(
      s => s.name.toLowerCase().includes(lowerQuery) || s.topic.toLowerCase().includes(lowerQuery)
    );
    return matchPresiding || matchConducting || matchSpeaker;
  });
}

export async function getMeetingsTotalPages(query: string): Promise<number> {
  const filtered = filterMeetings(query);
  return Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
}

export async function getFilteredMeetings(query: string, currentPage: number): Promise<SacramentMeeting[]> {
  const filtered = filterMeetings(query);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  return filtered.slice(offset, offset + ITEMS_PER_PAGE);
}