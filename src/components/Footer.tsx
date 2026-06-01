"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const [downloadText, setDownloadText] = useState("Download Now");
  const [alsoAvailableText, setAlsoAvailableText] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [macInstallStep, setMacInstallStep] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const terminalCommand = `curl -fsSL hyper.synaptyc.cloud/mac | sh`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(terminalCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

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
    <footer className="w-full bg-surface border-t border-outline-variant/20 flex flex-col items-center justify-center text-center px-gutter relative">
      {/* Final CTA Block */}
      <div className="w-full max-w-[1200px] mx-auto py-16 border-b border-outline-variant/10 flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-light text-on-surface leading-tight">
          Your most productive self is already in there.
        </h2>
        <p className="text-base text-on-surface-variant max-w-[500px]">
          Hyper just helps you find it.
        </p>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => {
              setMacInstallStep(false);
              setShowDownloadModal(true);
            }}
            className="btn-gradient font-medium text-sm px-8 py-4 rounded-full cursor-pointer inline-flex items-center justify-center transition-all shadow-md hover:scale-105"
          >
            {downloadText}
          </button>
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
          <button
            onClick={() => {
              setMacInstallStep(false);
              setShowDownloadModal(true);
            }}
            className="hover:text-primary transition-colors font-medium cursor-pointer bg-transparent border-none p-0"
          >
            Download Installer
          </button>
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

      {/* Download Choice Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          {/* Modal Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] max-w-[500px] w-full p-8 shadow-2xl relative text-center transform scale-100 transition-all duration-300">
            {macInstallStep ? (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                {/* Back Button */}
                <button
                  onClick={() => setMacInstallStep(false)}
                  className="absolute top-5 left-5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer bg-surface-container/50 hover:bg-surface-container w-8 h-8 rounded-full flex items-center justify-center text-xs"
                >
                  ←
                </button>
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowDownloadModal(false);
                    setMacInstallStep(false);
                  }}
                  className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer bg-surface-container/50 hover:bg-surface-container w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>

                <div className="w-16 h-16 bg-[#e0f2fe] text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <span className="material-symbols-outlined text-3xl font-semibold">terminal</span>
                </div>

                <h3 className="text-2xl font-semibold text-on-surface mb-2">
                  Install via Terminal
                </h3>
                <p className="text-xs text-on-surface-variant mb-6 px-4 leading-relaxed">
                  Install Hyper with a single command from your Terminal:
                </p>

                {/* Command Block - Mock Terminal Window */}
                <div className="bg-[#0f172a] text-[#38bdf8] text-left rounded-2xl border border-slate-800 shadow-xl overflow-hidden mb-5 max-w-full">
                  {/* Terminal Header */}
                  <div className="bg-[#1e293b]/70 px-4 py-3 flex items-center justify-between border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-[#10b981] opacity-80 inline-block"></span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">zsh</span>
                    <div className="w-10"></div>
                  </div>
                  {/* Terminal Body */}
                  <div className="p-5 font-mono text-sm relative select-all flex items-center justify-between gap-4">
                    <span className="text-[#f8fafc] font-medium break-all">{terminalCommand}</span>
                    <button
                      onClick={handleCopyCommand}
                      className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-lg p-2 transition-all flex items-center justify-center cursor-pointer shadow-sm border border-slate-700/50 flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {copiedCommand ? "check" : "content_copy"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-primary/80 mb-5 tracking-wide px-2 leading-relaxed">
                  ℹ Hyper will be installed directly into your Applications folder.
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://github.com/iadityajrm/HyperLanding/releases/latest/download/hyper-mac.dmg"
                    className="text-xs text-[#82756a] hover:text-primary transition-colors font-medium"
                    onClick={() => {
                      setShowDownloadModal(false);
                      setMacInstallStep(false);
                    }}
                  >
                    Or download the .dmg file directly
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* Close Button */}
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer bg-surface-container/50 hover:bg-surface-container w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>

                <div className="w-16 h-16 bg-[#e0f2fe] text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <span className="material-symbols-outlined text-3xl font-semibold">download</span>
                </div>

                <h3 className="text-2xl font-semibold text-on-surface mb-2">
                  Download Hyper
                </h3>
                <p className="text-sm text-on-surface-variant mb-6 px-2">
                  Choose your operating system to directly download the installer.
                </p>

                <div className="flex flex-col gap-3">
                  {/* macOS */}
                  <button
                    onClick={() => setMacInstallStep(true)}
                    className="btn-gradient w-full font-semibold text-sm px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md hover:scale-[1.02]"
                  >
                    <span className="material-symbols-outlined text-lg">desktop_mac</span>
                    Download for macOS (.dmg)
                  </button>

                  {/* Windows */}
                  <a
                    href="https://github.com/iadityajrm/HyperLanding/releases/latest/download/hyper-win.exe"
                    className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-[#ffffff] font-semibold text-sm px-6 py-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer border border-outline/10 hover:scale-[1.02]"
                    onClick={() => setShowDownloadModal(false)}
                  >
                    <span className="material-symbols-outlined text-lg">desktop_windows</span>
                    Download for Windows (.exe)
                  </a>
                </div>
              </div>
            )}

            <p className="text-[11px] text-on-surface-variant/70 mt-6 font-medium">
              No activation token is displayed here. License keys are issued upon successful purchase.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
