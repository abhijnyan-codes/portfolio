"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type PullRequest = {
  id: string;
  org: string;
  repo: string;
  rawTitle: string; 
  date: string;
  link: string;
};

// ==========================================
// 🚀 IMPACT-DRIVEN PR DICTIONARY
// ==========================================
const getPRDetails = (rawTitle: string, repo: string) => {
  const details: Record<string, { displayTitle: string; impact: string }> = {
    "keystonejs/keystone": {
      displayTitle: "Startup telemetry logging",
      impact: "Added startup telemetry status logging to the core engine, significantly improving debugging capabilities for enterprise developers."
    },
    "appwrite/appwrite": {
      displayTitle: "Enhanced Presences API",
      impact: "Architected new API endpoints to handle real-time user presence, reducing server load during high-concurrency socket connections."
    }
  };

  if (details[repo]) return details[repo];

  return {
    displayTitle: rawTitle.replace(/^(feat|fix|chore|docs)(\/.*?)?:/i, '').trim(),
    impact: "Successfully contributed to the core repository, passing all automated CI/CD pipelines and code reviews."
  };
};

export default function OpenSource() {
  const [allPrs, setAllPrs] = useState<PullRequest[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [totalCount, setTotalCount] = useState<number | string>("...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMergedPRs = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/search/issues?q=author:abhijnyan-codes+type:pr+is:merged&sort=updated&order=desc"
        );
        
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        if (data && data.items) {
          setTotalCount(data.total_count);
          
          const formattedPRs = data.items.map((item: any) => {
            const repoUrlParts = item.repository_url.split("/");
            const org = repoUrlParts[repoUrlParts.length - 2];
            const repo = `${org}/${repoUrlParts[repoUrlParts.length - 1]}`;
            
            const date = new Date(item.closed_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric"
            });

            return {
              id: item.id.toString(),
              org: org,
              repo: repo,
              rawTitle: item.title,
              date: date,
              link: item.html_url
            };
          });
          
          setAllPrs(formattedPRs);
        }
      } catch (error) {
        console.error("Error fetching GitHub PRs:", error);
        setTotalCount("5"); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchMergedPRs();
  }, []);

  const displayedPrs = showAll ? allPrs : allPrs.slice(0, 4);

  return (
    <section id="open-source" className="relative w-full py-24 md:py-32 bg-[#090909] font-sans border-t border-white/[0.02] overflow-hidden">
      
      {/* MASSIVE SUBTLE GITHUB BACKGROUND WATERMARK (Perfectly Centered) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] text-white opacity-[0.015] transform -translate-x-1/2 -translate-y-1/2"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>

      {/* CHANGED: Max-width reduced from 1000px to 850px to proportionally shrink all cards */}
      <div className="relative z-10 max-w-[850px] mx-auto px-6 md:px-12">
        
        {/* Integrated Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl mx-auto md:mx-0"
        >
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
              Open Source<span className="text-[#06b6d4]">_</span>
            </h2>
            <span className="hidden md:flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[9px] font-bold uppercase tracking-widest items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
              {totalCount}+ Merged
            </span>
          </div>
          
          <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed">
            Contributing infrastructure and feature code to tools that developers love.
          </p>
          
          {/* Mobile Badge */}
          <div className="md:hidden mt-4 inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[9px] font-bold uppercase tracking-widest items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
            {totalCount}+ Merged PRs
          </div>
        </motion.div>

        {/* Dynamic Contribution Timeline */}
        <div className="space-y-6 md:space-y-8 relative before:absolute before:inset-0 before:ml-[15px] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          {isLoading ? (
            <div className="text-center py-10 text-[#06b6d4] font-bold text-[10px] uppercase tracking-widest animate-pulse">
              Syncing with GitHub...
            </div>
          ) : allPrs.length > 0 ? (
            <AnimatePresence>
              {displayedPrs.map((pr, index) => {
                const { displayTitle, impact } = getPRDetails(pr.rawTitle, pr.repo);

                return (
                  <motion.div
                    key={pr.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index > 3 ? (index - 4) * 0.1 : index * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    {/* Glowing Timeline Dot */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#090909] bg-[#06b6d4] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#090909" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    
                    {/* PR Impact Card (Tighter padding & max width) */}
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-5 md:p-6 rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.035] hover:border-[#06b6d4]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#06b6d4]/5 flex flex-col">
                      
                      {/* Repo & Date Header */}
                      <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#06b6d4] flex items-center gap-1.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          {pr.repo}
                        </span>
                        <span className="text-[9px] text-[#a1a1aa] font-medium">
                          {pr.date}
                        </span>
                      </div>
                      
                      {/* Human-Readable Impact Title */}
                      <h3 className="text-sm font-bold text-white mb-2 leading-snug capitalize group-hover:text-[#06b6d4] transition-colors">
                        {displayTitle}
                      </h3>
                      
                      {/* Business Value / Impact Statement */}
                      <p className="text-[#71717a] text-xs leading-relaxed mb-5 flex-grow">
                        {impact}
                      </p>
                      
                      <div className="mt-auto pt-3 border-t border-white/[0.03]">
                        <Link href={pr.link} target="_blank" className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#a1a1aa] hover:text-[#06b6d4] transition-colors group/link">
                          View Pull Request 
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <div className="text-center py-10 text-[#a1a1aa] text-xs">
              No merged PRs found yet. Time to start contributing!
            </div>
          )}
        </div>

        {/* Expand / Collapse Button */}
        {allPrs.length > 4 && (
          <div className="relative z-10 flex justify-center pt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2.5 rounded-full border border-white/10 text-white/70 font-bold text-[9px] uppercase tracking-widest hover:bg-[#06b6d4] hover:border-[#06b6d4] hover:text-white transition-all duration-300 bg-[#090909]"
            >
              {showAll ? "Collapse Timeline" : "View All PRs"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}