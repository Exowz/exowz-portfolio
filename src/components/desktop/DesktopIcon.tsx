'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export interface DesktopIconData {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function DesktopIcon({ label, icon, onClick }: DesktopIconData) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isPressed ? 0.9 : 1
        }}
        className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all"
      >
        <div className="text-white/90 group-hover:text-white transition-colors">
          {icon}
        </div>
      </motion.div>
      <span className="text-sm text-white/80 group-hover:text-white font-medium text-center max-w-[100px] truncate">
        {label}
      </span>
    </motion.button>
  );
}
