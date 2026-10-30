import React, { useEffect, useState } from 'react';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Users,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { RouteId, SiteConfig } from '../utils/symposiumData';

interface HomePageProps {
  siteConfig: SiteConfig;
  onNavigate: (route: RouteId, path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  siteConfig,
  onNavigate,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRouteLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: RouteId,
    path: string
  ) => {
    e.preventDefault();
    onNavigate(route, path);
  };

  const registrationUrl =
    siteConfig.registrationFees.registrationUrl ||
    'https://account.indiahci.org/auth';

  // Smooth scroll dissipation math for the 100vh first-viewport banner
  const progress = Math.min(1, Math.max(0, scrollY / 540));
  const bannerOpacity = Math.max(0, 1 - progress * 1.15);
  const bannerTranslateY = scrollY * 0.24;
  const bannerScale = Math.max(0.94, 1 - progress * 0.05);
  const bannerBlur = progress * 5;

  return (
    <div className="flex flex-col w-full">
      {/* First Viewport (100vh): Full-Screen Integrated Banner that Dissipates on Scroll */}
      <section
        aria-label="HCIPAI Symposium 2027 Banner"
        className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden flex flex-col justify-between bg-gradient-to-b from-white via-[#fafcff] to-[#fbfcfe] select-none"
      >
        <h1 className="sr-only">
          {siteConfig.event.title} — {siteConfig.event.subtitle} (
          {siteConfig.event.dates}) at {siteConfig.event.hostInstitution}
        </h1>

        {/* Dissipating Full-Viewport Banner Stage (Single Stacking Context so mix-blend-multiply blends seamlessly) */}
        <div
          style={{
            opacity: bannerOpacity,
            transform:
              scrollY > 2
                ? `translate3d(0, ${bannerTranslateY}px, 0) scale(${bannerScale})`
                : undefined,
            filter:
              bannerBlur > 0.2 ? `blur(${bannerBlur.toFixed(1)}px)` : undefined,
          }}
          className="relative w-full h-full flex flex-col justify-between pt-20 sm:pt-24 bg-white"
        >
          {/* Seamless Edge-to-Edge Paisley Background Pattern (Zero Right Gap) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full paisley-watermark-layer opacity-85 pointer-events-none"
          />

          {/* Top Institutional & Host Brand Elements: HCIPAI (Left), GCET, NBA, NAAC (Right) as in Reference Banner */}
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-2 sm:pt-4 z-10 shrink-0">
            <div className="w-full flex items-center justify-between">
              {/* Top Left: HCIPAI Logo */}
              <div className="flex items-center">
                <img
                  src={siteConfig.assets.bannerHcipaiLogo || '/assets/aistudio/hcipailogo.png'}
                  alt="HCIPAI Logo"
                  width={1679}
                  height={1641}
                  loading="eager"
                  fetchPriority="high"
                  className="h-12 sm:h-16 lg:h-20 xl:h-22 w-auto object-contain mix-blend-multiply"
                />
              </div>

              {/* Top Right: GCET, NBA, NAAC Logos */}
              <div className="flex items-center gap-3 sm:gap-5 lg:gap-7">
                <img
                  src={siteConfig.assets.bannerGcetLogo || '/assets/aistudio/gcetlogo.png'}
                  alt="Geethanjali College of Engineering and Technology Logo"
                  width={169}
                  height={169}
                  loading="eager"
                  className="h-10 sm:h-12 lg:h-16 w-auto object-contain mix-blend-multiply"
                />
                <img
                  src={siteConfig.assets.bannerNbaLogo || '/assets/aistudio/nbalogo.png'}
                  alt="National Board of Accreditation NBA Logo"
                  width={250}
                  height={198}
                  loading="eager"
                  className="h-9 sm:h-11 lg:h-14 w-auto object-contain mix-blend-multiply"
                />
                <img
                  src={siteConfig.assets.bannerNaacLogo || '/assets/aistudio/naaclogo.png'}
                  alt="National Assessment and Accreditation Council NAAC A+ Logo"
                  width={174}
                  height={174}
                  loading="eager"
                  className="h-10 sm:h-12 lg:h-16 w-auto object-contain mix-blend-multiply"
                />
              </div>
            </div>
          </div>

          {/* Center Composition: Authentic 2027 HCIPAI Symposium Title & Theme Lockups */}
          <div className="flex-1 flex items-center justify-center w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-6 lg:py-8 pb-10 sm:pb-16 lg:pb-20">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
              {/* Left Lockup: 2027 HCIPAI MARCH 18th-19th SYMPOSIUM */}
              <div className="lg:col-span-7 flex justify-center lg:justify-start">
                <img
                  src={siteConfig.assets.bannerTitleLockup}
                  alt="2027 HCIPAI March 18th to 19th Symposium"
                  width={1965}
                  height={687}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full max-w-[540px] sm:max-w-[640px] lg:max-w-[740px] h-auto object-contain mix-blend-multiply"
                />
              </div>

              {/* Right Lockup: Hci For Interactive & Immersive Experience / One Experience. Many perspectives. */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <img
                  src={siteConfig.assets.bannerThemeLockup}
                  alt="HCI For Interactive & Immersive Experience — One Experience. Many perspectives. Panel discussions, Workshops, Interactive Zones"
                  width={1701}
                  height={282}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[580px] h-auto object-contain mix-blend-multiply"
                />
              </div>
            </div>
          </div>

          {/* Bottom Architectural Skyline & Kolam Corners Spanning the Viewport Base */}
          <div className="w-full pointer-events-none">
            <img
              src={siteConfig.assets.bannerSkyline}
              alt=""
              aria-hidden="true"
              width={4000}
              height={1097}
              loading="eager"
              className="w-full max-w-[1600px] mx-auto h-auto max-h-[28vh] sm:max-h-[34vh] object-contain object-bottom mix-blend-multiply block"
            />
          </div>
        </div>

        {/* Soft Bottom Mist Transition so the Banner Dissipates Smoothly into Content Below */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#fbfcfe] via-[#fbfcfe]/70 to-transparent pointer-events-none z-20"
        />
      </section>

      {/* Section 2 (Appears on Scroll): Symposium Identity, Dates, Registration CTA & Three Pillars */}
      <section
        aria-labelledby="about-symposium-heading"
        className="relative py-16 sm:py-24 bg-[#fbfcfe] overflow-hidden"
      >
        {/* Subtle Background Kolam Watermarks */}
        <img
          src={siteConfig.assets.kolamLeft}
          alt=""
          aria-hidden="true"
          width={220}
          height={225}
          loading="lazy"
          className="hidden lg:block absolute top-10 left-0 w-36 h-auto object-contain mix-blend-multiply opacity-20 pointer-events-none select-none"
        />
        <img
          src={siteConfig.assets.kolamRight}
          alt=""
          aria-hidden="true"
          width={220}
          height={225}
          loading="lazy"
          className="hidden lg:block absolute bottom-6 right-0 w-36 h-auto object-contain mix-blend-multiply opacity-20 pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          {/* Event Identity & Quick Action Bar */}
          <div className="bg-gradient-to-r from-[#f3f8fd] via-white to-[#f3f8fd] border border-[#dceaf8] rounded-xl p-5 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-sm text-[#4e4e4e]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#010101]">
                  <Calendar
                    className="w-4 h-4 text-[#6a4766] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.event.dates}</span>
                </span>

                <span className="hidden sm:inline text-[#88b2df]" aria-hidden="true">
                  ·
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    className="w-4 h-4 text-[#1b75bb] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    {siteConfig.event.hostInstitution} ({siteConfig.event.hostShort}), Telangana
                  </span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#505050]">
                <span className="font-serif-display italic text-[#6a4766] font-semibold">
                  “{siteConfig.event.theme}”
                </span>
                <span aria-hidden="true"> · </span>
                <span>{siteConfig.event.pillars.join(' · ')}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#6a4766] hover:bg-[#533550] rounded-md shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
              >
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a> */}

              <a
                href="/schedule"
                onClick={(e) => handleRouteLink(e, 'schedule', '/schedule')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1b75bb] bg-white hover:bg-[#dceaf8]/50 border border-[#7cb3ed] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
              >
                <span>View Schedule</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#1b75bb]">
                Symposium Identity & Theme
              </p>
              <h2
                id="about-symposium-heading"
                className="font-serif-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#010101] leading-tight"
              >
                {siteConfig.event.subtitle}
              </h2>
              <p className="font-serif-display italic text-xl text-[#6a4766]">
                “{siteConfig.event.theme}”
              </p>
              <p className="text-base text-[#4e4e4e] leading-relaxed">
                Hosted at{' '}
                <strong className="font-semibold text-[#010101]">
                  {siteConfig.event.hostInstitution} ({siteConfig.event.hostShort})
                </strong>{' '}
                on{' '}
                <strong className="font-semibold text-[#010101]">
                  {siteConfig.event.dates}
                </strong>
                , the HCIPAI Symposium 2027 convenes students, academicians,
                researchers, and industry professionals to examine interactive and
                immersive experiences across diverse disciplinary viewpoints.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-6 border-t border-[#dceaf8]">
                <img
                  src={siteConfig.assets.hcipaiLogo}
                  alt="HCIPAI Official Logo"
                  width={60}
                  height={60}
                  loading="lazy"
                  className="h-14 w-auto object-contain"
                />
                <img
                  src={siteConfig.assets.gcetLogo}
                  alt="Geethanjali College of Engineering and Technology Official Logo"
                  width={220}
                  height={52}
                  loading="lazy"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* Three Core Program Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <article className="bg-white/95 border border-[#dceaf8] rounded-xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#7cb3ed] transition-colors">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-lg bg-[#dceaf8]/60 flex items-center justify-center text-[#6a4766]">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif-display font-bold text-lg text-[#010101]">
                    Panel Discussions
                  </h3>
                  <p className="text-sm text-[#4e4e4e] leading-relaxed">
                    Multi-perspective discussions examining human-computer
                    interaction, cognitive ergonomics, and immersive technologies.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#dceaf8]/70">
                  <a
                    href="/panel-members"
                    onClick={(e) =>
                      handleRouteLink(e, 'panel-members', '/panel-members')
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b75bb] hover:text-[#6a4766] transition-colors"
                  >
                    <span>Explore Panelists</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>

              <article className="bg-white/95 border border-[#dceaf8] rounded-xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#7cb3ed] transition-colors">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-lg bg-[#dceaf8]/60 flex items-center justify-center text-[#1b75bb]">
                    <Layers className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif-display font-bold text-lg text-[#010101]">
                    Workshops
                  </h3>
                  <p className="text-sm text-[#4e4e4e] leading-relaxed">
                    Structured hands-on sessions for students, researchers, and
                    practitioners across interactive and spatial computing tracks.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#dceaf8]/70">
                  <a
                    href="/schedule"
                    onClick={(e) => handleRouteLink(e, 'schedule', '/schedule')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b75bb] hover:text-[#6a4766] transition-colors"
                  >
                    <span>Check Workshop Slots</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>

              <article className="bg-white/95 border border-[#dceaf8] rounded-xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#7cb3ed] transition-colors">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-lg bg-[#dceaf8]/60 flex items-center justify-center text-[#a355ba]">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif-display font-bold text-lg text-[#010101]">
                    Interactive Zones
                  </h3>
                  <p className="text-sm text-[#4e4e4e] leading-relaxed">
                    Live AR/VR demonstrations, research prototypes, and
                    experiential setups curated with the AR/VR Research Lab at GCET.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#dceaf8]/70">
                  <a
                    href="/venue-contact"
                    onClick={(e) =>
                      handleRouteLink(e, 'venue-contact', '/venue-contact')
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b75bb] hover:text-[#6a4766] transition-colors"
                  >
                    <span>AR/VR Research Lab Info</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Proposed Registration Fee + Register Now Action */}
      <section
        aria-labelledby="registration-fees-heading"
        className="relative py-16 sm:py-20 bg-[#f3f8fd] border-y border-[#dceaf8] overflow-hidden"
      >
        {/* Subtle Full-Width Paisley Watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full paisley-watermark-layer opacity-45 pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#6a4766]">
                Participation & Fee Structure
              </p>
              <h2
                id="registration-fees-heading"
                className="mt-1 font-serif-display font-bold text-2xl sm:text-3xl text-[#010101]"
              >
                {siteConfig.registrationFees.heading}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#505050]">
                Official symposium registration fees for students, academicians,
                professionals, and HCIPAI members.
              </p>
            </div>

            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#6a4766] hover:bg-[#533550] rounded-md shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] shrink-0"
            >
              <span>Register Now on IndiaHCI</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.registrationFees.tiers.map((tier) => (
              <div
                key={tier.id}
                className="bg-white/95 backdrop-blur-xs border border-[#dceaf8] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="pb-3 border-b border-[#dceaf8]">
                    <h3 className="font-serif-display font-bold text-xl text-[#6a4766]">
                      {tier.category}
                    </h3>
                    {(tier.deadline || tier.id === 'early-bird') && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm font-normal text-[#777777]">
                        <Calendar className="w-4 h-4 shrink-0 text-[#777777]" aria-hidden="true" />
                        <span>{tier.deadline || 'Registration open until 31st Jan'}</span>
                      </div>
                    )}
                  </div>
                  <dl className="mt-4 space-y-3.5">
                    {tier.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <dt className="text-sm font-medium text-[#4e4e4e]">
                          {item.participantType}
                        </dt>
                        <dd className="font-serif-display font-bold text-lg text-[#010101] shrink-0">
                          {item.fee}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-6 pt-3 border-t border-[#dceaf8]/60 flex items-center justify-between text-xs text-[#505050]">
                  <span>HCIPAI Symposium 2027</span>
                  {/* <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1b75bb] hover:text-[#6a4766] inline-flex items-center gap-1"
                  >
                    <span>Register</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Host Institution & Symposium Route Directory */}
      <section
        aria-labelledby="host-venue-heading"
        className="relative py-16 sm:py-22 bg-[#fbfcfe] overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-xl border border-[#dceaf8] bg-white shadow-xs">
                <img
                  src={siteConfig.assets.campusPhoto}
                  alt="Geethanjali College of Engineering and Technology (GCET) Main Campus Building and Lawn"
                  width={710}
                  height={470}
                  loading="lazy"
                  className="w-full h-auto block object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#1b75bb]">
                Host Campus & Organizing Venue
              </p>
              <h2
                id="host-venue-heading"
                className="font-serif-display font-bold text-2xl sm:text-3xl text-[#010101]"
              >
                {siteConfig.contact.institution}
              </h2>
              <p className="text-sm sm:text-base text-[#4e4e4e] leading-relaxed">
                <strong>Campus Address:</strong> {siteConfig.contact.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
