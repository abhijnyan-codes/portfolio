"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Subtle Pink Glow Background using the utility we made earlier */}
      <div className="absolute inset-0 bg-glow -z-10" />

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Appwrite-style Open Source Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-secondary/50 text-secondary text-sm font-medium mb-8 hover:border-accent/50 transition-colors cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          🚀 5+ Merged Open Source PRs <span className="text-accent ml-1">→</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6"
        >
          Building software, <br className="hidden md:block" />
          solving problems, <br className="hidden md:block" />
          and contributing to open source<span className="text-accent">_</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          CSE Student at NIT Silchar. Focused on Full Stack Development,
          Data Structures & Algorithms, and Open Source.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors text-center"
          >
            View Projects
          </Link>
          <Link
            href="/resume.pdf"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-border text-primary font-medium rounded-lg hover:bg-bg-secondary transition-colors text-center"
          >
            Download Resume
          </Link>
        </motion.div>
      </div>
    </section>
  );
}