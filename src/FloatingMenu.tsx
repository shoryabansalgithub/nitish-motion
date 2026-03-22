"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Image, Film, Music, FileText, BookOpen } from "lucide-react";

const items = [
  { id: "image", label: "Image", icon: Image },
  { id: "video", label: "Video", icon: Film },
  { id: "music", label: "Music", icon: Music },
  { id: "document", label: "Document", icon: FileText },
  { id: "learning", label: "Learning", icon: BookOpen },
];

const positions = [
  { x: -15, y: -75, r: -5 },
  { x: -35, y: -140, r: -10 },
  { x: -60, y: -205, r: -15 },
  { x: -90, y: -270, r: -20 },
  { x: -125, y: -335, r: -25 },
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {isOpen &&
          items.map((item, i) => {
            const pos = positions[i];
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  x: pos.x,
                  y: pos.y,
                  rotate: pos.r,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 0.5,
                  filter: "blur(8px)",
                  transition: {
                    duration: 0.2,
                    delay: (items.length - 1 - i) * 0.03,
                    ease: "easeIn",
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: i * 0.05,
                }}
                className="absolute flex items-center gap-2.5 px-5 py-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-50 transition-colors whitespace-nowrap border border-gray-100/50 z-0"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <item.icon size={20} strokeWidth={2} className="text-gray-600" />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            );
          })}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl hover:shadow-2xl transition-shadow border border-gray-100/50"
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Plus size={32} strokeWidth={2} className="text-gray-800" />
        </motion.div>
      </motion.button>
    </div>
  );
}
