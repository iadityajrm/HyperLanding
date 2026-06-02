import React from "react";
import { ArticleClient } from "./ArticleClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  return <ArticleClient slug={slug} />;
}

// Next.js App Router static parameters dynamic build generation
export async function generateStaticParams() {
  return [
    { slug: "productivity-lie" },
    { slug: "how-to-measure-productive-time-on-a-computer" },
    { slug: "why-am-i-productive-some-days-and-not-others" },
    { slug: "how-to-find-your-most-productive-hours-of-the-day" },
    { slug: "what-affects-focus-while-working-on-a-computer" },
    { slug: "how-to-improve-focus-while-working-from-home" },
    { slug: "how-long-can-most-people-stay-focused" },
    { slug: "what-causes-loss-of-focus-during-work" },
    { slug: "how-to-build-better-focus-habits-while-working" },
    { slug: "why-do-i-get-distracted-so-easily-while-working" },
    { slug: "how-to-track-focus-throughout-the-day" }
  ];
}
