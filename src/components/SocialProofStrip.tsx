"use client";

import React from "react";
import { ScrollReveal } from "./ScrollReveal";

export const SocialProofStrip = () => {
  const testimonials = [
    {
      quote: "I had no idea I was spending 3 hours a day context-switching. Hyper showed me in the first week.",
      author: "Marcus T.",
      role: "Freelance Designer",
    },
    {
      quote: "Finally deleted Toggl. This just works.",
      author: "Priya S.",
      role: "Product Manager",
    },
    {
      quote: "Feels like having a productivity coach running in the background.",
      author: "James K.",
      role: "Software Engineer",
    },
  ];

  return (
    <section className="bg-surface-container-low py-12 border-y border-outline-variant/10 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-gutter relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest/40 backdrop-blur-sm border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/30 hover:bg-surface-container-lowest/80 transition-all duration-300 group flex flex-col justify-between"
              >
                <p className="text-sm md:text-base text-on-surface-variant italic leading-relaxed mb-4 group-hover:text-on-surface transition-colors duration-300">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-1.5 h-6 bg-primary rounded-full group-hover:scale-y-110 transition-transform"></div>
                  <div>
                    <h5 className="font-semibold text-xs md:text-sm text-on-surface">
                      {t.author}
                    </h5>
                    <p className="text-[10px] md:text-xs text-on-surface-variant font-medium">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
