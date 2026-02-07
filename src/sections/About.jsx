import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import ProfileCard from "../components/ui/ProfileCard";
import TiltedCard from "../components/ui/TiltedCard";
import ScrollReveal from "../components/effects/ScrollReveal";
import profileImg from "../assets/images/ProfileCard.JPG";
import cvFile from "../assets/pdf/CV_Wahyudi Alfurqon.pdf";

import StarBorder from "../components/effects/StarBorder";

const About = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <StarBorder
            as={motion.div}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full p-0 bg-transparent rounded-[3rem]" // Resetting some StarBorder defaults if needed, but passing className adds to the wrapper
            color="#0ea5e9"
            speed="8s"
            thickness={4}
        >
            {/* Background Glow - Needs to be inside or outside? Original was inside motion.div but absolute. 
                StarBorder has relative and overflow-hidden, so absolute children will be relative to it.
            */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full -z-10" />

            <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-12"> 
                
                    <div className="flex justify-center w-full max-w-[500px] mx-auto">
                        <div className="relative w-full h-full flex justify-center">
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-white/20 blur-[60px] rounded-full -z-10" />
                            
                            <TiltedCard
                                imageSrc={profileImg}
                                altText="Wahyudi Alfurqon - IT & Designer"
                                captionText={
                                    <>
                                        'Allow Yourself to Shine
                                        <br />
                                        Without the Desire to be Seen'
                                    </>
                                }
                                containerHeight={isMobile ? "400px" : "550px"}
                                containerWidth={isMobile ? "300px" : "400px"}
                                imageHeight={isMobile ? "400px" : "550px"}
                                imageWidth={isMobile ? "300px" : "400px"}
                                rotateAmplitude={12}
                                scaleOnHover={1.05}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="w-full h-full flex flex-col justify-end p-6 text-left">
                                        <div className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 p-4 rounded-2xl shadow-2xl">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                                                Wahyudi Alfurqon 
                                                <MdVerified className="text-blue-500" />
                                            </h3>
                                            <p className="text-sm text-gray-700 font-medium">IT & Designer</p>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                {/* Text Section */}
                <div className="text-left"> {/* Reset text alignment because StarBorder enforces text-center */}
                    <ScrollReveal 
                        as="h2" 
                        textClassName="text-4xl md:text-5xl font-bold mb-6 text-white" 
                        baseOpacity={0.1}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                    >
                        About Me
                    </ScrollReveal>

                    <ScrollReveal 
                        as="p" 
                        textClassName="text-gray-400 leading-relaxed mb-8 text-justify"
                        baseOpacity={0.1}
                        enableBlur
                        baseRotation={3}
                        blurStrength={4}
                        rotationEnd="center center"
                        wordAnimationEnd="center center"
                    >
                        Saya adalah mahasiswa aktif Informatika di Universitas MDP dengan fokus pada frontend development dan UI UX. 
                        Saya telah mengikuti program Giat Magang Berdampak Satu Data Batch 1 di Diskominfo Provinsi Sumatera Selatan 
                        dan berkontribusi dalam pengembangan website Sumsel United. Saya memiliki keahlian dalam pengembangan web 
                        menggunakan Laravel, React, MySQL, dan REST API, serta desain UI UX menggunakan Figma yang mencakup 
                        prototyping dan pengembangan design system.
                    </ScrollReveal>
                    
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <motion.a 
                            href={cvFile}
                            download="CV_Wahyudi Alfurqon.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-dark font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-block text-center cursor-pointer"
                        >
                            Download CV
                        </motion.a>
                        
                        <div className="flex gap-4">
                            {[
                                { Icon: FaInstagram, link: "https://www.instagram.com/wahyu.alfrqn/" },
                                { Icon: FaLinkedin, link: "https://www.linkedin.com/in/wahyudi-alfurqon" },
                                { Icon: MdEmail, link: "mailto:wahyudialfurqon109@gmail.com" }
                            ].map(({ Icon, link }, idx) => (
                                <motion.a 
                                    key={idx}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, color: "#fff" }}
                                    className="p-3 bg-white/5 rounded-full text-gray-400 hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </StarBorder>
    </section>
  );
};

export default About;
