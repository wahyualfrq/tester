import React, { useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Shuffle = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Split text into characters
  const chars = useMemo(() => text.split(""), [text]);
  
  // Create randomized charset for scramble effect
  const getScrambleChar = () => {
    if (!scrambleCharset) return '';
    return scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)];
  };

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Select all character groups
    const charGroups = gsap.utils.toArray('.shuffle-char-group');
    if (!charGroups.length) return;

    const playAnimation = () => {
       const tl = gsap.timeline({
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? loopDelay : 0,
        onComplete: () => {
          onShuffleComplete?.();
        }
      });

      // Determine movement direction
      const getStartEnd = (rect) => {
        const dist = 0; // Calculated dynamically if needed, but relative % works best for simple slide
        // Actually, we want to slide by "100% * (shuffleTimes + 1)"
        // But height/width based.
        // Let's rely on standard block flow inside the wrapper.
      };

      charGroups.forEach((group, i) => {
        const inner = group.querySelector('.shuffle-inner');
        if (!inner) return;

        // Reset position
        // Determine offset based on items. 
        // We rendered (shuffleTimes + 1) items.
        // We want to move from showing the Start(clones) to showing the End(original).
        
        // Direction 'right': Text moves Right. So start at Left (-100% * n), move to 0.
        // Direction 'up': Text moves Up. Start at Bottom (0), move to Top (-100% * n)? No.
        // If we want "Shuffle Up", letters should slide UP into view.
        // So start at TranslateY: 100%? 
        // Let's stick to the visual logic:
        // 'right' means existing text slides away to right? Or new text enters from left?
        // Usually "Shuffle Direction Right" means the characters appear to be moving RIGHT.
        // So we start from Left.
        
        // Let's recalculate based on rendering.
        // We rendered: [Clone, ..., Clone, Original] or [Original, Clone, ...]?
        // In the JSX below, I render: [Clone, ..., Original]. 
        // So Standard Flow shows them stacked (if block) or inline (if row).
        // inner is 'inline-block'.

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const totalItems = rolls + 1;
        
        let startProps = {};
        let endProps = {};
        
        // Assume default render puts them in flow.
        // For 'up'/'down', we need vertical stacking.
        // For 'left'/'right', we need horizontal.
        
        // Actually, simpler to animate percentage of the 'inner' container size.
        // If 'up', inner container height is (totalItems * 100%). We want to show the LAST item (original).
        // So animate from 0 (showing first clone) to -((totalItems - 1) / totalItems * 100)%.
        // Wait, 'up' means moving UP. So we start at bottom?
        // Let's try: Start at 0 (top item), move to end? That slides content UP.
        
        const stepPercent = 100 / totalItems;
        const targetPos = -(100 - stepPercent); // Move to the last item
        
        if (shuffleDirection === 'up') {
             // Move Y from 0 to targetPos%
             startProps = { yPercent: 0 };
             endProps = { yPercent: targetPos };
        } else if (shuffleDirection === 'down') {
             // Move Y from targetPos% to 0
             startProps = { yPercent: targetPos };
             endProps = { yPercent: 0 };
        } else if (shuffleDirection === 'left') {
             // Move X from 0 to targetPos%
             startProps = { xPercent: 0 };
             endProps = { xPercent: targetPos };
        } else {
             // right
             // Move X from targetPos% to 0
             startProps = { xPercent: targetPos };
             endProps = { xPercent: 0 };
        }
        
        // Set initial state
        gsap.set(inner, { ...startProps, force3D: true });

        // Calculate delay/stagger
        let delay = 0;
        if (animationMode === 'evenodd') {
            delay = (i % 2) * stagger; // Simple stagger for even/odd
            // Or the user code logic:
            /* 
              const odd = strips.filter((_, i) => i % 2 === 1);
              const even = strips.filter((_, i) => i % 2 === 0);
            */
           // Let's just use regular Stagger for simplicity and robustness first, user said "stagger={0.03}"
           delay = i * stagger; 
        } else {
            delay = Math.random() * maxDelay;
        }

        // Add to timeline
        tl.to(inner, {
            ...endProps,
            duration: duration,
            ease: ease,
        }, delay);
        
        // Color anim if needed
        if (colorFrom && colorTo) {
            tl.fromTo(inner, { color: colorFrom }, { color: colorTo, duration: duration, ease: ease }, delay);
        }
      });
    };

    const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top ${100 - (threshold * 100)}%`, // Approx trigger
        once: triggerOnce,
        onEnter: () => playAnimation()
    });

    if (triggerOnHover) {
        const el = containerRef.current;
        el.addEventListener('mouseenter', playAnimation);
        return () => el.removeEventListener('mouseenter', playAnimation);
    }

    return () => {
        st.kill();
        if (triggerOnHover) {
            containerRef.current?.removeEventListener('mouseenter', playAnimation);
        }
    }

  }, [chars, shuffleDirection, duration, ease, stagger, shuffleTimes, colorFrom, colorTo, animationMode, triggerOnHover]);

  // Render Helpers
  const rolls = Math.max(1, Math.floor(shuffleTimes));
  
  // Decide layout based on direction
  const isVertical = shuffleDirection === 'up' || shuffleDirection === 'down';
  const innerClass = isVertical 
    ? 'flex flex-col whitespace-normal h-auto w-full' 
    : 'flex flex-row whitespace-nowrap h-full w-auto';
    
  const charClass = isVertical ? 'block' : 'inline-block';

  return (
    <div 
        ref={containerRef} 
        className={className} 
        style={{ ...style, textAlign, overflow: 'hidden' }}
    >
        {chars.map((char, i) => {
            if (char === " ") {
                return <span key={i} className="inline-block" style={{ width: '0.3em' }}>&nbsp;</span>;
            }
            
            // Create clones
            const clones = Array.from({ length: rolls }).map((_, idx) => (
                <span key={`clone-${idx}`} className={`${charClass} select-none`} style={{ opacity: 0.5 }}>
                   {scrambleCharset ? getScrambleChar() : char}
                </span>
            ));

            // Content to render in the moving inner container
            // If direction is 'up' (slides UP), we want [Clones, Original] (bottom is original)
            // If direction is 'down' (slides DOWN), we want [Original, Clones] (top is original) -- Wait, standard flow is Top->Bottom.
            // Let's render consistent order: [Clone, Clone, ..., Original]
            // And use yPercent logic to show the right one.
            
            return (
                <span key={i} className="shuffle-char-group inline-block overflow-hidden relative align-bottom" style={{ verticalAlign: 'bottom' }}>
                    {/* Invisible spacer for layout */}
                    <span className="invisible pointer-events-none select-none">{char}</span>
                    <span className={`shuffle-inner ${innerClass} absolute inset-0`}>
                        {clones}
                        <span className={`${charClass}`}>{char}</span>
                    </span>
                 </span>
            );
        })}
    </div>
  );
};

export default Shuffle;
