import React, { useEffect, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/ui/Navbar";
import Footer from "../sections/Footer";
import CursorBlob from "../components/effects/CursorBlob";
import ScrollToTop from "../components/ui/ScrollToTop";
import { categories } from "../data/projects";
import { fetchProjects, fetchProjectDetail } from "../api";
import { useDebounce } from "../hooks/useDebounce";
import { optimizeImage } from "../utils/cloudinary";
import { ProjectCardSkeleton } from "../components/ui/Skeleton";
import { Search } from "lucide-react";

const ProjectCard = memo(({ project, index }) => {
    const queryClient = useQueryClient();
    
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
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group bg-slate-50 dark:bg-dark/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 relative flex flex-col shadow-sm dark:shadow-none"
        >
            <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark to-transparent opacity-60 z-10" />
                <img
                    src={optimizeImage(project.image, { width: 600, height: 400 })}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-bold bg-primary/90 dark:bg-primary/80 backdrop-blur-md px-2 py-1 rounded-md text-white border border-white/10">
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
                    <p className="text-slate-500 dark:text-gray-400 text-sm line-clamp-2">
                        {project.description?.replace(/<[^>]*>?/gm, '')}
                    </p>
                </div>
                
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech_stack && project.tech_stack.slice(0, 4).map((t, i) => (
                            <span
                                key={i}
                                className="text-xs bg-slate-200 dark:bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-slate-700 dark:text-white/80 border border-slate-300 dark:border-white/5"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <Link
                        to={`/projects/${project.id}`}
                        onMouseEnter={handleMouseEnter}
                        className="inline-block text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors"
                    >
                        View Project &rarr;
                    </Link>
                </div>
            </div>
        </motion.div>
    );
});

const AllProjects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [page, setPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // React Query for projects with pagination and activeCategory
    const { data: projects = [], isLoading, isPlaceholderData } = useQuery({
        queryKey: ['projects', activeCategory, page, debouncedSearch],
        queryFn: () => fetchProjects({ category: activeCategory, page }),
        placeholderData: (prev) => prev,
    });

    // Local filter for search if API doesn't support search globally or combined
    const searchedProjects = useMemo(() => {
        if (!debouncedSearch) return projects;
        return projects.filter(p => 
            p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [projects, debouncedSearch]);

    return (
        <div className="bg-white dark:bg-dark min-h-screen text-slate-900 dark:text-white selection:bg-primary selection:text-white relative transition-colors duration-300">
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
                    
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-white"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setPage(1); // reset to page 1 on category change
                                }}
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
                </div>

                {isLoading && projects.length === 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <ProjectCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {searchedProjects.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                        
                        {/* Empty State */}
                        {!isLoading && searchedProjects.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-slate-500">No projects found for your search.</p>
                            </div>
                        )}

                        {/* Pagination Simple */}
                        <div className="mt-16 flex justify-center gap-4">
                            <button 
                                onClick={() => setPage(old => Math.max(old - 1, 1))}
                                disabled={page === 1}
                                className="px-6 py-2 rounded-full bg-slate-100 dark:bg-white/5 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="flex items-center font-bold px-4">Page {page}</span>
                            <button 
                                onClick={() => setPage(old => old + 1)}
                                disabled={projects.length < 10} // Assume 10 items per page
                                className="px-6 py-2 rounded-full bg-slate-100 dark:bg-white/5 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                <div className="mt-16 text-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
