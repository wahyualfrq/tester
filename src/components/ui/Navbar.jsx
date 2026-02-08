import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import GooeyNav from "./GooeyNav";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 py-4"
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter z-[60]">
            W4YOU<span className="text-primary">.</span>
          </div>

          {/* Desktop Links - Gooey Nav */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full px-2 py-1 shadow-2xl transition-colors duration-300">
            <GooeyNav
              items={navLinks}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Theme Toggle & Spacer */}
          <div className="hidden md:flex items-center justify-end w-[100px]">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4 z-50 relative">
            <ThemeToggle />
            <button 
                className="text-slate-900 dark:text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-40 bg-white/95 dark:bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden text-slate-900 dark:text-white"
            >
                {navLinks.map((link, index) => (
                    <a 
                        key={index}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl text-slate-900 dark:text-white font-bold tracking-tight hover:text-primary transition-colors"
                    >
                        {link.label}
                    </a>
                ))}
                 <a 
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4 px-8 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-dark font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                    Get in touch
                </a>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
