"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Left Column - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <h2 className="text-3xl font-bold text-primary tracking-tight">
              About Me<span className="text-accent">_</span>
            </h2>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-6 text-lg md:text-xl text-secondary leading-relaxed"
          >
            <p>
              I'm <span className="text-primary font-medium">Abhijnyan Saikia</span>, 
              a Computer Science student at NIT Silchar.
            </p>
            <p>
              I enjoy building full-stack applications, contributing to open 
              source, and solving algorithmic problems. My focus is on creating 
              clean, scalable software with modern web technologies.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}