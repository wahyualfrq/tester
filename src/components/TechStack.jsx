import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaPhp, FaLaravel, FaReact, FaFigma, FaVideo } from "react-icons/fa";
import { SiJavascript, SiMysql, SiFlutter, SiAdobelightroom, SiCanva, SiPostman } from "react-icons/si";
import Particles from "./Particles";

const TechStack = () => {
    // Icons configuration: [IconComponent, orbitRadius, speed, initialAngle, color]
    // Total 13 items
    // Ring 1 (Inner): 4 items
    // Ring 2 (Middle): 5 items
    // Ring 3 (Outer): 4 items
    
    const orbits = [
        // Ring 1: Radius 120
        { icon: FaHtml5, radius: 120, speed: 20, initialAngle: 0, color: "#E34F26" },
        { icon: FaCss3Alt, radius: 120, speed: 20, initialAngle: 90, color: "#1572B6" },
         { icon: SiJavascript, radius: 120, speed: 20, initialAngle: 180, color: "#F7DF1E" },
        { icon: FaPhp, radius: 120, speed: 20, initialAngle: 270, color: "#777BB4" },

        // Ring 2: Radius 210
        { icon: FaLaravel, radius: 210, speed: 25, initialAngle: 0, color: "#FF2D20" },
        { icon: FaReact, radius: 210, speed: 25, initialAngle: 72, color: "#61DAFB" },
         { icon: SiFlutter, radius: 210, speed: 25, initialAngle: 144, color: "#02569B" },
         { icon: SiMysql, radius: 210, speed: 25, initialAngle: 216, color: "#4479A1" },
         { icon: FaFigma, radius: 210, speed: 25, initialAngle: 288, color: "#F24E1E" },

        // Ring 3: Radius 300
        { icon: SiAdobelightroom, radius: 300, speed: 30, initialAngle: 0, color: "#31A8FF" },
        { icon: FaVideo, radius: 300, speed: 30, initialAngle: 90, color: "#000000" }, 
        { icon: SiCanva, radius: 300, speed: 30, initialAngle: 180, color: "#00C4CC" },
        { icon: SiPostman, radius: 300, speed: 30, initialAngle: 270, color: "#FF6C37" },
    ];

    return (
        <section className="py-20 overflow-hidden relative min-h-[800px] flex items-center justify-center bg-black">
            {/* Particles Background */}
            <div className="absolute inset-0 z-0">
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

            {/* Center Content */}
            <div className="relative z-10 w-[150px] h-[150px] bg-gradient-to-br from-primary to-blue-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(14,165,233,0.5)] z-20">
                 <h3 className="text-2xl font-bold text-white text-center leading-tight drop-shadow-md">My<br/>Skills</h3>
            </div>
            
            {/* Orbits */}
            {[120, 210, 300].map((radius, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full border border-white/10"
                    style={{ width: radius * 2, height: radius * 2 }}
                />
            ))}

            {/* Orbiting Icons */}
            {orbits.map((orbit, i) => (
                <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <OrbitingIcon 
                        Icon={orbit.icon} 
                        radius={orbit.radius} 
                        speed={orbit.speed} 
                        initialAngle={orbit.initialAngle}
                        color={orbit.color}
                    />
                </div>
            ))}
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
