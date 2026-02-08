import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects, categories } from "../data/projects";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getFilteredProjects = () => {
    if (activeCategory !== "All") {
      return projects.filter((project) => project.category === activeCategory);
    }

    if (isMobile) {
      // Pick one from each requested category
      const software = projects.find(p => p.category === "Software Development");
      const uiux = projects.find(p => p.category === "UI/UX");
      const graphic = projects.find(p => p.category === "Graphic Designer");
      
      return [software, uiux, graphic].filter(Boolean);
    }

    // Limit to 6 projects for the home page if not filtered
    return projects.slice(0, 6);
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="mb-16"
      >
        <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-0 mb-12">
          {/* Left Side: Heading */}
          <div className="flex-1 text-center md:text-right md:pr-20 lg:pr-32">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight flex flex-row md:justify-end items-baseline gap-3">
              <span className="font-sans text-slate-300 dark:text-white/30 uppercase text-3xl md:text-5xl">My</span>
              <span className="font-display text-slate-900 dark:text-white">Projects</span>
            </h2>
          </div>

          {/* Vertical Line Separator */}
          <div className="hidden md:block w-[1px] h-24 bg-slate-300 dark:bg-white/10" />

          {/* Right Side: Description */}
          <div className="flex-1 text-center md:text-right md:pl-20 lg:pl-32">
            <p className="text-slate-600 dark:text-gray-400 text-[11px] md:text-xs leading-relaxed md:leading-normal max-w-[280px] md:max-w-[320px] mx-auto md:ml-0 md:mr-0 text-center md:text-right font-light">
              Koleksi ini menampilkan fase terbaru perjalanan saya. Setiap proyek menunjukkan keterampilan inti, proses berpikir, dan visi desain yang saya bangun. Proyek-proyek ini menjadi langkah nyata.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                  : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-50 dark:bg-dark/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark to-transparent opacity-60 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
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
                        className="text-xs bg-slate-200 dark:bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-slate-700 dark:text-white/80 border border-slate-300 dark:border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-block text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
                >
                  View Project &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center mt-12 relative z-20">
            <Link 
                to="/projects" 
                className="group px-8 py-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
                Lihat Semua
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                </svg>
            </Link>
      </div>
    </section>
  );
};

export default Projects;
