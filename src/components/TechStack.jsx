import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaPhp, FaLaravel, FaReact, FaFigma, FaVideo } from "react-icons/fa";
import { SiJavascript, SiMysql, SiFlutter, SiCanva, SiPostman } from "react-icons/si";
import Particles from "./Particles";
import ScrollReveal from "./ScrollReveal";

const TechStack = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const radii = [120, 210, 300];

    // Icons configuration: [IconComponent, orbitRadius, speed, initialAngle, color]
    const skills = [
        // Ring 1: Radius 120
        { name: "HTML", icon: FaHtml5, radius: radii[0], speed: 20, initialAngle: 0, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, radius: radii[0], speed: 20, initialAngle: 90, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, radius: radii[0], speed: 20, initialAngle: 180, color: "#F7DF1E" },
        { name: "PHP", icon: FaPhp, radius: radii[0], speed: 20, initialAngle: 270, color: "#777BB4" },

        // Ring 2: Radius 210
        { name: "Laravel", icon: FaLaravel, radius: radii[1], speed: 25, initialAngle: 0, color: "#FF2D20" },
        { name: "React", icon: FaReact, radius: radii[1], speed: 25, initialAngle: 72, color: "#61DAFB" },
        { name: "Flutter", icon: SiFlutter, radius: radii[1], speed: 25, initialAngle: 144, color: "#02569B" },
        { name: "MySQL", icon: SiMysql, radius: radii[1], speed: 25, initialAngle: 216, color: "#4479A1" },
        { name: "Figma", icon: FaFigma, radius: radii[1], speed: 25, initialAngle: 288, color: "#F24E1E" },

        // Ring 3: Radius 300
        { name: "Video Editing", icon: FaVideo, radius: radii[2], speed: 30, initialAngle: 0, color: "#000000" }, 
        { name: "Canva", icon: SiCanva, radius: radii[2], speed: 30, initialAngle: 120, color: "#00C4CC" },
        { name: "Postman", icon: SiPostman, radius: radii[2], speed: 30, initialAngle: 240, color: "#FF6C37" },
    ];

    return (
        <section className="py-20 overflow-hidden relative min-h-[800px] flex items-center justify-center bg-black">
            {/* Particles Background */}
            <div className="absolute inset-0 z-0 text-white">
                 <Particles
                    particleColors={["#ffffff"]}
                    particleCount={50}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>

            {isMobile ? (
                /* Mobile View: Grid of Cards */
                <div className="relative z-10 container mx-auto px-4">
                     <ScrollReveal
                        as="h3"
                        baseOpacity={0}
                        enableBlur
                        baseRotation={5}
                        blurStrength={4}
                        textClassName="text-3xl font-bold text-white text-center mb-10 drop-shadow-md"
                        containerClassName="my-0 w-full flex justify-center"
                        animationMode="blur-in"
                    >
                        My Skills
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                            >
                                <div className="p-3 bg-gray-900 rounded-full border border-white/10 shadow-lg">
                                    <skill.icon size={32} color={skill.color} />
                                </div>
                                <span className="text-white font-medium text-sm">{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Desktop View: Solar System Animation */
                <>
                    {/* Center Content */}
                    <div className="relative z-10 w-[150px] h-[150px] bg-gradient-to-br from-primary to-blue-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(14,165,233,0.5)] z-20">
                         <h3 className="text-2xl font-bold text-white text-center leading-tight drop-shadow-md">My<br/>Skills</h3>
                    </div>
                    
                    {/* Orbits */}
                    {radii.map((radius, i) => (
                        <div 
                            key={i}
                            className="absolute rounded-full border border-white/10"
                            style={{ width: radius * 2, height: radius * 2 }}
                        />
                    ))}

                    {/* Orbiting Icons */}
                    {skills.map((skill, i) => (
                        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <OrbitingIcon 
                                Icon={skill.icon} 
                                radius={skill.radius} 
                                speed={skill.speed} 
                                initialAngle={skill.initialAngle}
                                color={skill.color}
                            />
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};

// Helper component for animation
const OrbitingIcon = ({ Icon, radius, speed, initialAngle, color }) => {
    return (
        <motion.div
            className="absolute flex items-center justify-center pointer-events-auto"
            style={{ width: radius * 2, height: radius * 2 }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
             <div 
                className="absolute"
                style={{
                    top: '50%', 
                    left: '50%',
                    transform: `rotate(${initialAngle}deg) translate(${radius}px) rotate(-${initialAngle}deg)` 
                }}
             >
                 <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                 >
                     <div className="p-3 bg-gray-900 border border-white/10 rounded-full shadow-lg relative group">
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-sm group-hover:bg-white/20 transition-colors" />
                        <Icon size={24} color={color} className="relative z-10" />
                     </div>
                 </motion.div>
             </div>
        </motion.div>
    );
};

export default TechStack;
