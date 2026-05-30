"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";

// Spectacular dynamic fragmentation particle-physics explosion component
const FragmentationCounter = () => {
  const [count, setCount] = useState(1);
  const [stage, setStage] = useState<"counting" | "exploding" | "faded">("counting");
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (stage === "counting") {
      let current = 1;
      let delay = 550; // Started slower (550ms vs 350ms)
      let timer: NodeJS.Timeout;

      const tick = () => {
        if (current >= 53) { // Reach 50+ before exploding
          setStage("exploding");
          // Generate realistic crumbling pieces flying outward
          const pts = [];
          for (let i = 0; i < 45; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 9;
            pts.push({
              id: i,
              x: 0,
              y: 0,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 2.5, // dynamic upward push
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

        // Exponential count acceleration (slower decay factor like 0.86 to keep it paced)
        delay = Math.max(25, delay * 0.86);
        timer = setTimeout(tick, delay);
      };

      timer = setTimeout(tick, delay);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Particle gravity and decay loops
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
            const nextVy = (p.vy + 0.2) * 0.97; // Gravity acceleration
            const nextVx = p.vx * 0.97;         // Air friction drag
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
    <div className="relative flex flex-col justify-center items-center h-[140px] select-none overflow-hidden w-full">
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

export const BentoGrid = () => {
  const [alertVisible, setAlertVisible] = useState(true);
  const [activeAlertIdx, setActiveAlertIdx] = useState(0);
  const [fadeAlert, setFadeAlert] = useState(true);

  // Focus Heat Map Dynamic Calibration states
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
      // Play a quick dynamic scanning sweep and randomize values slightly
      setTimeout(() => {
        setGridValues((prev) =>
          prev.map((v) => {
            const delta = (Math.random() - 0.5) * 0.28;
            return Math.min(Math.max(v + delta, 0.1), 1.0);
          })
        );
        setCalibrating(false);
      }, 1000);
    }, 8000); // Dynamic calibration every 8 seconds

    return () => clearInterval(timer);
  }, []);

  // Dynamic notification list based directly on user reference screenshot
  const alertData = [
    {
      title: "Take a Screen Break",
      time: "Yesterday, 9:01 AM",
      text: "You have been active continuously for 53 minutes. Step away for a few minutes to rest your eyes.",
      icon: (
        <svg className="w-5 h-5 text-[#E7A678]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-6 3 12 3-9 3 3h3" />
        </svg>
      ),
      iconBg: "bg-[#3D332A]"
    },
    {
      title: "Idle Activity Alert",
      time: "Yesterday, 1:19 PM",
      text: "You've been idle on Idle for a while. Close the window or resume your work.",
      icon: (
        <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-[#1e293b]"
    }
  ];

  // Alternating live transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeAlert(false);
      setTimeout(() => {
        setActiveAlertIdx((prev) => (prev === 0 ? 1 : 0));
        setFadeAlert(true);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentAlert = alertData[activeAlertIdx];

  return (
    <section id="features" className="bg-surface py-xl scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-gutter">
        <ScrollReveal>
          <div className="text-center mb-lg flex flex-col items-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              WHAT YOU GET
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-on-surface mb-xs max-w-[650px] mx-auto leading-tight">
              Everything you wish you knew about your own workday.
            </h2>
            <p className="text-base text-on-surface-variant max-w-[600px] mx-auto mt-2">
              Hyper tracks the patterns you can't see yourself — and tells you what actually matters.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-md">
          {/* Bento Item 1: Focus Heat Map */}
          <div className="md:col-span-2">
            <ScrollReveal delay={100} className="h-full">
              <div className="bg-surface-container-lowest rounded-2xl p-md ambient-shadow flex flex-col h-full min-h-[350px]">
                <div className="flex-grow flex flex-col mb-md rounded-xl bg-surface p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5 font-sans">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        grid_view
                      </span>
                      Focus Heat Map
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
                  <div className="grid grid-cols-7 gap-1 mt-auto relative">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                      <div
                        key={idx}
                        className="text-center text-[8px] text-on-surface-variant font-medium mb-1"
                      >
                        {day}
                      </div>
                    ))}

                    {/* 42 Dynamic transition heat blocks */}
                    {gridValues.map((val, idx) => (
                      <div
                        key={idx}
                        className="w-full aspect-[2.5/1] rounded-sm transition-all duration-[1000ms] relative overflow-hidden"
                        style={{
                          backgroundColor: `rgba(27, 79, 203, ${val})` // logo primary cobalt blue!
                        }}
                      >
                        {calibrating && (
                          <div className="absolute inset-0 bg-white/25 animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-on-surface mb-1">
                    See Your Best Hours
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Hyper maps your focus patterns across the week so you 
                    know exactly when you do your best work — and when you don't. 
                    Stop scheduling deep work at the wrong time.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bento Item 2: Focus Stability Analysis */}
          <div className="md:col-span-2">
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-surface-container-lowest rounded-2xl p-md ambient-shadow flex flex-col h-full min-h-[350px]">
                <div className="flex-grow flex flex-col mb-md rounded-xl bg-surface p-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-semibold text-on-surface flex items-center gap-2">
                      Today's Focus{" "}
                      <span className="bg-error-container text-error px-2 py-0.5 rounded-full text-[10px]">
                        ↓ 11%
                      </span>
                    </span>
                    <div className="text-xs text-primary font-medium">32% avg</div>
                  </div>
                  <div className="relative w-full flex-grow mt-auto min-h-[120px]">
                    <svg
                      className="w-full h-full absolute inset-0"
                      preserveAspectRatio="none"
                      viewBox="0 0 200 100"
                    >
                      <line
                        className="text-outline-variant/30"
                        stroke="currentColor"
                        strokeDasharray="2,2"
                        x1="0"
                        x2="200"
                        y1="25"
                        y2="25"
                      />
                      <line
                        className="text-outline-variant/30"
                        stroke="currentColor"
                        strokeDasharray="2,2"
                        x1="0"
                        x2="200"
                        y1="50"
                        y2="50"
                      />
                      <line
                        className="text-outline-variant/30"
                        stroke="currentColor"
                        strokeDasharray="2,2"
                        x1="0"
                        x2="200"
                        y1="75"
                        y2="75"
                      />
                      <path
                        className="text-primary"
                        d="M0,90 C20,90 30,70 40,70 C50,70 60,90 70,90 C80,90 90,20 100,30 C110,40 120,90 130,90 C140,90 150,30 160,20"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        className="opacity-10 text-primary"
                        d="M0,90 C20,90 30,70 40,70 C50,70 60,90 70,90 C80,90 90,20 100,30 C110,40 120,90 130,90 C140,90 150,30 160,20 L160,100 L0,100 Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="absolute -bottom-4 left-0 w-full flex justify-between text-[10px] text-on-surface-variant px-1">
                      <span>09:00 AM</span>
                      <span>09:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-medium text-on-surface mb-1">
                    Find What's Breaking Your Flow
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Every interruption costs more than you think. Hyper 
                    tracks your context switches throughout the day and pinpoints 
                    the exact triggers that break your concentration.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bento Item 3: Focus Distribution */}
          <div className="md:col-span-2">
            <ScrollReveal delay={300} className="h-full">
              <div className="bg-surface-container-lowest rounded-2xl p-md ambient-shadow flex flex-col h-full min-h-[350px]">
                <div className="flex-grow flex flex-col mb-md rounded-xl bg-surface p-6 justify-center">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wide mb-1">
                        True Effective Work
                      </p>
                      <div className="text-4xl font-light text-primary">1.12h</div>
                      <p className="text-xs text-on-surface-variant mt-1">
                        out of 5.4h logged time
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-on-surface bg-surface-container-highest px-3 py-1 rounded-full">
                        78% Efficiency
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 flex rounded-full overflow-hidden mb-4 bg-surface-variant">
                    {/* Work in emerald green, Switches in logo cobalt blue */}
                    <div className="bg-emerald-500 h-full" style={{ width: "30%" }}></div>
                    <div className="bg-error h-full" style={{ width: "15%" }}></div>
                    <div className="bg-[#2563eb] h-full" style={{ width: "10%" }}></div>
                    <div
                      className="bg-secondary-fixed-dim h-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Work
                      (30%)
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-error"></div> Distract
                      (15%)
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>{" "}
                      Switches (10%)
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></div>{" "}
                      Idle (45%)
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-on-surface mb-1">
                    Know Where Your Time Really Goes
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Not what you planned. Not what you hoped. What actually 
                    happened — broken down by app, project, and hour. No manual 
                    input, ever.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Stark, direct headline for two-column section */}
          <div className="md:col-span-6 mt-12 mb-4">
            <ScrollReveal>
              <h3 className="text-2xl md:text-3xl font-light text-on-surface">
                Stop Losing Hours You Don't Know You're Losing.
              </h3>
            </ScrollReveal>
          </div>

          {/* Bento Item 4: Work Fragmentation */}
          <div className="md:col-span-3">
            <ScrollReveal delay={100} className="h-full">
              <div className="bg-surface-container-lowest rounded-2xl p-md ambient-shadow flex flex-col h-full min-h-[350px]">
                <div className="flex-grow flex flex-col mb-md rounded-xl bg-surface p-6 justify-center">
                  <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wide mb-2 text-center">
                    FRAGMENTATION
                  </p>

                  {/* Dynamic exploding digit counter wrapper */}
                  <FragmentationCounter />

                  <div className="border-t border-outline-variant/30 pt-4 mt-2">
                    <p className="text-xs text-on-surface-variant font-medium text-center">
                      Fewer fragmentations mean longer focus durations.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-on-surface mb-1">
                    Your focus is more fragmented than you think.
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Most people believe they're focused. Hyper shows the 
                    truth — the constant tab switches, the 4-minute detours, the 
                    meetings that bleed into deep work time. Awareness is the 
                    first fix.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bento Item 5: Intelligence Alerts */}
          <div className="md:col-span-3">
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-surface-container-lowest rounded-2xl p-md ambient-shadow flex flex-col h-full min-h-[350px]">
                <div className="flex-grow flex flex-col mb-md rounded-xl bg-surface p-6 justify-center items-center relative overflow-hidden min-h-[220px]">
                  {alertVisible ? (
                    <div
                      className={`bg-[#2D2C2A] rounded-[24px] p-6 w-full max-w-[384px] flex gap-4 items-start shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative transition-all duration-300 transform text-left ${fadeAlert ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-2"
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-full ${currentAlert.iconBg} flex items-center justify-center flex-shrink-0`}>
                        {currentAlert.icon}
                      </div>
                      <div className="pt-0.5 flex-1 pr-4">
                        <div className="flex justify-between items-center mb-1 gap-2 flex-wrap">
                          <h4 className="font-semibold text-base text-white leading-tight">
                            {currentAlert.title}
                          </h4>
                          <span className="text-[10px] text-[#A89D92]">
                            {currentAlert.time}
                          </span>
                        </div>
                        <p className="text-xs text-[#D1C7BD] leading-relaxed font-normal">
                          {currentAlert.text}
                        </p>
                      </div>
                      <button
                        onClick={() => setAlertVisible(false)}
                        className="absolute top-5 right-5 text-[#D1C7BD] hover:text-white opacity-80 hover:opacity-100 transition-all cursor-pointer"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAlertVisible(true)}
                      className="px-4 py-2 border border-dashed border-outline-variant rounded-lg text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    >
                      Show Alert Simulation
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-on-surface mb-1">
                    Get a tap when you're drifting.
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Hyper notices when you've been idle or off-task and 
                    sends a quiet nudge — not a loud notification. Just enough 
                    to bring you back without breaking your rhythm.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
