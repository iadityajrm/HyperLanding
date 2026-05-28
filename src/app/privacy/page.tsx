import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Hyper",
  description: "Privacy is our core architecture. Learn how Hyper protects your data with our strictly local-first approach.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-on-surface-variant">
              Last Updated: May 29, 2026 • Local-First Architecture
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-outline-variant/30 shadow-sm leading-relaxed text-on-surface-variant space-y-8 text-base">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                1. Our Privacy Philosophy: Local-First
              </h2>
              <p>
                At Synaptyc, we believe that tracking your productivity should never mean sacrificing your privacy. 
                Most productivity software functions as continuous surveillance, shipping every window title, active application, and keystroke metadata to remote cloud servers.
              </p>
              <p className="bg-surface-container-low p-4 rounded-xl border-l-4 border-primary italic text-on-surface">
                "Hyper is designed from the ground up to be completely local-first. Your focus history, active applications, and cognitive flow analyses never leave your physical device."
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                2. Data We Collect and Where It Stays
              </h2>
              <p>
                Hyper operates silently in your system background as a passive observer. It processes the following telemetry to construct your timeline:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Active Window Titles:</strong> To categorize tasks and recognize when you transition into deep creative work.</li>
                <li><strong>Application Process Names:</strong> To distinguish between development environments, browsers, and messaging apps.</li>
                <li><strong>Focal Time and Inactivity Indicators:</strong> To measure cognitive peaks, micro-distractions, and context-switching overheads.</li>
              </ul>
              <p>
                <strong>Storage:</strong> All of the above data points are compiled and saved directly into a secure, encrypted local SQLite database hosted in your system's application directory. <strong>We do not operate remote collection servers</strong>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                3. Third-Party Services & Billing
              </h2>
              <p>
                We do not integrate analytics toolkits or advertising trackers into the Hyper desktop executable. 
                However, our website utilizes <strong>Paddle v2</strong> as our exclusive merchant of record to handle licensing payments securely.
              </p>
              <p>
                When purchasing a lifetime license, Paddle processes your email address, billing information, and credit card/payment credentials. This transaction is governed strictly by Paddle's Privacy Policy. 
                Our desktop client validates your license key against Paddle's activation endpoints securely via standard HTTPS requests, with no usage telemetry included.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                4. Data Control and Deletion
              </h2>
              <p>
                Because your data is strictly yours and remains local, you maintain absolute control over it. 
                You can inspect the database, clear your logs, or delete your entire workspace at any time directly from the Hyper client interface. 
                Uninstalling Hyper removes all stored historical logs instantly from your local disk drive.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-on-surface border-b border-outline-variant/10 pb-2">
                5. Contact Us
              </h2>
              <p>
                If you have questions regarding our architectural choices, local-first integrity, or security protocols, please reach out to the creator directly at:
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
