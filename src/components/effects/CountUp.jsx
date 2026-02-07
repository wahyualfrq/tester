import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

const CountUp = ({ to, className, duration = 2 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, to, {
        duration: duration,
        ease: "easeOut",
      });
      return controls.stop;
    } else {
      motionValue.set(0);
    }
  }, [isInView, to, motionValue, duration]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const unsubscribe = motionValue.on("change", (latest) => {
      node.textContent = Math.round(latest).toString();
    });

    return () => unsubscribe();
  }, [motionValue]);

  return <span ref={ref} className={className}>0</span>;
};

export default CountUp;
