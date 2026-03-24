'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { CloudUpload, Loader2, Check, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

type DeployState = 'idle' | 'deploying' | 'success';

export default function DeployStatusPill() {
  const [state, setState] = useState<DeployState>('idle');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === 'deploying') {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else if (state === 'idle') {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [state]);

  const handleDeploy = () => {
    if (state !== 'idle') return;
    setState('deploying');
    
    // Simulate deployment
    setTimeout(() => {
      setState('success');
      
      // Reset after a while
      setTimeout(() => {
        setState('idle');
      }, 4000);
    }, 3500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center bg-transparent p-4">
      <MotionConfig transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}>
        <motion.div
          layout
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleDeploy();
            }
          }}
          onClick={handleDeploy}
          className={cn(
            "relative flex items-center overflow-hidden rounded-full shadow-sm",
            state === 'idle' 
              ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:shadow-md dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer" 
              : "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 cursor-default",
            "border border-black/[0.08] dark:border-white/[0.08]"
          )}
          style={{
            boxShadow: state === 'idle' 
              ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.08)' 
              : 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.12)'
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                className="flex items-center gap-2.5 px-5 py-2.5"
              >
                <CloudUpload className="h-4 w-4" />
                <span className="text-sm font-medium">Deploy to Production</span>
              </motion.div>
            )}

            {state === 'deploying' && (
              <motion.div
                key="deploying"
                initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                className="flex items-center gap-3 px-4 py-2.5"
              >
                <Loader2 className="h-4 w-4 animate-spin text-zinc-400 dark:text-zinc-500" />
                <span className="text-sm font-medium text-zinc-300 dark:text-zinc-600">
                  Building...
                </span>
                <div className="ml-2 rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-400 dark:bg-zinc-200 dark:text-zinc-500">
                  {formatTime(timer)}
                </div>
              </motion.div>
            )}

            {state === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                className="flex items-center gap-3 pl-4 pr-2 py-2"
              >
                <div className="flex items-center gap-2 pr-2">
                  <Check className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
                  <span className="text-sm font-medium">Ready</span>
                </div>
                <div className="h-4 w-px bg-zinc-700 dark:bg-zinc-300" />
                <button 
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 dark:bg-zinc-200 dark:hover:bg-zinc-300 dark:text-zinc-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Action here
                  }}
                >
                  View
                  <ExternalLink className="h-3 w-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
