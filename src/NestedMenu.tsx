"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Undo2 } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  children?: MenuItem[];
};

const menuData: MenuItem[] = [
  { id: "foundation", label: "Foundation" },
  { id: "components", label: "Components" },
  {
    id: "gestures",
    label: "Gestures",
    children: [
      { id: "tap", label: "Tap" },
      {
        id: "swipe",
        label: "Swipe",
        children: [
          { id: "swipe-left", label: "Swipe Left" },
          { id: "swipe-right", label: "Swipe Right" },
          { id: "swipe-up", label: "Swipe Up" },
          { id: "swipe-down", label: "Swipe Down" },
          { id: "multi-directional", label: "Multi-Directional" },
        ],
      },
      { id: "drag", label: "Drag" },
      { id: "pinch", label: "Pinch" },
      { id: "rotate", label: "Rotate" },
    ],
  },
  {
    id: "interactions",
    label: "Interactions",
    children: [
      { id: "animations", label: "Animations" },
      { id: "transitions", label: "Transitions" },
      {
        id: "haptics",
        label: "Haptics",
        children: [
          { id: "light-impact", label: "Light Impact" },
          { id: "medium-impact", label: "Medium Impact" },
          { id: "heavy-impact", label: "Heavy Impact" },
          { id: "intense-impact", label: "Intense Impact" },
          { id: "custom", label: "Custom" },
        ],
      },
      { id: "audio-feedback", label: "Audio Feedback" },
      { id: "microinteractions", label: "Microinteractions" },
    ],
  },
  { id: "patterns", label: "Patterns" },
];

export default function NestedMenu() {
  const [path, setPath] = useState<string[]>([]);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  let currentOptions = menuData;
  const breadcrumbs: MenuItem[] = [];

  for (const id of path) {
    const item = currentOptions.find((o) => o.id === id);
    if (item) {
      breadcrumbs.push(item);
      currentOptions = item.children || [];
    }
  }

  const handleOptionClick = (option: MenuItem) => {
    if (option.children) {
      setDirection(1);
      setPath([...path, option.id]);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    setDirection(-1);
    setPath(path.slice(0, index));
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <motion.div layout className="flex flex-col items-start w-64">
        {/* Breadcrumbs */}
        <div className="w-full flex flex-col">
          <AnimatePresence mode="popLayout">
            {breadcrumbs.map((crumb, index) => (
              <motion.div
                key={`crumb-container-${crumb.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex w-full"
                style={{ paddingLeft: `${index * 24}px` }}
              >
                <motion.button
                  layoutId={`btn-${crumb.id}`}
                  className="relative flex items-center px-2 py-1.5 rounded-lg text-left w-fit"
                  onMouseEnter={() => setHoveredId(`crumb-${crumb.id}`)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleBreadcrumbClick(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  {hoveredId === `crumb-${crumb.id}` && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 bg-gray-100/80 rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    className="w-6 flex-shrink-0 flex items-center justify-start"
                  >
                    <Undo2 className="w-4 h-4 text-gray-400" />
                  </motion.div>
                  <motion.span
                    layoutId={`text-${crumb.id}`}
                    className="text-gray-500 font-medium text-[15px]"
                  >
                    {crumb.label}
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Current Options */}
        <div className="relative w-full">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={path.join("-")}
              custom={direction}
              initial={(d) => ({
                opacity: 0,
                y: d === 1 ? 15 : -15,
                filter: "blur(8px)",
              })}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={(d) => ({
                opacity: 0,
                y: d === 1 ? -15 : 15,
                filter: "blur(8px)",
              })}
              className="flex flex-col items-start w-full"
            >
              {currentOptions.map((option) => (
                <div
                  key={`option-container-${option.id}`}
                  className="flex w-full"
                  style={{ paddingLeft: `${path.length * 24 + 24}px` }}
                >
                  <motion.button
                    layoutId={`btn-${option.id}`}
                    className="relative flex items-center px-2 py-1.5 rounded-lg text-left w-fit"
                    onMouseEnter={() => setHoveredId(`option-${option.id}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleOptionClick(option)}
                    whileTap={{ scale: 0.98 }}
                  >
                    {hoveredId === `option-${option.id}` && (
                      <motion.div
                        layoutId="hover-bg"
                        className="absolute inset-0 bg-gray-100/80 rounded-lg -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <motion.span
                      layoutId={`text-${option.id}`}
                      className="text-gray-900 font-medium text-[15px]"
                    >
                      {option.label}
                    </motion.span>
                  </motion.button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
