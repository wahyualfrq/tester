import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { categories } from "../data/projects";
import { fetchProjects, fetchProjectDetail } from "../api";
import { optimizeImage } from "../utils/cloudinary";
import { ProjectCardSkeleton } from "../components/ui/Skeleton";

// Memoized Project Card for better performance
const ProjectCard = memo(({ project, index }) => {
  const queryClient = useQueryClient();

  // Pre-fetch detail data on hover
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['project', project.id],
      queryFn: () => fetchProjectDetail(project.id),
      staleTime: 1000 * 60 * 10,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-slate-50 dark:bg-dark/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 shadow-sm dark:shadow-none gpu-accel"
    >
      <div className="relative overflow-hidden h-48">
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark to-transparent opacity-60 z-10" />
        <img
          src={optimizeImage(project.image, { width: 600, height: 400 })}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold bg-primary/80 backdrop-blur-md px-2 py-1 rounded-md text-white border border-white/10">
              {project.category}
            </span>
            {project.tech_stack && project.tech_stack.slice(0, 3).map((t, i) => (
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
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description?.replace(/<[^>]*>?/gm, '')} {/* Strip HTML for card view */}
        </p>
        <Link
          to={`/projects/${project.id}`}
          onMouseEnter={handleMouseEnter}
          className="inline-block text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
        >
          View Project &rarr;
        </Link>
      </div>
    </motion.div>
  );
});

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // React Query for projects data
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects', activeCategory],
    queryFn: () => fetchProjects({ category: activeCategory }),
    placeholderData: (previousData) => previousData, // keep previous data while fetching
  });

  const filteredProjects = useMemo(() => {
    if (isMobile && activeCategory === "All") {
      const software = projects.find(p => p.category === "Software Development");
      const uiux = projects.find(p => p.category === "UI/UX");
      const graphic = projects.find(p => p.category === "Graphic Designer");
      
      const filtered = [software, uiux, graphic].filter(Boolean);
      return filtered.length > 0 ? filtered : projects.slice(0, 3);
    }
    return activeCategory === "All" ? projects.slice(0, 6) : projects;
  }, [projects, isMobile, activeCategory]);

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
          <div className="flex-1 text-center md:text-right md:pr-20 lg:pr-32">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight flex flex-row md:justify-end items-baseline gap-3">
              <span className="font-sans text-slate-300 dark:text-white/30 uppercase text-3xl md:text-5xl">My</span>
              <span className="font-display text-slate-900 dark:text-white">Projects</span>
            </h2>
          </div>
          <div className="hidden md:block w-[1px] h-24 bg-slate-300 dark:bg-white/10" />
          <div className="flex-1 text-center md:text-right md:pl-20 lg:pl-32">
            <p className="text-slate-600 dark:text-gray-400 text-[11px] md:text-xs leading-relaxed md:leading-normal max-w-[280px] md:max-w-[320px] mx-auto md:ml-0 md:mr-0 text-center md:text-right font-light">
              Koleksi ini menampilkan fase terbaru perjalanan saya. Setiap proyek menunjukkan keterampilan inti, proses berpikir, dan visi desain yang saya bangun.
            </p>
          </div>
        </div>

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

      {isLoading && projects.length === 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

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
