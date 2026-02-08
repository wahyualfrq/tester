import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProjectDetail } from "../api";
import Footer from "../sections/Footer";
import CursorBlob from "../components/effects/CursorBlob";
import ScrollToTop from "../components/ui/ScrollToTop";
import ThemeToggle from "../components/ui/ThemeToggle";
import { optimizeImage } from "../utils/cloudinary";
import { ArrowLeft, ExternalLink, Code, Layers } from "lucide-react";

import { ProjectDetailSkeleton } from "../components/ui/Skeleton";

const ProjectDetail = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const { data: project, isLoading, error, isFetching } = useQuery({
        // ... previous options ...
        queryKey: ['project', id],
        queryFn: () => fetchProjectDetail(id),
        enabled: !!id,
        initialData: () => {
            const projectsQueries = queryClient.getQueryCache().findAll({ queryKey: ['projects'] });
            for (const query of projectsQueries) {
                const projectFromList = query.state.data?.find(p => String(p.id) === String(id));
                if (projectFromList) return projectFromList;
            }
            return undefined;
        },
        initialDataUpdatedAt: () => {
            const projectsQueries = queryClient.getQueryCache().findAll({ queryKey: ['projects'] });
            return projectsQueries[0]?.state.dataUpdatedAt;
        }
    });

    // Don't show full page spinner if we have initialData
    if (isLoading && !project) {
        return <ProjectDetailSkeleton />;
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-white dark:bg-dark flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Project not found</h1>
                <Link to="/projects" className="text-primary hover:underline italic">Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-dark min-h-screen text-slate-900 dark:text-white selection:bg-primary selection:text-white relative transition-colors duration-300">
            <CursorBlob />
            
            {/* Background Fetching Indicator */}
            {isFetching && project && (
                <div className="fixed top-0 left-0 w-full h-1 z-[60] overflow-hidden">
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-full h-full bg-primary"
                    />
                </div>
            )}
            
            {/* Simple Top Bar with Theme Toggle */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-end p-6 pointer-events-none">
                <div className="pointer-events-auto">
                    <ThemeToggle />
                </div>
            </div>
            
            <main className="pt-24 pb-20">
                {/* Hero / Cover Section */}
                <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
                    <motion.img 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        src={optimizeImage(project.cover_image || project.image, { width: 1920, height: 1080 })} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark via-transparent to-black/20" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-12">
                        <div className="container mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium mb-6 text-slate-500 dark:text-gray-300 hover:text-primary transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                    <ArrowLeft size={16} />
                                    Back to Projects
                                </Link>
                                <h1 className="text-4xl md:text-7xl font-bold mb-4 font-display leading-tight tracking-tight">
                                    {project.title}
                                </h1>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <span className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 mt-12">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column: Description & Details */}
                        <div className="lg:col-span-2 space-y-12">
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Layers className="text-primary" />
                                    Project Description
                                </h2>
                                <div 
                                    className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                            </motion.section>

                            {/* Gallery Section */}
                            {project.images && project.images.length > 0 && (
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.images.map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ scale: 1.02 }}
                                                className="rounded-2xl overflow-hidden shadow-lg cursor-pointer aspect-video bg-slate-100 dark:bg-white/5"
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img 
                                                    src={optimizeImage(img, { width: 800, height: 600 })} 
                                                    alt={`Gallery ${idx + 1}`} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.section>
                            )}
                        </div>

                        {/* Right Column: Sidebar / Tech Stack & Link */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 sticky top-32"
                            >
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Code className="text-primary" />
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack && project.tech_stack.map((tech, idx) => (
                                            <span 
                                                key={idx}
                                                className="px-3 py-1 text-xs font-medium rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 shadow-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold mb-4">Project Link</h3>
                                    <a 
                                        href={project.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 hover:scale-[1.02] transition-all group shadow-lg shadow-primary/25"
                                    >
                                        Visit Project
                                        <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Lightbox for Gallery */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
                    >
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={optimizeImage(selectedImage, { width: 1600, height: 1200, crop: 'fit' })}
                            className="max-w-full max-h-full object-contain rounded-xl"
                        />
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl">&times;</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default ProjectDetail;
