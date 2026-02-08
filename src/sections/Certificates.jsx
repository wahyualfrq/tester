import React, { useRef, useState, useEffect, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import ScrollStack, { ScrollStackItem } from "../components/effects/ScrollStack";
import ScrollReveal from "../components/effects/ScrollReveal";
import { motion } from "framer-motion";
import { certificates as staticCertificates } from "../data/certificates";
import { optimizeImage } from "../utils/cloudinary";

const CertificateCard = memo(({ cert, isMobileGrid = false }) => (
    <a 
        href={cert.credential_url || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`bg-dark/90 border border-white/10 overflow-hidden w-full relative group h-full block ${isMobileGrid ? 'aspect-[1754/1241] rounded-none' : 'aspect-[1754/1241] rounded-none'}`}
    >
        <div className="absolute inset-0">
            {cert.image ? (
                <img 
                    src={optimizeImage(cert.image, { width: 1200, height: 850 })} 
                    alt={cert.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <span className="text-white/20 text-xl font-bold">CERTIFICATE</span>
                </div>
            )}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent ${isMobileGrid ? 'opacity-90' : 'opacity-80'}`} />
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`absolute inset-0 flex flex-col justify-end z-10 ${isMobileGrid ? 'p-3' : 'p-6 md:p-12'}`}
        >
            <div className={`transform transition-transform duration-500 ${isMobileGrid ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                <span className={`inline-block rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white ${isMobileGrid ? 'px-2 py-0.5 text-[9px] mb-1.5' : 'px-3 py-1 text-xs mb-3 md:mb-4'}`}>
                    {cert.display_date || cert.date}
                </span>
                
                <h3 className={`font-bold text-white font-display leading-tight ${isMobileGrid ? 'text-[11px] mb-1 line-clamp-3' : 'text-xl md:text-4xl mb-2 line-clamp-2 md:line-clamp-none'}`}>
                    {cert.title}
                </h3>
                
                <p className={`text-primary font-medium ${isMobileGrid ? 'text-[9px] line-clamp-1' : 'text-base md:text-lg'}`}>
                    {cert.institution}
                </p>

                {!isMobileGrid && (
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white/60 text-sm">
                        <span>View Credential</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </div>
                )}
            </div>
        </motion.div>
    </a>
));

const Certificates = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayedCertificates = useMemo(() => staticCertificates.slice(0, 4), []);

  return (
    <section id="certificates" className="min-h-screen bg-white dark:bg-black relative pb-20 transition-colors duration-300">
       <div className="container mx-auto px-4 pt-10 md:pt-20 pb-0 text-center">
            <ScrollReveal
                as="h2"
                baseOpacity={isMobile ? 1 : 0}
                enableBlur={!isMobile}
                baseRotation={0}
                blurStrength={10}
                textClassName="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 block font-display"
                containerClassName="my-0 w-full flex justify-center"
                animationMode="blur-in"
            >
                Certifications
            </ScrollReveal>
            <ScrollReveal
                as="div"
                baseOpacity={isMobile ? 0.8 : 0.1}
                enableBlur={!isMobile}
                baseRotation={0}
                blurStrength={4}
                textClassName="text-slate-600 dark:text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-center flex flex-wrap justify-center gap-1"
                containerClassName="my-0 w-full"
                animationMode="blur-in"
            >
                Sertifikat ini menjadi bukti konsistensi saya dalam mempelajari dan menerapkan teknologi. Setiap pencapaian lahir dari proses belajar yang terarah dan berkelanjutan.
            </ScrollReveal>
       </div>

      {isMobile ? (
        <div className="container mx-auto px-4 grid grid-cols-2 gap-4 pb-10">
            {displayedCertificates.map((cert, index) => (
                <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                >
                    <CertificateCard cert={cert} isMobileGrid={true} />
                </motion.div>
            ))}
        </div>
      ) : (
        <ScrollStack className="w-full pb-10">
            {displayedCertificates.map((cert) => (
            <ScrollStackItem key={cert.id} itemClassName="rounded-none">
                <CertificateCard cert={cert} />
            </ScrollStackItem>
            ))}
        </ScrollStack>
      )}

        <div className="flex justify-center mt-0 relative z-20">
            <Link 
                to="/certificates" 
                className="group px-6 py-3 md:px-8 md:py-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
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

export default Certificates;
