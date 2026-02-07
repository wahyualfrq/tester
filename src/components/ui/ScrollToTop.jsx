import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down
      // User requested "when reached footer or bottom", but usually showing it
      // after scrolling past 1 full screen height is the best UX for this intent.
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 md:p-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform duration-300 text-primary group-hover:text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
