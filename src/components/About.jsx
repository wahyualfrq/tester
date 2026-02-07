import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ProfileCard from "./ProfileCard";
import ScrollReveal from "./ScrollReveal";
import profileImg from "../assets/ProfileCard.JPG";
import cvFile from "../assets/CV_Wahyudi Alfurqon.pdf";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-dark/50 border border-white/10 p-8 md:p-12 overflow-hidden relative backdrop-blur-sm"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full -z-10" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
                
                    <div className="flex justify-center w-full max-w-[500px] mx-auto">
                        <ProfileCard
                            name="Wahyudi Alfurqon"
                            title="IT & Designer"
                            nameFontSize="2rem"
                            handle="Wahyu"
                            status="Online"
                            contactText="Contact Me"
                            avatarUrl={profileImg}
                            showUserInfo={false}
                            enableTilt={true}
                            enableMobileTilt={false}
                            onContactClick={() => console.log('Contact clicked')}
                            behindGlowEnabled={true}
                            behindGlowColor="rgba(255, 255, 255, 0.4)"
                            innerGradient="linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
                        />
                    </div>

                {/* Text Section */}
                <div>
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
        </motion.div>
    </section>
  );
};

export default About;
