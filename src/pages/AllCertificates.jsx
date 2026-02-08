import React, { useEffect, memo } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../sections/Footer";
import CursorBlob from "../components/effects/CursorBlob";
import ScrollToTop from "../components/ui/ScrollToTop";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCertificates } from "../api";
import { optimizeImage } from "../utils/cloudinary";

const CertificateCard = memo(({ cert, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-slate-50 dark:bg-dark/50 border border-slate-200 dark:border-white/10 rounded-none overflow-hidden hover:border-primary/50 transition-colors group relative shadow-sm dark:shadow-none h-full flex flex-col"
    >
        <div className="aspect-[1754/1241] overflow-hidden relative">
            {cert.image ? (
                <img 
                    src={optimizeImage(cert.image, { width: 800, height: 600 })} 
                    alt={cert.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-white/5 flex items-center justify-center">
                    <span className="text-slate-400 dark:text-white/20 text-lg font-bold opacity-50">CERT</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark to-transparent opacity-60" />
        </div>
        
        <div className="p-6 flex flex-col flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-primary text-xs mb-4 self-start">
                {cert.display_date || cert.date}
            </span>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {cert.title}
            </h3>
            <p className="text-slate-500 dark:text-gray-400 text-sm mb-6 flex-1">
                {cert.institution}
            </p>
            
            <a 
                href={cert.credential_url || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors gap-2"
            >
                View Credential
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
        </div>
    </motion.div>
));

const AllCertificates = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data: certificates = [], isLoading } = useQuery({
        queryKey: ['certificates'],
        queryFn: fetchCertificates,
        staleTime: 1000 * 60 * 10,
    });

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
                        All Certifications
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Daftar lengkap sertifikasi profesional dan kursus yang telah saya selesaikan untuk meningkatkan keahlian saya.
                    </motion.p>
                </div>

                {isLoading && certificates.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certificates.map((cert, index) => (
                            <CertificateCard key={cert.id} cert={cert} index={index} />
                        ))}
                    </div>
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

export default AllCertificates;
