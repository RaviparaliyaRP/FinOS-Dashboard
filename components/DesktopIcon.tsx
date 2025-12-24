
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onOpen: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon: Icon, label, onOpen }) => {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 cursor-pointer w-24 group transition-colors"
      whileTap={{ scale: 0.95 }}
      onDoubleClick={onOpen}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="w-12 h-12 flex items-center justify-center glass rounded-xl group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all">
        <Icon size={24} className="text-white/80 group-hover:text-white transition-colors" strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-medium text-center shadow-sm px-1 rounded bg-black/20 backdrop-blur-sm">
        {label}
      </span>
    </motion.div>
  );
};
