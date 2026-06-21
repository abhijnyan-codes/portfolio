"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const contributions = [
  {
    org: "Appwrite",
    repo: "appwrite/appwrite",
    title: "Feature: Enhanced Presences API functionality",
    date: "Oct 2023",
    status: "Merged",
    link: "#"
  },
  {
    org: "KeystoneJS",
    repo: "keystonejs/keystone",
    title: "Fix: Resolved edge case in GraphQL schema generation",
    date: "Aug 2023",
    status: "Merged",
    link: "#"
  },
  {
    org: "Other Contributions",
    repo: "open-source/project",
    title: "Docs: Updated quickstart guide and developer setup",
    date: "Jul 2023",
    status: "Merged",
    link: "#"
  }
];

export default function OpenSource() {
  return (
    <section id="open-source" className="py-24 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl font-bold text-primary tracking-tight mb-2">
              Open Source<span className="text-accent">_</span>
            </h2>
            <p className="text-secondary text-lg">Contributing to tools that developers love.</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-secondary text-sm font-medium text-primary">
            🚀 5+ Merged Pull Requests
          </div>
        </motion.div>

        {/* Contribution Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {contributions.map((pr, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-bg-secondary text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                </svg>
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-border bg-background hover:border-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-accent">{pr.org}</span>
                  <span className="text-xs font-medium text-secondary bg-bg-secondary px-2 py-1 rounded-md">{pr.status}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-1">{pr.title}</h3>
                <p className="text-sm text-secondary mb-4">{pr.repo}</p>
                <Link href={pr.link} className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1">
                  View PR <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}