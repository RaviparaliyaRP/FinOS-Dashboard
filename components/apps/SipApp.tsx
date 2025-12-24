
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SipApp: React.FC = () => {
  const [investment, setInvestment] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const data = useMemo(() => {
    const monthlyRate = returnRate / 100 / 12;
    const months = years * 12;
    const chartData = [];
    
    let totalInvested = 0;
    
    for (let i = 1; i <= years; i++) {
      const m = i * 12;
      const amount = investment * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
      totalInvested = investment * m;
      chartData.push({
        year: `Y${i}`,
        wealth: Math.round(amount),
        invested: totalInvested
      });
    }

    const finalAmount = investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return {
      chartData,
      finalWealth: Math.round(finalAmount),
      totalInvested: investment * months,
      wealthGained: Math.round(finalAmount - (investment * months))
    };
  }, [investment, returnRate, years]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-3 rounded-lg">
          <label className="block text-[10px] uppercase font-bold opacity-50 mb-1">Monthly SIP</label>
          <input 
            type="number" value={investment} 
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full bg-transparent text-xl font-bold focus:outline-none"
          />
        </div>
        <div className="glass p-3 rounded-lg">
          <label className="block text-[10px] uppercase font-bold opacity-50 mb-1">Expected Return (%)</label>
          <input 
            type="number" value={returnRate} 
            onChange={(e) => setReturnRate(Number(e.target.value))}
            className="w-full bg-transparent text-xl font-bold focus:outline-none"
          />
        </div>
        <div className="glass p-3 rounded-lg">
          <label className="block text-[10px] uppercase font-bold opacity-50 mb-1">Duration (Years)</label>
          <input 
            type="number" value={years} 
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full bg-transparent text-xl font-bold focus:outline-none"
          />
        </div>
      </div>

      <div className="h-64 glass rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.chartData}>
            <defs>
              <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.4)" fontSize={10} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} hide />
            <Tooltip 
              contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="wealth" stroke="#10b981" fillOpacity={1} fill="url(#colorWealth)" name="Total Wealth" />
            <Area type="monotone" dataKey="invested" stroke="#3b82f6" fill="transparent" name="Invested Amount" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-[10px] opacity-60 uppercase">Invested</div>
          <div className="text-lg font-bold">₹ {data.totalInvested.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] opacity-60 uppercase">Gains</div>
          <div className="text-lg font-bold text-emerald-400">₹ {data.wealthGained.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] opacity-60 uppercase">Final Wealth</div>
          <div className="text-lg font-bold text-blue-400">₹ {data.finalWealth.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
