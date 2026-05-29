"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ActivationReqPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [copyConfirmed, setCopyConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");
    setMessage("");
    setNewPasscode("");

    try {
      const res = await fetch("/.netlify/functions/request-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setNewPasscode(data.passcode);
        setMessage(data.message || "A new passcode has been generated!");
      } else {
        setError(data.message || data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error requesting code:", err);
      setError("Unable to connect to the server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPasscode = () => {
    if (newPasscode) {
      navigator.clipboard.writeText(newPasscode);
      setCopyConfirmed(true);
      setTimeout(() => setCopyConfirmed(false), 2000);
    }
  };

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="w-full top-0 bg-surface-bright/80 backdrop-blur-md sticky z-50 border-b border-outline-variant/10">
        <div className="max-w-[1200px] mx-auto px-gutter flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-md hover:opacity-90 transition-opacity">
            <Image
              src="/fav.png"
              alt="Hyper Logo"
              width={32}
              height={32}
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-on-surface">Hyper</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:text-primary-container transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow py-xl flex items-center justify-center">
        <div className="max-w-[480px] w-full mx-auto px-gutter">
          <div className="text-center mb-lg">
            <h1 className="text-3xl font-light text-on-surface leading-tight tracking-tight mb-2">
              Request Activation
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Paid customers can regenerate a new activation passcode at any time.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 shadow-sm text-center leading-relaxed">
            {newPasscode ? (
              <div className="animate-fade-in space-y-md">
                <div className="w-14 h-14 bg-[#e0f2fe] text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-sm">
                  <span className="material-symbols-outlined text-2xl font-semibold">vpn_key</span>
                </div>
                
                <h2 className="text-xl font-semibold text-on-surface">
                  Your New Passcode is Ready!
                </h2>
                <p className="text-xs text-on-surface-variant mb-md leading-relaxed">
                  We've successfully updated your license. Enter this new key in the Hyper desktop application to activate it:
                </p>

                {/* New Passcode Card */}
                <div className="bg-surface-container rounded-2xl p-5 border border-dashed border-outline-variant/50 mb-lg flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mb-1">
                    New Passcode
                  </span>
                  <div className="text-3xl font-mono font-extrabold tracking-widest text-primary my-1 select-all">
                    {newPasscode}
                  </div>
                  <button
                    onClick={handleCopyPasscode}
                    className="mt-3 flex items-center gap-1.5 text-xs text-primary font-bold hover:text-primary/80 transition-colors cursor-pointer bg-primary-fixed/20 px-4 py-2 rounded-full border border-primary/10"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copyConfirmed ? "check" : "content_copy"}
                    </span>
                    {copyConfirmed ? "Copied!" : "Copy Passcode"}
                  </button>
                </div>

                <div className="flex flex-col gap-sm pt-4">
                  {/* macOS Installer */}
                  <a
                    href="https://github.com/iadityajrm/HyperLanding/releases/download/v1.0.1/hyper-mac.dmg"
                    className="btn-gradient w-full font-medium text-xs px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-white"
                  >
                    <span className="material-symbols-outlined text-base">desktop_mac</span>
                    Download for macOS (.dmg)
                  </a>

                  {/* Windows Installer */}
                  <a
                    href="https://github.com/iadityajrm/HyperLanding/releases/download/v1.0.1/hyper-windows.exe"
                    className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-[#ffffff] font-medium text-xs px-5 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-outline/10"
                  >
                    <span className="material-symbols-outlined text-base">desktop_windows</span>
                    Download for Windows (.exe)
                  </a>
                </div>

                <button
                  onClick={() => {
                    setNewPasscode("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="text-xs text-primary/60 hover:text-primary mt-md underline block mx-auto cursor-pointer font-medium"
                >
                  Generate for another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-md text-left">
                {error && (
                  <div className="p-4 bg-error-container/10 border border-error/20 text-error text-xs rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex flex-col gap-xs">
                  <label htmlFor="email" className="text-xs font-semibold text-on-surface-variant">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="e.g. aditya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary text-on-surface"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gradient w-full font-medium text-sm px-6 py-3.5 rounded-full transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 text-white"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying & Regenerating...
                    </>
                  ) : (
                    "Request New Passcode"
                  )}
                </button>
                
                <p className="text-[10px] text-on-surface-variant/70 text-center leading-relaxed mt-md">
                  Note: Regenerating a passcode resets your previous passcode. You will need to enter this new passcode in your Hyper application to maintain activation.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-lg border-t border-outline-variant/10 bg-surface text-center text-sm text-[#82756a]">
        <p>© 2026 Synaptyc. All rights reserved. Locally crafted in India 🇮🇳</p>
      </footer>
    </div>
  );
}
