import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Calendar, Check } from 'lucide-react';

export default function SyncButton() {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success'>('idle');

  const handleSync = () => {
    if (status !== 'idle') return;
    setStatus('syncing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 2000);
  };

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
      <motion.div layout className="bg-white p-1.5 pr-1.5 pl-3 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60 flex items-center gap-4 overflow-hidden">
        <motion.div layout className="flex items-center gap-2.5">
          <div className="bg-[#f4f4f5] p-1.5 rounded-[10px] text-gray-700">
            <Calendar className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-[14px] text-gray-900">Calendar</span>
        </motion.div>

        <motion.button
          layout
          onClick={handleSync}
          whileTap={status === 'idle' ? { scale: 0.97 } : {}}
          className={`relative flex items-center justify-center overflow-hidden rounded-full h-8 transition-colors duration-300 ${
            status === 'success' ? 'bg-black text-white' : 'bg-[#f4f4f5] text-gray-900 hover:bg-[#e4e4e7]'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {status === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="text-[13px] font-semibold whitespace-nowrap flex items-center justify-center h-full px-4"
              >
                Sync Events
              </motion.span>
            )}

            {status === 'syncing' && (
              <motion.div
                key="syncing"
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex items-center justify-center h-full w-16"
              >
                <div className="w-8 h-1.5 bg-black/10 rounded-full relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 bottom-0 w-3 bg-gray-800 rounded-full"
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex items-center justify-center h-full w-8"
              >
                <Check className="w-4 h-4" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </MotionConfig>
  );
}
