/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback } from 'react';
import {
  RouteId,
  initialSymposiumBundle,
  resolveRouteFromPath,
  getPathForRoute,
} from './utils/symposiumData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { PanelMembersPage } from './pages/PanelMembersPage';
import { OrganizingCommitteePage } from './pages/OrganizingCommitteePage';
import { VenueContactPage } from './pages/VenueContactPage';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<RouteId>(() =>
    resolveRouteFromPath(
      window.location.pathname,
      window.location.search,
      window.location.hash
    )
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const {
    siteConfig,
    schedule: scheduleData,
    panelMembers: panelData,
    committee: committeeData,
  } = initialSymposiumBundle;

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveRouteFromPath(
        window.location.pathname,
        window.location.search,
        window.location.hash
      );
      setActiveRoute(resolved);
      setMobileMenuOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update document title on route change
  useEffect(() => {
    const currentNav = siteConfig.navigation.find((n) => n.id === activeRoute);
    const pageLabel = currentNav ? currentNav.label : 'Home';
    document.title =
      activeRoute === 'home'
        ? `${siteConfig.event.title} — ${siteConfig.event.hostShort}`
        : `${pageLabel} | ${siteConfig.event.title} — ${siteConfig.event.hostShort}`;
  }, [activeRoute, siteConfig]);

  const handleNavigate = useCallback((route: RouteId, path?: string) => {
    const targetPath = path || getPathForRoute(route);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ route }, '', targetPath);
    }
    setActiveRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfe] text-[#010101]">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#6a4766] focus:text-white focus:rounded-md focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header
        siteConfig={siteConfig}
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main id="main-content" className="flex-1 flex flex-col">
        {activeRoute === 'home' && (
          <HomePage siteConfig={siteConfig} onNavigate={handleNavigate} />
        )}
        {activeRoute === 'schedule' && (
          <SchedulePage
            siteConfig={siteConfig}
            scheduleData={scheduleData}
          />
        )}
        {activeRoute === 'panel-members' && (
          <PanelMembersPage
            siteConfig={siteConfig}
            panelData={panelData}
          />
        )}
        {activeRoute === 'organizing-committee' && (
          <OrganizingCommitteePage
            siteConfig={siteConfig}
            committeeData={committeeData}
          />
        )}
        {activeRoute === 'venue-contact' && (
          <VenueContactPage siteConfig={siteConfig} />
        )}
      </main>

      <Footer
        siteConfig={siteConfig}
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
