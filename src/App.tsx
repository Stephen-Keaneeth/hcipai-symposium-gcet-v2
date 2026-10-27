/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback } from 'react';
import {
  RouteId,
  SiteConfig,
  ScheduleData,
  PanelMembersData,
  CommitteeData,
  initialSymposiumBundle,
  normalizeSiteConfig,
  normalizeScheduleData,
  normalizePanelMembersData,
  normalizeCommitteeData,
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

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(
    initialSymposiumBundle.siteConfig
  );
  const [scheduleData, setScheduleData] = useState<ScheduleData>(
    initialSymposiumBundle.schedule
  );
  const [panelData, setPanelData] = useState<PanelMembersData>(
    initialSymposiumBundle.panelMembers
  );
  const [committeeData, setCommitteeData] = useState<CommitteeData>(
    initialSymposiumBundle.committee
  );

  // Fetch live JSON files from /data/*.json on load so edits to JSON files reflect after reload
  useEffect(() => {
    let isMounted = true;

    async function loadLiveJsonData() {
      try {
        const [cfgRes, schedRes, panelRes, commRes] = await Promise.allSettled([
          fetch('/data/site-config.json', { cache: 'no-store' }),
          fetch('/data/schedule.json', { cache: 'no-store' }),
          fetch('/data/panel-members.json', { cache: 'no-store' }),
          fetch('/data/committee.json', { cache: 'no-store' }),
        ]);

        if (!isMounted) return;

        if (cfgRes.status === 'fulfilled' && cfgRes.value.ok) {
          const json = await cfgRes.value.json();
          if (isMounted) setSiteConfig(normalizeSiteConfig(json));
        }
        if (schedRes.status === 'fulfilled' && schedRes.value.ok) {
          const json = await schedRes.value.json();
          if (isMounted) setScheduleData(normalizeScheduleData(json));
        }
        if (panelRes.status === 'fulfilled' && panelRes.value.ok) {
          const json = await panelRes.value.json();
          if (isMounted) setPanelData(normalizePanelMembersData(json));
        }
        if (commRes.status === 'fulfilled' && commRes.value.ok) {
          const json = await commRes.value.json();
          if (isMounted) setCommitteeData(normalizeCommitteeData(json));
        }
      } catch {
        // Fallback to bundled JSON data if network fetch is unavailable
      }
    }

    loadLiveJsonData();
    return () => {
      isMounted = false;
    };
  }, []);

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
