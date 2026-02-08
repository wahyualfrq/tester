import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/experiences';

const Experience = () => {
    return (
        <section id="experience" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-slate-900 dark:text-white">
                        Experience
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Perjalanan karir dan pengalaman profesional saya dalam dunia pengembangan perangkat lunak.
                    </p>
                </motion.div>

                <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
                    {/* Vertical Timeline Line */}
                    <div 
                        className="hidden md:block absolute w-[2px] bg-slate-200 dark:bg-white/10 h-full transform -translate-x-1/2" 
                        style={{ left: '50%' }}
                    ></div>
                    
                    {/* Mobile Timeline Line (Left) */}
                    <div 
                        className="md:hidden absolute w-[2px] bg-slate-200 dark:bg-white/10 h-full left-8 top-0" 
                    ></div>

                    {experiences.map((exp, index) => (
                        <div key={exp.id} className={`mb-8 flex justify-between items-center w-full right-timeline ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                             <div className="order-1 w-5/12 hidden md:block"></div>
                             
                             {/* Dot */}
                             <div className="z-20 flex items-center order-1 w-4 h-4 bg-primary rounded-full ring-4 ring-white dark:ring-dark shadow-xl absolute left-8 md:left-1/2 transform md:-translate-x-1/2"></div>
                             
                             <motion.div 
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`order-1 w-full md:w-5/12 px-6 py-4 pl-16 md:pl-6 ${index % 2 === 0 ? 'md:text-right' : 'text-left'}`}
                             >
                                <span className="mb-3 block text-lg font-bold text-primary">
                                    {exp.year}
                                </span>
                                <h3 className="mb-3 font-bold text-slate-900 dark:text-white text-xl md:text-2xl uppercase">
                                    {exp.title}
                                </h3>
                                <p className="text-sm md:text-base leading-snug text-slate-600 dark:text-gray-400 text-opacity-100">
                                    {exp.description}
                                </p>
                             </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
