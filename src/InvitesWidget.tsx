import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { X, Folder, PenTool, Zap, Wrench } from 'lucide-react';

const invites = [
  {
    id: 'sonora',
    title: 'Sonora Repository',
    description: 'Contribute to the code repository',
    icon: Folder,
  },
  {
    id: 'design',
    title: 'Design Tokens',
    description: 'Collaborate on design tokens',
    icon: PenTool,
  },
  {
    id: 'motion',
    title: 'Motion Kit',
    description: 'Contribute to motion components',
    icon: Zap,
  },
  {
    id: 'build',
    title: 'Build Tools',
    description: 'Explore build tools & pipeline',
    icon: Wrench,
  },
];

export default function InvitesWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
      <div className="relative flex justify-center items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="button"
              layoutId="invites-container"
              onClick={() => setIsOpen(true)}
              className="bg-[#f4f4f5] hover:bg-[#e4e4e7] transition-colors rounded-full px-4 py-2.5 flex items-center gap-3 shadow-sm"
              whileTap={{ scale: 0.97 }}
            >
              <motion.span layoutId="invites-title" className="font-medium text-gray-900 text-[15px]">
                Invites
              </motion.span>
              <motion.div 
                layoutId="invites-badge"
                className="bg-[#27272a] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
              >
                2
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              key="card"
              layoutId="invites-container"
              className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 w-[340px] overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4 px-1">
                  <motion.h2 layoutId="invites-title" className="text-xl font-semibold text-gray-900">
                    Invites
                  </motion.h2>
                  <motion.button
                    layoutId="invites-badge"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-gray-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                <div className="flex flex-col gap-2">
                  {invites.map((invite, i) => (
                    <motion.button
                      key={invite.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-[#f4f4f5] hover:bg-[#e4e4e7] transition-colors text-left group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shrink-0 shadow-sm relative">
                        <invite.icon size={18} />
                        {i < 2 && (
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-black rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-semibold text-gray-900 leading-snug">
                          {invite.title}
                        </span>
                        <span className="text-[13px] text-gray-500 leading-snug">
                          {invite.description}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
