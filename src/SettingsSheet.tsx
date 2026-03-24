"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Key, Building, Copy, Check, Plus, MoreHorizontal } from "lucide-react";

export default function SettingsSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"api" | "org">("api");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-white border border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_3px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.05)] text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition-all duration-100"
      >
        Open Settings Sheet
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-md bg-white sm:rounded-3xl rounded-t-3xl border border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(0,0,0,0.08),0_24px_64px_rgba(0,0,0,0.12)] z-50 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <h2 className="text-[17px] font-semibold text-gray-900">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="px-6 pt-4">
                <div className="flex p-1 bg-gray-100/80 rounded-xl relative border border-black/[0.04]">
                  {["api", "org"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 py-2 text-[13px] font-medium rounded-lg relative z-10 transition-colors ${
                        activeTab === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white rounded-lg shadow-sm border border-black/[0.04] -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      <div className="flex items-center justify-center gap-2">
                        {tab === "api" ? <Key className="w-3.5 h-3.5" /> : <Building className="w-3.5 h-3.5" />}
                        {tab === "api" ? "API Keys" : "Organization"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === "api" ? (
                    <motion.div
                      key="api"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[15px] font-semibold text-gray-900">Active Keys</h3>
                          <p className="text-[13px] text-gray-500 mt-0.5">Manage your API keys for production.</p>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm">
                          <Plus className="w-3.5 h-3.5" />
                          Create
                        </button>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: "Production Key", key: "sk_live_51Nx...8x2a", date: "Created Oct 24", active: true },
                          { name: "Development Key", key: "sk_test_51Nx...9y3b", date: "Created Sep 12", active: false },
                        ].map((item, i) => (
                          <div key={i} className="p-4 rounded-2xl border border-black/[0.06] bg-[#F9F9FB] flex items-center justify-between group shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[13px] font-semibold text-gray-900">{item.name}</span>
                                {item.active && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <code className="text-[11px] font-mono text-gray-500 bg-black/[0.04] px-1.5 py-0.5 rounded">{item.key}</code>
                                <span className="text-[11px] text-gray-400">{item.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => handleCopy(item.key)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-black/[0.08] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                              >
                                {copiedKey === item.key ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-black/[0.08] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="org"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Organization Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Workspace Name</label>
                            <input
                              type="text"
                              defaultValue="Acme Corp"
                              className="w-full px-3 py-2 bg-[#F9F9FB] border border-black/[0.08] rounded-xl text-[13px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Workspace Slug</label>
                            <div className="flex items-center">
                              <span className="px-3 py-2 bg-gray-100 border border-r-0 border-black/[0.08] rounded-l-xl text-[13px] text-gray-500">
                                app.com/
                              </span>
                              <input
                                type="text"
                                defaultValue="acme"
                                className="w-full px-3 py-2 bg-[#F9F9FB] border border-black/[0.08] rounded-r-xl text-[13px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-black/[0.06]">
                        <h3 className="text-[13px] font-semibold text-red-600 mb-1">Danger Zone</h3>
                        <p className="text-[11px] text-gray-500 mb-3">Permanently delete this organization and all its data.</p>
                        <button className="px-4 py-2 bg-red-50 text-red-600 text-[13px] font-medium rounded-xl hover:bg-red-100 active:scale-[0.98] transition-all border border-red-100">
                          Delete Organization
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
