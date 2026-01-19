
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, ShieldCheck, Zap, Activity, Cpu, Fingerprint } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

const Header: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  const { settings } = useAppState();

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[60] h-24 px-8 lg:px-16 flex items-center justify-between"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl border-b border-white/5 pointer-events-none" />

        <div className="relative flex items-center gap-6">
          <motion.div 
            onClick={() => setShowStats(true)}
            whileHover={{ scale: 1.1 }}
            className="relative w-12 h-12 rounded-2xl border-2 border-teal-500/30 p-1 cursor-pointer bg-zinc-900 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={settings.profileImage} 
              alt="Profile" 
              className="w-full h-full rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-[#050505] shadow-[0_0_10px_#22c55e]" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold tracking-[0.4em] text-white uppercase font-mono italic">
              VIBE_HQ <span className="text-teal-500 ml-1">v2.5</span>
            </span>
            <span className="text-[8px] font-mono text-zinc-500 tracking-[0.2em] uppercase">Auth: Level_Elite</span>
          </div>
        </div>

        <div className="relative flex items-center gap-8">
          <a href="#" className="group relative text-white/40 hover:text-teal-500 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:border-teal-500/50 hover:bg-teal-500/5 transition-all text-white/60 hover:text-white">
            FI
          </a>
        </div>
      </motion.header>

      <AnimatePresence>
        {showStats && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStats(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -30 }}
              transition={{ type: 'spring', damping: 20 }}
              style={{ perspective: '1000px' }}
              className="relative w-full max-w-md bg-zinc-900/90 border-2 border-teal-500/40 p-12 rounded-[3rem] shadow-[0_0_100px_rgba(20,184,166,0.3)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-teal-500/30 animate-scanline pointer-events-none" />
              <button onClick={() => setShowStats(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <div className="relative inline-block mb-6">
                  <div className="w-28 h-28 mx-auto rounded-3xl border-2 border-teal-500/50 p-2 shadow-[0_0_40px_rgba(20,184,166,0.25)] bg-black/40">
                    <img src={settings.profileImage} alt="Dev Profile" className="w-full h-full rounded-2xl object-cover" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-teal-500 p-1.5 rounded-lg text-black">
                     <Fingerprint size={16} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tighter uppercase italic">Subject: Architect</h2>
              </div>

              <div className="space-y-4 font-mono text-zinc-400 text-xs">
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                  LEVEL: 99 | STATUS: OPERATIONAL
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                  VIBRANCY: 100% | CORE: STABLE
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
