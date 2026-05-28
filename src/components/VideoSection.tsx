"use client";

import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/* Product Pillars Copy */}
      <section className="max-w-[1200px] mx-auto px-gutter py-xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-normal text-on-surface mb-md">
            Zero Friction. Focus Stability. Deep Clarity.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-[672px] mx-auto leading-relaxed">
            Hyper is designed to be invisible. It runs quietly in the background,
            requiring no manual input, ensuring your creative flow remains entirely
            uninterrupted while gathering the insights you need to optimize your
            day.
          </p>
        </ScrollReveal>
      </section>

      {/* Intro Video Card Container */}
      <section id="demo" className="max-w-[1200px] mx-auto px-gutter py-xl scroll-mt-24">
        <ScrollReveal delay={150}>
          <div
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-full aspect-video bg-surface-variant rounded-2xl relative overflow-hidden group cursor-pointer ambient-shadow flex items-center justify-center border border-outline-variant/10"
          >
            {isPlaying ? (
              <div className="absolute inset-0 bg-inverse-surface/90 flex flex-col items-center justify-center text-inverse-on-surface p-4 transition-all duration-300">
                <span className="material-symbols-outlined text-6xl text-primary animate-pulse mb-4">
                  motion_photos_on
                </span>
                <h3 className="text-xl font-medium mb-1">
                  Demo Playback Simulation
                </h3>
                <p className="text-sm text-surface-variant max-w-[448px] text-center">
                  In a production environment, this triggers a high-fidelity
                  interactive workflow visualization showing background tracking.
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-full text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer">
                  Pause Demo
                </button>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-surface-tint/10 transition-opacity group-hover:opacity-20 duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-primary/90 text-on-primary w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-110 duration-300 shadow-lg cursor-pointer">
                    <span className="material-symbols-outlined text-4xl ml-2">
                      play_arrow
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
