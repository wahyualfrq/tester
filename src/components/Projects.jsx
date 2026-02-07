import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All",
  "Software Development",
  "UI/UX",
  "Graphic Designer",
  "Video Editor",
];

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "Software Development",
    description: "Modern portfolio with React & Tailwind",
    tech: ["React", "Tailwind", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "E-Commerce App",
    category: "Software Development",
    description: "Full stack shopping platform",
    tech: ["Laravel", "MySQL", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Task Management Mobile",
    category: "Software Development",
    description: "Productivity tool for iOS & Android",
    tech: ["React Native", "Firebase"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Travel App UI Kit",
    category: "UI/UX",
    description: "Modern user interface design for travel app",
    tech: ["Figma", "Prototyping"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Brand Identity Design",
    category: "Graphic Designer",
    description: "Complete branding package for startup",
    tech: ["Illustrator", "Photoshop"],
    image: "https://images.unsplash.com/photo-1626785774573-4b7993143a26?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Product Promo Video",
    category: "Video Editor",
    description: "Cinematic product showcase video",
    tech: ["Premiere Pro", "After Effects"],
    image: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=1000&auto=format&fit=crop",
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
        <p className="text-gray-400 mb-8">Recent work and experiments</p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="group bg-dark/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-primary/80 backdrop-blur-md px-2 py-1 rounded-md text-white border border-white/10">
                      {project.category}
                    </span>
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-white/80 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-block text-sm font-medium text-white hover:text-primary transition-colors"
                >
                  View Project &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
