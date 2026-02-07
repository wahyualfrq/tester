import React, { useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../sections/Footer";
import CursorBlob from "../components/effects/CursorBlob";
import ScrollToTop from "../components/ui/ScrollToTop";
import { certificates } from "../data/certificates";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllCertificates = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                        All Certifications
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Daftar lengkap sertifikasi profesional dan kursus yang telah saya selesaikan untuk meningkatkan keahlian saya.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-dark/50 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors group relative"
                        >
                            <div className="h-48 overflow-hidden relative">
                                 <img 
                                    src={cert.image} 
                                    alt={cert.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
                            </div>
                            
                            <div className="p-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs mb-4">
                                    {cert.date}
                                </span>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {cert.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    {cert.institution}
                                </p>
                                
                                <a 
                                    href={cert.credentialUrl || "#"} 
                                    className="inline-flex items-center text-sm font-medium text-white hover:text-primary transition-colors gap-2"
                                >
                                    View Credential
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

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

export default AllCertificates;
