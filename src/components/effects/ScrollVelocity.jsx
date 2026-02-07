import { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

const VelocityText = ({
  children,
  baseVelocity = 100,
  className = '',
  numCopies = 6,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  const baseX = useMotionValue(0);
  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min, max, v) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return '0px';
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  useAnimationFrame((t, delta) => {
    // Constant smooth movement independent of scroll
    let moveBy = baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`parallax ${parallaxClassName} overflow-hidden whitespace-nowrap`} style={parallaxStyle}>
      <motion.div
        className={`scroller ${scrollerClassName} inline-flex whitespace-nowrap flex-row will-change-transform`}
        style={{ x, ...scrollerStyle }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
           <span className={`${className} inline-block`} key={i} ref={i === 0 ? copyRef : null}>
              {children}
           </span>
        ))}
      </motion.div>
    </div>
  );
};

const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  return (
    <section className="w-full overflow-hidden">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
