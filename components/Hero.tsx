
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useAppState } from '../context/AppStateContext';
import { ArrowRight, Code2, Box, Layers, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings } = useAppState();
  
  // Spring animations for 3D parallax
  const mouseX = useSpring(0, { stiffness: 45, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 40);
    mouseY.set((clientY - innerHeight / 2) / 40);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#050505] px-4 md:px-20"
    >
      {/* 1. ATMOSPHERIC BACKGROUND TEXT (VIBE Outline) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <h1 className="text-[35vw] font-bold text-white uppercase tracking-tighter leading-none italic"
            style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
          VIBE
        </h1>
      </div>

      {/* 2. BACKGROUND GLOW (The Aura) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 blur-[150px] rounded-full opacity-40 pointer-events-none" />
      <div className="absolute left-[-10%] bottom-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />

      {/* 3. MAIN INTERFACE GRID - Side-by-Side */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* LEFT CONTENT: Text Content (45%) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[48%] flex flex-col items-start gap-6 z-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-900/10 text-teal-400 text-[10px] font-mono tracking-[0.3em] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,1)]" />
            System_Initialized
          </motion.div>

          <div className="space-y-[-0.5rem] md:space-y-[-1.5rem]">
            <h1 className="text-7xl md:text-[120px] font-bold text-white tracking-tighter leading-[0.9] font-['Space_Grotesk']">
              DESIGN
            </h1>
            <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white italic">
              THE VIBE
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-zinc-900/40 backdrop-blur-3xl border-l-4 border-teal-500 rounded-r-2xl max-w-md relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-zinc-300 font-mono text-sm leading-relaxed relative z-10">
              Synthesizing emotional architecture into the digital void. We manifest responsive 3D environments that resonate with the human psyche.
            </p>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-4 bg-teal-500 text-black px-12 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Initialize Grid <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* RIGHT CONTENT: Character Image (55%) */}
        <div className="w-full md:w-[52%] relative flex items-center justify-center min-h-[500px] md:min-h-[700px]">
          
          {/* Floating 3D Elements with Parallax */}
          <motion.div 
            style={{ x: useTransform(mouseX, [ -20, 20 ], [ 10, -10 ]), y: useTransform(mouseY, [ -20, 20 ], [ 10, -10 ]) }}
            animate={{ y: [0, -20, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 right-[15%] p-4 bg-black/60 backdrop-blur-xl border border-teal-500/30 rounded-2xl z-20 shadow-2xl hidden md:block"
          >
            <Code2 className="text-teal-400 w-8 h-8" />
          </motion.div>

          <motion.div 
            style={{ x: useTransform(mouseX, [ -20, 20 ], [ -15, 15 ]), y: useTransform(mouseY, [ -20, 20 ], [ -15, 15 ]) }}
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-[10%] p-4 bg-black/60 backdrop-blur-xl border border-orange-500/30 rounded-2xl z-20 shadow-2xl hidden md:block"
          >
            <Box className="text-orange-400 w-8 h-8" />
          </motion.div>

          <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center"
          >
            {/* PLATFORM DISC */}
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[70%] h-10 z-0">
              <div 
                className="w-full h-full bg-[#14b8a6] rounded-full blur-3xl opacity-30 transform scale-y-[0.3]"
                style={{ boxShadow: '0px 0px 80px 30px rgba(20, 184, 166, 0.5)' }}
              />
              <div className="absolute inset-0 border-2 border-teal-500/20 rounded-full transform scale-y-[0.3] scale-x-[1.1]" />
            </div>

            {/* CHARACTER IMAGE - THE CUTOUT */}
            <div className="relative z-10 w-full max-w-[550px] transition-all duration-500 ease-out">
              <img 
                src={settings.heroImage} 
                alt="Architecture Subject" 
                className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]"
                style={{ filter: 'brightness(1.1) contrast(1.1)' }}
              />
            </div>
          </motion.div>

          {/* Depth UI Tags */}
          <div className="absolute top-[20%] left-0 z-30 hidden lg:flex flex-col gap-3">
             <div className="px-4 py-2 bg-zinc-900/80 border border-white/5 rounded-lg backdrop-blur-md flex items-center gap-3">
                <Zap size={14} className="text-orange-500" />
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Active_Sync</span>
             </div>
             <div className="px-4 py-2 bg-zinc-900/80 border border-white/5 rounded-lg backdrop-blur-md flex items-center gap-3">
                <Layers size={14} className="text-teal-500" />
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Depth_v2.0</span>
             </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM GRID OVERLAY */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 z-10 pointer-events-none opacity-[0.05]"
        style={{ 
          backgroundImage: 'linear-gradient(to right, #14b8a6 0.5px, transparent 0.5px), linear-gradient(to bottom, #14b8a6 0.5px, transparent 0.5px)',
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to top, black, transparent)'
        }}
      />
    </section>
  );
};

export default Hero;
