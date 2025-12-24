
import React from 'react';
import { User, Shield, Palette, Info } from 'lucide-react';

export const SettingsApp: React.FC = () => {
  return (
    <div className="flex gap-4 h-full">
      <div className="w-40 border-r border-white/10 space-y-2 pr-4">
        <button className="w-full text-left px-3 py-2 rounded-lg bg-white/10 text-sm font-medium flex items-center gap-2">
          <Palette size={16} /> Theme
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium flex items-center gap-2 opacity-70">
          <User size={16} /> Profile
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium flex items-center gap-2 opacity-70">
          <Shield size={16} /> Security
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium flex items-center gap-2 opacity-70">
          <Info size={16} /> About
        </button>
      </div>

      <div className="flex-1 space-y-6">
        <section>
          <h3 className="text-sm font-bold mb-4">Appearance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 glass rounded-xl border-2 border-blue-500 cursor-pointer">
              <div className="w-full h-20 rounded bg-gradient-to-br from-blue-900 to-emerald-900 mb-2"></div>
              <div className="text-xs font-bold text-center">Dynamic Mesh (Active)</div>
            </div>
            <div className="p-4 glass rounded-xl border-2 border-transparent hover:border-white/20 opacity-50 cursor-pointer">
              <div className="w-full h-20 rounded bg-black mb-2"></div>
              <div className="text-xs font-bold text-center">Midnight Black</div>
            </div>
          </div>
        </section>

        <section className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-sm font-bold mb-4 opacity-50">System Information</h3>
          <div className="glass p-4 rounded-xl text-xs space-y-2 font-mono">
            <div className="flex justify-between">
              <span>OS Name:</span>
              <span className="text-blue-400 font-bold">FinOS 2024.1</span>
            </div>
            <div className="flex justify-between">
              <span>Package:</span>
              <span className="opacity-60">com.FinCalc.emi_sip_gst_calculator</span>
            </div>
            <div className="flex justify-between">
              <span>Environment:</span>
              <span className="opacity-60">Production / Web-Browser</span>
            </div>
            <div className="flex justify-between">
              <span>Build Number:</span>
              <span className="opacity-60">v1.0.10-release</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
