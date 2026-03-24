import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { RefreshCw } from 'lucide-react';

const DottedSpinner = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="animate-spin text-gray-900">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 6" strokeLinecap="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-red-600">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

export default function SyncStatus() {
  const [status, setStatus] = useState<'syncing' | 'failed'>('syncing');

  useEffect(() => {
    if (status === 'syncing') {
      const timer = setTimeout(() => setStatus('failed'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
      <motion.div layout className="flex items-center gap-2 h-11">
        <motion.div
          layout
          className={`flex items-center justify-center h-full px-4 rounded-full overflow-hidden relative ${
            status === 'syncing' ? 'bg-[#f4f4f5]' : 'bg-red-50'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {status === 'syncing' ? (
              <motion.div
                key="syncing"
                initial={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                className="flex items-center gap-2 text-gray-900"
              >
                <DottedSpinner />
                <span className="font-medium text-[15px]">Syncing</span>
              </motion.div>
            ) : (
              <motion.div
                key="failed"
                initial={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                className="flex items-center gap-2 text-red-600"
              >
                <AlertIcon />
                <span className="font-medium text-[15px]">Sync Failed</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {status === 'failed' && (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
              onClick={() => setStatus('syncing')}
              className="w-11 h-11 bg-[#18181b] text-white rounded-full flex items-center justify-center hover:bg-[#27272a] transition-colors shadow-sm shrink-0"
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
