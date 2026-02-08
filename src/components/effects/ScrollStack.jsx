import React from 'react';
import { motion } from 'framer-motion';

const ScrollStack = ({ children, className }) => {
  const items = React.Children.toArray(children);
  
  return (
    <div className={`relative w-full py-20 ${className}`}>
      {items.map((child, index) => {
        return (
          <div 
            key={index}
            className="sticky mx-auto max-w-4xl"
            style={{
                top: `calc(15vh + ${index * 40}px)`, 
                marginBottom: index === items.length - 1 ? '10vh' : '40vh', 
                zIndex: index
            }}
          >
             <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "anticipate" }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full will-change-transform"
             >
                {child}
             </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export const ScrollStackItem = ({ children, itemClassName = '' }) => {
    return (
        <div className={`shadow-2xl rounded-none ${itemClassName} transition-transform duration-500`}>
            {children}
        </div>
    )
}

export default ScrollStack;
