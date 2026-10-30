import React from 'react';
import { Award, Building2, ExternalLink, ShieldCheck } from 'lucide-react';
import {
  CommitteeData,
  SiteConfig,
  groupCommitteeMembers,
} from '../utils/symposiumData';
import { PageHero } from '../components/PageHero';

interface OrganizingCommitteePageProps {
  siteConfig: SiteConfig;
  committeeData: CommitteeData;
}

export const OrganizingCommitteePage: React.FC<
  OrganizingCommitteePageProps
> = ({ siteConfig, committeeData }) => {
  const groupedCategories = groupCommitteeMembers(committeeData);
  const registrationUrl =
    siteConfig.registrationFees.registrationUrl ||
    'https://account.indiahci.org/auth';

  return (
    <div className="flex flex-col w-full">
      <PageHero
        kicker="Symposium Governance & Host Team"
        title={committeeData.sectionTitle}
        subtitle={committeeData.sectionSubtitle}
        siteConfig={siteConfig}
      />

      <section
        aria-label="Organizing Committee Hierarchy"
        className="relative overflow-hidden py-14 sm:py-20 bg-[#fbfcfe]"
      >
        {/* Subtle background watermarks woven into the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 paisley-watermark-layer opacity-20"
        />
        <img
          src={siteConfig.assets.kolamLeft}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-16 -left-10 w-64 sm:w-80 h-auto object-contain mix-blend-multiply opacity-12"
        />
        <img
          src={siteConfig.assets.kolamRight}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-20 -right-10 w-64 sm:w-80 h-auto object-contain mix-blend-multiply opacity-12"
        />
        <img
          src={siteConfig.assets.bannerSkyline}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1280px] h-auto object-contain mix-blend-multiply opacity-15"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-14">
          {/* Institutional Header Card */}
          <div className="relative overflow-hidden bg-[#f3f8fd]/90 backdrop-blur-[2px] border border-[#dceaf8] rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1b75bb]">
                Host Institution & Organizing Lab
              </p>
              <h2 className="font-serif-display font-bold text-xl sm:text-2xl text-[#010101]">
                {siteConfig.event.hostInstitution} ({siteConfig.event.hostShort})
              </h2>
              <p className="text-sm text-[#4e4e4e] leading-relaxed">
                {committeeData.announcementNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 shrink-0">
              <img
                src={siteConfig.assets.hcipaiLogo}
                alt="HCIPAI Logo"
                width={52}
                height={52}
                loading="lazy"
                className="h-12 w-auto object-contain"
              />
              <img
                src={siteConfig.assets.gcetLogo}
                alt="Geethanjali College of Engineering and Technology Logo"
                width={190}
                height={45}
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
              {/* <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#6a4766] hover:bg-[#52354f] rounded-md transition-colors shadow-2xs"
              >
                <span>Register Now</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a> */}
            </div>
          </div>

          {/* Hierarchical Committee Role Groups with Large Portrait Cards */}
          <div className="space-y-16">
            {groupedCategories.map((group) => (
              <div key={group.id} className="space-y-6">
                <div className="border-b border-[#dceaf8] pb-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h2 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#010101]">
                      {group.category}
                    </h2>
                    {group.description && (
                      <p className="text-sm sm:text-base text-[#505050] mt-1">
                        {group.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6a4766]">
                    Tier {group.displayOrder} · {group.members.length}{' '}
                    {group.members.length === 1 ? 'Role' : 'Roles'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                  {group.members.map((member) => {
                    const hasPhoto = Boolean(
                      member.image && member.image.trim().length > 0
                    );

                    return (
                      <article
                        key={member.id}
                        className="group bg-white/95 border border-[#dceaf8] rounded-xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#7cb3ed] transition-all"
                      >
                        <div>
                          {/* Large Portrait Image Placeholder Frame */}
                          <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-[#f3f8fd] via-[#f6fafe] to-[#dceaf8]/55 border-b border-[#dceaf8] flex items-center justify-center overflow-hidden">
                            {/* Subtle blended paisley & kolam watermark inside placeholder */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none select-none absolute inset-0 paisley-watermark-layer opacity-40"
                            />
                            <img
                              src={siteConfig.assets.kolamRight}
                              alt=""
                              aria-hidden="true"
                              className="pointer-events-none select-none absolute -bottom-3 -right-3 w-28 h-auto object-contain mix-blend-multiply opacity-20"
                            />

                            {hasPhoto ? (
                              <img
                                src={member.image}
                                alt={`${member.name} — ${member.role}`}
                                width={440}
                                height={320}
                                loading="lazy"
                                className="relative z-10 w-full h-full object-cover"
                              />
                            ) : (
                              <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 select-none">
                                <div className="w-20 h-20 rounded-full bg-white/90 border border-[#dceaf8] shadow-2xs flex items-center justify-center mb-3.5">
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
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/85 border border-[#dceaf8] text-xs font-semibold uppercase tracking-widest text-[#6a4766]">
                                  <ShieldCheck
                                    className="w-3.5 h-3.5 text-[#1b75bb]"
                                    aria-hidden="true"
                                  />
                                  <span>Committee Portrait — TBA</span>
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Member Role, Name, and Affiliation Details */}
                          <div className="p-6 sm:p-7 space-y-4">
                            <div className="space-y-1.5">
                              <p className="text-xs font-semibold uppercase tracking-widest text-[#1b75bb]">
                                {member.role}
                              </p>
                              <h3 className="font-serif-display font-bold text-xl sm:text-2xl text-[#010101]">
                                {member.name}
                              </h3>
                            </div>

                            <div className="pt-3 border-t border-[#dceaf8]/80 space-y-2 text-sm text-[#4e4e4e]">
                              <p className="flex items-start gap-2.5">
                                <Building2
                                  className="w-4 h-4 text-[#1b75bb] shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                                <span className="font-medium">
                                  {member.affiliation}
                                </span>
                              </p>
                              <p className="flex items-center gap-2.5 text-xs text-[#505050]">
                                <Award
                                  className="w-4 h-4 text-[#a355ba] shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{member.category}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 sm:px-7 py-3.5 bg-[#f3f8fd]/65 border-t border-[#dceaf8] flex items-center justify-between text-xs text-[#505050]">
                          <span>HCIPAI Symposium 2027 · GCET</span>
                          <span className="font-semibold text-[#6a4766]">
                            {member.name === 'TBA' ? 'Status: TBA' : 'Confirmed'}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
