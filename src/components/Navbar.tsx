"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NAV_ITEMS = ["About", "Projects", "Open Source", "Skills", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar: name left, menu right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 36px",
        }}
      >
        {/* Wordmark left */}
        <span style={{
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Abhijnyan Saikia
        </span>

        {/* Menu button right */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "999px",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            padding: "9px 20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          MENU
          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{
              display: "block", width: "15px", height: "1.5px", background: "#fff",
              transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
              transition: "transform 0.2s",
            }} />
            <span style={{
              display: "block", width: "15px", height: "1.5px", background: "#fff",
              opacity: open ? 0 : 1,
              transition: "opacity 0.2s",
            }} />
            <span style={{
              display: "block", width: "15px", height: "1.5px", background: "#fff",
              transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
              transition: "transform 0.2s",
            }} />
          </span>
        </button>
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "72px",
              right: "36px",
              zIndex: 300,
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "6px 0",
              minWidth: "170px",
            }}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  color: "#bbbbbb",
                  fontSize: "13px",
                  fontWeight: 500,
                  padding: "11px 24px",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#06b6d4")}
                onMouseLeave={e => (e.currentTarget.style.color = "#bbbbbb")}
              >
                {item}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}