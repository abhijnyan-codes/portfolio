"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Simple Icons via CDN — swaps gray/cyan on hover
const SI = ({ slug, className = "w-5 h-5" }: { slug: string; className?: string }) => (
  <>
    <img src={`https://cdn.simpleicons.org/${slug}/a1a1aa`} alt={slug} className={`${className} group-hover:hidden`} />
    <img src={`https://cdn.simpleicons.org/${slug}/06b6d4`} alt={slug} className={`${className} hidden group-hover:block`} />
  </>
);

// Inline SVG fallback for icons not in Simple Icons (VS Code, GSSoC)
const VSCodeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 3.5l-9 9 9 9" />
    <path d="M2 7.5l5 4.5-5 4.5" />
    <rect x="13" y="3" width="9" height="18" rx="1.5" fill="none" />
  </svg>
);

const GSSoCIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
    <path d="M8 12h4" />
  </svg>
);

type Skill = {
  name: string;
  icon: string | "vscode" | "gssoc";
};

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Building the user-facing experience.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    skills: [
      { name: "React",      icon: "react" },
      { name: "Next.js",    icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind",   icon: "tailwindcss" },
      { name: "HTML5",      icon: "html5" },
      { name: "CSS3",       icon: "css" },
    ] as Skill[]
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Architecting scalable server-side systems.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    skills: [
      { name: "Node.js",   icon: "nodedotjs" },
      { name: "Express",   icon: "express" },
      { name: "REST APIs", icon: "fastapi" },
      { name: "WebSocket", icon: "socketdotio" },
      { name: "MongoDB",   icon: "mongodb" },
      { name: "SQLite",    icon: "sqlite" },
    ] as Skill[]
  },
  {
    id: "languages",
    title: "Languages",
    subtitle: "The core syntax I use to build logic.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: "C++",        icon: "cplusplus" },
      { name: "C",          icon: "c" },
      { name: "Python",     icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "SQL",        icon: "mysql" },
    ] as Skill[]
  },
  {
    id: "tools",
    title: "Tools",
    subtitle: "My daily workflow and creative stack.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: [
      { name: "Git",     icon: "git" },
      { name: "GitHub",  icon: "github" },
      { name: "Figma",   icon: "figma" },
      { name: "VS Code", icon: "vscode" },
      { name: "Docker",  icon: "docker" },
      { name: "Netlify", icon: "netlify" },
      { name: "Render",  icon: "render" },
    ] as Skill[]
  }
];

const SkillIcon = ({ icon, className = "w-5 h-5" }: { icon: string; className?: string }) => {
  if (icon === "vscode") return <VSCodeIcon className={className} />;
  if (icon === "gssoc")  return <GSSoCIcon className={className} />;
  return <SI slug={icon} className={className} />;
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="relative w-full py-24 md:py-32 bg-[#090909] font-sans border-t border-white/[0.02] overflow-hidden">
      
      {/* Background watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden select-none">
        <h2 className="w-full text-center whitespace-nowrap text-[32vw] md:text-[35vw] font-black text-white opacity-[0.015] tracking-tighter leading-none">
          STACK
        </h2>
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#06b6d4]/5 blur-[120px] pointer-events-none rounded-full z-0" />

      <div className="relative z-20 max-w-[1100px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">
            Technical Arsenal<span className="text-[#06b6d4]">_</span>
          </h2>
          <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            A curated list of the frameworks, languages, and tools I use to turn ideas into production-ready software.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          
          {/* Tab nav */}
          <div className="w-full md:w-5/12 lg:w-1/3 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar border-b md:border-b-0 md:border-l border-white/10 md:pl-0">
            {skillCategories.map((category, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex flex-col items-start text-left px-5 py-4 md:px-6 md:py-5 rounded-xl md:rounded-none md:rounded-r-2xl transition-all duration-300 min-w-[180px] flex-shrink-0 md:min-w-0 md:flex-shrink ${
                    isActive ? "bg-white/[0.06] md:bg-transparent" : "hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] md:w-[3px] md:h-full bg-[#06b6d4]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`transition-colors duration-300 ${isActive ? "text-[#06b6d4]" : "text-[#71717a] group-hover:text-[#a1a1aa]"}`}>
                      {category.icon}
                    </div>
                    <span className={`text-base md:text-lg font-bold tracking-wide transition-colors duration-300 ${isActive ? "text-white" : "text-[#71717a] group-hover:text-[#a1a1aa]"}`}>
                      {category.title}
                    </span>
                  </div>
                  <span className={`hidden md:block text-xs mt-2 transition-colors duration-300 ${isActive ? "text-[#a1a1aa]" : "text-transparent"}`}>
                    {category.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill cards */}
          <div className="w-full md:w-7/12 lg:w-2/3 min-h-[250px] flex items-start pt-2 md:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {skillCategories[activeTab].skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group flex items-center gap-4 px-5 py-4 md:px-6 md:py-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-[#06b6d4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(6,182,212,0.2)] cursor-default w-full"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] group-hover:bg-[#06b6d4]/10 transition-colors shrink-0 border border-white/[0.05] group-hover:border-[#06b6d4]/20 shadow-inner text-[#a1a1aa] group-hover:text-[#06b6d4]">
                      <SkillIcon icon={skill.icon} />
                    </div>
                    <span className="text-sm md:text-base font-bold text-[#a1a1aa] group-hover:text-white transition-colors tracking-wide">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}