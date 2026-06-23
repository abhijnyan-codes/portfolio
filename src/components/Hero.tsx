"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import "@/styles/hero.css";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [article, setArticle] = useState("a");

  const typedText = useTypewriter([
    "Full Stack Developer",
    "Open Source Contributor",
    "AI Builder",
    "Problem Solver",
  ]);

  useEffect(() => {
    if (typedText.length > 0) {
      const isVowel = /^[aeiou]/i.test(typedText);
      setArticle(isVowel ? "an" : "a");
    }
  }, [typedText]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    setMouseX(x);
  };

  const navLinks = [
    { label: "/ GitHub",   href: "https://github.com/abhijnyan-codes" },
    { label: "/ LinkedIn", href: "https://www.linkedin.com/in/abhijnyan-saikia-458400298/" },
    { label: "/ Resume",   href: "/resume.pdf" },
  ];

  return (
    <section className="hero-section" onMouseMove={handleMouseMove}>

      {/* LAYER 0: FLUID AURORA ATMOSPHERE */}
      <div className="hero-aurora-container">
        <div className="aurora-blob-1" />
        <div className="aurora-blob-2" />
        <div className="aurora-blob-3" />
      </div>
      <div className="hero-vignette" />

      {/* LAYER 1: GREETING — always above portrait */}
      <div className="hero-greeting-layer">
        <div className="hero-typography-container">
          <motion.div
            className="hero-greeting-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="hero-greeting">Hey 👋, I'm {article}</span>
            <span className="hero-role"> {typedText}</span>
            <motion.span
              className="hero-cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>

      {/* LAYER 2: NAME BEHIND portrait */}
      <div className="hero-name-layer">
        <div className="hero-typography-container">
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            ABHIJNYAN SAIKIA
          </motion.h1>
        </div>
      </div>

      {/* LAYER 3: PORTRAIT */}
      <div className="hero-portrait-layer">
        {mounted && (
          <motion.img
            className="hero-portrait"
            src="/picture.png"
            alt="Abhijnyan Saikia"
            initial={{ y: 40, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              x: mouseX,
            }}
            transition={{
              y: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 1.2, delay: 0.2 },
              x: { type: "spring", stiffness: 50, damping: 20 },
            }}
          />
        )}
      </div>

      <div className="hero-bottom-fade" />

      {/* LAYER 4: EDITORIAL UI */}
      <div className="hero-ui-bottom-layer">

        <motion.div
          className="hero-contact-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="mailto:hello@abhijnyan.dev" className="hero-email">E hello@abhijnyan.dev</a>
          <span className="hero-location">L NIT Silchar, India</span>
          <span className="hero-copyright">© {new Date().getFullYear()}</span>
        </motion.div>

        <motion.div
          className="hero-bio-social-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="hero-bio">
            I craft fast, scalable, and user-friendly web applications with modern frameworks — combining robust backend architecture with exceptionally clean UI.
          </p>
          <div className="hero-links">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className="hero-link">
                {label.split("").map((char, i) => (
                  <span
                    key={i}
                    className="hero-link-char"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="hero-scroll-line" />
        <span className="hero-scroll-label">SCROLL</span>
      </motion.div>

      <div className="hero-noise" />

    </section>
  );
}