
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MatrixLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  const systemMessages = [
    "Initializing Grid...",
    "Syncing Bio-Data...",
    "Vibe Protocol Loaded.",
    "Bypassing Security...",
    "Accessing Cyber-Core...",
    "Establishing Uplink..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const logInterval = setInterval(() => {
      setLogs((prev) => {
        const nextMsg = systemMessages[Math.floor(Math.random() * systemMessages.length)];
        return [...prev.slice(-3), nextMsg];
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Matrix Rain Simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="flex gap-4 justify-around h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -500 }}
              animate={{ y: 1000 }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              className="text-teal-500 font-mono text-sm leading-none whitespace-nowrap"
              style={{ writingMode: 'vertical-rl' }}
            >
              {Array.from({ length: 40 }).map(() => (Math.random() > 0.5 ? '0' : '1')).join('')}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-teal-500 mb-2 uppercase italic">VIBE HQ</h1>
          <p className="text-xs text-teal-300 font-mono uppercase tracking-widest">Rebirth Protocol v2.5.0</p>
        </motion.div>

        <div className="relative h-1 bg-teal-900 w-full mb-4 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,1)]"
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-[10px] text-teal-600/60 uppercase space-y-1">
          {logs.map((log, idx) => (
            <motion.div 
              key={`${log}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              &gt; {log}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MatrixLoader;
