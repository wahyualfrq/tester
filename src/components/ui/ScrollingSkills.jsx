import React from 'react';
import ScrollVelocity from '../effects/ScrollVelocity';

const ScrollingSkills = () => {
    return (
        <section className="py-20 bg-slate-50 dark:bg-dark overflow-hidden transition-colors duration-300">
            <ScrollVelocity
                texts={['Software Developer \u2022 UI/UX Designer \u2022', 'Graphic Designer \u2022']} 
                velocity={50}
                className="text-slate-900 dark:text-white font-display font-bold text-4xl md:text-6xl mx-8 py-2 uppercase tracking-wide opacity-50 hover:opacity-100 transition-opacity duration-300"
                numCopies={5}
            />
        </section>
    );
};

export default ScrollingSkills;
