"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [downloadText, setDownloadText] = useState("Download");
  const [deviceWord, setDeviceWord] = useState("computer");

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod|android/i.test(ua)) {
      setDownloadText("Download");
      setDeviceWord("device");
    } else if (/macintosh|mac os x/i.test(ua)) {
      setDownloadText("Download for Mac");
      setDeviceWord("Mac");
    } else if (/windows|win32/i.test(ua)) {
      setDownloadText("Download for Windows");
      setDeviceWord("PC");
    } else {
      setDownloadText("Download");
      setDeviceWord("computer");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const elementHeight = window.innerHeight * 0.8; // 80vh visual height

      // Progress completes smoothly over 60% of the element's height scroll distance
      const progress = scrollTop / (elementHeight * 0.6);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-start bg-surface-container-low px-gutter pt-8 md:pt-12"
    >
      <div className="max-w-[1200px] w-full flex flex-col items-center text-center relative h-full justify-start pt-4 md:pt-8">

        {/* Centered Hero Copy (Blurs and fades as scroll happens) */}
        <div
          className="relative z-10 flex flex-col gap-md max-w-[850px] items-center pb-4 transition-all duration-75 ease-out"
          style={{
            filter: `blur(${scrollProgress * 16}px)`,
            opacity: 1 - scrollProgress * 0.8,
            transform: `translateY(${scrollProgress * 60}px)`,
          }}
        >
          <h1 className="text-4xl md:text-[56px] font-light text-on-surface leading-tight tracking-tight">
            You work all day.
            <br />
            But where does it actually go?
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant max-w-[600px] leading-relaxed mx-auto mt-2">
            Hyper runs silently in the background and shows you
            exactly how your time is spent — no timers, no logging,
            no effort required.
          </p>
          <div className="flex flex-col items-center gap-4 mt-3">
            <div className="flex flex-wrap items-center justify-center gap-sm">
              <a
                href="#pricing"
                className="btn-gradient font-medium text-xs md:text-sm px-6 md:px-8 py-3 rounded-full cursor-pointer inline-flex items-center justify-center transition-all"
              >
                {downloadText}
              </a>
              <a
                href="#demo"
                className="border border-primary/20 text-primary font-medium text-xs md:text-sm px-6 md:px-8 py-3 rounded-full hover:bg-primary/5 transition-all cursor-pointer inline-flex items-center justify-center"
              >
                See how it works ↓
              </a>
            </div>
            <p className="text-xs text-on-surface-variant/80 tracking-wide mt-1 flex items-center gap-1.5 justify-center flex-wrap">
              <span>⬇ 2,400 downloads</span>
              <span className="opacity-40">•</span>
              <span>No account needed</span>
              <span className="opacity-40">•</span>
              <span>Your data never leaves your {deviceWord}</span>
            </p>
          </div>
        </div>

        {/* Centered Dashboard Image (Relative flow on load, pushes up overlay on scroll) */}
        <div
          className="relative w-full max-w-[960px] mx-auto mt-4 flex justify-center p-md pb-0 pt-lg ambient-shadow z-20 transition-all duration-75 ease-out origin-bottom"
          style={{
            transform: `translateY(${(0 - scrollProgress * 0.8) * 100}%) scale(${1 + scrollProgress * 0.01})`,
          }}
        >
          <Image
            alt="Hyper Dashboard Screenshot"
            className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)] rounded-t-xl"
            src="/hero.png"
            width={960}
            height={600}
            priority
          />
        </div>

      </div>
    </section>
  );
};
