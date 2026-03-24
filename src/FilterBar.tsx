'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListFilter, Search, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTERS = [
  { id: 'all', label: 'All Issues', icon: '📋' },
  { id: 'active', label: 'Active', icon: '🟢' },
  { id: 'completed', label: 'Completed', icon: '✅' },
  { id: 'backlog', label: 'Backlog', icon: '📦' },
  { id: 'canceled', label: 'Canceled', icon: '🚫' },
];

export default function FilterBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(FILTERS[1]);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const filtered = FILTERS.filter(f => f.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-[400px] w-full items-start justify-center bg-transparent p-4 pt-12">
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
            isOpen 
              ? "border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" 
              : "border-black/[0.08] bg-white text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.04)] hover:bg-zinc-50 dark:border-white/[0.08] dark:bg-[#111114] dark:text-zinc-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1px_3px_rgba(0,0,0,0.3)] dark:hover:bg-[#1A1A1F]"
          )}
        >
          <ListFilter className={cn("h-4 w-4 transition-colors", isOpen ? "text-zinc-900 dark:text-white" : "text-zinc-400")} />
          <div className="relative flex h-5 items-center overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={selected.id}
                initial={{ y: 20, opacity: 0, filter: 'blur(2px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -20, opacity: 0, filter: 'blur(2px)' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                className="block whitespace-nowrap"
              >
                {selected.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 4, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="absolute left-0 top-11 z-50 w-[240px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(0,0,0,0.08),0_24px_64px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-[#111114] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_24px_rgba(0,0,0,0.4),0_32px_80px_rgba(0,0,0,0.35)]"
              style={{ transformOrigin: 'top left' }}
            >
              <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2.5 dark:border-white/[0.06]">
                <Search className="h-4 w-4 text-zinc-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter issues..."
                  className="flex-1 bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 outline-none dark:text-zinc-200"
                />
                {search && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearch('');
                      inputRef.current?.focus();
                    }}
                    className="flex h-5 w-5 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex max-h-[240px] flex-col overflow-y-auto p-1.5">
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? (
                    filtered.map((option, i) => {
                      const isSelected = selected.id === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          layout="position"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: i * 0.03, duration: 0.2 }}
                          onClick={() => {
                            setSelected(option);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "group relative flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-colors",
                            isSelected 
                              ? "bg-zinc-100 text-zinc-900 dark:bg-white/[0.06] dark:text-white" 
                              : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/[0.02]"
                          )}
                        >
                          <span className="flex h-5 w-5 items-center justify-center text-base opacity-80 transition-opacity group-hover:opacity-100">
                            {option.icon}
                          </span>
                          <span className="flex-1 text-left font-medium">{option.label}</span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', bounce: 0.3 }}
                            >
                              <Check className="h-4 w-4 text-zinc-900 dark:text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-3 py-6 text-center text-sm text-zinc-500"
                    >
                      No results found.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
