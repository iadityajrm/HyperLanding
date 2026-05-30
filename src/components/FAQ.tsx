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
      question: "Does Hyper actually run passively? I don't want to start timers or log anything.",
      answer: "Correct. You open it once, grant permissions, and you're done. Hyper runs in your menu bar and tracks everything automatically. You never touch it again unless you want to.",
    },
    {
      question: "Does my data go to the cloud?",
      answer: "Never. Everything Hyper tracks stays on your computer, in a local database only you can access. We don't have a server with your data. We can't see it. Nobody can.",
    },
    {
      question: "Will it slow my computer down?",
      answer: "No. Hyper uses less than 0.1% CPU on average. You won't notice it running — which is exactly the point.",
    },
    {
      question: "What's your refund policy?",
      answer: "30 days, no questions. If it's not working for you, email us and we'll refund immediately.",
    },
    {
      question: "How do I get help?",
      answer: "Email us at hello@usehyper.com — we reply within 24 hours, usually faster.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-surface-container-low py-xl border-t border-outline-variant/10">
      <div className="max-w-[760px] mx-auto px-gutter">
        <ScrollReveal>
          <div className="text-center mb-lg flex flex-col items-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              FAQ
            </span>
            <h3 className="text-3xl font-normal text-on-surface">
              The stuff people always ask before downloading.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-8 flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 50}>
                <div className={`bg-surface-container-lowest rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  isOpen ? "border-primary/30 ring-1 ring-primary/10" : "border-outline-variant/20"
                }`}>
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
