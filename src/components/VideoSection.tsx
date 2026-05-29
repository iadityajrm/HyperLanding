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

      {/* Demo Video */}
      <section id="demo" className="max-w-[1200px] mx-auto px-gutter py-xl scroll-mt-24">
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
        </ScrollReveal>
      </section>
    </>
  );
};
