"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GithubRepo = { name: string; html_url: string; topics?: string[]; };

export default function AdminDashboard() {
  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState<"projects" | "stats" | "skills">("projects");
  const [password, setPassword] = useState("");
  
  // --- STATUS STATE ---
  const [statsStatus, setStatsStatus] = useState<"idle" | "loading" | "success" | "error" | "empty">("idle");
  const [skillsStatus, setSkillsStatus] = useState<"idle" | "loading" | "success" | "error" | "empty">("idle");
  const [projectStatus, setProjectStatus] = useState<"idle" | "loading" | "success" | "error" | "empty">("idle");

  // --- DATA SOURCES ---
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [existingProjects, setExistingProjects] = useState<any[]>([]);

  // --- FORM STATES ---
  const [leetcode, setLeetcode] = useState("");
  const [updateLeetcode, setUpdateLeetcode] = useState(false);
  const [cgpa, setCgpa] = useState("");
  const [updateCgpa, setUpdateCgpa] = useState(false);

  const [skills, setSkills] = useState({ languages: "", frontend: "", backend: "", tools: "" });

  const [project, setProject] = useState({
    id: "", title: "", description: "", timeline: "", team: "Solo", tech: "",         
    githubUrl: "", demoUrl: "", overview: "", role: "", features: "",     
    customSections: [] as { title: string; content: string }[] 
  });

  // --- INITIAL FETCH (PRELOADS ALL DATA) ---
  useEffect(() => {
    // 1. Preload Repositories
    fetch("/api/github/repos").then(res => res.json()).then(data => {
      if (Array.isArray(data)) setRepos(data.filter((r) => r.topics?.includes("completed")));
    }).catch(console.error);

    // 2. Preload Projects for the Dropdown
    fetch("/api/projects").then(res => res.json()).then(data => {
      if (Array.isArray(data)) setExistingProjects(data);
    }).catch(console.error);

    // 3. Preload Live Stats!
    fetch("/api/stats").then(res => res.json()).then(data => {
      if (data && !data.error) {
        if (data.leetcode) setLeetcode(data.leetcode);
        if (data.cgpa) setCgpa(data.cgpa);
      }
    }).catch(console.error);

    // 4. Preload Live Skills!
    fetch("/api/skills").then(res => res.json()).then(data => {
      if (data && !data.error) {
        setSkills({
          languages: data.languages?.join(", ") || "",
          frontend: data.frontend?.join(", ") || "",
          backend: data.backend?.join(", ") || "",
          tools: data.tools?.join(", ") || "",
        });
      }
    }).catch(console.error);
  }, []);

  // --- HANDLERS ---
  const handleRepoSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const repo = repos.find(r => r.name === selectedName);
    const existing = existingProjects.find(p => p.id === selectedName);

    if (existing) {
      setProject({
        ...existing,
        tech: Array.isArray(existing.tech) ? existing.tech.join(", ") : existing.tech,
        role: Array.isArray(existing.role) ? existing.role.join("\n") : existing.role,
        features: Array.isArray(existing.features) ? existing.features.join("\n") : existing.features,
        customSections: existing.customSections?.map((sec: any) => ({
          title: sec.title, content: Array.isArray(sec.content) ? sec.content.join("\n") : sec.content
        })) || []
      });
    } else {
      setProject({ id: selectedName, title: selectedName.replace(/-/g, " "), description: "", timeline: "", team: "Solo", tech: "", githubUrl: repo?.html_url || "", demoUrl: "", overview: "", role: "", features: "", customSections: [] });
    }
  };

  const addSection = () => setProject({ ...project, customSections: [...project.customSections, { title: "", content: "" }] });
  const updateSection = (idx: number, field: "title" | "content", val: string) => { const updated = [...project.customSections]; updated[idx][field] = val; setProject({ ...project, customSections: updated }); };
  const removeSection = (idx: number) => setProject({ ...project, customSections: project.customSections.filter((_, i) => i !== idx) });

  const handleUpdateStats = async () => {
    if (!password) return setStatsStatus("error");
    const updates: Record<string, string> = {};
    if (updateLeetcode && leetcode) updates.leetcode = leetcode;
    if (updateCgpa && cgpa) updates.cgpa = cgpa;
    if (Object.keys(updates).length === 0) { setStatsStatus("empty"); setTimeout(() => setStatsStatus("idle"), 3000); return; }
    
    setStatsStatus("loading");
    const res = await fetch("/api/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, updates }) });
    if (res.ok) { setStatsStatus("success"); setUpdateLeetcode(false); setUpdateCgpa(false); setTimeout(() => setStatsStatus("idle"), 3000); } 
    else { setStatsStatus("error"); setTimeout(() => setStatsStatus("idle"), 3000); }
  };

  const handleUpdateSkills = async () => {
    if (!password) return setSkillsStatus("error");
    setSkillsStatus("loading");
    const formattedSkills = {
      languages: skills.languages.split(",").map(s => s.trim()).filter(Boolean),
      frontend: skills.frontend.split(",").map(s => s.trim()).filter(Boolean),
      backend: skills.backend.split(",").map(s => s.trim()).filter(Boolean),
      tools: skills.tools.split(",").map(s => s.trim()).filter(Boolean),
    };
    const res = await fetch("/api/admin/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, skills: formattedSkills }) });
    if (res.ok) { setSkillsStatus("success"); setTimeout(() => setSkillsStatus("idle"), 3000); } 
    else { setSkillsStatus("error"); setTimeout(() => setSkillsStatus("idle"), 3000); }
  };

  const handleUpdateProject = async () => {
    if (!password) return setProjectStatus("error");
    if (!project.id || !project.title || !project.overview) { setProjectStatus("empty"); setTimeout(() => setProjectStatus("idle"), 3000); return; }
    
    setProjectStatus("loading");
    const projectPayload = {
      ...project,
      tech: project.tech.split(",").map(t => t.trim()).filter(Boolean),
      role: project.role.split("\n").map(t => t.trim()).filter(Boolean),
      features: project.features.split("\n").map(t => t.trim()).filter(Boolean),
      customSections: project.customSections.map(sec => ({ title: sec.title, content: sec.content.split("\n").map(c => c.trim()).filter(Boolean) })).filter(sec => sec.title && sec.content.length > 0) 
    };
    const res = await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, project: projectPayload }) });
    if (res.ok) {
      setProjectStatus("success");
      setExistingProjects(prev => { const idx = prev.findIndex(p => p.id === projectPayload.id); if (idx !== -1) { const newArr = [...prev]; newArr[idx] = projectPayload; return newArr; } return [projectPayload, ...prev]; });
      setProject({ id: "", title: "", description: "", timeline: "", team: "Solo", tech: "", githubUrl: "", demoUrl: "", overview: "", role: "", features: "", customSections: [] });
      setTimeout(() => setProjectStatus("idle"), 3000);
    } else { setProjectStatus("error"); setTimeout(() => setProjectStatus("idle"), 3000); }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-12 font-sans w-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER & GLOBAL SECURITY */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Command Center<span className="text-[#06b6d4]">_</span></h1>
            <p className="text-[#a1a1aa] tracking-wide text-sm">Live Edge Database Operations Architecture</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center px-4 py-2 w-full md:w-auto">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-3" />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="bg-transparent border-none focus:outline-none text-white font-mono tracking-[0.2em] w-full md:w-48 placeholder-white/20" 
              placeholder="PROTOCOL KEY" 
            />
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap gap-2 p-1 bg-white/[0.02] border border-white/[0.05] rounded-xl w-full md:w-fit">
          <button onClick={() => setActiveTab("projects")} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === "projects" ? "bg-[#06b6d4] text-[#090909] shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "text-[#a1a1aa] hover:text-white hover:bg-white/5"}`}>Case Studies</button>
          <button onClick={() => setActiveTab("stats")} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === "stats" ? "bg-[#06b6d4] text-[#090909] shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "text-[#a1a1aa] hover:text-white hover:bg-white/5"}`}>Live Stats</button>
          <button onClick={() => setActiveTab("skills")} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === "skills" ? "bg-[#06b6d4] text-[#090909] shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "text-[#a1a1aa] hover:text-white hover:bg-white/5"}`}>Skills Engine</button>
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 rounded-3xl min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* --- TAB 1: PROJECTS --- */}
            {activeTab === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/10 pb-6">
                  <h3 className="text-[#06b6d4] font-bold tracking-widest text-xs uppercase">Project Editor</h3>
                  <button onClick={handleUpdateProject} disabled={projectStatus === "loading"} className={`px-8 py-3 rounded-xl font-bold text-xs uppercase transition-all ${projectStatus === "success" ? "bg-green-500/20 text-green-400" : projectStatus === "error" ? "bg-red-500/20 text-red-400" : projectStatus === "empty" ? "bg-yellow-500/20 text-yellow-400" : "bg-[#06b6d4] text-[#090909] hover:bg-white"}`}>
                    {projectStatus === "loading" ? "Syncing..." : projectStatus === "success" ? "Deployed" : "Save Case Study"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Select Repository</label><select value={project.id} onChange={handleRepoSelect} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]"><option value="" disabled>Select project...</option>{repos.map(r => (<option key={r.name} value={r.name}>{r.name}</option>))}</select></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Display Title</label><input type="text" value={project.title} onChange={(e) => setProject({...project, title: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]" /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Description / Subtitle</label><input type="text" value={project.description} onChange={(e) => setProject({...project, description: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]" /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Timeline</label><input type="text" value={project.timeline} onChange={(e) => setProject({...project, timeline: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]" /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Team Size</label><input type="text" value={project.team} onChange={(e) => setProject({...project, team: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]" /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Tech Stack (comma sep)</label><input type="text" value={project.tech} onChange={(e) => setProject({...project, tech: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]" /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">GitHub Link</label><input type="url" value={project.githubUrl} onChange={(e) => setProject({...project, githubUrl: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]" /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Demo Link</label><input type="url" value={project.demoUrl} onChange={(e) => setProject({...project, demoUrl: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#06b6d4]" /></div>
                </div>
                <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Project Overview</label><textarea rows={5} value={project.overview} onChange={(e) => setProject({...project, overview: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-4 text-sm w-full focus:outline-none focus:border-[#06b6d4]" /></div>
                <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Your Role</label><textarea rows={5} value={project.role} onChange={(e) => setProject({...project, role: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-4 text-sm w-full focus:outline-none focus:border-[#06b6d4]" /></div>
                <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase">Key Features</label><textarea rows={5} value={project.features} onChange={(e) => setProject({...project, features: e.target.value})} className="bg-[#090909] border border-white/10 rounded-lg p-4 text-sm w-full focus:outline-none focus:border-[#06b6d4]" /></div>

                {project.customSections.map((section, idx) => (
                  <div key={idx} className="bg-white/[0.02] p-6 rounded-xl border border-white/5 space-y-3 relative group">
                    <input type="text" value={section.title} onChange={(e) => updateSection(idx, "title", e.target.value)} className="bg-transparent border-b border-white/20 text-[#06b6d4] text-xs font-bold uppercase w-full pb-1 focus:outline-none focus:border-[#06b6d4]" placeholder="Section Title..." />
                    <textarea rows={4} value={section.content} onChange={(e) => updateSection(idx, "content", e.target.value)} className="bg-[#090909] border border-white/10 rounded-lg p-4 text-sm w-full focus:outline-none focus:border-[#06b6d4]" />
                    <button type="button" onClick={() => removeSection(idx)} className="text-red-500 text-[10px] font-bold uppercase absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                  </div>
                ))}
                <button onClick={addSection} className="w-full py-4 rounded-xl border border-dashed border-white/20 text-[#a1a1aa] text-xs font-bold uppercase hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors">+ Add Custom Section</button>
              </motion.div>
            )}

            {/* --- TAB 2: STATS --- */}
            {activeTab === "stats" && (
              <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <h3 className="text-[#06b6d4] font-bold tracking-widest text-xs uppercase">Live Metrics Engine</h3>
                  <button onClick={handleUpdateStats} disabled={statsStatus === "loading"} className={`px-8 py-3 rounded-xl font-bold text-xs uppercase transition-all ${statsStatus === "success" ? "bg-green-500/20 text-green-400" : statsStatus === "error" ? "bg-red-500/20 text-red-400" : statsStatus === "empty" ? "bg-yellow-500/20 text-yellow-400" : "bg-[#06b6d4] text-[#090909] hover:bg-white"}`}>
                    {statsStatus === "loading" ? "Syncing..." : statsStatus === "success" ? "Deployed" : "Sync Stats"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="flex items-center gap-4 bg-[#090909] p-6 rounded-2xl border border-white/5">
                    <input type="checkbox" checked={updateLeetcode} onChange={() => setUpdateLeetcode(!updateLeetcode)} className="w-5 h-5 accent-[#06b6d4] cursor-pointer" />
                    <div className="flex flex-col gap-1 w-full">
                      <label className={`text-[10px] font-bold uppercase tracking-wider ${updateLeetcode ? "text-white" : "text-[#a1a1aa]/50"}`}>LeetCode Count</label>
                      <input type="number" disabled={!updateLeetcode} value={leetcode} onChange={(e) => setLeetcode(e.target.value)} className="bg-transparent border-b border-white/10 px-1 py-2 text-white text-xl focus:outline-none focus:border-[#06b6d4] disabled:opacity-30" placeholder="e.g. 75" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-[#090909] p-6 rounded-2xl border border-white/5">
                    <input type="checkbox" checked={updateCgpa} onChange={() => setUpdateCgpa(!updateCgpa)} className="w-5 h-5 accent-[#06b6d4] cursor-pointer" />
                    <div className="flex flex-col gap-1 w-full">
                      <label className={`text-[10px] font-bold uppercase tracking-wider ${updateCgpa ? "text-white" : "text-[#a1a1aa]/50"}`}>Current CGPA</label>
                      <input type="number" step="0.01" disabled={!updateCgpa} value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="bg-transparent border-b border-white/10 px-1 py-2 text-white text-xl focus:outline-none focus:border-[#06b6d4] disabled:opacity-30" placeholder="e.g. 8.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- TAB 3: SKILLS --- */}
            {activeTab === "skills" && (
              <motion.div key="skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <h3 className="text-[#06b6d4] font-bold tracking-widest text-xs uppercase">Skills Architecture</h3>
                  <button onClick={handleUpdateSkills} disabled={skillsStatus === "loading"} className={`px-8 py-3 rounded-xl font-bold text-xs uppercase transition-all ${skillsStatus === "success" ? "bg-green-500/20 text-green-400" : skillsStatus === "error" ? "bg-red-500/20 text-red-400" : "bg-[#06b6d4] text-[#090909] hover:bg-white"}`}>
                    {skillsStatus === "loading" ? "Syncing..." : skillsStatus === "success" ? "Deployed" : "Save Skills"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">Languages (Comma Separated)</label><textarea rows={6} value={skills.languages} onChange={(e) => setSkills({...skills, languages: e.target.value})} className="bg-[#090909] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#06b6d4] leading-relaxed" placeholder="C++, TypeScript, Python..." /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">Frontend (Comma Separated)</label><textarea rows={6} value={skills.frontend} onChange={(e) => setSkills({...skills, frontend: e.target.value})} className="bg-[#090909] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#06b6d4] leading-relaxed" placeholder="React, Next.js, Tailwind..." /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">Backend (Comma Separated)</label><textarea rows={6} value={skills.backend} onChange={(e) => setSkills({...skills, backend: e.target.value})} className="bg-[#090909] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#06b6d4] leading-relaxed" placeholder="Node.js, Postgres, Redis..." /></div>
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">Tools (Comma Separated)</label><textarea rows={6} value={skills.tools} onChange={(e) => setSkills({...skills, tools: e.target.value})} className="bg-[#090909] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#06b6d4] leading-relaxed" placeholder="Git, Docker, Figma..." /></div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}