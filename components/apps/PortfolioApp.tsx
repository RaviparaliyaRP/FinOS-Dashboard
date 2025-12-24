
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

export const PortfolioApp: React.FC = () => {
  const assets = [
    { name: 'Equity', value: 450000, color: '#3b82f6' },
    { name: 'Mutual Funds', value: 210000, color: '#10b981' },
    { name: 'Gold', value: 120000, color: '#f59e0b' },
    { name: 'FD/Debt', value: 300000, color: '#6366f1' },
    { name: 'Cash', value: 50000, color: '#94a3b8' },
  ];

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">₹ 11,30,000</h2>
          <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold">
            <ArrowUpRight size={16} />
            <span>+12.5% This Year</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="glass px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/10">Rebalance</button>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold">Add Asset</button>
        </div>
      </div>

      <div className="flex-1 min-h-[200px] glass rounded-xl p-4">
        <div className="text-xs font-bold uppercase opacity-50 mb-4">Asset Allocation</div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={assets} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" stroke="#fff" fontSize={10} width={80} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {assets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-3 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[10px] opacity-60 uppercase">Top Performer</div>
            <div className="font-bold">HDFC Bank</div>
          </div>
          <div className="text-emerald-400 font-bold">+22%</div>
        </div>
        <div className="glass p-3 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[10px] opacity-60 uppercase">Asset Risk</div>
            <div className="font-bold">Moderate</div>
          </div>
          <Info size={16} className="opacity-40" />
        </div>
      </div>
    </div>
  );
};
