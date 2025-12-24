
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, FolderOpen, Trash2 } from 'lucide-react';
import { WindowInstance, WindowState } from '../types';
import { EmiApp } from './apps/EmiApp';
import { GstApp } from './apps/GstApp';
import { SipApp } from './apps/SipApp';
import { SettingsApp } from './apps/SettingsApp';
import { PortfolioApp } from './apps/PortfolioApp';

const MotionDiv = motion.div as any;

interface WindowProps {
  instance: WindowInstance;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isActive: boolean;
  onStateChange: (state: WindowState) => void;
}

export const Window: React.FC<WindowProps> = ({
  instance,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  isActive,
  onStateChange,
}) => {
  const [position, setPosition] = useState({ x: instance.initialX, y: instance.initialY });
  const [size, setSize] = useState({ 
    width: instance.initialWidth ?? 680, 
    height: instance.initialHeight ?? 520 
  });
  
  const stateUpdateTimeout = useRef<number | null>(null);

  const triggerStateSave = (pos: {x: number, y: number}, sz: {width: number, height: number}) => {
    if (stateUpdateTimeout.current) window.clearTimeout(stateUpdateTimeout.current);
    stateUpdateTimeout.current = window.setTimeout(() => {
      onStateChange({ ...pos, ...sz });
    }, 500);
  };

  const handleDrag = (_: any, info: any) => {
    setPosition(prev => {
      let newX = prev.x + info.delta.x;
      let newY = prev.y + info.delta.y;
      
      const topBarHeight = 32;
      
      // Horizontal constraints
      newX = Math.max(-size.width + 100, Math.min(newX, window.innerWidth - 100));
      // Vertical constraints (keep header visible)
      newY = Math.max(topBarHeight, Math.min(newY, window.innerHeight - topBarHeight - 100));
      
      const nextPos = { x: newX, y: newY };
      triggerStateSave(nextPos, size);
      return nextPos;
    });
  };

  const renderApp = () => {
    switch (instance.type) {
      case 'EMI': return <EmiApp />;
      case 'GST': return <GstApp />;
      case 'SIP': return <SipApp />;
      case 'Settings': return <SettingsApp />;
      case 'Portfolio': return <PortfolioApp />;
      case 'Documents': return (
        <div className="p-12 text-center opacity-30 italic flex flex-col items-center gap-4">
          <FolderOpen size={48}/>
          <p className="font-medium">FinCalc Internal Documentation Vault</p>
          <p className="text-xs not-italic">No files shared in current session.</p>
        </div>
      );
      case 'RecycleBin': return (
        <div className="p-12 text-center opacity-30 italic flex flex-col items-center gap-4">
          <Trash2 size={48}/>
          <p className="font-medium">System Garbage Collection</p>
          <p className="text-xs not-italic">All temporary blocks purged.</p>
        </div>
      );
      default: return <div className="p-4">Kernel Module Initializing...</div>;
    }
  };

  return (
    <MotionDiv
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: instance.isMaximized ? 0 : position.y,
        x: instance.isMaximized ? 0 : position.x,
        width: instance.isMaximized ? '100vw' : size.width,
        height: instance.isMaximized ? 'calc(100vh - 32px)' : size.height,
        transition: { type: 'spring', damping: 22, stiffness: 220 }
      }}
      exit={{ 
        scale: 0.8, 
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.3, ease: 'backIn' } 
      }}
      onMouseDown={onFocus}
      className={`absolute glass rounded-xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex flex-col transition-shadow duration-300 ${
        isActive ? 'ring-1 ring-white/30 shadow-[0_40px_90px_rgba(0,0,0,0.7)]' : 'ring-1 ring-white/10'
      }`}
      style={{
        zIndex: instance.zIndex,
        top: instance.isMaximized ? '32px' : 0,
        left: 0,
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      }}
    >
      {/* macOS Style Traffic Light Title Bar */}
      <MotionDiv
        drag={!instance.isMaximized}
        dragMomentum={false}
        onDrag={handleDrag}
        className="h-11 glass-dark flex items-center justify-between px-5 window-handle select-none shrink-0 border-b border-white/10"
      >
        <div className="flex items-center gap-2">
          {/* Traffic Lights */}
          <div className="flex gap-2 mr-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black/10 flex items-center justify-center group relative shadow-inner active:brightness-75 transition-all"
            >
              <X size={8} className="text-[#4c0000] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
              className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black/10 flex items-center justify-center group relative shadow-inner active:brightness-75 transition-all"
            >
              <Minus size={8} className="text-[#5c4000] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onMaximize(); }} 
              className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black/10 flex items-center justify-center group relative shadow-inner active:brightness-75 transition-all"
            >
              <Square size={6} className="text-[#004d00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <span className={`text-[12px] font-bold tracking-tight transition-opacity duration-300 uppercase ${isActive ? 'opacity-90' : 'opacity-30'}`}>
            {instance.title}
          </span>
        </div>
        <div className="flex items-center opacity-20 gap-1.5">
           <div className="w-1 h-1 rounded-full bg-white" />
           <div className="w-1 h-1 rounded-full bg-white" />
           <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      </MotionDiv>

      {/* Content Area */}
      <div 
        className="flex-1 overflow-auto p-8 bg-black/10 custom-scrollbar"
        onMouseDown={(e) => {
          e.stopPropagation();
          onFocus();
        }}
      >
        {renderApp()}
      </div>

      {/* Resize Handle (bottom right) */}
      {!instance.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize group flex items-end justify-end p-1.5"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFocus();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;

            const onMouseMove = (moveEvent: MouseEvent) => {
              const nextWidth = Math.max(520, startWidth + moveEvent.clientX - startX);
              const nextHeight = Math.max(420, startHeight + moveEvent.clientY - startY);
              const nextSize = { width: nextWidth, height: nextHeight };
              setSize(nextSize);
              triggerStateSave(position, nextSize);
            };

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        >
          <div className="w-4 h-4 border-r-2 border-b-2 border-white/5 group-hover:border-blue-400/50 transition-colors" />
        </div>
      )}
    </MotionDiv>
  );
};
