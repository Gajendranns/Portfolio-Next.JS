'use client';

import React from 'react';
import { motion } from 'motion/react';

interface AnimatedMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export const AnimatedMarquee: React.FC<AnimatedMarqueeProps> = ({
  items,
  direction = 'left',
  speed = 25,
}) => {
  // Duplicate list to achieve continuous loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-slate-800/80 bg-slate-950/60 select-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07090e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07090e] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 text-xs font-mono text-slate-400 font-medium">
            <span className="hover:text-indigo-300 transition-colors uppercase tracking-wider">
              {item}
            </span>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
