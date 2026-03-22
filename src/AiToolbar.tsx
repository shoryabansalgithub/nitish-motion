import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Music, Sparkles, Scissors, History, Mic, AudioLines, ArrowRight } from 'lucide-react';

export default function AiToolbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isExpanded]);

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
      <motion.div 
        layout 
        className="bg-[#f4f4f5] p-1.5 rounded-full flex items-center shadow-sm border border-gray-200/50 relative overflow-hidden gap-1.5"
        style={{ width: isExpanded ? 400 : 250 }}
      >
        <motion.div 
          layout
          className="bg-white rounded-full p-1 flex items-center gap-1 overflow-hidden shrink-0"
          style={{ width: isExpanded ? 342 : 76 }}
        >
          <motion.button 
            layout 
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <Music className="w-4 h-4" />
          </motion.button>
          
          <motion.button 
            layout
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors shrink-0 ${isExpanded ? 'bg-[#18181b] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Sparkles className="w-4 h-4" />
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, filter: 'blur(4px)', x: -10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                exit={{ opacity: 0, filter: 'blur(4px)', x: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex-1 px-2 flex items-center"
              >
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Refine with AI" 
                  className="w-full bg-transparent outline-none text-[14px] text-gray-700 placeholder:text-gray-400"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {!isExpanded ? (
            <motion.div 
              key="tools"
              initial={{ opacity: 0, filter: 'blur(4px)', x: -20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              exit={{ opacity: 0, filter: 'blur(4px)', x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 px-2 shrink-0"
            >
              {[Scissors, History, Mic, AudioLines].map((Icon, i) => (
                <motion.button 
                  key={i}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 transition-colors shrink-0"
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-gray-900 shrink-0 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
