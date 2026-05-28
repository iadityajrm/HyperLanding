import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - Hyper",
  description: "Read the Terms of Service for Hyper. Simple, honest terms for lifetime license holders.",
};

export default function TermsPage() {
  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col font-sans">
      {/* Simplified Navigation */}
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
      <main className="flex-grow py-xl">
        <div className="max-w-[800px] mx-auto px-gutter">
          <div className="text-center mb-xl">
            <h1 className="text-4xl md:text-5xl font-light text-on-surface leading-tight tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-on-surface-variant">
              Effective Date: May 29, 2026 • Single One-Time Purchase
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-outline-variant/30 shadow-sm leading-relaxed text-on-surface-variant space-y-8 text-base">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                1. Agreement to Terms
              </h2>
              <p>
                By downloading, installing, or purchasing a lifetime license to Hyper (the "Software"), provided by Synaptyc ("we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not install or use the Software.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                2. License Grant & Usage
              </h2>
              <p>
                Subject to your payment of the licensing fee, Synaptyc grants you a non-exclusive, non-transferable, perpetual, worldwide license to use the Software on personal computers owned or controlled by you.
              </p>
              <p>
                <strong>License Boundaries:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may install the Software on multiple devices for personal use under a single license key.</li>
                <li>You may not rent, lease, sublicense, distribute, or modify the binary compiled code of the Software.</li>
                <li>Reverse engineering, decompiling, or attempting to extract the core local analysis models is strictly prohibited.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                3. One-Time Payment & Merchant of Record
              </h2>
              <p>
                Hyper is purchased as a one-time lifetime license fee. There are no recurring subscriptions or unexpected charges. 
                Payments are securely managed by <strong>Paddle v2</strong>, our exclusive merchant of record. 
                By completing your purchase, you agree to comply with Paddle's checkout terms and conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                4. "As-Is" Warranty & Local Computations
              </h2>
              <p>
                Hyper is provided on an "AS-IS" and "AS-AVAILABLE" basis. Because Hyper runs locally on your operating system (Mac/Desktop), its performance depends entirely on your local hardware configurations. 
                We do not guarantee that the software will be completely error-free or run without minor interruptions.
              </p>
              <p className="bg-surface-container-low p-4 rounded-xl border-l-4 border-primary text-on-surface">
                <strong>Disclaimer of Liability:</strong> In no event shall Synaptyc or its founder be liable for any direct, indirect, incidental, or consequential damages arising from your local usage of the software or databases.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                5. Intellectual Property
              </h2>
              <p>
                The Software, including its native styling, background timeline scripts, desktop client code, design patterns, logos, and UI representations are the exclusive intellectual property of Synaptyc. 
                Any copyright infringement will be actively prosecuted.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                6. Term Amendments
              </h2>
              <p>
                We reserve the right to amend these terms at any time. When we make updates, the "Effective Date" at the top of this document will reflect the changes. Your continued use of the Software signifies your acceptance of updated terms.
              </p>
              <p className="font-semibold text-on-surface">
                If you have questions, please reach out to us at: <a href="mailto:info@synaptyc.cloud" className="text-primary hover:underline">info@synaptyc.cloud</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="py-lg border-t border-outline-variant/10 bg-surface text-center text-sm text-[#82756a]">
        <p>© 2026 Synaptyc. All rights reserved. Locally crafted in India 🇮🇳</p>
      </footer>
    </div>
  );
}
