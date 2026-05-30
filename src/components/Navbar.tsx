"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export const Navbar = () => {
  const [downloadText, setDownloadText] = useState("Download");

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod|android/i.test(ua)) {
      setDownloadText("Download");
    } else if (/macintosh|mac os x/i.test(ua)) {
      setDownloadText("Download — Mac");
    } else if (/windows|win32/i.test(ua)) {
      setDownloadText("Download — Windows");
    } else {
      setDownloadText("Download");
    }
  }, []);

  return (
    <nav className="w-full top-0 bg-surface-bright/80 backdrop-blur-md sticky z-50">
      <div className="max-w-[1200px] mx-auto px-gutter flex justify-between items-center h-20">
        <div className="flex items-center gap-md">
          <Image
            src="/fav.png"
            alt="Hyper Logo"
            width={32}
            height={32}
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <span className="text-2xl font-bold text-on-surface">
              HYPER
            </span>
            <span className="text-[10px] md:text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-primary/20 w-fit">
              ★ 4.9 on Product Hunt
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-lg text-base">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="#demo"
          >
            How It Works
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="#pricing"
          >
            Pricing
          </a>
        </div>
        <div className="flex items-center">
          <a
            href="#pricing"
            className="btn-gradient font-medium text-sm px-6 py-3 rounded-full cursor-pointer inline-flex items-center justify-center transition-all"
          >
            {downloadText}
          </a>
        </div>
      </div>
    </nav>
  );
};

