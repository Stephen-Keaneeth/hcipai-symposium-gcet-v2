import React from 'react';
import { SiteConfig } from '../utils/symposiumData';

interface PageHeroProps {
  kicker: string;
  title: string;
  subtitle: string;
  siteConfig: SiteConfig;
}

export const PageHero: React.FC<PageHeroProps> = ({
  kicker,
  title,
  subtitle,
  siteConfig,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f7fafe] to-[#fbfcfe] border-b border-[#dceaf8]/80">
      {/* Continuous Full-Width Edge-to-Edge Paisley Watermark (Zero Right Gap) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full paisley-watermark-layer paisley-fade-mask opacity-85 pointer-events-none select-none"
      />

      {/* Subtle Architectural Skyline Watermark Blended in Background */}
      <img
        src={siteConfig.assets.bannerSkyline}
        alt=""
        aria-hidden="true"
        width={1600}
        height={443}
        className="hidden md:block absolute bottom-0 right-0 w-[680px] lg:w-[820px] max-w-none h-auto object-contain mix-blend-multiply opacity-25 pointer-events-none select-none"
      />

      {/* Subtle Left Kolam Corner Accent */}
      <img
        src={siteConfig.assets.kolamLeft}
        alt=""
        aria-hidden="true"
        width={160}
        height={164}
        className="hidden lg:block absolute bottom-0 left-0 w-24 xl:w-28 h-auto object-contain mix-blend-multiply opacity-35 pointer-events-none select-none"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#6a4766] tracking-wider uppercase mb-3">
            <span>{kicker}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#1b75bb]">{siteConfig.event.dates}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#505050]">{siteConfig.event.hostShort}</span>
          </div>

          <h1 className="font-serif-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#010101] tracking-tight leading-tight">
            {title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#4e4e4e] leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
