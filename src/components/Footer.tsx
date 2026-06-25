"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 🚀 Hides the footer on the Command Center page
  if (pathname === "/admin") {
    return null;
  }

  return (
    <footer className="w-full border-t border-white/[0.05] bg-[#090909] py-8 md:py-12 relative z-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright & Signature */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <p className="text-xs md:text-sm font-medium text-[#a1a1aa] tracking-wide">
            © {new Date().getFullYear()} Abhijnyan Saikia. All rights reserved.
          </p>
          <p className="text-[10px] text-[#71717a] font-mono uppercase tracking-widest">
            Designed & Engineered with <span className="text-[#06b6d4]">♥</span>
          </p>
        </div>
        
        {/* Right Side: Back to Top Button */}
        <div className="flex items-center">
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#a1a1aa] hover:text-[#06b6d4] transition-all duration-300"
          >
            Back to Top 
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="group-hover:-translate-y-1 transition-transform"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
        
      </div>
    </footer>
  );
}