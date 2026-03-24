'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Sparkles, ArrowUp, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type State = 'idle' | 'expanded' | 'generating' | 'success';

export default function AiPromptAction() {
  const [state, setState] = useState<State>('idle');
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state === 'expanded' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [state]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setState('generating');
    setTimeout(() => {
      setState('success');
      setTimeout(() => {
        setState('idle');
        setPrompt('');
      }, 4000);
    }, 2500);
  };

  return (
    <div className="flex min-h-[300px] w-full items-center justify-center bg-transparent p-4">
      <MotionConfig transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}>
        <motion.div
          layout
          className={cn(
            "relative flex flex-col overflow-hidden shadow-sm border",
            state === 'expanded' ? "w-[400px] rounded-[24px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-xl" :
            state === 'generating' ? "w-auto rounded-full bg-white dark:bg-neutral-900 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]" :
            state === 'success' ? "w-auto rounded-full bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50" :
            "w-auto rounded-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md cursor-pointer"
          )}
          onClick={() => {
            if (state === 'idle') setState('expanded');
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                className="flex items-center gap-2.5 px-5 py-3"
              >
                <motion.div layoutId="sparkles">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                </motion.div>
                <span className="text-[15px] font-medium text-neutral-600 dark:text-neutral-300">
                  Ask AI to edit...
                </span>
                <div className="ml-2 flex items-center gap-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              </motion.div>
            )}

            {state === 'expanded' && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
                className="flex flex-col p-2"
              >
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What would you like to change?"
                  className="min-h-[80px] w-full resize-none bg-transparent px-3 py-2 text-[15px] text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                />
                <div className="flex items-center justify-between px-2 pb-1 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setState('idle');
                    }}
                    className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGenerate();
                    }}
                    disabled={!prompt.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {state === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                className="flex items-center gap-3 px-5 py-3 relative overflow-hidden"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
                <motion.div
                  layoutId="sparkles"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="relative z-10"
                >
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                </motion.div>
                <span className="relative z-10 text-[15px] font-medium text-indigo-600 dark:text-indigo-400">
                  Generating changes...
                </span>
              </motion.div>
            )}

            {state === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                className="flex items-center gap-3 px-2 py-1.5"
              >
                <div className="flex items-center gap-2 px-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-medium text-emerald-700 dark:text-emerald-400">
                    Changes applied
                  </span>
                </div>
                <div className="h-4 w-px bg-emerald-200 dark:bg-emerald-800/50" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setState('idle');
                    setPrompt('');
                  }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  Undo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
