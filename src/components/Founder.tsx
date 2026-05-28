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
          <div className="text-center mb-lg">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              From the Founder
            </h2>
            <h3 className="text-3xl font-normal text-on-surface">
              Why We Built Hyper
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
              <h4 className="text-xl font-semibold text-on-surface mb-3 flex items-center gap-2">
                Hey, Explorer!
              </h4>

              <p className="text-base leading-relaxed mb-4">
                I'm Aditya, the creator of Hyper. I've built this application to solve a problem that almost all of us face in today's digital workspaces—<b>too much theater around productivity.</b>
              </p>

              <p className="text-base leading-relaxed mb-4">
                I learned early on that <b>deep, uninterrupted creative flow is a goldmine of opportunities</b>. But most productivity tools just show <i>vanity metrics</i>. They force you to start and stop timers, manually log tasks, and act like you are working, rather than letting you actually work.
              </p>

              <h5 className="font-semibold text-on-surface mb-3">
                So I built Hyper for 3 reasons:
              </h5>

              <ol className="flex flex-col gap-3.5 pl-1 mb-6 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold text-primary text-base">1.</span>
                  <div>
                    <span className="font-bold text-on-surface">Find your true cognitive peak</span>, identifying exactly when your mind is at its peak focus capacity.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary text-base">2.</span>
                  <div>
                    <span className="font-bold text-on-surface">Eliminate timer fatigue</span>, completely replacing manual tracking sheets and start-stop switches.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary text-base">3.</span>
                  <div>
                    <span className="font-bold text-on-surface">Discover context-switching costs</span>, laying bare exactly how much attention is leaked during micro-distractions.
                  </div>
                </li>
              </ol>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
