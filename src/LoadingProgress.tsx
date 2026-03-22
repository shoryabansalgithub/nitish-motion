import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const phrases = [
  "almost there",
  "working now",
  "one moment",
  "finishing up",
  "hang tight"
];

export default function LoadingProgress() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 w-56">
      <div className="h-6 relative w-full flex justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="text-gray-400 font-medium text-[15px] absolute"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <div className="w-full h-2.5 bg-[#f4f4f5] rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-[60%] bg-[#2563eb] rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-transparent via-[#67e8f9] to-transparent opacity-60"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
