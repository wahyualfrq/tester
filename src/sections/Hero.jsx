import { motion } from "framer-motion";
import Aurora from "../components/effects/Aurora";
import ScrollReveal from "../components/effects/ScrollReveal";
import ShinyText from "../components/effects/ShinyText";

const Hero = () => {
    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-300">
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
                        className="text-[15vw] md:text-[18vw] font-bold text-slate-200 dark:text-white/5 tracking-tighter leading-none select-none"
                    >
                        Portofolioo.
                    </motion.h1>
                    
                     {/* Foreground Text */}
                     <div className="absolute z-0 flex justify-center items-center">
                        <ShinyText 
                            text="Portofolioo." 
                            disabled={false}
                            speed={3}
                            className="text-[8vw] md:text-[10vw] font-bold text-center leading-tight tracking-tighter select-none"
                            color="var(--shiny-text)"
                            shineColor="var(--shiny-shine)"
                        />
                     </div>
                </div>



                {/* Scroll Down Indicator */}
                <div className="absolute bottom-6 md:bottom-10 left-0 w-full z-30 flex flex-col items-center justify-center pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] md:text-xs font-mono text-slate-400 dark:text-white/50 uppercase text-center tracking-normal">Scroll</span>
                        <motion.div 
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-slate-900 via-slate-400 to-transparent dark:from-white dark:to-transparent"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
