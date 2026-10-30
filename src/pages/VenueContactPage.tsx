import React from 'react';
import {
  MapPin,
  Mail,
  ExternalLink,
  Calendar,
  Navigation,
} from 'lucide-react';
import { SiteConfig } from '../utils/symposiumData';
import { PageHero } from '../components/PageHero';

interface VenueContactPageProps {
  siteConfig: SiteConfig;
}

export const VenueContactPage: React.FC<VenueContactPageProps> = ({
  siteConfig,
}) => {
  const registrationUrl =
    siteConfig.registrationFees.registrationUrl ||
    'https://account.indiahci.org/auth';

  return (
    <div className="flex flex-col w-full">
      <PageHero
        kicker="Campus Location & Inquiries"
        title="Venue & Contact"
        subtitle={`Hosted at ${siteConfig.contact.institution}, Telangana, India. Connect directly with the ${siteConfig.contact.labName} for symposium inquiries.`}
        siteConfig={siteConfig}
      />

      <section
        aria-label="Official Venue and Contact Information"
        className="relative overflow-hidden py-12 sm:py-16 bg-[#fbfcfe]"
      >
        {/* Subtle background watermarks */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 paisley-watermark-layer opacity-20"
        />
        <img
          src={siteConfig.assets.kolamRight}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-20 -right-10 w-64 h-auto object-contain mix-blend-multiply opacity-12"
        />
        <img
          src={siteConfig.assets.bannerSkyline}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1280px] h-auto object-contain mix-blend-multiply opacity-15"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          {/* Primary Grid: Venue Card + Official Contact Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Campus Photograph & Address */}
            <div className="lg:col-span-7 bg-white/95 border border-[#dceaf8] rounded-lg overflow-hidden shadow-2xs">
              <div className="w-full bg-[#f3f8fd] border-b border-[#dceaf8]">
                <img
                  src={siteConfig.assets.campusPhoto}
                  alt="Geethanjali College of Engineering and Technology (GCET) Campus Building"
                  width={728}
                  height={485}
                  className="w-full h-auto block object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#dceaf8]">
                  <img
                    src={siteConfig.assets.gcetLogo}
                    alt="Geethanjali College of Engineering and Technology Logo"
                    width={220}
                    height={52}
                    className="h-11 sm:h-12 w-auto object-contain"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6a4766]">
                    Host Institution
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif-display font-bold text-2xl text-[#010101]">
                    {siteConfig.contact.institution}
                  </h2>
                  <p className="text-sm font-medium text-[#1b75bb]">
                    {siteConfig.event.accreditations.join(' · ')}
                  </p>
                </div>

                <div className="bg-[#f3f8fd] border border-[#dceaf8] rounded-md p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 text-[#1b75bb] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#505050]">
                        Official Campus Address
                      </h3>
                      <p className="text-sm sm:text-base text-[#010101] font-medium leading-relaxed">
                        {siteConfig.contact.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={siteConfig.contact.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1b75bb] hover:bg-[#155d95] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
                  >
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    <span>Open Campus Location in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Symposium Contact Details & Event Summary */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Contact Channels Card */}
              <div className="bg-white/95 border border-[#dceaf8] rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="space-y-1.5 border-b border-[#dceaf8] pb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#6a4766]">
                    Official Symposium Contact
                  </p>
                  <h2 className="font-serif-display font-bold text-2xl text-[#010101]">
                    {siteConfig.contact.labName} — GCET
                  </h2>
                  <p className="text-sm text-[#505050]">
                    For inquiries regarding panel discussions, workshops,
                    interactive zones, or academic participation:
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Email Link */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-md bg-[#dceaf8]/60 flex items-center justify-center text-[#6a4766] shrink-0">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#505050]">
                        XR Research Lab Email
                      </h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-base font-semibold text-[#1b75bb] hover:text-[#6a4766] underline underline-offset-4 break-all transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <p className="text-xs text-[#505050]">
                        Official correspondence for HCIPAI Symposium 2027
                      </p>
                    </div>
                  </div>

                  {/* Instagram Link */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-md bg-[#dceaf8]/60 flex items-center justify-center text-[#a355ba] shrink-0">
                      <ExternalLink className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#505050]">
                        XR Research Lab Instagram
                      </h3>
                      <a
                        href={siteConfig.contact.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-base font-semibold text-[#1b75bb] hover:text-[#6a4766] underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
                      >
                        <span>@{siteConfig.contact.instagramHandle}</span>
                        <ExternalLink
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </a>
                      <p className="text-xs text-[#505050]">
                        AR/VR Research Lab updates and announcements
                      </p>
                    </div>
                  </div>

                  {/* Event Dates Summary */}
                  <div className="flex items-start gap-3.5 pt-2 border-t border-[#dceaf8]">
                    <div className="w-10 h-10 rounded-md bg-[#dceaf8]/60 flex items-center justify-center text-[#1b75bb] shrink-0">
                      <Calendar className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#505050]">
                        Symposium Dates & Theme
                      </h3>
                      <p className="text-base font-semibold text-[#010101]">
                        {siteConfig.event.dates}
                      </p>
                      <p className="font-serif-display italic text-sm text-[#6a4766]">
                        “{siteConfig.event.theme}”
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proposed Registration Fee Card & Register Now CTA */}
              <div className="bg-[#f3f8fd]/95 border border-[#dceaf8] rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-serif-display font-bold text-xl text-[#010101]">
                    {siteConfig.registrationFees.heading}
                  </h2>
                </div>
                <div className="space-y-3 text-sm">
                  {siteConfig.registrationFees.tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="bg-white border border-[#dceaf8] rounded-md p-3.5 space-y-1.5"
                    >
                      <h3 className="font-semibold text-[#6a4766]">
                        {tier.category}
                      </h3>
                      {(tier.deadline || tier.id === 'early-bird') && (
                        <div className="flex items-center gap-1.5 text-xs font-normal text-[#777777]">
                          <Calendar className="w-3.5 h-3.5 shrink-0 text-[#777777]" aria-hidden="true" />
                          <span>{tier.deadline || 'Registration open until 31st Jan'}</span>
                        </div>
                      )}
                      {tier.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-[#4e4e4e]"
                        >
                          <span>{item.participantType}</span>
                          <strong className="text-[#010101]">{item.fee}</strong>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#6a4766] hover:bg-[#52354f] rounded-md transition-colors shadow-2xs"
                  >
                    <span>Register Now via IndiaHCI Portal</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
