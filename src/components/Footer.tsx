"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const [downloadText, setDownloadText] = useState("Download Now");
  const [alsoAvailableText, setAlsoAvailableText] = useState("");

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod|android/i.test(ua)) {
      setDownloadText("Download Now");
      setAlsoAvailableText("Available on macOS and Windows");
    } else if (/macintosh|mac os x/i.test(ua)) {
      setDownloadText("Download Now for Mac");
      setAlsoAvailableText("Also available on Windows");
    } else if (/windows|win32/i.test(ua)) {
      setDownloadText("Download Now for Windows");
      setAlsoAvailableText("Also available on macOS");
    } else {
      setDownloadText("Download Now");
      setAlsoAvailableText("Available on macOS and Windows");
    }
  }, []);

  return (
    <footer className="w-full bg-surface border-t border-outline-variant/20 flex flex-col items-center justify-center text-center px-gutter">
      {/* Final CTA Block */}
      <div className="w-full max-w-[1200px] mx-auto py-16 border-b border-outline-variant/10 flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-light text-on-surface leading-tight">
          Your most productive self is already in there.
        </h2>
        <p className="text-base text-on-surface-variant max-w-[500px]">
          Hyper just helps you find it.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a
            href="#pricing"
            className="btn-gradient font-medium text-sm px-8 py-4 rounded-full cursor-pointer inline-flex items-center justify-center transition-all shadow-md hover:scale-105"
          >
            {downloadText}
          </a>
          {alsoAvailableText && (
            <p className="text-[11px] text-primary/70 font-semibold tracking-wide flex items-center gap-1 mt-1">
              <span>ℹ</span>
              <span>{alsoAvailableText}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 max-w-[600px] w-full py-xl">
        {/* Centered Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/fav.png"
            alt="Hyper Logo"
            width={40}
            height={40}
            className="w-12 h-12 object-contain opacity-90"
          />
        </div>

        {/* Built By Attribution & Copyright */}
        <div className="flex flex-col gap-1 items-center mt-1">
          <p className="text-xs text-[#82756a]">
            © 2025 Hyper. Built by Aditya.
          </p>
        </div>

        <div className="w-full border-t border-outline-variant/10 my-2"></div>


        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#82756a]">
          <Link href="/privacy" className="hover:text-primary transition-colors font-medium">
            Privacy Policy
          </Link>
          <Link href="/refund" className="hover:text-primary transition-colors font-medium">
            Refund Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors font-medium">
            Terms
          </Link>
          <a href="mailto:hello@usehyper.com" className="hover:text-primary transition-colors font-medium">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
