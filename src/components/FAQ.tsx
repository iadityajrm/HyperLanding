"use client";

import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Is Hyper really passive? Do I need to start timers?",
      answer: "Yes, Hyper is 100% passive. It operates quietly in your system background, detecting active window titles and focal changes. You never need to start, stop, or pause timers, meaning your actual creative flow is entirely uninterrupted.",
    },
    {
      question: "How is my data secured? Does it upload to the cloud?",
      answer: "Your privacy is our core architecture. Hyper is designed local-first. All analysis logs, window titles, and focus states remain stored strictly on your local disk. We do not operate remote tracking servers, meaning your workflow data never leaves your computer.",
    },
    {
      question: "Will Hyper slow down my computer's performance?",
      answer: "Not at all. Hyper is optimized to run natively with extremely low footprints, consuming less than 0.1% CPU and negligible memory. It acts as a passive observer, waking up only upon window changes, ensuring your performance stays at 100%.",
    },
    {
      question: "What is your refund policy?",
      answer: "Since Hyper provides complete, unlimited lifetime license keys with zero operational subscription fees, all sales are final. We do not offer refunds. You can run Hyper passively for life with a single, honest one-time payment.",
    },
    {
      question: "How do I get support or ask questions?",
      answer: "We are always happy to help! You can reach out directly to the Synaptyc team at info@synaptyc.cloud. We actively review all developer support requests and feedback.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-surface-container-low py-xl border-t border-outline-variant/10">
      <div className="max-w-[760px] mx-auto px-gutter">
        <ScrollReveal>
          <div className="text-center mb-lg">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Questions & Answers
            </h2>
            <h3 className="text-3xl font-normal text-on-surface">
              Frequently Asked Questions
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-8 flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 50}>
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm transition-all duration-300">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold text-base text-on-surface hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4 bg-surface/30">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
