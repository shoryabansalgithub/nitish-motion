import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function ProjectSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const platforms = ['iOS', 'macOS', 'tvOS'];

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
      <motion.div layout className="flex items-center gap-2">
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.button
              key="back-btn"
              layout
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              onClick={() => setIsOpen(false)}
              className="bg-[#f4f4f5] text-[#52525b] rounded-full flex items-center justify-center h-10 w-10 hover:bg-[#e4e4e7] transition-colors shrink-0"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            <motion.button
              key="main-btn"
              layoutId="btn-container"
              onClick={() => setIsOpen(true)}
              whileTap={{ scale: 0.97 }}
              className="bg-[#f4f4f5] text-[#18181b] rounded-full font-medium text-[14px] hover:bg-[#e4e4e7] transition-colors flex items-center justify-center h-10 px-5 relative overflow-hidden"
            >
              <motion.span
                key="text-new"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap"
              >
                New Project
              </motion.span>
            </motion.button>
          ) : (
            <motion.div key="options" layout className="flex items-center gap-2">
              {platforms.map((platform, i) => (
                <motion.button
                  key={platform}
                  layoutId={i === 1 ? "btn-container" : `btn-${platform}`}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    x: i === 0 ? 60 : i === 2 ? -60 : 0,
                    filter: 'blur(4px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    filter: 'blur(0px)'
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    x: i === 0 ? 60 : i === 2 ? -60 : 0,
                    filter: 'blur(4px)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#f4f4f5] text-[#18181b] px-5 rounded-full font-medium text-[14px] hover:bg-[#e4e4e7] transition-colors h-10 flex items-center justify-center whitespace-nowrap"
                >
                  <motion.span
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2, delay: i === 1 ? 0.1 : 0 }}
                  >
                    {platform}
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
