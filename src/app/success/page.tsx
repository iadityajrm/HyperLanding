"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [passcode, setPasscode] = useState("");
  const [polling, setPolling] = useState(true);
  const [pollingError, setPollingError] = useState("");
  const [copyConfirmed, setCopyConfirmed] = useState(false);

  useEffect(() => {
    if (!email) {
      setPolling(false);
      setPollingError("No email was provided with the purchase details. Please contact support.");
      return;
    }

    let attempts = 0;
    const maxAttempts = 30; // 45 seconds total

    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/.netlify/functions/get-license?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        
        if (data && data.success && data.passcode) {
          setPasscode(data.passcode);
          setPolling(false);
          clearInterval(interval);
        } else if (attempts >= maxAttempts) {
          setPolling(false);
          setPollingError("We are still registering your purchase. Check your email or try again shortly!");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error polling license passcode:", err);
        if (attempts >= maxAttempts) {
          setPolling(false);
          setPollingError("Could not connect to the verification server. Please contact support.");
          clearInterval(interval);
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [email]);

  const handleCopyPasscode = () => {
    if (passcode) {
      navigator.clipboard.writeText(passcode);
      setCopyConfirmed(true);
      setTimeout(() => setCopyConfirmed(false), 2000);
    }
  };

  return (
    <div className="max-w-[600px] w-full bg-surface-container-lowest rounded-[2.5rem] p-lg ambient-shadow border border-outline-variant/30 text-center animate-fade-in relative z-10 my-12">
      <div className="w-20 h-20 bg-[#e0f2fe] text-[#2563eb] rounded-[2rem] flex items-center justify-center mx-auto mb-sm shadow-md animate-bounce">
        <span className="material-symbols-outlined text-4xl font-semibold">check_circle</span>
      </div>

      <h1 className="text-3xl font-normal text-on-surface mb-2 tracking-tight">
        Purchase Successful!
      </h1>
      <p className="text-sm text-on-surface-variant mb-md leading-relaxed">
        Thank you for purchasing <span className="font-semibold text-primary">Hyper Lifetime</span>. Your license key is ready. Use the passcode below to activate your desktop application:
      </p>

      {/* Secure Passcode Section */}
      <div className="bg-surface-container rounded-3xl p-6 border border-dashed border-outline-variant/60 mb-lg flex flex-col items-center justify-center relative transition-all duration-300">
        {polling ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs text-on-surface-variant font-semibold tracking-wider uppercase animate-pulse">Syncing payment and generating license...</span>
          </div>
        ) : pollingError ? (
          <div className="text-xs text-error font-medium py-3 px-6 bg-error-container/20 rounded-xl border border-error/10">
            {pollingError}
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center w-full">
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-2">
              Your Activation Passcode
            </span>
            <div className="text-5xl font-mono font-extrabold tracking-[0.15em] text-primary my-2 select-all bg-surface-container-lowest px-8 py-3 rounded-2xl border border-outline-variant/20 shadow-inner">
              {passcode}
            </div>
            <button
              onClick={handleCopyPasscode}
              className="mt-4 flex items-center gap-2 text-xs text-primary font-bold hover:bg-primary-fixed/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer bg-primary-fixed/20 px-6 py-3 rounded-full border border-primary/10"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copyConfirmed ? "check" : "content_copy"}
              </span>
              {copyConfirmed ? "Copied!" : "Copy Activation Code"}
            </button>
          </div>
        )}
      </div>

      {/* Action triggers */}
      <div className="flex flex-col gap-sm">
        {/* MacOS installer download */}
        <a
          href="/downloads/hyper-mac.dmg"
          className="btn-gradient w-full font-semibold text-sm px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.01]"
        >
          <span className="material-symbols-outlined text-lg">desktop_mac</span>
          Download Installer for macOS (.dmg)
        </a>

        {/* Windows installer download */}
        <a
          href="/downloads/hyper-windows.exe"
          className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-[#ffffff] font-semibold text-sm px-6 py-4 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer border border-outline/10 hover:scale-[1.01]"
        >
          <span className="material-symbols-outlined text-lg">desktop_windows</span>
          Download Installer for Windows (.exe)
        </a>
      </div>

      {/* Instructions list */}
      <div className="text-left mt-lg p-6 bg-surface-container/30 border border-outline-variant/20 rounded-3xl">
        <h4 className="text-xs uppercase font-bold tracking-widest text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base font-bold">info</span>
          Activation Instructions
        </h4>
        <ol className="text-xs text-on-surface-variant space-y-2.5 list-decimal pl-4 leading-relaxed font-medium">
          <li>Download and install the Hyper desktop application matching your operating system.</li>
          <li>Launch the application and enter your email address: <span className="font-semibold text-on-surface">{email || "your-purchase-email"}</span>.</li>
          <li>Enter your 6-digit passcode to verify and permanently unlock your lifetime access.</li>
        </ol>
      </div>

      <p className="text-xs text-on-surface-variant/70 mt-lg">
        Need assistance or having issues with activation? Get in touch at{" "}
        <a href="mailto:info@synaptyc.cloud" className="text-primary hover:underline font-semibold">
          info@synaptyc.cloud
        </a>
      </p>
    </div>
  );
};

export default function SuccessPage() {
  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-gutter relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#3b82f6]/5 rounded-full blur-[80px] pointer-events-none" />

        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant animate-pulse">Loading Account...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
