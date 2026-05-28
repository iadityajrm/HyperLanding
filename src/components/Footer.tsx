import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-xl bg-surface border-t border-outline-variant/20 flex flex-col items-center justify-center text-center px-gutter">
      <div className="flex flex-col items-center gap-4 max-w-[600px] w-full">
        {/* Centered Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/fav.png"
            alt="Hyper Logo"
            width={40}
            height={40}
            className="w-16 h-16 object-contain opacity-90"
          />
        </div>

        {/* Built By Attribution & Copyright */}
        <div className="flex flex-col gap-1 items-center mt-1">
          <p className="text-base font-semibold text-[#50453b]">
            Built by synaptyc
          </p>
          <p className="text-xs text-[#82756a]">
            Copyright © 2026 Synaptyc. All rights reserved.
          </p>
        </div>

        <div className="w-full border-t border-outline-variant/10 my-2"></div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#82756a]">
          <Link href="/terms" className="hover:text-primary transition-colors font-medium">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors font-medium">
            Privacy Policy
          </Link>
          <Link href="/refund" className="hover:text-primary transition-colors font-medium">
            Refund Policy
          </Link>
          <a href="mailto:info@synaptyc.cloud" className="hover:text-primary transition-colors font-medium">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};
