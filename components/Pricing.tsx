
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, FileText, ShieldCheck, Smartphone, Infinity } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

const tiers = [
  { name: "Silver", price: "499", features: ["Standard Vibe Layout", "3 Rounds of Revisions", "7-Day Delivery", "Static Assets"], color: "#94a3b8" },
  { name: "Gold", price: "999", features: ["Advanced 3D Effects", "Custom Music Sync", "5 Rounds of Revisions", "Animated Icons", "Source Code Access"], color: "#14b8a6", featured: true },
  { name: "Platinum", price: "1999", features: ["Ultra-Realistic 3D", "AI Integration", "Unlimited Revisions", "1-on-1 Strategy Call", "Lifetime Updates"], color: "#f97316" }
];

const Pricing: React.FC = () => {
  const [activeTier, setActiveTier] = useState<number | null>(null);
  const { settings } = useAppState();

  return (
    <section id="pricing" className="py-32 px-6 lg:px-12 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase italic">Investment</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              onClick={() => setActiveTier(i)}
              className={`relative p-10 rounded-[3rem] border transition-all duration-500 cursor-pointer ${activeTier === i ? 'bg-zinc-900 border-opacity-100 scale-105 shadow-[0_0_80px_rgba(20,184,166,0.15)]' : 'bg-[#0a0a0a]/80 border-white/5'}`}
              style={{ borderColor: activeTier === i ? tier.color : undefined }}
            >
              <h3 className="text-3xl font-bold text-white mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-white">₹{tier.price}</span>
              </div>
              <ul className="space-y-5 mb-12">
                {tier.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-sm text-zinc-400"><Check size={18} className="shrink-0" style={{ color: tier.color }} /><span className="font-mono text-[13px]">{f}</span></li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px]" style={{ backgroundColor: activeTier === i ? tier.color : 'transparent', color: activeTier === i ? 'black' : 'white', border: activeTier === i ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>INITIALIZE</button>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <div className="flex flex-wrap justify-center gap-16">
            <a href={settings.standardPdfLink} download className="group relative w-full max-w-sm">
              <div className="p-10 rounded-[2.5rem] bg-teal-500/5 border-2 border-teal-500/20 group-hover:border-teal-500 transition-all flex flex-col items-center gap-6">
                <FileText size={40} className="text-teal-400" />
                <h4 className="text-2xl font-bold text-white uppercase italic">Standard_Manual</h4>
                <div className="flex items-center gap-2 bg-teal-500 text-black px-6 py-3 rounded-xl font-bold text-[10px] uppercase"><Download size={14} /> Download</div>
              </div>
            </a>
            <a href={settings.premiumPdfLink} download className="group relative w-full max-w-sm">
              <div className="p-10 rounded-[2.5rem] bg-orange-500/5 border-2 border-orange-500/20 group-hover:border-orange-500 transition-all flex flex-col items-center gap-6">
                <FileText size={40} className="text-orange-400" />
                <h4 className="text-2xl font-bold text-white uppercase italic">Premium_Manual</h4>
                <div className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-xl font-bold text-[10px] uppercase"><Download size={14} /> Download</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
