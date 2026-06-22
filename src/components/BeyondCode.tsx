"use client";

import { motion } from "framer-motion";

const communityExperiences = [
  {
    id: "gdgc",
    role: "UI/UX Team Member",
    organization: "GDGC NIT Silchar",
    timeline: "2025 – 2026",
    description: "Worked on design initiatives, event experiences, and community-driven projects while collaborating with developers and organizers.",
    category: "Community"
  },
  {
    id: "nits-hacks",
    role: "Design Team",
    organization: "NITS Hacks",
    timeline: "Flagship Event",
    description: "Created branding assets, promotional material, and visual experiences for one of the institute's flagship hackathon events.",
    category: "Hackathon"
  },
  {
    id: "technoesis",
    role: "Website Design Team",
    organization: "Technoesis",
    timeline: "Tech Fest",
    description: "Contributed to the design and development of the official fest website, helping shape the digital experience for participants.",
    category: "Event"
  }
];

export default function BeyondCode() {
  return (
    <section id="beyond-the-code" className="relative w-full py-32 md:py-48 bg-[#090909] font-sans border-t border-white/[0.02] overflow-hidden">
      
      {/* MASSIVE BACKGROUND TEXT WATERMARK */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden select-none">
        <h2 className="w-full text-center whitespace-nowrap text-[25vw] md:text-[28vw] font-black text-white opacity-[0.015] tracking-tighter leading-none mt-12 md:mt-24">
          COMMUNITY
        </h2>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#06b6d4]/5 blur-[150px] pointer-events-none rounded-full z-0 transition-all duration-700" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06b6d4] text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
            Extracurricular
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6">
            BEYOND THE CODE<span className="text-[#06b6d4]">_</span>
          </h2>
          <p className="text-[#a1a1aa] text-base md:text-lg leading-relaxed max-w-2xl">
            The communities, events, and teams that shaped my journey as a builder.
          </p>
        </motion.div>

        {/* 3-Column Premium Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {communityExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.015] border border-white/[0.05] overflow-hidden hover:border-[#06b6d4]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.1)] flex flex-col h-full"
            >
              {/* Subtle Corner Glow on Hover */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-[#06b6d4]/10 blur-3xl group-hover:bg-[#06b6d4]/25 transition-all duration-700 z-0 pointer-events-none" />
              
              {/* Category Label */}
              <div className="relative z-10 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa] group-hover:text-white transition-colors">
                  {exp.category}
                </span>
              </div>
              
              {/* Organization & Role */}
              <div className="relative z-10 mb-6 flex-grow">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#06b6d4] transition-colors duration-300">
                  {exp.organization}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-white/90">
                    {exp.role}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[11px] font-mono text-[#71717a]">
                    {exp.timeline}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <div className="relative z-10 pt-6 border-t border-white/[0.03]">
                <p className="text-[#a1a1aa] text-sm leading-relaxed group-hover:text-[#d4d4d8] transition-colors">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Concluding Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto text-center"
        >
          {/* Decorative Quote Marks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-serif text-white/[0.03] select-none pointer-events-none">
            "
          </div>
          
          <h3 className="relative z-10 text-xl md:text-2xl lg:text-3xl font-medium text-white/90 tracking-tight leading-snug italic px-4">
            Great products are built through communities, collaboration, and continuous learning.
          </h3>
        </motion.div>

      </div>
    </section>
  );
}