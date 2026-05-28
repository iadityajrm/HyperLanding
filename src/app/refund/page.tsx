import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Refund Policy - Hyper",
  description: "Read our Refund Policy. Transparent, honest policies for lifetime software licenses.",
};

export default function RefundPage() {
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
              Refund Policy
            </h1>
            <p className="text-sm text-on-surface-variant">
              Last Updated: May 29, 2026 • Strict No-Refunds Policy
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-outline-variant/30 shadow-sm leading-relaxed text-on-surface-variant space-y-8 text-base">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                1. No Refunds Policy
              </h2>
              <p>
                Hyper is distributed as downloadable desktop software. Upon payment, you receive an immediate, permanent activation license key that unlocks lifetime access and all future software versions with zero operational subscription limits.
              </p>
              <p className="bg-surface-container-low p-4 rounded-xl border-l-4 border-primary text-on-surface font-medium">
                Due to the absolute, instantaneous digital delivery nature of license keys, we enforce a strict <b>NO REFUNDS</b> policy. All purchases and licensing sales are final.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                2. Rationale Behind Our Policy
              </h2>
              <p>
                Unlike standard cloud-based SaaS (Software-as-a-Service) products that charge recurring monthly fees to maintain servers, Hyper is a <b>local-first, one-time-fee product</b>. 
              </p>
              <p>
                When you buy Hyper:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your activation key instantly registers your license globally with Paddle.</li>
                <li>You receive full execution code that operates locally without ongoing monthly server infrastructure charges.</li>
                <li>There is no mechanism to "deactivate" local execution logs once the installer and product are running on your computer.</li>
              </ul>
              <p>
                This allows us to maintain a highly affordable, honest, and straightforward pricing structure ($7.99 single payment) for everyone.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                3. Technical Support and Product Assistance
              </h2>
              <p>
                While we do not offer monetary refunds, we are fully committed to ensuring a smooth user experience. 
                If you encounter setup issues, operating system installation bugs, or database configuration hurdles, please reach out to us. 
                We will work closely with you to resolve any errors or release hotfixes to keep your workflow running seamlessly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                4. Reach Out
              </h2>
              <p>
                For technical inquiries, licensing issues, or general support queries, please email us directly:
              </p>
              <p className="font-semibold text-on-surface">
                Email: <a href="mailto:info@synaptyc.cloud" className="text-primary hover:underline">info@synaptyc.cloud</a>
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
