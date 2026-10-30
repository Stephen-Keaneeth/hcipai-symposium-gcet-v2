import rawSiteConfig from '../data/site-config.json';
import rawSchedule from '../data/schedule.json';
import rawPanelMembers from '../data/panel-members.json';
import rawCommittee from '../data/committee.json';

export type RouteId =
  | 'home'
  | 'schedule'
  | 'panel-members'
  | 'organizing-committee'
  | 'venue-contact';

export interface NavItem {
  id: RouteId;
  label: string;
  path: string;
}

export interface FeeItem {
  participantType: string;
  fee: string;
}

export interface FeeTier {
  id: string;
  category: string;
  deadline?: string;
  items: FeeItem[];
}

export interface SiteConfig {
  event: {
    title: string;
    subtitle: string;
    shortTitle: string;
    dates: string;
    startDate: string;
    endDate: string;
    year: string;
    theme: string;
    pillars: string[];
    hostInstitution: string;
    hostShort: string;
    hostTagline: string;
    accreditations: string[];
    locationShort: string;
  };
  navigation: NavItem[];
  assets: {
    bannerFull: string;
    hcipaiLogo: string;
    gcetLogo: string;
    campusPhoto: string;
    feesImage: string;
    bannerTitleLockup: string;
    bannerThemeLockup: string;
    bannerSkyline: string;
    paisleyPattern: string;
    kolamLeft: string;
    kolamRight: string;
  };
  registrationFees: {
    heading: string;
    statusNote: string;
    registrationUrl: string;
    tiers: FeeTier[];
  };
  contact: {
    labName: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    institution: string;
    address: string;
    directionsUrl: string;
  };
}

export interface ScheduleSession {
  id: string;
  time: string;
  title: string;
  category: string;
  track?: string;
  speaker: string;
  location?: string;
  venue?: string;
  status?: string;
  description: string;
  tracks?: string;
}

export interface ScheduleDay {
  id: string;
  dayNumber: number;
  date: string;
  displayDate: string;
  label: string;
  subtitle: string;
  sessions: ScheduleSession[];
}

export interface ScheduleData {
  lastUpdated: string;
  days: ScheduleDay[];
}

export interface PanelMember {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  biography: string;
  image: string;
  track: string;
  displayOrder: number;
}

export interface PanelMembersData {
  sectionTitle: string;
  sectionSubtitle: string;
  announcementNote: string;
  members: PanelMember[];
}

export interface CommitteeGroup {
  id: string;
  category: string;
  description: string;
  displayOrder: number;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  category: string;
  image: string;
  displayOrder: number;
}

export interface CommitteeData {
  sectionTitle: string;
  sectionSubtitle: string;
  announcementNote: string;
  groups: CommitteeGroup[];
  members: CommitteeMember[];
}

export interface GroupedCommitteeCategory {
  id: string;
  category: string;
  description: string;
  displayOrder: number;
  members: CommitteeMember[];
}

export function cleanTextOrTba(value: unknown, fallback = 'TBA'): string {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fallback;
  }
  return fallback;
}

export function cleanOptionalText(value: unknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value.trim();
  }
  return fallback;
}

export function resolveRouteFromPath(pathname: string, search = '', hash = ''): RouteId {
  const params = new URLSearchParams(search);
  const pageParam = params.get('page')?.toLowerCase().trim();
  if (pageParam && isValidRouteId(pageParam)) {
    return pageParam;
  }

  const cleanHash = hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (cleanHash && isValidRouteId(cleanHash)) {
    return cleanHash;
  }

  const normalized = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  switch (normalized) {
    case '/':
    case '/home':
    case '/index.html':
      return 'home';
    case '/schedule':
      return 'schedule';
    case '/panel-members':
    case '/panel':
    case '/speakers':
      return 'panel-members';
    case '/organizing-committee':
    case '/committee':
      return 'organizing-committee';
    case '/venue-contact':
    case '/venue':
    case '/contact':
      return 'venue-contact';
    default:
      return 'home';
  }
}

export function isValidRouteId(val: string): val is RouteId {
  return (
    val === 'home' ||
    val === 'schedule' ||
    val === 'panel-members' ||
    val === 'organizing-committee' ||
    val === 'venue-contact'
  );
}

export function getPathForRoute(route: RouteId): string {
  switch (route) {
    case 'home':
      return '/';
    case 'schedule':
      return '/schedule';
    case 'panel-members':
      return '/panel-members';
    case 'organizing-committee':
      return '/organizing-committee';
    case 'venue-contact':
      return '/venue-contact';
  }
}

export function normalizeSiteConfig(input: unknown): SiteConfig {
  const base = rawSiteConfig as SiteConfig;
  if (!input || typeof input !== 'object') {
    return base;
  }
  const obj = input as Record<string, any>;
  return {
    event: {
      title: cleanTextOrTba(obj.event?.title, base.event.title),
      subtitle: cleanTextOrTba(obj.event?.subtitle, base.event.subtitle),
      shortTitle: cleanTextOrTba(obj.event?.shortTitle, base.event.shortTitle),
      dates: cleanTextOrTba(obj.event?.dates, base.event.dates),
      startDate: cleanTextOrTba(obj.event?.startDate, base.event.startDate),
      endDate: cleanTextOrTba(obj.event?.endDate, base.event.endDate),
      year: cleanTextOrTba(obj.event?.year, base.event.year),
      theme: cleanTextOrTba(obj.event?.theme, base.event.theme),
      pillars: Array.isArray(obj.event?.pillars) && obj.event.pillars.length > 0
        ? obj.event.pillars.map((p: unknown) => cleanTextOrTba(p))
        : base.event.pillars,
      hostInstitution: cleanTextOrTba(obj.event?.hostInstitution, base.event.hostInstitution),
      hostShort: cleanTextOrTba(obj.event?.hostShort, base.event.hostShort),
      hostTagline: cleanTextOrTba(obj.event?.hostTagline, base.event.hostTagline),
      accreditations: Array.isArray(obj.event?.accreditations)
        ? obj.event.accreditations.map((a: unknown) => cleanTextOrTba(a))
        : base.event.accreditations,
      locationShort: cleanTextOrTba(obj.event?.locationShort, base.event.locationShort),
    },
    navigation: Array.isArray(obj.navigation) && obj.navigation.length === 5
      ? obj.navigation.map((n: any, idx: number) => ({
          id: isValidRouteId(n?.id) ? n.id : base.navigation[idx].id,
          label: cleanTextOrTba(n?.label, base.navigation[idx].label),
          path: cleanTextOrTba(n?.path, base.navigation[idx].path),
        }))
      : base.navigation,
    assets: {
      ...base.assets,
      ...(obj.assets && typeof obj.assets === 'object' ? obj.assets : {}),
    },
    registrationFees: {
      heading: cleanTextOrTba(obj.registrationFees?.heading, base.registrationFees.heading),
      statusNote: cleanTextOrTba(obj.registrationFees?.statusNote, base.registrationFees.statusNote),
      registrationUrl: cleanTextOrTba(
        obj.registrationFees?.registrationUrl,
        base.registrationFees.registrationUrl || 'https://account.indiahci.org/auth'
      ),
      tiers: Array.isArray(obj.registrationFees?.tiers)
        ? obj.registrationFees.tiers.map((tier: any, idx: number) => ({
            id: cleanTextOrTba(tier?.id, `tier-${idx + 1}`),
            category: cleanTextOrTba(tier?.category, 'TBA'),
            ...(tier?.deadline ? { deadline: String(tier.deadline).trim() } : {}),
            items: Array.isArray(tier?.items)
              ? tier.items.map((item: any) => ({
                  participantType: cleanTextOrTba(item?.participantType, 'TBA'),
                  fee: cleanTextOrTba(item?.fee, 'TBA'),
                }))
              : [],
          }))
        : base.registrationFees.tiers,
    },
    contact: {
      labName: cleanTextOrTba(obj.contact?.labName, base.contact.labName),
      email: cleanTextOrTba(obj.contact?.email, base.contact.email),
      instagramHandle: cleanTextOrTba(obj.contact?.instagramHandle, base.contact.instagramHandle),
      instagramUrl: cleanTextOrTba(obj.contact?.instagramUrl, base.contact.instagramUrl),
      institution: cleanTextOrTba(obj.contact?.institution, base.contact.institution),
      address: cleanTextOrTba(obj.contact?.address, base.contact.address),
      directionsUrl: cleanTextOrTba(obj.contact?.directionsUrl, base.contact.directionsUrl),
    },
  };
}

export function normalizeScheduleData(input: unknown): ScheduleData {
  const base = rawSchedule as ScheduleData;
  if (!input || typeof input !== 'object') {
    return base;
  }
  const obj = input as Record<string, any>;
  const rawDays = Array.isArray(obj.days) ? obj.days : base.days;

  const days: ScheduleDay[] = rawDays.map((day: any, dIdx: number) => {
    const sessions: ScheduleSession[] = Array.isArray(day?.sessions)
      ? day.sessions.map((s: any, sIdx: number) => {
          const loc = cleanOptionalText(s?.location || s?.venue, '');
          const hasValidLocation = loc.length > 0 && loc.toUpperCase() !== 'TBA';
          const trackVal = cleanOptionalText(s?.track || s?.tracks, '');
          return {
            id: cleanTextOrTba(s?.id, `day-${dIdx + 1}-s-${sIdx + 1}`),
            time: cleanTextOrTba(s?.time, 'TBA'),
            title: cleanTextOrTba(s?.title, 'Session Title TBA'),
            category: cleanTextOrTba(s?.category, 'General'),
            track: trackVal.length > 0 ? trackVal : undefined,
            tracks: trackVal.length > 0 ? trackVal : undefined,
            speaker: cleanTextOrTba(s?.speaker, 'TBA'),
            location: hasValidLocation ? loc : undefined,
            venue: hasValidLocation ? loc : undefined,
            status: cleanOptionalText(s?.status, ''),
            description: cleanTextOrTba(
              s?.description,
              'Session details will be announced (TBA).'
            ),
          };
        })
      : [];

    return {
      id: cleanTextOrTba(day?.id, `day-${dIdx + 1}`),
      dayNumber: typeof day?.dayNumber === 'number' ? day.dayNumber : dIdx + 1,
      date: cleanTextOrTba(day?.date, 'TBA'),
      displayDate: cleanTextOrTba(day?.displayDate, 'TBA'),
      label: cleanTextOrTba(day?.label, `Day ${dIdx + 1}`),
      subtitle: cleanTextOrTba(day?.subtitle, 'Symposium Program'),
      sessions,
    };
  });

  return {
    lastUpdated: cleanTextOrTba(obj.lastUpdated, base.lastUpdated),
    days,
  };
}

export function filterSessionsByCategory(
  sessions: ScheduleSession[],
  categoryFilter: string
): ScheduleSession[] {
  if (!categoryFilter || categoryFilter === 'All') {
    return sessions;
  }
  return sessions.filter(
    (s) => s.category.toLowerCase() === categoryFilter.toLowerCase()
  );
}

export function normalizePanelMembersData(input: unknown): PanelMembersData {
  const base = rawPanelMembers as PanelMembersData;
  if (!input || typeof input !== 'object') {
    return {
      ...base,
      members: [...base.members].sort((a, b) => a.displayOrder - b.displayOrder),
    };
  }
  const obj = input as Record<string, any>;
  const rawList = Array.isArray(obj.members) ? obj.members : base.members;

  const members: PanelMember[] = rawList
    .map((m: any, idx: number) => ({
      id: cleanTextOrTba(m?.id, `panel-${idx + 1}`),
      name: cleanTextOrTba(m?.name, 'TBA'),
      designation: cleanTextOrTba(m?.designation, 'TBA'),
      affiliation: cleanTextOrTba(m?.affiliation, 'TBA'),
      biography: cleanTextOrTba(
        m?.biography,
        'Speaker biography and session details will be announced (TBA).'
      ),
      image: cleanOptionalText(m?.image, ''),
      track: cleanTextOrTba(m?.track, 'Symposium Panel'),
      displayOrder:
        typeof m?.displayOrder === 'number' && !Number.isNaN(m.displayOrder)
          ? m.displayOrder
          : idx + 1,
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return {
    sectionTitle: cleanTextOrTba(obj.sectionTitle, base.sectionTitle),
    sectionSubtitle: cleanTextOrTba(obj.sectionSubtitle, base.sectionSubtitle),
    announcementNote: cleanTextOrTba(obj.announcementNote, base.announcementNote),
    members,
  };
}

export function normalizeCommitteeData(input: unknown): CommitteeData {
  const base = rawCommittee as CommitteeData;
  if (!input || typeof input !== 'object') {
    return {
      ...base,
      groups: [...base.groups].sort((a, b) => a.displayOrder - b.displayOrder),
      members: [...base.members].sort((a, b) => a.displayOrder - b.displayOrder),
    };
  }
  const obj = input as Record<string, any>;
  const rawGroups = Array.isArray(obj.groups) ? obj.groups : base.groups;
  const rawMembers = Array.isArray(obj.members) ? obj.members : base.members;

  const groups: CommitteeGroup[] = rawGroups
    .map((g: any, idx: number) => ({
      id: cleanTextOrTba(g?.id, `group-${idx + 1}`),
      category: cleanTextOrTba(g?.category, 'Committee Group'),
      description: cleanOptionalText(g?.description, ''),
      displayOrder:
        typeof g?.displayOrder === 'number' && !Number.isNaN(g.displayOrder)
          ? g.displayOrder
          : idx + 1,
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const members: CommitteeMember[] = rawMembers
    .map((m: any, idx: number) => ({
      id: cleanTextOrTba(m?.id, `comm-${idx + 1}`),
      name: cleanTextOrTba(m?.name, 'TBA'),
      role: cleanTextOrTba(m?.role, 'TBA'),
      affiliation: cleanTextOrTba(
        m?.affiliation,
        'Geethanjali College of Engineering and Technology (GCET)'
      ),
      category: cleanTextOrTba(m?.category, 'Organizing Committee'),
      image: cleanOptionalText(m?.image, ''),
      displayOrder:
        typeof m?.displayOrder === 'number' && !Number.isNaN(m.displayOrder)
          ? m.displayOrder
          : idx + 1,
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return {
    sectionTitle: cleanTextOrTba(obj.sectionTitle, base.sectionTitle),
    sectionSubtitle: cleanTextOrTba(obj.sectionSubtitle, base.sectionSubtitle),
    announcementNote: cleanTextOrTba(obj.announcementNote, base.announcementNote),
    groups,
    members,
  };
}

export function groupCommitteeMembers(data: CommitteeData): GroupedCommitteeCategory[] {
  const categoryMap = new Map<string, GroupedCommitteeCategory>();

  for (const group of data.groups) {
    categoryMap.set(group.category.toLowerCase(), {
      id: group.id,
      category: group.category,
      description: group.description,
      displayOrder: group.displayOrder,
      members: [],
    });
  }

  let extraOrder = data.groups.length + 1;
  for (const member of data.members) {
    const key = member.category.toLowerCase();
    let bucket = categoryMap.get(key);
    if (!bucket) {
      bucket = {
        id: `extra-${extraOrder}`,
        category: member.category,
        description: '',
        displayOrder: extraOrder++,
        members: [],
      };
      categoryMap.set(key, bucket);
    }
    bucket.members.push(member);
  }

  return Array.from(categoryMap.values())
    .filter((g) => g.members.length > 0)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((g) => ({
      ...g,
      members: [...g.members].sort((a, b) => a.displayOrder - b.displayOrder),
    }));
}

export const initialSymposiumBundle = {
  siteConfig: normalizeSiteConfig(rawSiteConfig),
  schedule: normalizeScheduleData(rawSchedule),
  panelMembers: normalizePanelMembersData(rawPanelMembers),
  committee: normalizeCommitteeData(rawCommittee),
};
