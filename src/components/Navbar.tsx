import React from "react";
import Image from "next/image";

export const Navbar = () => {
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
          <span className="text-2xl font-bold text-on-surface">
            Hyper
          </span>
        </div>
        <div className="hidden md:flex items-center gap-lg text-base">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="#demo"
          >
            Demo
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
            Download
          </a>
        </div>
      </div>
    </nav>
  );
};
