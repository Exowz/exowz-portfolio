'use client';

import { motion, useDragControls } from 'motion/react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useState } from 'react';

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

interface WindowProps extends WindowData {
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onClick: () => void;
}

export function Window({
  title,
  content,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 },
  isActive,
  onClose,
  onMinimize,
  onClick
}: WindowProps) {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={initialPosition}
      animate={
        isMaximized
          ? {
              x: 0,
              y: 0,
              width: '100vw',
              height: 'calc(100vh - 100px)' // Leave space for dock
            }
          : {
              x: initialPosition.x,
              y: initialPosition.y,
              width: initialSize.width,
              height: initialSize.height
            }
      }
      style={{
        position: 'absolute',
        zIndex: isActive ? 50 : 40
      }}
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-2xl backdrop-blur-xl ${
        isActive ? 'ring-2 ring-white/20' : ''
      }`}
    >
      {/* Window Chrome */}
      <div
        onPointerDown={(e) => {
          if (!isMaximized) {
            dragControls.start(e);
          }
        }}
        className="bg-white/10 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between cursor-move select-none"
      >
        <div className="flex items-center gap-3 flex-1">
          {/* Traffic Lights (Mac style) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              aria-label="Close"
            />
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
              aria-label="Minimize"
            />
            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              aria-label="Maximize"
            />
          </div>

          {/* Window Title */}
          <span className="text-sm font-medium text-white/90">{title}</span>
        </div>

        {/* Window Controls (Alternative style) */}
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            aria-label="Minimize"
          >
            <Minus className="w-4 h-4 text-white/70" />
          </button>
          <button
            onClick={handleMaximize}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            aria-label="Maximize"
          >
            <Maximize2 className="w-4 h-4 text-white/70" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="bg-white/5 backdrop-blur-md h-[calc(100%-48px)] overflow-auto">
        <div className="text-white">{content}</div>
      </div>
    </motion.div>
  );
}
