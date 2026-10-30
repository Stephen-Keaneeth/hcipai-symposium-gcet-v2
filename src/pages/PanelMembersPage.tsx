import React from 'react';
import { UserCheck, Building2, ExternalLink } from 'lucide-react';
import { PanelMembersData, SiteConfig } from '../utils/symposiumData';
import { PageHero } from '../components/PageHero';

interface PanelMembersPageProps {
  siteConfig: SiteConfig;
  panelData: PanelMembersData;
}

export const PanelMembersPage: React.FC<PanelMembersPageProps> = ({
  siteConfig,
  panelData,
}) => {
  const registrationUrl =
    siteConfig.registrationFees.registrationUrl ||
    'https://account.indiahci.org/auth';

  return (
    <div className="flex flex-col w-full">
      <PageHero
        kicker="Symposium Speakers & Panelists"
        title={panelData.sectionTitle}
        subtitle={panelData.sectionSubtitle}
        siteConfig={siteConfig}
      />

      <section
        aria-label="Panel Member Profiles"
        className="relative overflow-hidden py-14 sm:py-20 bg-[#fbfcfe]"
      >
        {/* Subtle background watermarks */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 paisley-watermark-layer opacity-20"
        />
        <img
          src={siteConfig.assets.kolamLeft}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-20 -left-10 w-64 h-auto object-contain mix-blend-multiply opacity-12"
        />
        <img
          src={siteConfig.assets.bannerSkyline}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1280px] h-auto object-contain mix-blend-multiply opacity-15"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Announcement Banner */}
          {/* <div className="border-l-4 border-[#1b75bb] bg-[#f3f8fd]/90 backdrop-blur-[2px] px-5 py-4 text-sm text-[#4e4e4e] flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-r-lg">
            <div>
              <strong className="font-semibold text-[#010101]">
                Speaker Roster Update:
              </strong>{' '}
              {panelData.announcementNote}
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6a4766]">
                Theme: “{siteConfig.event.theme}”
              </span>
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#6a4766] hover:bg-[#52354f] rounded-md transition-colors"
              >
                <span>Register Now</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div> */}

          {/* Profile Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {panelData.members.map((member) => {
              const hasPhoto = Boolean(
                member.image && member.image.trim().length > 0
              );

              return (
                <article
                  key={member.id}
                  className="bg-white/95 border border-[#dceaf8] rounded-xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#7cb3ed] transition-all"
                >
                  <div>
                    {/* Generous Portrait Image Frame */}
                    <div className="relative w-full h-60 sm:h-64 bg-gradient-to-b from-[#f3f8fd] via-[#f6fafe] to-[#dceaf8]/55 border-b border-[#dceaf8] flex items-center justify-center overflow-hidden">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none select-none absolute inset-0 paisley-watermark-layer opacity-40"
                      />
                      <img
                        src={siteConfig.assets.kolamLeft}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none select-none absolute -bottom-3 -left-3 w-28 h-auto object-contain mix-blend-multiply opacity-20"
                      />

                      {hasPhoto ? (
                        <img
                          src={member.image}
                          alt={`${member.name} — ${member.designation}`}
                          width={420}
                          height={280}
                          loading="lazy"
                          className="relative z-10 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 select-none">
                          <div className="w-20 h-20 rounded-full bg-white/90 border border-[#dceaf8] shadow-2xs flex items-center justify-center mb-3">
                            <img
                              src={siteConfig.assets.hcipaiLogo}
                              alt=""
                              aria-hidden="true"
                              width={48}
                              height={48}
                              loading="lazy"
                              className="h-11 w-auto object-contain opacity-80"
                            />
                          </div>
                          <span className="px-3 py-1 rounded-md bg-white/85 border border-[#dceaf8] text-xs font-semibold uppercase tracking-widest text-[#6a4766]">
                            Speaker Portrait — TBA
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 sm:p-7 space-y-3.5">
                      <div className="text-xs font-medium text-[#1b75bb]">
                        <span>{member.track}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="text-[#505050]">
                          Panel Slot #{member.displayOrder}
                        </span>
                      </div>

                      <h2 className="font-serif-display font-bold text-xl sm:text-2xl text-[#010101]">
                        {member.name}
                      </h2>

                      <div className="space-y-2 pt-1 text-sm">
                        <p className="flex items-start gap-2.5 text-[#6a4766] font-medium">
                          <UserCheck
                            className="w-4 h-4 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>Designation: {member.designation}</span>
                        </p>

                        <p className="flex items-start gap-2.5 text-[#4e4e4e]">
                          <Building2
                            className="w-4 h-4 shrink-0 mt-0.5 text-[#1b75bb]"
                            aria-hidden="true"
                          />
                          <span>Affiliation: {member.affiliation}</span>
                        </p>
                      </div>

                      {member.biography && (
                        <p className="pt-2 text-sm text-[#505050] leading-relaxed border-t border-[#dceaf8]/70">
                          {member.biography}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 py-3.5 bg-[#f3f8fd]/65 border-t border-[#dceaf8] flex items-center justify-between text-xs text-[#505050]">
                    <span>HCIPAI Symposium 2027</span>
                    <span className="font-semibold text-[#6a4766]">
                      {member.name === 'TBA' ? 'Status: TBA' : 'Confirmed'}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
