import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import BlurText from "../components/effects/BlurText";
import CountUp from "../components/effects/CountUp";

import img1 from "../assets/images/1.png";
import img2 from "../assets/images/2.png";
import img3 from "../assets/images/3.png";
import img4 from "../assets/images/4.png";
import img5 from "../assets/images/5.png";
import img6 from "../assets/images/6.png";
import img7 from "../assets/images/7.png";
import img8 from "../assets/images/8.png";

const ExperienceStats = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Create direct transforms for immediate response to scroll
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
  ];

  return (
    <section ref={targetRef} className="relative py-32 overflow-hidden bg-[#050505] min-h-[700px] flex items-center justify-center">
      {/* Background Photo Collage with Parallax Rows */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex flex-col gap-6 justify-center scale-110 transform -rotate-6">
        {[xLeft, xRight, xLeft, xRight].map((xValue, rowIndex) => (
          <motion.div
            key={rowIndex}
            style={{ x: xValue, willChange: "transform" }}
            className="flex gap-6 whitespace-nowrap"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-[280px] md:w-[400px] aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 flex-shrink-0"
              >
                <img
                  src={images[(i + rowIndex) % images.length]}
                  alt=""
                  className="w-full h-full object-cover grayscale brightness-[0.6] contrast-[1.1]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Overlay Text */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="flex flex-col gap-12 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="flex flex-col items-center"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-8xl md:text-[12rem] font-serif italic text-white leading-none">2</span>
              <div className="text-left flex flex-col items-start">
                <BlurText 
                  text="Years of"
                  className="text-xl md:text-3xl font-display uppercase tracking-[0.2em] text-white/50 leading-tight"
                  delay={100}
                  animateBy="words"
                  direction="top"
                />
                <BlurText 
                  text="Experience"
                  className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-tight"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="flex flex-col items-center"
          >
            <div className="flex items-baseline gap-4">
              <div className="text-right flex flex-col items-end">
                <BlurText 
                  text="Projects"
                  className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-tight"
                  delay={100}
                  animateBy="words"
                  direction="top"
                />
                <BlurText 
                  text="Completed"
                  className="text-xl md:text-3xl font-display uppercase tracking-[0.2em] text-white/50 leading-tight"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </div>
              <div className="text-8xl md:text-[12rem] text-white leading-none flex items-baseline">
                <CountUp className="font-serif italic" to={10} />
                <span className="text-primary font-sans not-italic text-6xl md:text-8xl">+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceStats;
