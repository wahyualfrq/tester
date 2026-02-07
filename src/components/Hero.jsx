import React, { Suspense } from "react";
import Lanyard from "./Lanyard/Lanyard";
import { motion } from "framer-motion";
import Aurora from "./Aurora";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-50">
                <Aurora
                    colorStops={["#7066ff", "#469ee2", "#5227FF"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={1}
                />
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
                
                {/* Text Layer - Centered */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[15vw] md:text-[18vw] font-bold text-white/5 tracking-tighter leading-none select-none"
                    >
                        Portofolioo.
                    </motion.h1>
                    
                     {/* Foreground Text */}
                     <div className="absolute z-0 flex justify-center items-center">
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur
                            baseRotation={5}
                            blurStrength={4}
                            textClassName="text-[8vw] md:text-[10vw] font-bold text-white text-center leading-tight tracking-tighter select-none"
                            containerClassName="my-0 p-0"
                            animationMode="blur-out"
                            start="top 20%"
                            end="bottom top"
                        >
                            Portofolioo.
                        </ScrollReveal>
                     </div>
                </div>

                {/* Lanyard Layer - Floating on top of text */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                     <Suspense fallback={null}>
                         <div className="w-full h-full pointer-events-auto">
                            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                         </div>
                     </Suspense>
                </div>

                {/* Scroll Down Indicator */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Scroll</span>
                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
