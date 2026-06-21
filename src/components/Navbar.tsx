"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          AS.
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
          {["About", "Projects", "Open Source", "Skills", "Contact"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-accent transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://github.com/abhijnyan-codes" target="_blank" className="text-sm font-medium hover:text-accent transition-colors">
            GitHub
          </Link>
          <button className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-light transition-all">
            Resume
          </button>
        </div>
      </div>
    </motion.nav>
  );
}