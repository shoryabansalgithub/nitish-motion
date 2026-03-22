import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Sidebar as SidebarIcon, LayoutDashboard, FolderKanban, MessageSquare, Users, Settings, Search, Bell, Command } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'team', label: 'Team', icon: Users },
];

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
      <div className="flex h-[600px] w-[900px] bg-[#F4F4F5] overflow-hidden font-sans rounded-[32px] border border-gray-200/50 shadow-sm relative">
        
        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ width: isOpen ? 260 : 0 }}
          className="h-full bg-white rounded-r-[32px] shadow-[4px_0_24px_rgba(0,0,0,0.04)] flex-shrink-0 relative z-10 overflow-hidden"
        >
          <div className="w-[260px] h-full flex flex-col p-4 pt-6">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-2">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2.5 font-semibold text-gray-900"
                  >
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-md shadow-black/20">
                      <Command className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[15px] tracking-tight">Acme Inc.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isOpen && (
                  <motion.button
                    layoutId="toggle-btn"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-xl text-gray-500 transition-colors"
                  >
                    <SidebarIcon className="w-4 h-4" strokeWidth={2} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1 flex-1"
                >
                  {/* Search */}
                  <div className="relative mb-4 px-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="w-full h-9 pl-9 pr-3 rounded-xl bg-gray-50/80 border border-gray-200/60 text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all placeholder:text-gray-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                      <kbd className="font-sans text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm">⌘</kbd>
                      <kbd className="font-sans text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm">K</kbd>
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-gray-400 px-3 mb-2 mt-2 uppercase tracking-wider">
                    Overview
                  </div>

                  {MENU_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveItem(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[14px] font-medium ${
                          isActive 
                            ? 'bg-black text-white shadow-md shadow-black/10' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white/90' : 'text-gray-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                        {item.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.2 }}
                  className="mt-auto pt-4"
                >
                  <button className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
                    <img 
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d" 
                      alt="User" 
                      className="w-9 h-9 rounded-full border border-gray-200 shadow-sm"
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-[14px] font-medium text-gray-900 leading-none mb-1.5">Jane Doe</span>
                      <span className="text-[12px] text-gray-500 leading-none">jane@acme.com</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 h-full relative flex flex-col">
          {/* Topbar */}
          <div className="h-16 flex items-center px-6 justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {!isOpen && (
                  <motion.button
                    layoutId="toggle-btn"
                    onClick={() => setIsOpen(true)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-xl text-gray-500 transition-colors z-20"
                  >
                    <SidebarIcon className="w-4 h-4" strokeWidth={2} />
                  </motion.button>
                )}
              </AnimatePresence>
              <span className="font-semibold text-gray-900 tracking-tight">
                {MENU_ITEMS.find(i => i.id === activeItem)?.label || 'Dashboard'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-xl text-gray-500 transition-colors">
                <Bell className="w-4 h-4" strokeWidth={2} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-xl text-gray-500 transition-colors">
                <Settings className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 p-6 pt-2 overflow-y-auto">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Revenue', value: '$45,231.89', trend: '+20.1%' },
                  { label: 'Active Users', value: '2,350', trend: '+15.2%' },
                  { label: 'New Sales', value: '12,234', trend: '+19.5%' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm">
                    <div className="text-[13px] font-medium text-gray-500 mb-2">{stat.label}</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-semibold text-gray-900 tracking-tight">{stat.value}</div>
                      <div className="text-[12px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">{stat.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Chart Area */}
              <div className="h-72 w-full bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 flex flex-col">
                <div className="text-[15px] font-semibold text-gray-900 mb-6">Overview</div>
                <div className="flex-1 border-b border-l border-gray-100 flex items-end gap-4 pt-4 px-4">
                  {/* Mock Chart Bars */}
                  {[40, 70, 45, 90, 65, 85, 100, 60, 40, 80, 50, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-black/5 hover:bg-black/10 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {h * 120}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
