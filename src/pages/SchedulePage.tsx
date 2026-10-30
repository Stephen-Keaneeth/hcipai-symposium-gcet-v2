import React, { useState } from 'react';
import { Calendar, Clock, ExternalLink, MapPin, User } from 'lucide-react';
import {
  ScheduleData,
  SiteConfig,
  filterSessionsByCategory,
} from '../utils/symposiumData';
import { PageHero } from '../components/PageHero';

interface SchedulePageProps {
  siteConfig: SiteConfig;
  scheduleData: ScheduleData;
}

const CATEGORIES = [
  'All',
  'Panel Discussions',
  'Workshops',
  'Interactive Zones',
  'Keynote',
  'General',
];

export const SchedulePage: React.FC<SchedulePageProps> = ({
  siteConfig,
  scheduleData,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const visibleDays =
    selectedDayId === 'all'
      ? scheduleData.days
      : scheduleData.days.filter((d) => d.id === selectedDayId);

  const registrationUrl =
    siteConfig.registrationFees.registrationUrl ||
    'https://account.indiahci.org/auth';

  return (
    <div className="flex flex-col w-full">
      <PageHero
        kicker="Symposium Program"
        title="Symposium Schedule"
        subtitle={`Two-day program on ${siteConfig.event.dates} featuring Panel Discussions, Workshops, and Interactive Zones at ${siteConfig.event.hostInstitution}.`}
        siteConfig={siteConfig}
      />

      <section
        aria-label="Program Schedule and Filters"
        className="relative overflow-hidden py-12 sm:py-16 bg-[#fbfcfe]"
      >
        {/* Subtle background watermarks */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 paisley-watermark-layer opacity-20"
        />
        <img
          src={siteConfig.assets.bannerSkyline}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1280px] h-auto object-contain mix-blend-multiply opacity-12"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          {/* Interactive Controls Bar: Day Selection & Track Filter */}
          <div className="bg-[#f3f8fd]/95 backdrop-blur-[2px] border border-[#dceaf8] rounded-lg p-4 sm:p-5 space-y-3.5">
            {/* Day Selector Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#dceaf8]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#505050]">
                Symposium Day
              </span>
              <div
                role="group"
                aria-label="Select Symposium Day"
                className="flex flex-wrap items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setSelectedDayId('all')}
                  aria-pressed={selectedDayId === 'all'}
                  className={`min-h-[40px] px-4 py-2 text-sm font-semibold rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] ${
                    selectedDayId === 'all'
                      ? 'bg-[#6a4766] text-white shadow-2xs'
                      : 'bg-white text-[#4e4e4e] hover:text-[#010101] border border-[#dceaf8]'
                  }`}
                >
                  All Days (Mar 18–19)
                </button>

                {scheduleData.days.map((day) => {
                  const isSelected = selectedDayId === day.id;
                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => setSelectedDayId(day.id)}
                      aria-pressed={isSelected}
                      className={`min-h-[40px] px-4 py-2 text-sm font-semibold rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] ${
                        isSelected
                          ? 'bg-[#6a4766] text-white shadow-2xs'
                          : 'bg-white text-[#4e4e4e] hover:text-[#010101] border border-[#dceaf8]'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#505050]">
                Program Track
              </span>
              <div
                role="group"
                aria-label="Filter by Session Category"
                className="flex flex-wrap items-center gap-1.5"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={isActive}
                      className={`min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] ${
                        isActive
                          ? 'bg-[#1b75bb] text-white font-semibold'
                          : 'bg-white text-[#4e4e4e] hover:text-[#1b75bb] border border-[#dceaf8]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Official Status Notice + Register CTA */}
          <div className="border-l-4 border-[#6a4766] bg-[#f3f8fd]/85 px-5 py-3.5 text-sm text-[#4e4e4e] flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-r-lg">
            <div>
              <strong className="font-semibold text-[#010101]">
                Program Note:
              </strong>{' '}
              {scheduleData.lastUpdated}. Unannounced session timings, hall
              allocations, and confirmed speakers are indicated as{' '}
              <strong className="font-semibold text-[#6a4766]">TBA</strong>.
            </div>
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#6a4766] hover:bg-[#52354f] rounded-md transition-colors shrink-0"
            >
              <span>Register Now</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Schedule Days & Session List */}
          <div className="space-y-12">
            {visibleDays.map((day) => {
              const filteredSessions = filterSessionsByCategory(
                day.sessions,
                selectedCategory
              );

              return (
                <div
                  key={day.id}
                  className="bg-white/95 border border-[#dceaf8] rounded-lg overflow-hidden shadow-2xs"
                >
                  {/* Day Header */}
                  <div className="bg-gradient-to-r from-[#f3f8fd] to-[#fbfcfe] border-b border-[#dceaf8] px-5 sm:px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1b75bb]">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Day {day.dayNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{day.displayDate}</span>
                      </div>
                      <h2 className="mt-1 font-serif-display font-bold text-xl sm:text-2xl text-[#010101]">
                        {day.label}
                      </h2>
                      <p className="text-sm text-[#505050] mt-0.5">
                        {day.subtitle}
                      </p>
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-[#6a4766]">
                      {filteredSessions.length}{' '}
                      {filteredSessions.length === 1 ? 'Session' : 'Sessions'}{' '}
                      Listed
                    </div>
                  </div>

                  {/* Sessions Table / Responsive Stack */}
                  {filteredSessions.length === 0 ? (
                    <div className="p-8 text-center text-sm text-[#505050]">
                      No sessions match the selected category filter ({selectedCategory}) on{' '}
                      {day.displayDate}.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#dceaf8]">
                      {filteredSessions.map((session) => (
                        <article
                          key={session.id}
                          className="p-5 sm:p-7 hover:bg-[#f3f8fd]/35 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start"
                        >
                          {/* Time & Status Column */}
                          <div className="md:col-span-3 space-y-1">
                            <div className="flex items-center gap-2 text-sm font-bold text-[#6a4766]">
                              <Clock
                                className="w-4 h-4 shrink-0 text-[#6a4766]"
                                aria-hidden="true"
                              />
                              <span>Time: {session.time}</span>
                            </div>
                            <div className="text-xs text-[#505050] pl-6">
                              <span>{session.category}</span>
                              {day.id !== 'day-2' && session.status && (
                                <>
                                  <span aria-hidden="true"> · </span>
                                  <span>Status: {session.status}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Session Title & Description Column */}
                          <div className="md:col-span-6 space-y-1.5">
                            <h3 className="font-serif-display font-bold text-lg text-[#010101]">
                              {session.title}
                            </h3>
                            {session.tracks && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f1fb] border border-[#c3d9f5] text-xs font-medium text-[#1b75bb]">
                                <span className="text-[#505050] font-semibold">Track:</span>
                                <span>{session.tracks}</span>
                              </div>
                            )}
                            <div className="text-sm text-[#4e4e4e] leading-relaxed">
                              <p>{session.description}</p>
                            </div>
                          </div>

                          {/* Speaker & Venue Column */}
                          <div className="md:col-span-3 space-y-1.5 text-xs sm:text-sm text-[#4e4e4e] md:border-l md:border-[#dceaf8] md:pl-5">
                            <div className="flex items-start gap-2">
                              <User
                                className="w-4 h-4 text-[#1b75bb] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <div>
                                <span className="text-xs text-[#505050] block">
                                  Speaker / Lead
                                </span>
                                <span className="font-medium text-[#010101]">
                                  {session.speaker}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin
                                className="w-4 h-4 text-[#a355ba] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <div>
                                <span className="text-xs text-[#505050] block">
                                  Location
                                </span>
                                <span className="font-medium text-[#010101]">
                                  {session.venue}
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
