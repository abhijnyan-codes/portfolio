"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 border-t border-border/50 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-glow -z-10" />

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-8">
            Let's Build Something Together<span className="text-accent">_</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="mailto:your.email@example.com"
            className="w-full sm:w-auto px-8 py-3.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors text-center"
          >
            Email Me
          </Link>
          <Link
            href="https://github.com/abhijnyan-codes"
            target="_blank"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-border text-primary font-medium rounded-lg hover:bg-bg-secondary transition-colors text-center"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-border text-primary font-medium rounded-lg hover:bg-bg-secondary transition-colors text-center"
          >
            LinkedIn
          </Link>
        </motion.div>
      </div>
    </section>
  );
}