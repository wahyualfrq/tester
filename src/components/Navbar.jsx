import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar earlier (50% of Hero) to avoid perceived delay
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Projects", href: "#projects" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-dark/80 backdrop-blur-md"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Check input for logo or use text */}
        <div className="text-xl font-bold text-white tracking-tighter">
          W4YOU<span className="text-primary">.</span>
        </div>

        {/* Center Links - Glass Pills */}
        <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link, index) => (
                <a 
                    key={index}
                    href={link.href}
                    className="px-6 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all font-body lowercase"
                >
                    {link.title}
                </a>
            ))}
        </div>

        {/* Right CTA */}
        <a 
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-white text-dark font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
        >
            Get in touch
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
