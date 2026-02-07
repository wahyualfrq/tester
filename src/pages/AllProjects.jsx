import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../sections/Footer";
import CursorBlob from "../components/effects/CursorBlob";
import ScrollToTop from "../components/ui/ScrollToTop";
import { projects, categories } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const AllProjects = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProjects = activeCategory === "All" 
        ? projects 
        : projects.filter(project => project.category === activeCategory);

    return (
        <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-white relative">
            <CursorBlob />
            <Navbar />
            
            <main className="pt-32 pb-20 px-4 container mx-auto">
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 font-display"
                    >
                        All Projects
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Eksplorasi lengkap dari karya-karya saya dalam Software Development, UI/UX Design, dan Graphic Design.
                    </motion.p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
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

                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-dark/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 relative flex flex-col"
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
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4">
                                         <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {project.description}
                                        </p>
                                    </div>
                                   
                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((t, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-white/80 border border-white/5"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={project.link || "#"}
                                            className="inline-block text-sm font-medium text-white hover:text-primary transition-colors"
                                        >
                                            View Project &rarr;
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-16 text-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back to Home
                    </Link>
                </div>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default AllProjects;
