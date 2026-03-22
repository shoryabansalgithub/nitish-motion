import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Check } from 'lucide-react';

export default function CopyCode() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
      <motion.div
        layout
        className="bg-[#f4f4f5] rounded-full p-1.5 flex items-center overflow-hidden shadow-sm h-12"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!copied ? (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="flex items-center gap-4 pl-4 pr-0 h-full"
            >
              <span className="text-gray-500 font-mono text-[15px] font-semibold tracking-wider">
                B3E45S7T
              </span>
              <button
                onClick={() => setCopied(true)}
                className="bg-white text-gray-900 px-5 h-full rounded-full text-[15px] font-medium shadow-sm hover:bg-gray-50 transition-colors"
              >
                Copy
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="copied"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="flex items-center gap-2 px-5 h-full"
            >
              <div className="bg-black text-white rounded-full p-0.5 flex items-center justify-center">
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <span className="text-gray-900 font-medium text-[15px]">
                Code Copied!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
