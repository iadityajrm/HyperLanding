"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export const Founder = () => {
  // Gracefully fallback to a styled brand placeholder avatar if the user hasn't added profile.png yet
  const [imgSrc, setImgSrc] = useState("/profile.png");
  const [location, setLocation] = useState({ country: "India", flag: "🇮🇳" });

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_name) {
          let emoji = "🌐";
          if (data.country_code) {
            const codePoints = data.country_code
              .toUpperCase()
              .split("")
              .map((char: string) => 127397 + char.charCodeAt(0));
            try {
              emoji = String.fromCodePoint(...codePoints);
            } catch (e) {
              console.error("Flag emoji compilation failed:", e);
            }
          }
          setLocation({ country: data.country_name, flag: emoji });
        }
      })
      .catch((err) => {
        console.warn("Dynamic geolocation lookup failed, falling back to default.", err);
      });
  }, []);

  return (
    <section className="bg-surface py-xl border-t border-outline-variant/10">
      <div className="max-w-[960px] mx-auto px-gutter">
        <ScrollReveal>
          <div className="text-center mb-lg flex flex-col items-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              FROM THE FOUNDER
            </span>
            <h3 className="text-3xl font-normal text-on-surface max-w-[650px] mx-auto leading-tight">
              I built Hyper because I kept lying to myself about how I spent my time.
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-lg items-start mt-8">
          {/* Left Column: Avatar/Profile Card */}
          <div className="md:col-span-4 flex justify-center">
            <ScrollReveal delay={100} className="w-full max-w-[260px]">
              <div className="bg-surface-container-low rounded-[24px] p-5 border border-outline-variant/30 flex flex-col items-center text-center shadow-sm">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-surface-container flex items-center justify-center border border-outline-variant/20">
                  <img
                    src={imgSrc}
                    alt="Aditya - Founder of Hyper"
                    className="w-full h-full object-cover"
                    onError={() => setImgSrc("/fav.png")}
                  />
                </div>
                <h4 className="font-semibold text-base text-on-surface mt-4">
                  Aditya
                </h4>
                <p className="text-xs text-primary font-medium mt-1">
                  Creator of Hyper
                </p>
                <div className="w-full border-t border-outline-variant/30 my-3"></div>
                <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-xs text-primary">
                    local_fire_department
                  </span>
                  <span>Building in public</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Founder's Note */}
          <div className="md:col-span-8 flex flex-col text-[#50453b]">
            <ScrollReveal delay={200}>
              <div className="text-base md:text-lg leading-relaxed flex flex-col gap-4 text-on-surface-variant">
                <p>
                  I'm Aditya. I'd end every day feeling busy but not done.
                </p>
                <p>
                  I tried timers, journals, habit trackers. All of them 
                  needed me to remember to use them — which meant I forgot.
                </p>
                <p>
                  So I built something that just watches, and tells me the 
                  truth. No input. No streaks. No guilt.
                </p>
                <p className="font-semibold text-on-surface text-lg mt-2">
                  That's Hyper.
                </p>
                <p className="font-medium text-primary mt-2">
                  — Aditya, Creator of Hyper
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
