"use client";

import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/* Zero Friction Section */}
      <section className="max-w-[800px] mx-auto px-gutter py-xl text-center flex flex-col items-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-light text-on-surface mb-md">
            Set it up in 60 seconds. Then forget it exists.
          </h2>
          <p className="text-base md:text-lg text-on-surface-variant max-w-[672px] mx-auto leading-relaxed mb-6">
            Hyper asks for nothing. No projects to create, no 
            categories to label, no habits to build. Open it once, 
            grant permissions, and it starts working. Come back at 
            the end of the day to see what it found.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-on-surface-variant font-medium">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>No account required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>All data stays on your computer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Works with every app automatically</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Demo Video */}
      <section id="demo" className="max-w-[1200px] mx-auto px-gutter py-xl scroll-mt-24 text-center">
        <ScrollReveal delay={100} className="mb-8">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
            SEE IT IN ACTION
          </span>
          <h2 className="text-3xl font-normal text-on-surface mb-xs max-w-[650px] mx-auto leading-tight">
            90 seconds. That's all it takes to understand your whole week.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="w-full aspect-video rounded-2xl overflow-hidden ambient-shadow border border-outline-variant/10 relative group">
            {!isPlaying ? (
              /* Thumbnail overlay with play button */
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                {/* YouTube thumbnail */}
                <img
                  src="https://img.youtube.com/vi/FLb1hkzn7BA/maxresdefault.jpg"
                  alt="Hyper Demo Video"
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-primary w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-xl cursor-pointer">
                    <span className="material-symbols-outlined text-4xl ml-1 text-white">
                      play_arrow
                    </span>
                  </button>
                </div>
                {/* Watch demo label */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-4 py-1.5 rounded-full">
                    Watch Demo
                  </span>
                </div>
              </div>
            ) : (
              /* Actual YouTube embed */
              <iframe
                src="https://www.youtube.com/embed/FLb1hkzn7BA?autoplay=1&rel=0&modestbranding=1&color=white"
                title="Hyper Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant/80 mt-4 max-w-[500px] mx-auto leading-relaxed">
            No voiceover, no scripted workflow — just a real Hyper 
            session running on a real computer.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
};
