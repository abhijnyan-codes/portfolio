"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "CareerPilot",
    description: "An AI-powered career guidance platform helping students navigate their professional journey with personalized roadmaps.",
    tech: ["Next.js", "Node.js", "MongoDB", "OpenAI"],
    github: "#",
    live: "#"
  },
  {
    title: "CaseFile Zero",
    description: "An interactive AI detective investigation game where players interrogate suspects and solve dynamic mysteries.",
    tech: ["React", "TypeScript", "Tailwind", "LLMs"],
    github: "#",
    live: "#"
  },
  {
    title: "CampusKart",
    description: "A complete student-based e-commerce marketplace application designed for campus buy-and-sell transactions.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-border/50 bg-bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Featured Projects<span className="text-accent">_</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-background hover:border-accent/50 transition-colors group flex flex-col h-full"
            >
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-secondary text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-bg-secondary text-secondary border border-border">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <Link href={project.github} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                  GitHub
                </Link>
                <Link href={project.live} className="text-sm font-medium text-accent hover:text-accent-light transition-colors">
                  Live Demo →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}