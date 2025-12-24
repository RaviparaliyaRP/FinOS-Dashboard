
import React, { useState } from 'react';

export const GstApp: React.FC = () => {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);

  const gstRates = [5, 12, 18, 28];

  const calculateGst = () => {
    let gstAmount = 0;
    let totalAmount = 0;
    let netAmount = 0;

    if (isInclusive) {
      netAmount = amount / (1 + rate / 100);
      gstAmount = amount - netAmount;
      totalAmount = amount;
    } else {
      netAmount = amount;
      gstAmount = amount * (rate / 100);
      totalAmount = amount + gstAmount;
    }

    return {
      net: netAmount.toFixed(2),
      gst: gstAmount.toFixed(2),
      total: totalAmount.toFixed(2),
      cgst: (gstAmount / 2).toFixed(2),
      sgst: (gstAmount / 2).toFixed(2)
    };
  };

  const results = calculateGst();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">GST Calculator</h2>
        <div className="flex glass rounded-lg overflow-hidden">
          <button 
            onClick={() => setIsInclusive(false)}
            className={`px-4 py-1 text-xs font-bold transition-all ${!isInclusive ? 'bg-blue-600' : 'hover:bg-white/10'}`}
          >
            Exclusive
          </button>
          <button 
            onClick={() => setIsInclusive(true)}
            className={`px-4 py-1 text-xs font-bold transition-all ${isInclusive ? 'bg-blue-600' : 'hover:bg-white/10'}`}
          >
            Inclusive
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold opacity-50 uppercase mb-1">Base Amount</label>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold opacity-50 uppercase mb-2">Select GST Rate</label>
          <div className="grid grid-cols-4 gap-2">
            {gstRates.map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`py-3 rounded-lg font-bold transition-all ${rate === r ? 'bg-white text-black' : 'glass hover:bg-white/10'}`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="glass p-4 rounded-xl border-l-4 border-blue-500">
          <div className="text-xs opacity-60">Net Amount</div>
          <div className="text-2xl font-bold">₹ {results.net}</div>
        </div>
        <div className="glass p-4 rounded-xl border-l-4 border-emerald-500">
          <div className="text-xs opacity-60">Total Amount</div>
          <div className="text-2xl font-bold">₹ {results.total}</div>
        </div>
        <div className="glass p-4 rounded-xl bg-orange-500/10">
          <div className="text-xs opacity-60">CGST (Central)</div>
          <div className="text-lg font-bold">₹ {results.cgst}</div>
        </div>
        <div className="glass p-4 rounded-xl bg-purple-500/10">
          <div className="text-xs opacity-60">SGST (State)</div>
          <div className="text-lg font-bold">₹ {results.sgst}</div>
        </div>
      </div>
      
      <div className="text-center p-3 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-sm">
        Total Tax: ₹ {results.gst}
      </div>
    </div>
  );
};
