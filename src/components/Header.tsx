import React, { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Users,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { NavItem, RouteId, SiteConfig } from '../utils/symposiumData';

interface HeaderProps {
  siteConfig: SiteConfig;
  activeRoute: RouteId;
  onNavigate: (route: RouteId, path: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EXPLORE_ROUTES: {
  id: RouteId;
  label: string;
  path: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  {
    id: 'panel-members',
    label: 'Panel Members',
    path: '/panel-members',
    subtitle: 'Distinguished speakers & panel perspectives',
    icon: Users,
  },
  {
    id: 'organizing-committee',
    label: 'Organizing Committee',
    path: '/organizing-committee',
    subtitle: 'GCET & XR Research Lab leadership',
    icon: ShieldCheck,
  },
  {
    id: 'venue-contact',
    label: 'Venue & Contact',
    path: '/venue-contact',
    subtitle: 'Campus address, directions & XR Lab inquiries',
    icon: MapPin,
  },
];

export const Header: React.FC<HeaderProps> = ({
  siteConfig,
  activeRoute,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const exploreContainerRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const isExploreRouteActive =
    activeRoute === 'panel-members' ||
    activeRoute === 'organizing-committee' ||
    activeRoute === 'venue-contact';

  const registrationUrl =
    siteConfig.registrationFees.registrationUrl ||
    'https://account.indiahci.org/auth';

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (exploreOpen) {
          setExploreOpen(false);
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          toggleBtnRef.current?.focus();
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        exploreContainerRef.current &&
        !exploreContainerRef.current.contains(event.target as Node)
      ) {
        setExploreOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [exploreOpen, mobileMenuOpen, setMobileMenuOpen]);

  const handleRouteSelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    routeId: RouteId,
    path: string
  ) => {
    e.preventDefault();
    onNavigate(routeId, path);
    setExploreOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('home', '/');
    setExploreOpen(false);
    setMobileMenuOpen(false);
  };

  const homeItem: NavItem = siteConfig.navigation.find(
    (n) => n.id === 'home'
  ) || { id: 'home', label: 'Home', path: '/' };

  const scheduleItem: NavItem = siteConfig.navigation.find(
    (n) => n.id === 'schedule'
  ) || { id: 'schedule', label: 'Schedule', path: '/schedule' };

  const isHomeTop = activeRoute === 'home' && !isScrolled && !mobileMenuOpen;

  return (
    <header
      role="banner"
      className={`${
        activeRoute === 'home' ? 'fixed' : 'sticky'
      } top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isHomeTop
          ? 'bg-gradient-to-b from-white/90 via-white/55 to-transparent border-b border-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-[#dceaf8] shadow-2xs'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Left: Full Institutional & Symposium Brand Lockup */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <a
            href="/"
            onClick={handleLogoClick}
            aria-label="HCIPAI Symposium 2027 — Return to Home page"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b75bb] rounded-sm"
          >
            <img
              src={siteConfig.assets.hcipaiLogo}
              alt="HCIPAI Logo"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-serif-display font-bold text-base sm:text-xl tracking-tight text-[#010101] group-hover:text-[#6a4766] transition-colors truncate">
                {siteConfig.event.title}
              </span>
              <span className="text-xs font-medium text-[#505050] truncate">
                {siteConfig.event.dates} · {siteConfig.event.hostShort}, Telangana
              </span>
            </div>
          </a>

          <span
            className="hidden md:block h-8 w-px bg-[#7cb3ed]/50"
            aria-hidden="true"
          />

          <a
            href="/"
            onClick={handleLogoClick}
            aria-label="Geethanjali College of Engineering and Technology — Home"
            className="hidden md:flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b75bb] rounded-sm"
          >
            <img
              src={siteConfig.assets.gcetLogo}
              alt="Geethanjali College of Engineering and Technology Logo"
              width={195}
              height={48}
              className="h-9 lg:h-11 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Desktop Primary Navigation with Explore Dropdown + Register Now */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-3 xl:gap-6"
        >
          {/* Home Link */}
          <a
            href={homeItem.path}
            onClick={(e) => handleRouteSelect(e, homeItem.id, homeItem.path)}
            aria-current={activeRoute === 'home' ? 'page' : undefined}
            className={`relative px-3.5 py-2 text-base font-medium transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] ${
              activeRoute === 'home'
                ? 'text-[#6a4766] font-semibold'
                : 'text-[#010101] hover:text-[#1b75bb]'
            }`}
          >
            {homeItem.label}
            <span
              aria-hidden="true"
              className={`absolute left-3.5 right-3.5 bottom-0.5 h-[2px] transition-all duration-200 ${
                activeRoute === 'home'
                  ? 'bg-[#6a4766] opacity-100'
                  : 'bg-[#1b75bb] opacity-0'
              }`}
            />
          </a>

          {/* Schedule Link */}
          <a
            href={scheduleItem.path}
            onClick={(e) =>
              handleRouteSelect(e, scheduleItem.id, scheduleItem.path)
            }
            aria-current={activeRoute === 'schedule' ? 'page' : undefined}
            className={`relative px-3.5 py-2 text-base font-medium transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] ${
              activeRoute === 'schedule'
                ? 'text-[#6a4766] font-semibold'
                : 'text-[#010101] hover:text-[#1b75bb]'
            }`}
          >
            {scheduleItem.label}
            <span
              aria-hidden="true"
              className={`absolute left-3.5 right-3.5 bottom-0.5 h-[2px] transition-all duration-200 ${
                activeRoute === 'schedule'
                  ? 'bg-[#6a4766] opacity-100'
                  : 'bg-[#1b75bb] opacity-0'
              }`}
            />
          </a>

          {/* Explore Dropdown Menu (Panel Members, Organizing Committee, Venue & Contact) */}
          <div ref={exploreContainerRef} className="relative">
            <button
              type="button"
              onClick={() => setExploreOpen((prev) => !prev)}
              aria-expanded={exploreOpen}
              aria-haspopup="true"
              className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 text-base font-medium transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] cursor-pointer ${
                isExploreRouteActive || exploreOpen
                  ? 'text-[#6a4766] font-semibold'
                  : 'text-[#010101] hover:text-[#1b75bb]'
              }`}
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  exploreOpen ? 'rotate-180 text-[#6a4766]' : ''
                }`}
                aria-hidden="true"
              />
              <span
                aria-hidden="true"
                className={`absolute left-3.5 right-3.5 bottom-0.5 h-[2px] transition-all duration-200 ${
                  isExploreRouteActive
                    ? 'bg-[#6a4766] opacity-100'
                    : 'bg-[#1b75bb] opacity-0'
                }`}
              />
            </button>

            {exploreOpen && (
              <div
                role="menu"
                aria-label="Explore Symposium Pages"
                className="absolute right-0 mt-2 w-80 rounded-xl bg-white/98 backdrop-blur-xl border border-[#dceaf8] shadow-xl py-2 z-50"
              >
                {EXPLORE_ROUTES.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = activeRoute === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      role="menuitem"
                      onClick={(e) => handleRouteSelect(e, item.id, item.path)}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`flex items-start gap-3.5 px-4 py-3 transition-colors ${
                        isCurrent
                          ? 'bg-[#f3f8fd] text-[#6a4766]'
                          : 'text-[#010101] hover:bg-[#f3f8fd]/70 hover:text-[#1b75bb]'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isCurrent
                            ? 'bg-[#6a4766] text-white'
                            : 'bg-[#dceaf8]/60 text-[#1b75bb]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {item.label}
                        </span>
                        <span className="block text-xs text-[#505050] mt-0.5">
                          {item.subtitle}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Register Now CTA Button */}
          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#6a4766] hover:bg-[#533550] rounded-md shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb] whitespace-nowrap"
          >
            <span>Register Now</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </nav>

        {/* Mobile Hamburger Control */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={
            mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-[#010101] hover:text-[#6a4766] hover:bg-[#dceaf8]/40 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b75bb]"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden border-t border-[#dceaf8] bg-white/98 backdrop-blur-lg shadow-xl"
        >
          <nav
            aria-label="Mobile Navigation"
            className="max-w-[1440px] mx-auto px-4 pt-3 pb-6 flex flex-col gap-1.5"
          >
            <a
              href={homeItem.path}
              onClick={(e) => handleRouteSelect(e, homeItem.id, homeItem.path)}
              aria-current={activeRoute === 'home' ? 'page' : undefined}
              className={`flex items-center justify-between min-h-[44px] px-4 py-2.5 text-base rounded-md transition-colors ${
                activeRoute === 'home'
                  ? 'bg-[#dceaf8]/60 text-[#6a4766] font-semibold border-l-4 border-[#6a4766]'
                  : 'text-[#010101] hover:bg-[#dceaf8]/30 font-medium'
              }`}
            >
              <span>{homeItem.label}</span>
            </a>

            <a
              href={scheduleItem.path}
              onClick={(e) =>
                handleRouteSelect(e, scheduleItem.id, scheduleItem.path)
              }
              aria-current={activeRoute === 'schedule' ? 'page' : undefined}
              className={`flex items-center justify-between min-h-[44px] px-4 py-2.5 text-base rounded-md transition-colors ${
                activeRoute === 'schedule'
                  ? 'bg-[#dceaf8]/60 text-[#6a4766] font-semibold border-l-4 border-[#6a4766]'
                  : 'text-[#010101] hover:bg-[#dceaf8]/30 font-medium'
              }`}
            >
              <span>{scheduleItem.label}</span>
            </a>

            <div className="pt-2 pb-1 px-4 text-xs font-semibold uppercase tracking-wider text-[#505050]">
              Explore Symposium
            </div>

            {EXPLORE_ROUTES.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleRouteSelect(e, item.id, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between min-h-[44px] px-4 py-2.5 text-base rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#dceaf8]/60 text-[#6a4766] font-semibold border-l-4 border-[#6a4766]'
                      : 'text-[#4e4e4e] hover:bg-[#dceaf8]/30 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            <div className="mt-3 pt-4 border-t border-[#dceaf8] px-4 flex flex-col gap-3">
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 text-base font-semibold text-white bg-[#6a4766] hover:bg-[#533550] rounded-md shadow-xs transition-colors"
              >
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>

              <div className="flex items-center justify-between pt-1">
                <img
                  src={siteConfig.assets.gcetLogo}
                  alt="Geethanjali College of Engineering and Technology Logo"
                  width={150}
                  height={36}
                  className="h-7 w-auto object-contain"
                />
                <span className="text-xs text-[#505050]">
                  {siteConfig.event.dates}
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
