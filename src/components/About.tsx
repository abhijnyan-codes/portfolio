"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ----------------------------------------------------------------------
// Premium Animated Counter Component
// ----------------------------------------------------------------------
function AnimatedCounter({ value, pad, float }: { value: number, pad: boolean, float: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { margin: "-50px" });

  useEffect(() => {
    if (nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(current) {
          if (nodeRef.current) {
            if (float) {
              nodeRef.current.textContent = current.toFixed(2);
            } else {
              const rounded = Math.round(current);
              nodeRef.current.textContent = pad ? rounded.toString().padStart(2, '0') : rounded.toString();
            }
          }
        }
      });
      return () => controls.stop();
    }
  }, [value, pad, float]);

  return <span ref={nodeRef}>{pad ? "00" : (float ? "0.00" : "0")}</span>;
}

// ----------------------------------------------------------------------
// Main About Component
// ----------------------------------------------------------------------
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stats State
  const [prCount, setPrCount] = useState(0); 
  const [projectCount, setProjectCount] = useState(0); 
  const [dbStats, setDbStats] = useState({ leetcode: 0, cgpa: 0.0 });

  useEffect(() => {
    // 1. Fetch Redis Stats with Cache Buster and Explicit Type Casting
    const timestamp = new Date().getTime();
    fetch(`/api/stats?t=${timestamp}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        // Safe check: Parse data strings into valid JS Numbers
        if (data && !data.error) {
          setDbStats({ 
            leetcode: data.leetcode ? Number(data.leetcode) : 0, 
            cgpa: data.cgpa ? Number(data.cgpa) : 0.0 
          });
        }
      })
      .catch((error) => console.error('Fetch Stats Failed:', error));

    // 2. Fetch Merged PRs
    fetch('/api/github/prs')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.total_count !== undefined) setPrCount(data.total_count);
      })
      .catch((error) => console.error('Fetch PRs Failed:', error));

    // 3. Fetch Completed Projects
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const completed = data.filter((repo: any) => repo.topics?.includes("completed"));
          setProjectCount(completed.length);
        }
      })
      .catch((error) => console.error("Fetch Projects Failed:", error));
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const stats = [
    { value: prCount, suffix: "", label: "Merged PRs", pad: true, float: false },
    { value: dbStats.leetcode, suffix: "", label: "DSA Solved", pad: false, float: false },
    { value: projectCount, suffix: "", label: "Products Built", pad: true, float: false },
    { value: dbStats.cgpa, suffix: "", label: "CGPA", pad: false, float: true }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full py-32 md:py-48 bg-[#090909] overflow-hidden font-sans border-t border-white/5"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#06b6d4]/5 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <motion.div 
        style={{ y: parallaxY }} 
        className="absolute top-[20%] left-0 w-full text-center text-[22vw] font-black text-white tracking-tighter select-none pointer-events-none z-0 leading-none opacity-[0.015]"
      >
        BUILDER
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
          
          <div className="flex flex-col w-full border-t border-white/10">
            <div className="py-6 border-b border-white/10 text-xs font-bold tracking-[0.2em] text-[#06b6d4] uppercase">
              Selected Highlights
            </div>
            
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col py-10 border-b border-white/[0.05] group cursor-default"
              >
                <div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2 group-hover:text-[#06b6d4] transition-colors duration-500">
                  <AnimatedCounter value={stat.value} pad={stat.pad} float={stat.float} />
                  <span className="text-white/40 font-light group-hover:text-[#06b6d4]/60 transition-colors duration-500">{stat.suffix}</span>
                </div>
                <div className="text-sm text-[#a1a1aa] font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col justify-center pt-8 lg:pt-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-[4.5rem] font-black leading-[1.05] tracking-tight mb-12"
            >
              <span className="text-white">I BUILD <span className="text-[#06b6d4]">PRODUCTS</span>,</span><br />
              <span className="text-white/20">NOT JUST PROJECTS.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pl-6 md:pl-8 border-l-2 border-[#06b6d4]/30 space-y-5 text-[#a1a1aa] text-base md:text-lg leading-relaxed max-w-xl mb-16"
            >
              <p>Started with problem solving and algorithms.</p>
              <p>Now focused on building full-stack applications, contributing to open source, and creating AI-powered products that solve real-world problems.</p>
            </motion.div>

            {/* BUTTON ROW - With properly matched motion tags! */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link href="https://drive.google.com/file/d/1DHtRzABsRuKLuf1BadBsJEWDEnd7H0HN/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="group relative h-14 px-8 rounded-full bg-[#06b6d4] text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(6,182,212,0.6)]">
                <span className="font-semibold tracking-wide text-sm">Resume</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              <Link href="https://github.com/abhijnyan-codes" target="_blank" rel="noopener noreferrer" className="group relative h-14 px-7 rounded-full bg-white/[0.03] border border-white/10 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 hover:border-[#06b6d4]/40 hover:-translate-y-1">
                 <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="opacity-90 group-hover:text-[#06b6d4] transition-colors"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span className="font-semibold tracking-wide text-sm opacity-90 group-hover:opacity-100 transition-opacity">GitHub</span>
              </Link>
              
              <Link href="https://www.linkedin.com/in/abhijnyan-saikia-458400298/" target="_blank" rel="noopener noreferrer" className="group relative h-14 px-7 rounded-full bg-white/[0.03] border border-white/10 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 hover:border-[#06b6d4]/40 hover:-translate-y-1">
                 <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="opacity-90 group-hover:text-[#06b6d4] transition-colors"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span className="font-semibold tracking-wide text-sm opacity-90 group-hover:opacity-100 transition-opacity">LinkedIn</span>
              </Link>

              <Link href="https://leetcode.com/u/abhijnyan-s9/" target="_blank" rel="noopener noreferrer" className="group relative h-14 px-7 rounded-full bg-white/[0.03] border border-white/10 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 hover:border-[#06b6d4]/40 hover:-translate-y-1">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="opacity-90 group-hover:text-[#06b6d4] transition-colors"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835s.513 2.853 1.494 3.835l4.332 4.363c.981.981 2.338 1.493 3.835 1.493s2.854-.512 3.835-1.493l2.609-2.636c.514-.515.498-1.366-.037-1.901-.536-.535-1.387-.552-1.902-.038zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg>
                <span className="font-semibold tracking-wide text-sm opacity-90 group-hover:opacity-100 transition-opacity">LeetCode</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay z-50 opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
      />
    </section>
  );
}