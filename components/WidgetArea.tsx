
import React, { useState, useEffect } from 'react';
import { MarketData } from '../types';
import { TrendingUp, TrendingDown, Clock, Cloud } from 'lucide-react';

export const WidgetArea: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [marketData, setMarketData] = useState<MarketData>({
    status: 'Open',
    sensex: '71,450.32',
    nifty: '21,680.45',
    change: '+0.45%'
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-6 h-full px-2">
      {/* Market Widget (Mini) */}
      <div className="hidden md:flex items-center gap-2 opacity-80 text-[10px] uppercase font-bold tracking-wider">
        <span className="text-emerald-400">NIFTY 50: {marketData.nifty}</span>
        <TrendingUp size={10} className="text-emerald-400" />
      </div>

      {/* Weather / Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 opacity-80">
          <Cloud size={14} />
          <span>24°C</span>
        </div>
        
        {/* DateTime */}
        <div className="flex items-center gap-2 font-medium">
          <span>{time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};
