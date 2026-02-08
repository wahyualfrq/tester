import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark'
    );

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-white/10 backdrop-blur-sm border border-slate-300 dark:border-white/20 hover:bg-slate-300 dark:hover:bg-white/20 transition-all duration-300 group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6 overflow-hidden">
                <motion.div
                    initial={{ y: theme === 'dark' ? -30 : 0, opacity: theme === 'dark' ? 0 : 1 }}
                    animate={{ y: theme === 'dark' ? 30 : 0, opacity: theme === 'dark' ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center text-yellow-400"
                >
                    {/* Sun Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                </motion.div>
                
                <motion.div
                    initial={{ y: theme === 'dark' ? 0 : -30, opacity: theme === 'dark' ? 1 : 0 }}
                    animate={{ y: theme === 'dark' ? 0 : -30, opacity: theme === 'dark' ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center text-blue-300"
                >
                    {/* Moon Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </motion.div>
            </div>
        </button>
    );
};

export default ThemeToggle;
