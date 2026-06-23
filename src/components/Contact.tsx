"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/abhijnyan-codes",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/your-profile", // Replace with your LinkedIn
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    name: "X (Twitter)",
    url: "https://twitter.com/your-profile", // Replace with your X handle
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.827H5.045z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    url: "https://instagram.com/your-profile", // Replace with your Instagram
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    name: "Discord",
    url: "https://discord.com/users/your-id", // Replace with your Discord invite/ID
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.22 4.13c-1.35-.61-2.81-1.05-4.34-1.28-.2-.36-.42-.78-.58-1.15-1.57-.24-3.13-.24-4.66 0-.17.37-.39.8-.59 1.15-1.53.23-2.99.67-4.34 1.28-2.73 4.14-3.48 8.16-3.13 12.11 1.8 1.34 3.53 2.15 5.23 2.65.42-.58.81-1.19 1.15-1.83-.8-.3-1.57-.68-2.28-1.12.19-.14.38-.28.56-.43 3.4 1.57 7.07 1.57 10.43 0 .19.15.38.29.57.43-.72.44-1.49.82-2.3 1.12.35.64.74 1.25 1.16 1.83 1.7-.5 3.44-1.31 5.23-2.65.4-4.31-.6-8.29-3.09-12.11zm-10.74 9.1c-.88 0-1.61-.81-1.61-1.79s.71-1.79 1.61-1.79c.9 0 1.62.81 1.61 1.79 0 .98-.71 1.79-1.61 1.79zm7.04 0c-.88 0-1.61-.81-1.61-1.79s.71-1.79 1.61-1.79c.9 0 1.62.81 1.61 1.79 0 .98-.71 1.79-1.61 1.79z"/>
      </svg>
    )
  }
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-32 md:py-48 bg-[#090909] font-sans border-t border-white/[0.02] overflow-hidden">
      
      {/* MASSIVE BACKGROUND TEXT WATERMARK */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden select-none">
        <h2 className="w-full text-center whitespace-nowrap text-[25vw] md:text-[28vw] font-black text-white opacity-[0.015] tracking-tighter leading-none mt-24">
          CONTACT
        </h2>
      </div>

      {/* Deep Bottom Glow */}
      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#06b6d4]/10 blur-[150px] pointer-events-none rounded-full z-0" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06b6d4] text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
            Available for opportunities
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6">
            Let's Build Something<br className="hidden md:block" /> Together<span className="text-[#06b6d4]">_</span>
          </h2>
          <p className="text-[#a1a1aa] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you have a project in mind, a team looking for a builder, or just want to chat about tech—my inbox is always open.
          </p>
        </motion.div>

        {/* Email Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Primary Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link 
              href="mailto:abhijnyansaikia02@gmail.com"
              className="group flex flex-col items-center text-center p-10 rounded-3xl bg-white/[0.015] border border-white/[0.05] hover:bg-white/[0.03] hover:border-[#06b6d4]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.1)] h-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#06b6d4]/0 to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a1a1aa] group-hover:text-[#06b6d4] group-hover:bg-[#06b6d4]/10 transition-colors mb-6 relative z-10">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#a1a1aa] mb-2 relative z-10">Primary Email</h3>
              <p className="text-white font-medium md:text-lg group-hover:text-[#06b6d4] transition-colors relative z-10">
                abhijnyansaikia02@gmail.com
              </p>
            </Link>
          </motion.div>

          {/* Professional Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="mailto:abhijnyansaikia@zohomail.in"
              className="group flex flex-col items-center text-center p-10 rounded-3xl bg-white/[0.015] border border-white/[0.05] hover:bg-white/[0.03] hover:border-[#06b6d4]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.1)] h-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#06b6d4]/0 to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a1a1aa] group-hover:text-[#06b6d4] group-hover:bg-[#06b6d4]/10 transition-colors mb-6 relative z-10">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M10.5 14.5L3 8"></path>
                  <path d="M13.5 14.5L21 8"></path>
                  <path d="M15.5 12.5L21 17"></path>
                  <path d="M8.5 12.5L3 17"></path>
                </svg>
              </div>
              
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#a1a1aa] mb-2 relative z-10">Professional Inquiries</h3>
              <p className="text-white font-medium md:text-lg group-hover:text-[#06b6d4] transition-colors relative z-10">
                abhijnyansaikia@zohomail.in
              </p>
            </Link>
          </motion.div>

        </div>

        {/* Social Icons Array */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-[#a1a1aa] hover:bg-[#06b6d4] hover:text-white hover:border-[#06b6d4] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}