"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Call resize on image load or transition events
    const resizeHandler = () => {
      lenis.resize();
    };

    window.addEventListener("load", resizeHandler);
    window.addEventListener("resize", resizeHandler);
    
    // Set a periodic resize interval to update height as Next.js finishes hydrates
    const interval = setInterval(resizeHandler, 1000);

    return () => {
      lenis.destroy();
      window.removeEventListener("load", resizeHandler);
      window.removeEventListener("resize", resizeHandler);
      clearInterval(interval);
    };
  }, []);

  return null;
};
