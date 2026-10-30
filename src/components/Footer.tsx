import React from 'react';
import { Mail, MapPin, ExternalLink, Instagram } from 'lucide-react';
import { NavItem, RouteId, SiteConfig } from '../utils/symposiumData';

interface FooterProps {
  siteConfig: SiteConfig;
  activeRoute: RouteId;
  onNavigate: (route: RouteId, path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  siteConfig,
  activeRoute,
  onNavigate,
}) => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    onNavigate(item.id, item.path);
  };

  const registrationUrl =
    siteConfig.registrationFees.registrationUrl ||
    'https://account.indiahci.org/auth';

  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-b from-[#fbfcfe] to-[#f1f6fc] border-t border-[#dceaf8] text-[#4e4e4e] mt-auto"
      role="contentinfo"
    >
      {/* Subtle Full-Bleed Paisley & Skyline Background Watermarks (No Dedicated Placeholder Space) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full paisley-watermark-layer opacity-40 pointer-events-none select-none"
      />
      <img
        src={siteConfig.assets.bannerSkyline}
        alt=""
        aria-hidden="true"
        width={1600}
        height={443}
        loading="lazy"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-auto object-contain mix-blend-multiply opacity-20 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Col 1: Brand & Host Institution */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-wrap items-center gap-5">
              <img
                src={siteConfig.assets.hcipaiLogo}
                alt="HCIPAI Logo"
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-auto object-contain"
              />
              <img
                src={siteConfig.assets.gcetLogo}
                alt="Geethanjali College of Engineering and Technology Logo"
                width={210}
                height={50}
                loading="lazy"
                className="h-11 w-auto object-contain"
              />
            </div>

            <div className="pt-1 space-y-1.5">
              <p className="font-serif-display font-bold text-lg text-[#010101]">
                {siteConfig.event.title} — {siteConfig.event.subtitle}
              </p>
              <p className="font-serif-display italic text-[#6a4766] text-base">
                “{siteConfig.event.theme}”
              </p>
              <p className="text-sm text-[#505050]">
                {siteConfig.event.dates} · Hosted at{' '}
                {siteConfig.event.hostInstitution} ({siteConfig.event.hostShort})
              </p>
            </div>

            {/* <div className="pt-2">
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#6a4766] hover:bg-[#533550] rounded-md shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
              >
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div> */}
          </div>

          {/* Col 2: Symposium Pages */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-serif-display font-semibold text-base text-[#010101] tracking-wide">
              Symposium Navigation
            </h2>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => {
                const isActive = activeRoute === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-block text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] rounded-sm ${isActive
                          ? 'text-[#6a4766] font-semibold underline underline-offset-4'
                          : 'text-[#4e4e4e] hover:text-[#1b75bb]'
                        }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Official Venue & AR/VR Lab Contact */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-serif-display font-semibold text-base text-[#010101] tracking-wide">
              Venue & AR/VR Research Lab Contact
            </h2>
            <div className="space-y-2.5 text-sm text-[#4e4e4e]">
              <p className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 text-[#1b75bb] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-[#010101] block">
                    {siteConfig.contact.institution}
                  </strong>
                  {siteConfig.contact.address}
                </span>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail
                  className="w-4 h-4 text-[#6a4766] shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Email:{' '}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[#1b75bb] hover:text-[#6a4766] font-medium underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </span>
              </p>

              <p className="flex items-center gap-2.5">
                <Instagram
                  className="w-4 h-4 text-[#a355ba] shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Instagram:{' '}
                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1b75bb] hover:text-[#6a4766] font-medium underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
                  >
                    @{siteConfig.contact.instagramHandle}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#dceaf8]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#505050]">
          <p>
            © {siteConfig.event.year} {siteConfig.event.title} ·{' '}
            {siteConfig.event.hostInstitution} ({siteConfig.event.hostShort}).
          </p>
          <p>Panel discussions · Workshops · Interactive Zones</p>
        </div>
      </div>
    </footer>
  );
};
