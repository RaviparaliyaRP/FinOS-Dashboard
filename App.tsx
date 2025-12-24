
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { WidgetArea } from './components/WidgetArea';
import { DesktopIcon } from './components/DesktopIcon';
import { AppType, WindowInstance, WindowState } from './types';
import { v4 as uuidv4 } from 'uuid';
import gsap from 'gsap';
import { Battery, Wifi, Settings as SettingsIcon, LayoutGrid, Trash2, FolderOpen, Calculator, Command, Signal, Briefcase } from 'lucide-react';

const PERSISTENCE_KEY = 'finos_window_persistence_v1';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  const zIndexCounter = useRef(1000);
  const lockScreenRef = useRef<HTMLDivElement>(null);

  // Persistence logic
  const saveWindowState = useCallback((type: AppType, state: WindowState) => {
    const saved = localStorage.getItem(PERSISTENCE_KEY);
    const config = saved ? JSON.parse(saved) : {};
    config[type] = state;
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(config));
  }, []);

  const getSavedState = useCallback((type: AppType): WindowState | null => {
    const saved = localStorage.getItem(PERSISTENCE_KEY);
    if (!saved) return null;
    const config = JSON.parse(saved);
    return config[type] || null;
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: ++zIndexCounter.current, isMinimized: false } : w
    ));
    setActiveWindowId(id);
  }, []);

  const openApp = useCallback((type: AppType) => {
    const existingWindow = windows.find(w => w.type === type);
    
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    const saved = getSavedState(type);
    const newWindow: WindowInstance = {
      id: uuidv4(),
      type,
      title: getAppTitle(type),
      isMinimized: false,
      isMaximized: false,
      zIndex: ++zIndexCounter.current,
      initialX: saved?.x ?? (160 + (windows.length * 40)),
      initialY: saved?.y ?? (80 + (windows.length * 40)),
      initialWidth: saved?.width,
      initialHeight: saved?.height,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [windows, focusWindow, getSavedState]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    setActiveWindowId(null);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const handleUnlock = () => {
    if (lockScreenRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsLocked(false)
      });
      
      tl.to('.lock-content', { 
        opacity: 0, 
        scale: 0.9, 
        filter: 'blur(20px)',
        duration: 0.6, 
        ease: 'power3.in' 
      })
      .to(lockScreenRef.current, {
        y: '-100%',
        backdropFilter: 'blur(0px)',
        duration: 1,
        ease: 'power4.inOut'
      }, '-=0.3');
    }
  };

  const getAppTitle = (type: AppType): string => {
    switch(type) {
      case 'EMI': return 'EMI Calculator Pro';
      case 'SIP': return 'Wealth SIP Planner';
      case 'GST': return 'Smart GST Tool';
      case 'Settings': return 'System Settings';
      case 'Portfolio': return 'Investment Portfolio';
      case 'Documents': return 'FinCalc Docs';
      case 'Projects': return 'My Projects';
      case 'RecycleBin': return 'Recycle Bin';
      default: return 'Application';
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden mesh-bg text-white select-none">
      {/* Lock Screen overlay */}
      {isLocked && (
        <div 
          ref={lockScreenRef}
          className="absolute inset-0 lock-screen flex flex-col items-center justify-center z-[99999]"
        >
          <div className="lock-content flex flex-col items-center space-y-12">
            <div className="text-center">
              <h1 className="text-[140px] font-thin tracking-tighter mb-0 leading-none drop-shadow-2xl">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </h1>
              <p className="text-2xl opacity-60 font-light mt-4 tracking-[0.2em] uppercase">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-6 mt-10">
              <div className="w-32 h-32 rounded-full border-[1px] border-white/20 p-1.5 glass bg-white/5 relative shadow-2xl">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=FinCalc-Pro" 
                  alt="User" 
                  className="w-full h-full rounded-full bg-emerald-500/10"
                />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-[#121820] rounded-full shadow-lg" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">FinCalc Pro</h2>
                <p className="text-xs opacity-50 font-mono mt-1 tracking-widest uppercase">System Administrator</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                className="mt-6 px-14 py-4 glass rounded-full text-sm font-bold transition-all border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              >
                Unlock Session
              </motion.button>
            </div>
          </div>
          <div className="absolute bottom-10 opacity-30 text-[10px] font-mono tracking-widest uppercase">
            FinOS Kernel v1.0 • Secure Connection Established
          </div>
        </div>
      )}

      {/* Top Bar / Status Bar (macOS Style) */}
      <div className="absolute top-0 w-full h-8 flex items-center justify-between px-4 glass-dark text-[11px] z-[10000] border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-black cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition-all">
            <Command size={12} className="text-blue-400" />
            <span className="tracking-tighter uppercase text-[10px]">FinOS</span>
          </div>
          <span className="opacity-70 cursor-default hover:opacity-100 transition-opacity font-medium">Finance</span>
          <span className="opacity-70 cursor-default hover:opacity-100 transition-opacity font-medium">Wealth</span>
          <span className="opacity-70 cursor-default hover:opacity-100 transition-opacity font-medium">Terminal</span>
        </div>
        
        <div className="flex items-center gap-4 h-full">
          <WidgetArea />
          <div className="flex items-center gap-3 border-l border-white/10 pl-4 h-full">
             <Signal size={14} className="opacity-70" />
             <Wifi size={14} className="opacity-70" />
             <div className="flex items-center gap-1 opacity-70">
               <span className="text-[10px] font-mono">100%</span>
               <Battery size={14} />
             </div>
             <div 
              className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer" 
              title="System Settings"
              onClick={() => openApp('Settings')}
             >
               <SettingsIcon size={14} />
             </div>
          </div>
        </div>
      </div>

      {/* Desktop Area */}
      <div className="relative w-full h-full pt-12 pb-20 px-6">
        {/* Desktop Icons Grid (Left Side) */}
        <div className="grid grid-flow-row auto-rows-max gap-8 w-fit">
          <DesktopIcon icon={Briefcase} label="My Projects" onOpen={() => openApp('Portfolio')} />
          <DesktopIcon icon={FolderOpen} label="FinCalc Docs" onOpen={() => openApp('Documents')} />
          <DesktopIcon icon={SettingsIcon} label="Settings" onOpen={() => openApp('Settings')} />
          <DesktopIcon icon={Trash2} label="Recycle Bin" onOpen={() => openApp('RecycleBin')} />
        </div>

        <AnimatePresence>
          {windows.map((window) => (
            !window.isMinimized && (
              <Window
                key={window.id}
                instance={window}
                onClose={() => closeWindow(window.id)}
                onFocus={() => focusWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                isActive={activeWindowId === window.id}
                onStateChange={(state) => saveWindowState(window.type, state)}
              />
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <Dock onIconClick={openApp} activeApps={windows.map(w => w.type)} />

      {/* Background Brand */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-[0.02] select-none">
        <h1 className="text-[25vw] font-black tracking-tighter">FINOS</h1>
      </div>
    </div>
  );
};

export default App;
