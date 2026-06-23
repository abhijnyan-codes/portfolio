"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "empty">("idle");

  // Stat States
  const [leetcode, setLeetcode] = useState("");
  const [updateLeetcode, setUpdateLeetcode] = useState(false);

  const [cgpa, setCgpa] = useState("");
  const [updateCgpa, setUpdateCgpa] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bundle only the selected fields
    const updates: Record<string, string> = {};
    if (updateLeetcode && leetcode) updates.leetcode = leetcode;
    if (updateCgpa && cgpa) updates.cgpa = cgpa;

    // Prevent submission if nothing is checked/filled
    if (Object.keys(updates).length === 0) {
      setStatus("empty");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("loading");

    const res = await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, updates }), // Sending the bundle!
    });

    if (res.ok) {
      setStatus("success");
      // Reset everything after success
      setPassword(""); 
      setLeetcode(""); setUpdateLeetcode(false);
      setCgpa(""); setUpdateCgpa(false);
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/[0.05] p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-[#06b6d4]/20 blur-[50px] pointer-events-none" />

        <h1 className="text-2xl font-black tracking-tight mb-2 relative z-10">
          Command Center<span className="text-[#06b6d4]">_</span>
        </h1>
        <p className="text-[#a1a1aa] text-sm mb-8 relative z-10">
          Select the stats you want to update on the live edge database.
        </p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-6 relative z-10">
          
          
          <div className="flex items-center gap-4">
            <input 
              type="checkbox" 
              checked={updateLeetcode} 
              onChange={() => setUpdateLeetcode(!updateLeetcode)}
              className="w-5 h-5 accent-[#06b6d4] cursor-pointer"
            />
            <div className="flex flex-col gap-1 w-full">
              <label className={`text-xs font-bold uppercase tracking-wider ${updateLeetcode ? "text-white" : "text-[#a1a1aa]/50"}`}>
                LeetCode Count
              </label>
              <input 
                type="number" 
                disabled={!updateLeetcode}
                value={leetcode}
                onChange={(e) => setLeetcode(e.target.value)}
                className="bg-[#090909] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#06b6d4] disabled:opacity-30 transition-all"
                placeholder="e.g. 75"
              />
            </div>
          </div>

          
          <div className="flex items-center gap-4">
            <input 
              type="checkbox" 
              checked={updateCgpa} 
              onChange={() => setUpdateCgpa(!updateCgpa)}
              className="w-5 h-5 accent-[#06b6d4] cursor-pointer"
            />
            <div className="flex flex-col gap-1 w-full">
              <label className={`text-xs font-bold uppercase tracking-wider ${updateCgpa ? "text-white" : "text-[#a1a1aa]/50"}`}>
                Current CGPA
              </label>
              <input 
                type="number" 
                step="0.01" // Allows decimals for CGPA
                disabled={!updateCgpa}
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="bg-[#090909] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#06b6d4] disabled:opacity-30 transition-all"
                placeholder="e.g. 8.5"
              />
            </div>
          </div>

          
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Admin Protocol</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#090909] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors font-mono"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={status === "loading"}
            className={`mt-2 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 ${
              status === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
              status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
              status === "empty" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50" :
              "bg-[#06b6d4] text-white hover:bg-[#08cceb]"
            }`}
          >
            {status === "loading" ? "SYNCING..." : 
             status === "success" ? "DATABASE UPDATED" : 
             status === "error" ? "UNAUTHORIZED" : 
             status === "empty" ? "SELECT A FIELD FIRST" :
             "DEPLOY UPDATE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}