import React from 'react';
import ScrollVelocity from './ScrollVelocity';

const ScrollingSkills = () => {
    return (
        <section className="py-20 bg-dark overflow-hidden">
            <ScrollVelocity
                texts={['Software Developer \u2022 UI/UX Designer \u2022', 'Graphic Designer \u2022 Video Editor \u2022']} 
                velocity={50}
                className="text-white font-display font-bold text-4xl md:text-6xl mx-8 py-2 uppercase tracking-wide opacity-50 hover:opacity-100 transition-opacity duration-300"
                numCopies={5}
            />
        </section>
    );
};

export default ScrollingSkills;
