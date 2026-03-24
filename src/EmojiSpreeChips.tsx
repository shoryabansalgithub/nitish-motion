'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface InterestItem {
  id: string;
  label: string;
  emoji: string;
}

interface Particle {
  id: string;
  emoji: string;
  xOffset: number;
  yOffset: number;
  rotate: number;
  scale: number;
}

interface Props {
  interests: InterestItem[];
  onChange?: (selectedIds: string[]) => void;
}

export default function EmojiSpreeChips({ interests, onChange }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const spawnParticles = (emoji: string) => {
    // Enhanced: Spawn more particles with varied sizes and explosive trajectories
    const newParticles: Particle[] = Array.from({ length: 7 }).map(() => ({
      id: crypto.randomUUID(),
      emoji,
      xOffset: (Math.random() - 0.5) * 300,
      yOffset: -200 - Math.random() * 200,
      rotate: (Math.random() - 0.5) * 200,
      scale: 0.6 + Math.random() * 1.4,
    }));

    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 2000);
  };

  const toggleInterest = (id: string, emoji: string) => {
    setSelected((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((i) => i !== id) : [...prev, id];

      onChange?.(updated);

      if (!exists) spawnParticles(emoji);

      return updated;
    });
  };

  const rows = React.useMemo(() => {
    const result: InterestItem[][] = [[], [], []];
    interests.forEach((item, index) => {
      result[index % 3].push(item);
    });
    return result;
  }, [interests]);

  return (
    <div className="relative isolate flex min-h-[450px] w-full max-w-4xl flex-col items-center overflow-hidden py-10 bg-white rounded-3xl border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
      <h2 className="mb-8 w-full self-start px-8 text-2xl font-bold text-gray-900">
        What are you into?
      </h2>

      {/* Chips */}
      <motion.div
        ref={containerRef}
        className="relative z-20 w-full cursor-grab overflow-hidden px-8 active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          className="flex w-max flex-col gap-4 pr-16"
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex w-max gap-4">
              {row.map((item) => {
                const isSelected = selected.includes(item.id);

                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => toggleInterest(item.id, item.emoji)}
                    className={`flex w-max items-center gap-2.5 rounded-full border px-5 py-2.5 text-[15px] font-medium whitespace-nowrap transition-all duration-200 ${
                      isSelected
                        ? 'border-gray-900 bg-gray-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* PARTICLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <AnimatePresence>
          {particles.map((p, index) => (
            <FloatingEmoji
              key={p.id}
              emoji={p.emoji}
              delay={index * 0.03}
              xOffset={p.xOffset}
              yOffset={p.yOffset}
              rotate={p.rotate}
              scale={p.scale}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Selected Pill */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(4px)' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="relative rounded-full border border-black/[0.08] bg-white/90 backdrop-blur-md px-6 py-3 text-[15px] font-semibold text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">
                {selected.length}
              </div>
              Interests Selected
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Floating Emoji Component */
const FloatingEmoji: React.FC<{
  emoji: string;
  delay: number;
  xOffset: number;
  yOffset: number;
  rotate: number;
  scale: number;
}> = ({
  emoji,
  delay,
  xOffset,
  yOffset,
  rotate,
  scale,
}) => {
  return (
    <motion.div
      initial={{ y: 50, x: 0, opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        y: [50, yOffset, yOffset + 50, yOffset + 200],
        x: [0, xOffset * 0.5, xOffset, xOffset * 1.2],
        opacity: [0, 1, 1, 0],
        scale: [0, scale, scale, scale * 0.8],
        rotate: [0, rotate, rotate * 1.5],
      }}
      transition={{
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1], // Custom ease out for the burst
        times: [0, 0.3, 0.7, 1],
        delay,
      }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl z-30 drop-shadow-lg"
    >
      {emoji}
    </motion.div>
  );
};
