import React from 'react';
import ScrollReveal from '../components/effects/ScrollReveal';

const WelcomeText = () => {
    return (
        <section className="min-h-[60vh] flex items-center justify-center bg-black overflow-hidden py-20 relative z-10">
            <div className="container mx-auto px-4 text-center">
                 <ScrollReveal
                    baseOpacity={0.05}
                    enableBlur
                    baseRotation={3}
                    blurStrength={4}
                    textClassName="text-[11vw] md:text-[7vw] font-bold text-white text-center leading-tight tracking-tighter select-none font-display"
                    containerClassName="my-0 max-w-full"
                    rotationEnd="center center"
                    wordAnimationEnd="center center"
                >
                    Hello, I'm Wahyudi Alfurqon
                </ScrollReveal>
            </div>
        </section>
    );
};

export default WelcomeText;
