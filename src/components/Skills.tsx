"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["C++", "JavaScript", "TypeScript", "Python"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    title: "Tools & Design",
    skills: ["Git", "GitHub", "Figma", "VS Code", "UI/UX Design"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-border/50 bg-bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Technical Skills<span className="text-accent">_</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-border bg-background hover:border-accent/30 transition-colors group"
            >
              <h3 className="text-xl font-bold text-primary mb-6 group-hover:text-accent transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-bg-secondary text-secondary border border-border hover:text-primary hover:border-border transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}