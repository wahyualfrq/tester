import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  animationMode = 'blur-in', // 'blur-in' | 'blur-out'
  start = null, // Custom start trigger
  end = null,
  as = 'h2'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const isBlurOut = animationMode === 'blur-out';

    // Defaults
    const defaultStart = isBlurOut ? 'top top' : 'top bottom';
    const defaultEnd = isBlurOut ? 'bottom top' : rotationEnd; // Usually we want to finish by the time it leaves view
    
    // Config
    const triggerStart = start || defaultStart;
    const triggerEnd = end || (isBlurOut ? 'bottom top' : (rotationEnd || 'bottom bottom'));
    const wordTriggerEnd = end || (isBlurOut ? 'bottom top' : (wordAnimationEnd || 'bottom bottom'));

    const ctx = gsap.context(() => {
        // Rotation
        // In: Rotate -> 0
        // Out: 0 -> Rotate
        gsap.fromTo(
          el,
          { 
              transformOrigin: '0% 50%', 
              rotate: isBlurOut ? 0 : baseRotation 
          },
          {
            ease: 'none',
            rotate: isBlurOut ? baseRotation : 0,
            scrollTrigger: {
              trigger: el,
              scroller: scroller,
              start: triggerStart,
              end: triggerEnd,
              scrub: true
            }
          }
        );
    
        const wordElements = el.querySelectorAll('.word');
    
        // Opacity
        // In: base -> 1
        // Out: 1 -> base
        gsap.fromTo(
          wordElements,
          { opacity: isBlurOut ? 1 : baseOpacity, willChange: 'opacity' },
          {
            ease: 'none',
            opacity: isBlurOut ? baseOpacity : 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller: scroller,
              start: isBlurOut ? triggerStart : 'top bottom-=20%', // Offset for entrance, exact for exit
              end: wordTriggerEnd,
              scrub: true
            }
          }
        );
    
        // Blur
        // In: blur -> 0
        // Out: 0 -> blur
        if (enableBlur) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${isBlurOut ? 0 : blurStrength}px)` },
            {
              ease: 'none',
              filter: `blur(${isBlurOut ? blurStrength : 0}px)`,
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller: scroller,
                start: isBlurOut ? triggerStart : 'top bottom-=20%',
                end: wordTriggerEnd,
                scrub: true
              }
            }
          );
        }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, animationMode, start, end]);

  const Tag = as; 

  return (
    <Tag ref={containerRef} className={`my-5 ${containerClassName} ${textClassName}`}>
      {splitText}
    </Tag>
  );
};

export default ScrollReveal;
