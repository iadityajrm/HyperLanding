"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { ScrollReveal } from "./ScrollReveal";

// Extend window interface for typescript safety
declare global {
  interface Window {
    Paddle?: any;
  }
}

export const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const [paddleLoaded, setPaddleLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [polling, setPolling] = useState(false);
  const [copyConfirmed, setCopyConfirmed] = useState(false);
  const [pollingError, setPollingError] = useState("");

  const startLicensePolling = (email: string) => {
    setCustomerEmail(email);
    setPaymentSuccess(true);
    setPolling(true);
    setPasscode("");
    setPollingError("");

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
          setPollingError("Could not connect to verification server. Please contact support.");
          clearInterval(interval);
        }
      }
    }, 1500);

    return interval;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Paddle) {
      setPaddleLoaded(true);
      // Pre-initialize events so they are caught
      window.Paddle.Environment.set("production");
      window.Paddle.Initialize({
        token: "live_7eae23ca5c1ce8779b7357b7b2e", // Production Client Token
        eventCallback: (event: any) => {
          if (event && event.name === "checkout.completed") {
            console.log("Checkout completed!", event);
            const email = event.data?.customer?.email || event.data?.customer_details?.email;
            if (email) {
              startLicensePolling(email);
            } else {
              setPaymentSuccess(true);
            }
          }
        }
      });
    }
  }, []);

  const handlePaddleCheckout = () => {
    setLoading(true);

    if (typeof window !== "undefined" && window.Paddle) {
      try {
        // Initialize Paddle v2 in production environment
        window.Paddle.Environment.set("production");
        window.Paddle.Initialize({
          token: "live_7eae23ca5c1ce8779b7357b7b2e", // Production Client Token
          eventCallback: (event: any) => {
            if (event && event.name === "checkout.completed") {
              console.log("Checkout completed!", event);
              const email = event.data?.customer?.email || event.data?.customer_details?.email;
              if (email) {
                startLicensePolling(email);
              } else {
                setPaymentSuccess(true);
              }
            }
          }
        });

        // Open live overlay checkout
        window.Paddle.Checkout.open({
          items: [
            {
              priceId: "pri_01ksr58zvdfggd46qevjsm1eee", // Production Price ID
              quantity: 1,
            },
          ],
          settings: {
            theme: "light",
            displayMode: "overlay",
          },
        });
        
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error("Paddle SDK live checkout initialization failed:", err);
        setLoading(false);
      }
    } else {
      console.warn("Paddle.js is not loaded yet on the window object.");
      setLoading(false);
    }
  };

  const handleCopyPasscode = () => {
    if (passcode) {
      navigator.clipboard.writeText(passcode);
      setCopyConfirmed(true);
      setTimeout(() => setCopyConfirmed(false), 2000);
    }
  };

  return (
    <>
      {/* Load Paddle v2 JS securely in background */}
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        strategy="afterInteractive"
        onLoad={() => {
          setPaddleLoaded(true);
          console.log("Paddle JS loaded successfully");
          if (typeof window !== "undefined" && window.Paddle) {
            window.Paddle.Environment.set("production");
            window.Paddle.Initialize({
              token: "live_7eae23ca5c1ce8779b7357b7b2e",
              eventCallback: (event: any) => {
                if (event && event.name === "checkout.completed") {
                  console.log("Checkout completed!", event);
                  const email = event.data?.customer?.email || event.data?.customer_details?.email;
                  if (email) {
                    startLicensePolling(email);
                  } else {
                    setPaymentSuccess(true);
                  }
                }
              }
            });
          }
        }}
      />

      <section id="pricing" className="bg-surface-container py-xl scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-gutter">
          <ScrollReveal>
            <div className="text-center mb-lg">
              <h2 className="text-3xl font-normal text-on-surface mb-xs">
                {paymentSuccess ? "Access Your Software" : "Simple, Honest Pricing"}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            {paymentSuccess ? (
              <div className="max-w-[500px] mx-auto bg-surface-container-lowest rounded-3xl p-lg ambient-shadow border border-outline-variant/30 text-center animate-fade-in">
                <div className="w-16 h-16 bg-[#e0f2fe] text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-sm">
                  <span className="material-symbols-outlined text-3xl font-semibold">check_circle</span>
                </div>
                
                <h3 className="text-2xl font-medium text-on-surface mb-2">
                  Thank You for Your Purchase!
                </h3>
                <p className="text-sm text-on-surface-variant mb-md leading-relaxed">
                  Your lifetime license is ready. Use the 6-digit passcode below to activate your Hyper desktop application:
                </p>

                {/* Secure Passcode Section */}
                <div className="bg-surface-container rounded-2xl p-5 border border-dashed border-outline-variant/50 mb-lg flex flex-col items-center justify-center relative">
                  {polling ? (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-xs text-on-surface-variant font-medium">Generating secure license key...</span>
                    </div>
                  ) : pollingError ? (
                    <div className="text-xs text-error font-medium py-2 px-4 bg-error-container/20 rounded-lg">
                      {pollingError}
                    </div>
                  ) : (
                    <>
                      <span className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold mb-1">
                        Your Activation Passcode
                      </span>
                      <div className="text-4xl font-mono font-extrabold tracking-widest text-primary my-1 select-all">
                        {passcode}
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
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-sm">
                  {/* MacOS installer download */}
                  <a
                    href="/downloads/hyper-mac.dmg"
                    className="btn-gradient w-full font-medium text-sm px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">desktop_mac</span>
                    Download for macOS (.dmg)
                  </a>

                  {/* Windows installer download */}
                  <a
                    href="/downloads/hyper-windows.exe"
                    className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-[#ffffff] font-medium text-sm px-6 py-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-outline/10"
                  >
                    <span className="material-symbols-outlined text-lg">desktop_windows</span>
                    Download for Windows (.exe)
                  </a>
                </div>

                <p className="text-xs text-on-surface-variant/70 mt-lg">
                  Forgot your code? Need assistance? Reach out at{" "}
                  <a href="mailto:info@synaptyc.cloud" className="text-primary hover:underline font-semibold">
                    info@synaptyc.cloud
                  </a>
                </p>
                
                <button
                  onClick={() => setPaymentSuccess(false)}
                  className="text-xs text-primary/60 hover:text-primary mt-sm underline block mx-auto cursor-pointer font-medium"
                >
                  Back to pricing info
                </button>
              </div>
            ) : (
              <div className="max-w-[448px] mx-auto bg-surface-container-lowest rounded-2xl p-lg ambient-shadow border border-outline-variant/30 text-center">
                <h3 className="text-2xl font-medium text-on-surface mb-sm">
                  Lifetime Access
                </h3>
                <div className="text-5xl font-light text-primary mb-md">$7.99</div>
                <p className="text-sm text-on-surface-variant mb-md leading-relaxed">
                  One-time purchase. No subscriptions, no hidden fees. Just passive
                  intelligence for life.
                </p>
                <ul className="text-left text-sm text-on-surface-variant mb-lg space-y-sm">
                  <li className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      check_circle
                    </span>
                    Complete focus history
                  </li>
                  <li className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      check_circle
                    </span>
                    Priority processing
                  </li>
                  <li className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      check_circle
                    </span>
                    All future updates
                  </li>
                  <li className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">
                      check_circle
                    </span>
                    Local-first data
                  </li>
                </ul>
                <button
                  onClick={handlePaddleCheckout}
                  disabled={loading}
                  className="btn-gradient w-full font-medium text-sm px-8 py-4 rounded-full transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Initializing Secure Payment...
                    </>
                  ) : (
                    "Get Lifetime Access"
                  )}
                </button>

                {/* Simulated payment success option to test database flow locally */}
                <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col items-center gap-3">
                  <p className="text-xs text-on-surface-variant font-medium">Test Database Implementation</p>
                  <input 
                    type="email" 
                    placeholder="Enter test email..." 
                    className="w-full max-w-[280px] px-4 py-2 text-sm rounded-lg border border-outline-variant/50 bg-surface focus:outline-none focus:border-primary text-on-surface"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                  <button
                    onClick={async () => {
                      if (!customerEmail) return;
                      // Trigger webhook manually
                      await fetch('/.netlify/functions/paddle-webhook', {
                        method: 'POST',
                        body: JSON.stringify({
                          event_type: 'transaction.completed',
                          data: { customer: { email: customerEmail } }
                        })
                      });
                      startLicensePolling(customerEmail);
                    }}
                    className="text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Simulate Payment Success
                  </button>
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
