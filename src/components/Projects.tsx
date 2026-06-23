"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Project = {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string | null;
};

// Language → color map
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

// ==========================================
// 🚀 YOUR CUSTOM CASE STUDY DATABASE
// Edit this to add specific details to each project!
// ==========================================
const getProjectDetails = (projectName: string, description: string) => {
  const details: Record<string, any> = {
    "Web-Browser-Simulation-": {
      timeline: "3 Weeks",
      team: "Solo",
      overview: "A full-stack browser simulation built to deeply understand the underlying mechanics of modern web browsers. It replicates core functionalities like tab lifecycle management, history state routing, and basic rendering logic.",
      role: [
        "Full-stack C++ Development",
        "Engine Architecture Design",
        "Memory Management & Optimization",
        "Custom UI Implementation"
      ],
      features: [
        "Custom Doubly Linked List for O(1) history traversal",
        "Memory-safe tab creation and destruction",
        "Interactive browser-inspired UI layout"
      ],
      improvements: [
        "Implement multi-threading for isolated tab processes",
        "Add a basic CSS/HTML parsing engine"
      ]
    },
    // Add more projects here like: "CampusKart": { ... }
  };

  // The Default Fallback Template
  return details[projectName] || {
    timeline: "2 Weeks",
    team: "Solo",
    overview: description || "A fully responsive, performance-optimized application built from scratch. Designed with scalability and aesthetics in mind, the goal was to deliver a bold online presence that captures attention while remaining user-friendly.",
    role: [
      "Full-stack Development",
      "UI/UX Implementation",
      "Component-based architecture",
      "Deployment & optimization"
    ],
    features: [
      "Responsive layout with smooth interactions",
      "Modular components for easy reuse",
      "Performance-optimized structure",
      "Clean, maintainable codebase"
    ],
    improvements: [
      "Implement advanced caching strategies",
      "Add comprehensive end-to-end testing"
    ]
  };
};

export default function Projects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [projectLangs, setProjectLangs] = useState<Record<string, string[]>>({});

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Fetch repos
  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const completed = data.filter((r) => r.topics?.includes("completed"));
          setAllProjects(completed);

          // Fetch languages for each repo in parallel
          completed.forEach((repo: Project) => {
            fetch(`/api/github/langs/${repo.name}`)
              .then((r) => r.json())
              .then((langs: Record<string, number>) => {
                const sorted = Object.entries(langs)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([lang]) => lang);
                setProjectLangs((prev) => ({ ...prev, [repo.name]: sorted }));
              })
              .catch(() => {});
          });
        }
      })
      .catch((err) => console.error("Failed to fetch GitHub projects", err));
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "auto";
  }, [activeProject]);

  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 3);

  return (
    <section id="projects" className="relative w-full pt-0 pb-20 bg-[#090909] font-sans overflow-hidden mt-0">

      {/* MASSIVE BACKGROUND TEXT WATERMARK */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden select-none">
        <h2 className="w-full text-center whitespace-nowrap text-[25vw] md:text-[28vw] font-black text-white opacity-[0.015] tracking-tighter leading-none mt-12 md:mt-24">
          PROJECTS
        </h2>
      </div>

      {/* Subtle side vines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between z-0">
        <svg className="w-24 md:w-48 h-full opacity-[0.02] transform -scale-x-100" preserveAspectRatio="none" viewBox="0 0 100 1000" fill="white">
          <path d="M10 0 Q 30 200 10 400 T 10 800 T 10 1000" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M10 100 Q 50 120 60 160 Q 30 180 10 150 Z" />
          <path d="M15 350 Q 80 340 90 400 Q 40 420 10 380 Z" />
          <path d="M5 650 Q 60 670 70 730 Q 20 750 5 700 Z" />
        </svg>
        <svg className="w-24 md:w-48 h-full opacity-[0.02]" preserveAspectRatio="none" viewBox="0 0 100 1000" fill="white">
          <path d="M10 0 Q 30 200 10 400 T 10 800 T 10 1000" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M10 150 Q 50 170 60 210 Q 30 230 10 200 Z" />
          <path d="M15 400 Q 80 390 90 450 Q 40 470 10 430 Z" />
          <path d="M5 700 Q 60 720 70 780 Q 20 800 5 750 Z" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 mb-8 text-center pt-8">
        <p className="text-[#06b6d4] text-[9px] font-bold tracking-[0.25em] uppercase mb-2">
          Selected Works
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
          Featured Product Launches.
        </h2>
      </div>

      {/* TIMELINE ARCHITECTURE */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 pt-4">
        
        {/* The Center Vertical Spine */}
        <div className="absolute left-[32px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2 z-0" />

        <AnimatePresence>
          {displayedProjects.map((project, i) => {
            const isLeft = i % 2 === 0;
            
            const apiLangs = projectLangs[project.name] || [];
            const repoTopics = project.topics?.filter(t => t !== "completed") || [];
            const primaryLang = project.language ? [project.language] : [];
            const combinedSkills = Array.from(new Set([...apiLangs, ...repoTopics, ...primaryLang])).slice(0, 4);

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex w-full mb-10 md:mb-0 ${isLeft ? "md:justify-start" : "md:justify-end"} ${i !== 0 ? "md:-mt-24 lg:-mt-[120px]" : ""}`}
              >
                {/* Mobile Glowing Dot */}
                <div className="md:hidden absolute left-[28px] top-10 w-2.5 h-2.5 bg-[#090909] border-2 border-[#06b6d4] rounded-full z-20 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />

                {/* Desktop Glowing Dot */}
                <div className="hidden md:block absolute left-1/2 top-16 w-2.5 h-2.5 bg-[#090909] border-2 border-[#06b6d4] rounded-full transform -translate-x-1/2 z-20 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />

                {/* Desktop Connector Line */}
                <div
                  className={`hidden md:block absolute top-[68px] h-px z-10 w-[40px] lg:w-[60px] ${
                    isLeft
                      ? "right-1/2 bg-gradient-to-l from-[#06b6d4]/30 to-transparent"
                      : "left-1/2 bg-gradient-to-r from-[#06b6d4]/30 to-transparent"
                  }`}
                />

                {/* The Card Wrapper */}
                <div className={`w-full pl-[56px] md:pl-0 md:w-[calc(50%-40px)] lg:w-[calc(50%-60px)]`}>
                  
                  <div
                    onClick={() => setActiveProject(project)}
                    className="group cursor-pointer bg-white/[0.015] border border-white/[0.05] rounded-xl overflow-hidden hover:bg-white/[0.035] hover:border-[#06b6d4]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#06b6d4]/5 transition-all duration-300 relative z-10 flex flex-col h-full"
                  >
                    
                    {/* Hover Arrow Indicator (Top Right) */}
                    <div className="absolute top-4 right-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#090909]/80 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-xl pointer-events-none">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>

                    {/* Visual Preview */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#111] border-b border-white/[0.03]">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/10 to-transparent z-0 group-hover:opacity-60 transition-opacity" />
                      <img
                        src={`https://raw.githubusercontent.com/abhijnyan-codes/${project.name}/main/preview.png`}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>

                    {/* Content */}
                    <div className="px-4 py-4 flex flex-col flex-grow">
                      
                      {/* Title & GitHub Icon Container */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-bold text-white tracking-tight capitalize group-hover:text-[#06b6d4] transition-colors pr-4">
                          {project.name.replace(/-/g, " ")}
                        </h3>
                        
                        {/* Direct GitHub Link (stopPropagation prevents modal from opening) */}
                        <Link
                          href={project.html_url}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#a1a1aa] hover:text-[#06b6d4] transition-colors z-30 p-1 rounded-md hover:bg-white/5"
                          aria-label="View source on GitHub"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                      </div>

                      <p className="text-[#71717a] text-[11px] leading-relaxed line-clamp-2 mb-4">
                        {project.description || "A high-performance application built to solve real-world problems."}
                      </p>

                      {/* Language & Skill chips */}
                      {combinedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.03] mt-auto">
                          {combinedSkills.map((lang) => (
                            <span
                              key={lang}
                              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa] text-[9px] font-medium tracking-wide group-hover:border-white/10 transition-colors"
                            >
                              {LANG_COLORS[lang] && (
                                <span
                                  className="w-1 h-1 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: LANG_COLORS[lang] }}
                                />
                              )}
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show more */}
      {allProjects.length > 3 && (
        <div className="relative z-10 flex justify-center pt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 rounded-full border border-white/10 text-white/50 font-bold text-[9px] uppercase tracking-widest hover:bg-[#06b6d4] hover:border-[#06b6d4] hover:text-white transition-all duration-300 bg-[#090909]"
          >
            {showAll ? "Collapse" : "View All Projects"}
          </button>
        </div>
      )}

      {/* ========================
          HARDCODED CASE STUDY MODAL
      ======================== */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100]">
            
            {/* Background Backdrop (Clicking outside closes modal) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-[#090909]/95 backdrop-blur-md cursor-pointer z-0"
            />

            {/* Scrollable Content Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 overflow-y-auto z-10"
            >
              <div className="max-w-[1000px] mx-auto px-6 md:px-12 pt-20 pb-40 relative">
                
                {/* Modal Header: Title + Metadata Box */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 mb-12">
                  
                  {/* Left Side: Title & Buttons */}
                  <div className="w-full md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 capitalize">
                      {activeProject.name.replace(/-/g, " ")}
                    </h1>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed mb-8">
                      {activeProject.description || "A high-performance application built to solve real-world problems."}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={activeProject.html_url}
                        target="_blank"
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#06b6d4] text-white font-medium text-[10px] tracking-widest uppercase transition-colors flex items-center gap-2"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </Link>
                      {activeProject.homepage && (
                        <Link
                          href={activeProject.homepage}
                          target="_blank"
                          className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-[10px] tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                          {activeProject.homepage.includes("youtube") || activeProject.homepage.includes("loom") ? "Watch Demo" : "Live Demo"}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Metadata Box */}
                  <div className="w-full md:w-5/12 bg-white/[0.02] border border-white/5 rounded-2xl p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <span className="text-[#06b6d4] text-[10px] font-bold uppercase tracking-wider block mb-1">Timeline</span>
                      <span className="text-sm text-white font-medium">{getProjectDetails(activeProject.name, activeProject.description).timeline}</span>
                    </div>
                    <div>
                      <span className="text-[#06b6d4] text-[10px] font-bold uppercase tracking-wider block mb-1">Team</span>
                      <span className="text-sm text-white font-medium">{getProjectDetails(activeProject.name, activeProject.description).team}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#06b6d4] text-[10px] font-bold uppercase tracking-wider block mb-2">Technologies</span>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set([...(projectLangs[activeProject.name] || []), ...(activeProject.topics?.filter(t => t !== "completed") || []), activeProject.language].filter(Boolean))).map((tech, idx) => (
                          <span key={idx} className="text-xs text-white/80 bg-white/5 border border-white/10 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#090909] border border-white/10 mb-16 relative">
                  <img
                    src={`https://raw.githubusercontent.com/abhijnyan-codes/${activeProject.name}/main/preview.png`}
                    alt={`${activeProject.name} Interface`}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                {/* STRUCTURED CONTENT SECTIONS */}
                <div className="max-w-[800px] space-y-12">
                  
                  <section>
                    <h2 className="text-xl font-bold text-white mb-4">Project Overview</h2>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed">
                      {getProjectDetails(activeProject.name, activeProject.description).overview}
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      Your Role <span className="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
                    </h2>
                    <ul className="space-y-3">
                      {getProjectDetails(activeProject.name, activeProject.description).role.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#a1a1aa]">
                          <span className="text-[#06b6d4] mt-0.5">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      Key Features <span className="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
                    </h2>
                    <ul className="space-y-3">
                      {getProjectDetails(activeProject.name, activeProject.description).features.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#a1a1aa]">
                          <span className="text-[#06b6d4] mt-0.5">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      Future Improvements <span className="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
                    </h2>
                    <ul className="space-y-3">
                      {getProjectDetails(activeProject.name, activeProject.description).improvements.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#a1a1aa]">
                          <span className="text-[#06b6d4] mt-0.5">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                </div>
              </div>
            </motion.div>

            {/* BULLETPROOF FIXED BACK BUTTON (Bottom Left, Top Layer) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveProject(null);
              }}
              className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999] px-6 py-3 rounded-full bg-[#06b6d4] hover:bg-[#0891b2] text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-transform hover:scale-105 font-bold text-[11px] uppercase tracking-widest cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Back
            </button>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}