import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanTextOrTba,
  resolveRouteFromPath,
  getPathForRoute,
  normalizeSiteConfig,
  normalizeScheduleData,
  filterSessionsByCategory,
  normalizePanelMembersData,
  normalizeCommitteeData,
  groupCommitteeMembers,
  initialSymposiumBundle,
} from './symposiumData';

test('cleanTextOrTba preserves valid strings and defaults empty/missing values to TBA', () => {
  assert.equal(cleanTextOrTba('March 18–19, 2027'), 'March 18–19, 2027');
  assert.equal(cleanTextOrTba('   '), 'TBA');
  assert.equal(cleanTextOrTba(null), 'TBA');
  assert.equal(cleanTextOrTba(undefined, 'Custom TBA'), 'Custom TBA');
});

test('resolveRouteFromPath and getPathForRoute cover all 5 required routes accurately', () => {
  assert.equal(resolveRouteFromPath('/'), 'home');
  assert.equal(resolveRouteFromPath('/schedule'), 'schedule');
  assert.equal(resolveRouteFromPath('/panel-members'), 'panel-members');
  assert.equal(resolveRouteFromPath('/organizing-committee'), 'organizing-committee');
  assert.equal(resolveRouteFromPath('/venue-contact'), 'venue-contact');
  assert.equal(resolveRouteFromPath('/', '?page=schedule'), 'schedule');
  assert.equal(resolveRouteFromPath('/', '', '#/panel-members'), 'panel-members');

  assert.equal(getPathForRoute('home'), '/');
  assert.equal(getPathForRoute('schedule'), '/schedule');
  assert.equal(getPathForRoute('panel-members'), '/panel-members');
  assert.equal(getPathForRoute('organizing-committee'), '/organizing-committee');
  assert.equal(getPathForRoute('venue-contact'), '/venue-contact');
});

test('initialSymposiumBundle contains official HCIPAI Symposium 2027 branding, contact, and 5 navigation items', () => {
  const { siteConfig } = initialSymposiumBundle;
  assert.equal(siteConfig.navigation.length, 5);
  assert.equal(siteConfig.event.dates, 'March 18–19, 2027');
  assert.equal(siteConfig.event.theme, 'One Experience. Many Perspectives.');
  assert.equal(siteConfig.contact.email, 'xrresearchlab@gcet.edu.in');
  assert.equal(siteConfig.contact.instagramHandle, 'ar.vr.researchlab');
  assert.ok(siteConfig.contact.address.includes('Cheeryal (V), Keesara (M)'));
  assert.ok(siteConfig.contact.address.includes('501301'));
});

test('normalizeScheduleData and filterSessionsByCategory preserve TBA placeholders and filter accurately', () => {
  const schedule = normalizeScheduleData({
    lastUpdated: 'Updated Test',
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2027-03-18',
        displayDate: 'March 18, 2027',
        label: 'Day 1',
        subtitle: 'Opening Day',
        sessions: [
          { id: '1', title: 'Workshop A', category: 'Workshops', time: '', speaker: '' },
          { id: '2', title: 'Panel A', category: 'Panel Discussions', time: '10:00 AM', speaker: 'TBA' },
        ],
      },
    ],
  });

  assert.equal(schedule.days[0].sessions[0].time, 'TBA');
  assert.equal(schedule.days[0].sessions[0].speaker, 'TBA');

  const workshopsOnly = filterSessionsByCategory(schedule.days[0].sessions, 'Workshops');
  assert.equal(workshopsOnly.length, 1);
  assert.equal(workshopsOnly[0].title, 'Workshop A');

  const allSessions = filterSessionsByCategory(schedule.days[0].sessions, 'All');
  assert.equal(allSessions.length, 2);
});

test('normalizePanelMembersData sorts by displayOrder and never fabricates missing fields', () => {
  const data = normalizePanelMembersData({
    members: [
      { id: 'p2', name: '', designation: '', affiliation: '', displayOrder: 20 },
      { id: 'p1', name: 'Dr. Example', designation: 'Professor', affiliation: 'GCET', displayOrder: 5 },
    ],
  });

  assert.equal(data.members.length, 2);
  assert.equal(data.members[0].id, 'p1');
  assert.equal(data.members[0].name, 'Dr. Example');
  assert.equal(data.members[1].id, 'p2');
  assert.equal(data.members[1].name, 'TBA');
  assert.equal(data.members[1].designation, 'TBA');
  assert.equal(data.members[1].affiliation, 'TBA');
});

test('groupCommitteeMembers groups and sorts committee roles hierarchically', () => {
  const normalized = normalizeCommitteeData(initialSymposiumBundle.committee);
  const grouped = groupCommitteeMembers(normalized);
  assert.ok(grouped.length >= 3);
  assert.equal(grouped[0].category, 'Patrons & Institutional Leadership');
  assert.ok(grouped[0].members.length > 0);
  assert.equal(grouped[0].members[0].name, 'TBA');
});
