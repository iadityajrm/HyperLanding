"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

// Reusing particle counter from landing page (needs "use client")
const FragmentationCounter = () => {
  const [count, setCount] = useState(1);
  const [stage, setStage] = useState<"counting" | "exploding" | "faded">("counting");
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (stage === "counting") {
      let current = 1;
      let delay = 550;
      let timer: NodeJS.Timeout;

      const tick = () => {
        if (current >= 53) {
          setStage("exploding");
          const pts = [];
          for (let i = 0; i < 45; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 9;
            pts.push({
              id: i,
              x: 0,
              y: 0,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 2.5,
              rot: Math.random() * 360,
              rotSpeed: (Math.random() - 0.5) * 28,
              scale: 0.5 + Math.random() * 1.3,
              opacity: 1,
              char: ["5", "3", "•", "x", "times", "*", "!", "c", "r", "u", "m", "b"][
                Math.floor(Math.random() * 12)
              ],
            });
          }
          setParticles(pts);
          return;
        }
        current += 1;
        setCount(current);
        delay = Math.max(25, delay * 0.86);
        timer = setTimeout(tick, delay);
      };

      timer = setTimeout(tick, delay);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "exploding") {
      let animationFrameId: number;
      const startTime = Date.now();

      const update = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed > 1600) {
          setStage("faded");
          setParticles([]);
          return;
        }

        setParticles((prev) =>
          prev.map((p) => {
            const nextVy = (p.vy + 0.2) * 0.97;
            const nextVx = p.vx * 0.97;
            const nextOpacity = Math.max(0, 1 - elapsed / 1400);
            return {
              ...p,
              x: p.x + nextVx,
              y: p.y + nextVy,
              vy: nextVy,
              vx: nextVx,
              rot: p.rot + p.rotSpeed,
              opacity: nextOpacity,
            };
          })
        );

        animationFrameId = requestAnimationFrame(update);
      };

      animationFrameId = requestAnimationFrame(update);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "faded") {
      const timer = setTimeout(() => {
        setCount(1);
        setStage("counting");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="relative flex flex-col justify-center items-center h-[140px] select-none overflow-hidden w-full bg-surface-container rounded-2xl border border-outline-variant/10 shadow-inner">
      {stage === "counting" && (
        <div className="text-6xl font-extrabold text-error tracking-tight transition-all duration-75 scale-100 animate-pulse font-sans">
          {count}{" "}
          <span className="text-3xl font-light text-on-surface-variant ml-1">
            times
          </span>
        </div>
      )}

      {stage === "exploding" && (
        <div className="relative w-full h-full flex items-center justify-center">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute font-extrabold text-error text-xl pointer-events-none font-sans"
              style={{
                transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`,
                opacity: p.opacity,
              }}
            >
              {p.char}
            </span>
          ))}
        </div>
      )}

      {stage === "faded" && (
        <div className="text-xs text-on-surface-variant/40 italic font-medium animate-pulse font-sans">
          re-calibrating flow logs...
        </div>
      )}
    </div>
  );
};

// Heatmap widget (needs "use client")
const FocusHeatMap = () => {
  const [calibrating, setCalibrating] = useState(false);
  const defaultValues = [
    0.1, 0.1, 0.3, 0.6, 1.0, 0.3, 0.1,
    0.1, 0.1, 0.1, 0.3, 0.6, 0.1, 0.1,
    0.1, 0.3, 0.6, 1.0, 0.6, 0.3, 0.1,
    0.1, 0.1, 0.1, 0.3, 0.3, 0.1, 0.1,
    0.1, 0.1, 0.3, 1.0, 1.0, 0.1, 0.1,
    0.1, 0.1, 0.1, 0.3, 0.6, 0.1, 0.1
  ];
  const [gridValues, setGridValues] = useState<number[]>(defaultValues);

  useEffect(() => {
    const timer = setInterval(() => {
      setCalibrating(true);
      setTimeout(() => {
        setGridValues((prev) =>
          prev.map((v) => {
            const delta = (Math.random() - 0.5) * 0.28;
            return Math.min(Math.max(v + delta, 0.1), 1.0);
          })
        );
        setCalibrating(false);
      }, 1000);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 shadow-inner flex flex-col w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5 font-sans">
          <span className="material-symbols-outlined text-[16px] text-primary">
            grid_view
          </span>
          Live Heat Map
        </span>
        <div className="flex gap-1 items-center text-[10px] text-on-surface-variant">
          <span>Low</span>
          <div className="w-2 h-2 rounded-sm bg-primary/10"></div>
          <div className="w-2 h-2 rounded-sm bg-primary/30"></div>
          <div className="w-2 h-2 rounded-sm bg-primary/60"></div>
          <div className="w-2 h-2 rounded-sm bg-primary"></div>
          <span>High</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5 relative">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <div key={idx} className="text-center text-[9px] text-on-surface-variant font-bold mb-1">
            {day}
          </div>
        ))}
        {gridValues.map((val, idx) => (
          <div
            key={idx}
            className="w-full aspect-[2.5/1] rounded-sm transition-all duration-[1000ms] relative overflow-hidden"
            style={{
              backgroundColor: `rgba(27, 79, 203, ${val})`
            }}
          >
            {calibrating && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// Simulated HUD focus drift warning
const SimulatedHUDAlert = () => {
  return (
    <div className="bg-[#2D2C2A] rounded-3xl p-6 max-w-[420px] mx-auto my-10 flex gap-4 items-start shadow-xl border border-white/5 text-left animate-pulse">
      <div className="w-10 h-10 rounded-full bg-[#3D332A] flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-[#E7A678]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-6 3 12 3-9 3 3h3" />
        </svg>
      </div>
      <div className="pt-0.5 flex-1 pr-4">
        <div className="flex justify-between items-center mb-1 gap-2">
          <h4 className="font-semibold text-sm text-white">Take a Screen Break</h4>
          <span className="text-[10px] text-[#A89D92]">9:01 AM</span>
        </div>
        <p className="text-xs text-[#D1C7BD] leading-relaxed">
          You have been active continuously for 53 minutes. Step away for a few minutes to rest your eyes.
        </p>
      </div>
    </div>
  );
};

// Unified articles structure with inline widgets for all 11 articles
const ARTICLES_CONTENT: Record<string, React.ReactNode> = {
  "productivity-lie": (
    <>
      <p>If you asked me last week how much code I write, I would have answered without hesitating: <em>“Six to seven hours of deep, uninterrupted engineering daily.”</em></p>
      <p className="mt-4">I had a perfect story crafted in my mind. I logged on at 8:30 AM, worked straight through lunch, and closed my laptop at 6:30 PM. I felt exhausted, therefore I must have been incredibly productive.</p>
      <p className="mt-4">But feeling exhausted is not a metric. It turns out, my brain was conflating the fatigue of constant, frantic multi-tasking with the deep focus of genuine creative work.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center">
        <div>
          <h3 className="text-xl font-medium text-on-surface mb-2 tracking-tight">The Moment of Truth</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal">
            I installed <strong className="text-primary font-semibold">Hyper</strong>, a lightweight, quiet desktop utility. It has no timers to trigger, no start/stop buttons, and no active tracking panels. It just runs in the background, mapping exactly which window has active keyboard and mouse focus.
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal mt-3">
            When I opened the dashboard at the end of my first week, I expected to see a dark, densely packed heat map of high focus blocks. Instead, I saw a scattered array of sporadic activity.
          </p>
        </div>
        <FocusHeatMap />
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">The Anatomy of a Fragmented Brain</h2>
      <p>According to the data, my 10-hour workday contained exactly <strong>1 hour and 12 minutes</strong> of actual, continuous focus. The rest of the time was chopped into tiny, useless fragments.</p>
      <p className="mt-4">I was context-switching continuously. A quick message on Slack, a browser search that turned into a 10-minute rabbit hole, checking my analytics panel "just for a second." I wasn't coding; I was reactively triaging digital noise.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
        <FragmentationCounter />
        <div>
          <h4 className="text-base font-semibold text-on-surface mb-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-error">dangerous</span>
            53 Fragmentations Before Noon
          </h4>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium">
            Every time you hop out of your IDE to reply to a message or check a tab, your brain incurs a "context switch tax." Hyper automatically counts these switches. 
          </p>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium mt-2">
            According to research, it takes an average of 23 minutes to refocus after a single interruption. I was fragmenting my flow 53 times before lunch. I was functionally working with zero momentum.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">How I Reclaimed My Focus</h2>
      <p>Seeing the empirical data changed everything. You can't optimize what you don't measure, and you can't fix a lie you keep telling yourself. Instead, Hyper helped me fix my workflow naturally by letting me schedule slack triages and showing me gentle, quiet alert nudges when my attention drifted.</p>
    </>
  ),
  "how-to-measure-productive-time-on-a-computer": (
    <>
      <p>Ask three developers how they measure their productive time, and you’ll get three highly subjective answers. Some count Git commits. Others log hours in JIRA. Many use manual Pomodoro timers that require constant start/stop attention.</p>
      <p className="mt-4">The core issue with manual tracking is simple: <strong>human memory is highly subjective and easily fooled.</strong> Logging 8 hours on a timesheet does not mean you had 8 hours of productive focus. It usually means you sat in a chair for 8 hours while context-switching between IDEs, Slack, browsers, and emails.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center">
        <div>
          <h3 className="text-xl font-medium text-on-surface mb-2 tracking-tight">Active Focus vs. Idle Time</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal">
            True productivity on a computer should be measured automatically in the background. A quiet tool like <strong className="text-primary font-semibold">Hyper</strong> tracks window focus continuously. It doesn't track active keylogging or violate privacy; it simply measures which application has active, interactive focus.
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal mt-3">
            If your editor is hidden behind Slack or Chrome tabs, Hyper doesn't count it as productive coding time. It logs the difference between active work and idle distractions.
          </p>
        </div>
        <FocusHeatMap />
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">The Metric That Matters: Focus Stability</h2>
      <p>Rather than counting total minutes, focus on <strong>Focus Stability</strong>. A stable focus block is any continuous span of 20+ minutes inside a high-value application (like VS Code, Figma, or your compiler terminal) without hopping to communication apps.</p>
      <p className="mt-4">By analyzing stability rather than just raw hours, you'll start to realize that a highly productive "4-hour day" with stable focus blocks outperforms a fragmented "10-hour day" spent chasing digital notifications.</p>
    </>
  ),
  "why-am-i-productive-some-days-and-not-others": (
    <>
      <p>We've all had days where we sit down at our desks, enter a legendary flow state, and build massive features in 3 hours. And we've also had days where we spend 8 hours staring at the screen, writing three lines of code, and feeling completely drained.</p>
      <p className="mt-4">We usually blame this on "motivation," "lack of sleep," or "burnout." While those matter, the mechanical culprit is almost always <strong>attention fragmentation</strong>.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
        <FragmentationCounter />
        <div>
          <h4 className="text-base font-semibold text-on-surface mb-1 flex items-center gap-1.5">
            The Context Switch Tax
          </h4>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium">
            On highly productive days, you get into a deep rhythm because your context switches are low. On unproductive days, you context switch 50+ times.
          </p>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium mt-2">
            Every switch—even a 5-second Slack peek—wastes up to 23 minutes of cognitive energy re-establishing where you left off. Hyper maps this context tax automatically.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">Aligning Work With Your Heat Map</h2>
      <p>Another major reason for inconsistent productivity is scheduling complex coding tasks during your cognitive dry zones. Hyper automatically maps your peak weekly focus hours, showing you exactly when your brain naturally slips into flow. Schedule your heaviest deep work during those natural peaks, and reserve dry zones for meeting triages.</p>
    </>
  ),
  "how-to-find-your-most-productive-hours-of-the-day": (
    <>
      <p>The internet is flooded with advice telling you that you must wake up at 5:00 AM and code before sunrise to be productive. But cognitive biology tells a different story: everyone has a unique <strong>chronotype</strong> that dictates when their brain functions at its best.</p>
      <p className="mt-4">Trying to force deep, complex architectural decisions when your brain is naturally winding down is a recipe for frustration and bugs. To build a sustainable developer workflow, you must map your natural peaks.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center">
        <div>
          <h3 className="text-xl font-medium text-on-surface mb-2 tracking-tight">Telemetry vs. Guesswork</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal">
            Instead of manually writing down how focused you feel every hour (which you will inevitably forget to do), <strong className="text-primary font-semibold">Hyper</strong> silently logs active focus density across your workdays. 
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal mt-3">
            After a single week of running in the background, your weekly Heat Map highlights the exact blocks of time where your focus stability was at its absolute highest.
          </p>
        </div>
        <FocusHeatMap />
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">Protecting Your Peaks</h2>
      <p>Once you identify your 2-3 hour peak focus window (whether it’s 9:01 AM or 10:00 PM), treat it as sacred. Close Slack, put your phone in another room, and let Hyper's quiet nudges steer you away from casual tabs. This ensures you spend your highest-quality cognitive hours on your highest-value code.</p>
    </>
  ),
  "what-affects-focus-while-working-on-a-computer": (
    <>
      <p>When we sit down at a laptop, we believe we have complete control over our attention. In reality, our operating systems and web browsers are custom-engineered to draw our eyes away from our primary tasks and trigger micro-dopamine hits.</p>
      <p className="mt-4">The main factors affecting digital focus are not physical distractions in your room, but <strong>micro-visual triggers</strong> on your screen: notification badges (the dreaded red dot), continuous communication feeds (Slack, Teams, Discord), and open browser tab clutter.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
        <FragmentationCounter />
        <div>
          <h4 className="text-base font-semibold text-on-surface mb-1 flex items-center gap-1.5">
            The Red Dot Phenomenon
          </h4>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium">
            Every time a red notification dot catches your eye in the dock, your brain undergoes a micro-fragmentation. Even if you don't click it, you've expended focus resisting it.
          </p>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium mt-2">
            Hyper tracks these fragmentation frequencies passively, showing you exactly how many times your attention is pulled out of your IDE by background services.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">Passive Nudging: A Healthier Fix</h2>
      <p>Rather than turning off all tools or installing aggressive, frustrating site-blockers, Hyper uses <strong>intelligent passive nudging</strong>. It simply notices when your focus drifts onto non-work applications for more than a few minutes and alerts you with a gentle, non-obtrusive notification—giving you the awareness to steer back to safety.</p>
    </>
  ),
  "how-to-improve-focus-while-working-from-home": (
    <>
      <p>Working from home is a double-edged sword. On one hand, you have no morning commute and no active office interruptions. On the other hand, the boundary between "work time" and "home time" disappears completely.</p>
      <p className="mt-4">Without physical boundaries, we fall into a trap of <strong>continuous partial attention</strong>. We check Slack while eating, read articles while coding, and drag work into late-night hours, resulting in burnout without actual output.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center">
        <div>
          <h3 className="text-xl font-medium text-on-surface mb-2 tracking-tight">Creating Digital Separation</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal">
            To build focus at home, you must establish clean digital separation. Running a background focus analytics tool like <strong className="text-primary font-semibold">Hyper</strong> lets you define exactly when you are active. 
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal mt-3">
            Hyper maps your focus density weekly, helping you prove to yourself that 4 hours of highly concentrated focus beats 9 hours of scattered tab hopping.
          </p>
        </div>
        <FocusHeatMap />
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">The Power of Passive Nudges</h2>
      <p>Since you don't have coworkers walking by your desk to keep you accountable, use Hyper's smart background alerts. If you drift into social media or random search tabs at home, Hyper sends a friendly, silent nudge to remind you of your target task, acting as your remote focus partner.</p>
    </>
  ),
  "how-long-can-most-people-stay-focused": (
    <>
      <p>Many developers believe they should be able to sit in a chair and write high-level code continuously for four hours straight. When they drift or feel distracted after 60 minutes, they consider it a personal failure of discipline.</p>
      <p className="mt-4">But neuroscience reveals that the human brain operates in <strong>ultradian rhythms</strong>—natural cycles of high-intensity focus followed by temporary cognitive dips. For most knowledge workers, high-level focus peaks at around <strong>45 to 90 minutes</strong> before requiring a brief mental rest.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
        <FragmentationCounter />
        <div>
          <h4 className="text-base font-semibold text-on-surface mb-1 flex items-center gap-1.5">
            The 50-Minute Ceiling
          </h4>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium">
            Trying to force deep focus past 90 minutes results in high fragmentation and errors. Hyper automatically measures your focus stability limits, helping you pinpoint your natural cognitive ceilings.
          </p>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium mt-2">
            Instead of forcing unproductive hours, take a short screen break when your fragmentation counts begin to climb.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">Tracking Your Stability</h2>
      <p>By using Hyper, you can watch your real focus duration graphs in real-time. Knowing your personal focus duration threshold allows you to schedule breaks naturally before focus fatigue sets in—keeping your code clean and your brain healthy.</p>
    </>
  ),
  "what-causes-loss-of-focus-during-work": (
    <>
      <p>We often feel guilty when we find ourselves scrolling Twitter or reading random articles in the middle of a coding sprint. We tell ourselves we need more discipline or that we have poor attention spans.</p>
      <p className="mt-4">In reality, our brains are hardwired to search for novelty. The modern desktop computer is designed to feed that search with instant dopamine triggers: notification sounds, badge counts, new email popups, and tab indicators.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center">
        <div>
          <h3 className="text-xl font-medium text-on-surface mb-2 tracking-tight">The Novelty Trap</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal">
            When a coding challenge gets hard, our brain naturally seeks a path of less resistance. A quick hop to a browser tab or Slack provides instant relief. 
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal mt-3">
            A background tracker like <strong className="text-primary font-semibold">Hyper</strong> maps these drift triggers silently, highlighting exactly which apps or sites pull you out of deep focus.
          </p>
        </div>
        <FocusHeatMap />
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">Passive Nudging: Reclaiming Control</h2>
      <p>To prevent these slips, Hyper sends a silent, friendly notification when you’ve wandered off-track for more than a few minutes. It doesn't block the screen or treat you like a child—it simply provides immediate, clean awareness, giving your brain the nudge it needs to return to code.</p>
    </>
  ),
  "how-to-build-better-focus-habits-while-working": (
    <>
      <p>When developers want to improve their productivity, they often try massive, unsustainable lifestyle changes: working 12 hours a day, blocking all non-work websites completely, or drinking endless caffeine.</p>
      <p className="mt-4">But habit design shows that sustainable focus is built on **micro-feedback loops**. By passively tracking how you work and getting real-time insights, you can adjust your habits naturally without active friction.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
        <FragmentationCounter />
        <div>
          <h4 className="text-base font-semibold text-on-surface mb-1 flex items-center gap-1.5">
            The Power of Feedback
          </h4>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium">
            Every time Hyper logs a focus session, it maps your context switches. Simply seeing your fragmentation count decrease week-over-week creates a powerful micro-feedback loop.
          </p>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium mt-2">
            You begin to gamify your own deep work blocks, actively seeking to keep your switches low.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">Simple Focus Habits</h2>
      <p>Close Slack and browser tabs that aren't relevant to your current sprint. Use Hyper's passive weekly heat maps to identify when your cognitive strength is highest, and reserve those hours purely for writing high-value code.</p>
    </>
  ),
  "why-do-i-get-distracted-so-easily-while-working": (
    <>
      <p>Many developers feel deep frustration when they realize they've spent 20 minutes reading tech blogs or wandering through documentation instead of writing the code they planned to write.</p>
      <p className="mt-4">This constant drift is not a failure of character. Your brain is wired to explore, and modern browsers and platforms are perfectly tuned to exploit this wiring with continuous notifications, layout tabs, and endless scroll loops.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center">
        <div>
          <h3 className="text-xl font-medium text-on-surface mb-2 tracking-tight">The Dopamine Explorer</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal">
            When your brain hits a difficult block of code or an annoying bug, it instinctively seeks a quick, low-resistance dopamine hit. A quick tab switch or Slack scroll provides it.
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant/80 font-normal mt-3">
            By using <strong className="text-primary font-semibold">Hyper</strong>, you get a clean background map of these micro-slips without having to manually log any of them.
          </p>
        </div>
        <FocusHeatMap />
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">Passive Steering</h2>
      <p>Instead of hard blocks, Hyper uses gentle, passive warnings. If you wander onto social media or random search tabs during coding blocks, Hyper sends a silent, friendly alert—bringing you back to focus without interrupting your workflow.</p>
    </>
  ),
  "how-to-track-focus-throughout-the-day": (
    <>
      <p>If you've ever tried to log your focus hours manually, you know how frustrating it is. You write down when you start, forget to pause when you check Slack, forget to stop when you take a break, and end up with highly inaccurate data.</p>
      <p className="mt-4">Knowledge work is highly dynamic. We bounce between editors, terminal panels, browsers, and reference sheets. Trying to track this manually breaks the exact flow we are trying to protect.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
        <FragmentationCounter />
        <div>
          <h4 className="text-base font-semibold text-on-surface mb-1 flex items-center gap-1.5">
            Passive Focus Telemetry
          </h4>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium">
            The only true solution is passive background tracking. An automated utility like <strong className="text-primary font-semibold">Hyper</strong> silently logs active window focus in the background.
          </p>
          <p className="text-xs leading-relaxed text-on-surface-variant/80 font-medium mt-2">
            No start buttons, no manual categorization—just clean, automated data served at the end of the day.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light text-on-surface mt-10 mb-4 tracking-tight border-l-2 border-primary pl-4">True Productivity Insights</h2>
      <p>Automated telemetry shows you the raw truth: your true focus stability blocks, your fragmentation counts, and your weekly heat maps. It lets you optimize your days based on empirical data, helping you double your real coding output while working fewer total hours.</p>
    </>
  )
};

const ARTICLES_META: Record<
  string,
  { title: string; subtitle: string; category: string; readTime: string }
> = {
  "productivity-lie": {
    title: "My computer just exposed my biggest productivity lie.",
    subtitle: "For years, I told everyone I worked highly efficient 10-hour days. Then a silent background analytics script tracked what I actually did. It was humiliating.",
    category: "Deep Work & The Truth",
    readTime: "5 min read"
  },
  "how-to-measure-productive-time-on-a-computer": {
    title: "How to Measure Productive Time on a Computer",
    subtitle: "Stop using manual timers. Real productivity isn't measured by how long your laptop screen is open, but by how long your active focus remains stable in creative tools.",
    category: "Workflow Metrics",
    readTime: "4 min read"
  },
  "why-am-i-productive-some-days-and-not-others": {
    title: "Why Am I Productive Some Days and Not Others?",
    subtitle: "Consistency in software engineering isn't about motivation or willpower. It's about context-switch stability and managing your daily cognitive energy curve.",
    category: "Mindset & Focus",
    readTime: "5 min read"
  },
  "how-to-find-your-most-productive-hours-of-the-day": {
    title: "How to Find Your Most Productive Hours of the Day",
    subtitle: "Stop following generic morning routine guides. Use passive background telemetry to pinpoint your own cognitive peaks.",
    category: "Peak Performance",
    readTime: "4 min read"
  },
  "what-affects-focus-while-working-on-a-computer": {
    title: "What Affects Focus While Working on a Computer?",
    subtitle: "Your computer is a battleground for your attention. From notification badges to active browser tab counts, here are the factors breaking your focus.",
    category: "Attention Architecture",
    readTime: "4 min read"
  },
  "how-to-improve-focus-while-working-from-home": {
    title: "How to Improve Focus While Working From Home",
    subtitle: "WFH offers incredible freedom, but it also strips away the natural boundaries that protect your attention. Here is how to rebuild them.",
    category: "Remote Work",
    readTime: "5 min read"
  },
  "how-long-can-most-people-stay-focused": {
    title: "How Long Can Most People Stay Focused?",
    subtitle: "Cognitive science shows that deep, high-level concentration has strict limits. Learn how to align your day with human cognitive biology.",
    category: "Cognitive Science",
    readTime: "4 min read"
  },
  "what-causes-loss-of-focus-during-work": {
    title: "What Causes Loss of Focus During Work?",
    subtitle: "Distraction isn't a character flaw. It's a design conflict between your brain's dopamine pathways and the modern desktop workspace.",
    category: "Focus Obstacles",
    readTime: "4 min read"
  },
  "how-to-build-better-focus-habits-while-working": {
    title: "How to Build Better Focus Habits While Working",
    subtitle: "Building long-term focus isn't about dramatic changes. It's about passive tracking, micro-feedback loops, and protecting your cognitive energy.",
    category: "Habit Design",
    readTime: "5 min read"
  },
  "why-do-i-get-distracted-so-easily-while-working": {
    title: "Why Do I Get Distracted So Easily While Working?",
    subtitle: "If you struggle to stay focused on a single task, the issue isn't your willpower. It's your digital environment's attention traps.",
    category: "Cognitive Science",
    readTime: "4 min read"
  },
  "how-to-track-focus-throughout-the-day": {
    title: "How to Track Focus Throughout the Day",
    subtitle: "Stop using timesheets and manual spreadsheets. Automated background tracking is the only accurate way to log true creative productivity.",
    category: "Workflow telemetry",
    readTime: "5 min read"
  }
};

export const ArticleClient = ({ slug }: { slug: string }) => {
  const meta = ARTICLES_META[slug];
  const content = ARTICLES_CONTENT[slug];

  const [copiedCommand, setCopiedCommand] = useState(false);
  const terminalCommand = `curl -fsSL hyper.synaptyc.cloud/mac | sh`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(terminalCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  if (!meta || !content) {
    return (
      <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-[600px] mx-auto px-gutter text-center py-20 flex flex-col items-center gap-4">
          <h1 className="text-4xl font-light text-on-surface">Article Not Found</h1>
          <p className="text-base text-on-surface-variant">The page you are looking for does not exist or has been moved.</p>
          <a href="/" className="btn-gradient px-6 py-3 rounded-full text-xs font-semibold mt-4">
            Back to Home
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 md:py-20">
        <div className="max-w-[850px] mx-auto px-gutter flex flex-col gap-10">
          
          {/* Article Header (Editorial Hero) */}
          <ScrollReveal>
            <div className="flex flex-col gap-4 text-center md:text-left border-b border-outline-variant/10 pb-8">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-bold tracking-wider text-primary uppercase">
                <span>Editorial Piece</span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40" />
                <span>{meta.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40" />
                <span className="bg-primary-fixed/20 px-2 py-0.5 rounded text-[10px] lowercase text-primary font-mono">{meta.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-light text-on-surface leading-tight tracking-tight mt-2">
                {meta.title}
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed mt-2 max-w-[750px]">
                {meta.subtitle}
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-3 mt-4 text-xs text-on-surface-variant font-medium">
                <span className="text-on-surface font-semibold">Written by Aditya</span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40" />
                <span>June 2, 2026</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Article Narrative Body */}
          <article className="prose prose-slate max-w-none text-base md:text-lg text-on-surface-variant/95 leading-relaxed font-light space-y-6">
            {content}
          </article>

          {/* Simulated HUD focus drift warning in-article */}
          <ScrollReveal delay={100}>
            <SimulatedHUDAlert />
          </ScrollReveal>

          {/* Premium Developer-focused CTA installer Section */}
          <ScrollReveal delay={150}>
            <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 border border-outline-variant/30 text-center relative overflow-hidden shadow-2xl my-12">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#3b82f6]/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="w-16 h-16 bg-[#e0f2fe] text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <span className="material-symbols-outlined text-3xl font-semibold">terminal</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-normal text-on-surface mb-2 tracking-tight">
                Try Hyper Terminal Install
              </h2>
              <p className="text-sm text-on-surface-variant max-w-[480px] mx-auto mb-8 leading-relaxed">
                Take control of your focus in less than 30 seconds. Run this single verified command to install Hyper instantly.
              </p>

              {/* Security Alert */}
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs rounded-xl p-3.5 mb-6 max-w-[480px] mx-auto text-left leading-relaxed flex items-start gap-2.5">
                <span className="material-symbols-outlined text-lg mt-0.5 flex-shrink-0">security</span>
                <span>
                  <strong>Security Note:</strong> Installing via Terminal is recommended to prevent macOS Gatekeeper ("unidentified developer") warnings and security download blockages.
                </span>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="text-left mb-6 max-w-[480px] mx-auto bg-surface-container/50 border border-outline-variant/20 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
                  Simplified Step-by-Step Instructions:
                </h4>
                <ol className="text-xs text-on-surface-variant space-y-2 list-decimal pl-4 font-medium leading-relaxed">
                  <li>Open the <strong>Terminal</strong> app (press <kbd className="bg-surface-container px-1.5 py-0.5 rounded text-[10px] border border-outline/20 font-sans">Cmd + Space</kbd>, type "Terminal", and hit Enter).</li>
                  <li>Copy and paste the single command below into the window.</li>
                  <li>Press <kbd className="bg-surface-container px-1.5 py-0.5 rounded text-[10px] border border-outline/20 font-sans">Enter</kbd> to securely download and install Hyper directly into your Applications folder.</li>
                </ol>
              </div>

              {/* Mock Terminal Card */}
              <div className="bg-[#0f172a] text-[#38bdf8] text-left rounded-2xl border border-slate-800 shadow-xl overflow-hidden mb-6 max-w-[480px] mx-auto">
                <div className="bg-[#1e293b]/70 px-4 py-3 flex items-center justify-between border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#10b981] opacity-80 inline-block"></span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">zsh</span>
                  <div className="w-10"></div>
                </div>
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

              <p className="text-[10px] text-on-surface-variant mb-6 font-medium">
                ℹ Installed directly into your macOS Applications folder. Windows downloads available below.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://github.com/iadityajrm/HyperLanding/releases/latest/download/hyper-mac.dmg"
                  className="btn-gradient px-8 py-3.5 rounded-xl text-xs font-semibold shadow-md hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <span className="material-symbols-outlined text-base">desktop_mac</span>
                  macOS DMG Installer
                </a>
                <a
                  href="https://github.com/iadityajrm/HyperLanding/releases/latest/download/hyper-win.exe"
                  className="bg-[#1e293b] hover:bg-[#0f172a] text-white border border-outline/10 px-8 py-3.5 rounded-xl text-xs font-semibold shadow-sm hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <span className="material-symbols-outlined text-base">desktop_windows</span>
                  Windows EXE Installer
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>

      <Footer />
    </div>
  );
};
