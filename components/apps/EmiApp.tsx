
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const EmiApp: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculation = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [loanAmount, interestRate, tenure]);

  const chartData = [
    { name: 'Principal', value: loanAmount, color: '#3b82f6' },
    { name: 'Interest', value: calculation.totalInterest, color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase opacity-60 mb-2">Loan Amount (₹)</label>
          <input 
            type="range" min="100000" max="10000000" step="50000"
            value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-2xl font-bold mt-2">₹ {loanAmount.toLocaleString()}</div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase opacity-60 mb-2">Interest Rate (%)</label>
          <input 
            type="range" min="1" max="20" step="0.1"
            value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-2xl font-bold mt-2">{interestRate}%</div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase opacity-60 mb-2">Tenure (Years)</label>
          <input 
            type="range" min="1" max="30" step="1"
            value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-2xl font-bold mt-2">{tenure} Years</div>
        </div>
      </div>

      <div className="flex-1 glass p-4 rounded-xl flex flex-col items-center justify-center">
        <h3 className="text-center text-sm font-bold opacity-70 mb-4">Payment Breakdown</h3>
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value: number) => `₹${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <div className="text-xs opacity-60">Monthly EMI</div>
          <div className="text-3xl font-black text-blue-400">₹ {calculation.monthlyEmi.toLocaleString()}</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 w-full">
          <div className="text-center p-2 glass rounded-lg">
            <div className="text-[10px] opacity-60 uppercase">Total Interest</div>
            <div className="text-sm font-bold">₹ {calculation.totalInterest.toLocaleString()}</div>
          </div>
          <div className="text-center p-2 glass rounded-lg">
            <div className="text-[10px] opacity-60 uppercase">Total Payable</div>
            <div className="text-sm font-bold">₹ {calculation.totalPayment.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
