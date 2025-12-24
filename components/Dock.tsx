
import React from 'react';
import { AppType } from '../types';
import { 
  Calculator, 
  TrendingUp, 
  Receipt, 
  Settings as SettingsIcon, 
  Briefcase,
  LucideIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Casting motion.div to any to bypass type errors for motion-specific props in this environment
const MotionDiv = motion.div as any;

interface DockProps {
  onIconClick: (type: AppType) => void;
  activeApps: AppType[];
}

interface DockItem {
  id: AppType;
  label: string;
  icon: LucideIcon;
  color: string;
}

const dockItems: DockItem[] = [
  { id: 'EMI', label: 'EMI Calc', icon: Calculator, color: 'bg-blue-500' },
  { id: 'SIP', label: 'SIP Planner', icon: TrendingUp, color: 'bg-emerald-500' },
  { id: 'GST', label: 'GST Tool', icon: Receipt, color: 'bg-orange-500' },
  { id: 'Portfolio', label: 'Portfolio', icon: Briefcase, color: 'bg-purple-500' },
  { id: 'Settings', label: 'Settings', icon: SettingsIcon, color: 'bg-gray-500' },
];

export const Dock: React.FC<DockProps> = ({ onIconClick, activeApps }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10001]">
      <MotionDiv 
        className="glass rounded-[24px] p-3 flex items-end gap-3 px-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        {dockItems.map((item) => {
          const isOpen = activeApps.includes(item.id);
          
          return (
            <MotionDiv
              key={item.id}
              className="relative group cursor-pointer flex flex-col items-center"
              whileHover={{ scale: 1.3, y: -12 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              onClick={() => onIconClick(item.id)}
            >
              {/* Tooltip */}
              <div className="pointer-events-none opacity-0 group-hover:opacity-100 absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 glass rounded-xl text-[10px] font-bold tracking-wider whitespace-nowrap shadow-xl transition-all duration-200">
                {item.label}
              </div>
              
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${item.color} bg-opacity-80 group-hover:bg-opacity-100 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <item.icon size={28} color="white" strokeWidth={1.5} />
              </div>
              
              {/* Active State Dot Indicator */}
              <div className="h-2 w-full flex justify-center mt-1">
                {isOpen && (
                  <MotionDiv 
                    layoutId={`dot-${item.id}`}
                    className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  />
                )}
              </div>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </div>
  );
};
