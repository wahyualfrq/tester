import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CursorBlob = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 100); // Center the 200px blob
            mouseY.set(e.clientY - 100);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.div
            style={{ x, y }}
            className="hidden dark:block fixed top-0 left-0 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 blur-[100px] pointer-events-none z-0 mix-blend-screen"
        />
    );
};

export default CursorBlob;

