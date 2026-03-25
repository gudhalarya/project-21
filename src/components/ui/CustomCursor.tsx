import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorX = useSpring(0, { damping: 25, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 250 });
  const size = cursorText ? 64 : isPointer ? 12 : 8;
  const scale = cursorText ? 1 : isPointer ? 1.8 : 1;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                         target.tagName === 'A' || 
                         target.tagName === 'BUTTON' ||
                         target.closest('button') ||
                         target.closest('a');
      
      setIsPointer(!!isClickable);
      
      const text = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      setCursorText(text || "");
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale,
          width: size,
          height: size,
        }}
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference border border-white/20"
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-bold uppercase tracking-widest text-black"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
