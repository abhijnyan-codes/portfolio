"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ----------------------------------------------------------------------
// Premium Animated Counter Component
// ----------------------------------------------------------------------
function AnimatedCounter({ value, pad, float }: { value: number, pad: boolean, float: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  // Removed 'once: true' so it can re-trigger if data changes
  const inView = useInView(nodeRef, { margin: "-50px" });

  useEffect(() => {
    // We animate if inView is true. 
    // Because 'value' is in the dependency array, this useEffect
    // will re-run automatically when the API data arrives.
    if (inView && nodeRef.current) {
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
  }, [inView, value, pad, float]);

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
    // 1. Fetch Redis Stats
    const timestamp = new Date().getTime();
    fetch(`/api/stats?t=${timestamp}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.leetcode === 'number') {
          setDbStats({ leetcode: data.leetcode, cgpa: data.cgpa || 0.0 });
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