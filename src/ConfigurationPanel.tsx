"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ChevronsUpDown, Plus, Zap, Play, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const ArrowDot = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <circle cx="5" cy="12" r="2" fill="currentColor" />
    <path d="M7 12h12" />
    <path d="m15 8 4 4-4 4" />
  </svg>
);

const SmoothIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 20 C 12 20, 14 12, 20 12 C 26 12, 28 20, 34 20" />
    <circle cx="34" cy="20" r="3.5" fill="currentColor" stroke="none" />
  </svg>
);

const BouncyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 24 Q 12 4, 20 24 T 32 14" />
    <circle cx="32" cy="14" r="3.5" fill="currentColor" stroke="none" />
  </svg>
);

const SnappyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 14 L 20 14 M 6 20 L 16 20 M 10 26 L 22 26" />
    <circle cx="30" cy="20" r="4" fill="currentColor" stroke="none" />
  </svg>
);

const CustomIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="6" />
    <path d="M20 14 L 20 8" />
    <circle cx="20" cy="4" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="31.3" cy="8.7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="36" cy="20" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="31.3" cy="31.3" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="20" cy="36" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="8.7" cy="31.3" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="8.7" cy="8.7" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

function AnimatedText({
  text,
  className,
}: {
  text: string | number;
  className?: string;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={text}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className={cn("inline-block whitespace-nowrap", className)}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <button
      type="button"
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onClick={() => onChange(!checked)}
      className={cn(
        "w-11 h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 outline-none",
        checked ? "bg-black justify-end" : "bg-gray-200 justify-start"
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="h-5 bg-white rounded-full shadow-sm"
        style={{ width: isPressed ? 24 : 20 }}
      />
    </button>
  );
}

export default function ConfigurationPanel() {
  const [view, setView] = useState<"config" | "motion">("config");
  const [type, setType] = useState<"Visual Change" | "Transition">("Visual Change");
  const [isAsymmetric, setIsAsymmetric] = useState(false);
  const [segment, setSegment] = useState<"Insertion" | "Removal">("Insertion");
  const [motionType, setMotionType] = useState<"Spring" | "Cubic">("Spring");
  const [motionPreset, setMotionPreset] = useState("bouncy");

  const isRemoval = type === "Transition" && isAsymmetric && segment === "Removal";

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <motion.div
        layout
        className="bg-white p-5 rounded-[2rem] shadow-xl shadow-gray-200/40 w-[340px] overflow-hidden"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {view === "config" ? (
            <motion.div
              key="config"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center justify-between mb-1 px-1">
                <h2 className="text-gray-500 font-medium text-base">Configuration</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setView("motion")} className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <Zap size={16} fill="currentColor" />
                  </button>
                  <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <Play size={16} fill="currentColor" />
                  </button>
                </div>
              </div>

              {/* Width / Height */}
              <div className="flex gap-3">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 flex justify-between items-center flex-1">
                  <span className="text-gray-500 text-sm">Width</span>
                  <span className="text-gray-900 text-sm">300</span>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3 flex justify-between items-center flex-1">
                  <span className="text-gray-500 text-sm">Height</span>
                  <span className="text-gray-900 text-sm">300</span>
                </div>
              </div>

              {/* Dropdown Box */}
              <div className="bg-gray-100 rounded-2xl p-1.5 flex flex-col overflow-hidden">
                <button
                  onClick={() => setType(type === "Visual Change" ? "Transition" : "Visual Change")}
                  className="bg-white rounded-xl px-4 py-2.5 flex justify-between items-center shadow-sm relative z-10 w-full overflow-hidden"
                >
                  <AnimatedText text={type} className="text-gray-900 text-sm" />
                  <ChevronsUpDown size={16} className="text-gray-500" />
                </button>
                <AnimatePresence initial={false}>
                  {type === "Transition" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-3"
                    >
                      <div className="pt-3 pb-1.5 flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Asymmetric</span>
                        <Switch checked={isAsymmetric} onChange={setIsAsymmetric} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Segmented Control */}
              <AnimatePresence initial={false}>
                {type === "Transition" && isAsymmetric && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: -12 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: -12 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-100 rounded-2xl p-1.5 flex relative">
                      {["Insertion", "Removal"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSegment(s as "Insertion" | "Removal")}
                          className="flex-1 py-2 text-sm font-medium relative z-10"
                        >
                          {segment === s && (
                            <motion.div
                              layoutId="segment-bg"
                              className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            />
                          )}
                          <span className={segment === s ? "text-gray-900" : "text-gray-500"}>
                            {s}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Properties */}
              <div className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm w-16">Opacity</span>
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <div className="w-4 flex justify-center">
                      <AnimatedText text={isRemoval ? "1" : "0"} className="text-gray-900 text-sm" />
                    </div>
                    <ArrowDot />
                    <div className="w-4 flex justify-center">
                      <AnimatedText text={isRemoval ? "0" : "1"} className="text-gray-900 text-sm" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm w-16">Blur</span>
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <div className="w-4 flex justify-center">
                      <AnimatedText text={isRemoval ? "0" : "16"} className="text-gray-900 text-sm" />
                    </div>
                    <ArrowDot />
                    <div className="w-4 flex justify-center">
                      <AnimatedText text={isRemoval ? "16" : "0"} className="text-gray-900 text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Property Button */}
              <button className="bg-black text-white rounded-2xl py-3.5 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-900 transition-colors">
                <Plus size={16} />
                Add Property
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="motion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center justify-between mb-1 px-1">
                <button onClick={() => setView("config")} className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <ArrowLeft size={16} />
                </button>
                <h2 className="text-gray-500 font-medium text-base">Motion</h2>
                <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Play size={16} fill="currentColor" />
                </button>
              </div>

              <div className="bg-gray-100 rounded-2xl p-1.5 flex relative mb-1">
                {["Spring", "Cubic"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setMotionType(s as "Spring" | "Cubic")}
                    className="flex-1 py-2 text-sm font-medium relative z-10"
                  >
                    {motionType === s && (
                      <motion.div
                        layoutId="motion-segment-bg"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      />
                    )}
                    <span className={motionType === s ? "text-gray-900" : "text-gray-500"}>
                      {s}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "smooth", label: "Smooth", icon: SmoothIcon },
                  { id: "bouncy", label: "Bouncy", icon: BouncyIcon },
                  { id: "snappy", label: "Snappy", icon: SnappyIcon },
                  { id: "custom", label: "Custom", icon: CustomIcon },
                ].map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setMotionPreset(card.id)}
                    className={cn(
                      "bg-gray-100 rounded-3xl p-5 flex flex-col items-center justify-center gap-4 aspect-square relative transition-colors",
                      motionPreset === card.id ? "bg-white shadow-sm ring-2 ring-black" : "hover:bg-gray-200/50"
                    )}
                  >
                    <div className={cn("text-gray-400 transition-colors", motionPreset === card.id && "text-black")}>
                      <card.icon />
                    </div>
                    <span className={cn("text-sm font-medium transition-colors", motionPreset === card.id ? "text-gray-900" : "text-gray-500")}>
                      {card.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
