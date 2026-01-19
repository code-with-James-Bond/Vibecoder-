
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../context/AppStateContext';
import { ExternalLink, Globe } from 'lucide-react';

const PhoneCard: React.FC<{ project: { title: string, tag: string, color: string, image: string, link: string, desc: string } }> = ({ project }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 6; 
    const rotateY = (centerX - x) / 6;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative group p-4 lg:p-10 w-full flex justify-center">
      <motion.div 
        animate={{ opacity: rotate.x !== 0 ? 0.4 : 0.05, scale: rotate.x !== 0 ? 1.1 : 1 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-10 blur-3xl rounded-full z-0"
        style={{ backgroundColor: project.color }}
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        whileHover={{ scale: 1.05 }}
        style={{ perspective: '1500px', transformStyle: 'preserve-3d', rotateX: rotate.x, rotateY: rotate.y }}
        className="relative w-full max-w-[280px] sm:w-72 h-[500px] sm:h-[550px] rounded-[3rem] p-[2px] bg-gradient-to-b from-white/10 to-transparent overflow-hidden transition-all duration-300 cursor-pointer"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none border-2 rounded-[3rem]" style={{ borderColor: project.color, boxShadow: `0 0 40px ${project.color}50` }} />
        
        <div className="relative h-full w-full bg-[#050505] rounded-[2.9rem] overflow-hidden flex flex-col z-10 border border-white/5">
          {/* Mock Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-900 rounded-b-2xl z-40 flex items-center justify-center">
            <div className="w-10 h-1 bg-white/10 rounded-full" />
          </div>

          <div className="flex-1 overflow-hidden relative">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            
            {/* Visual feedback on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
               <div className="p-4 rounded-full bg-teal-500 text-black shadow-[0_0_20px_rgba(20,184,166,0.5)] transform scale-75 group-hover:scale-100 transition-transform">
                  <Globe size={24} />
               </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 relative z-20 bg-[#050505]">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[8px] font-mono tracking-[0.4em] uppercase px-3 py-1 rounded-lg border" style={{ borderColor: `${project.color}30`, color: project.color }}>{project.tag}</span>
              <ExternalLink size={14} className="text-zinc-600 group-hover:text-teal-500 transition-colors" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 uppercase tracking-tight group-hover:tracking-widest transition-all duration-500">{project.title}</h3>
            <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">{project.desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Showcase: React.FC = () => {
  const { settings } = useAppState();

  const projectData = [
    {
      title: "Vibe Birthdays",
      tag: "Celebration",
      color: "#14b8a6",
      image: settings.project1.image,
      link: settings.project1.link,
      desc: "Interactive emotional timelines."
    },
    {
      title: "Noir Protocol",
      tag: "Anniversary",
      color: "#f97316",
      image: settings.project2.image,
      link: settings.project2.link,
      desc: "Cyber-noir visual experiences."
    },
    {
      title: "Quantum Vibe",
      tag: "Enterprise",
      color: "#14b8a6",
      image: settings.project3.image,
      link: settings.project3.link,
      desc: "High-performance brand visuals."
    }
  ];

  return (
    <section id="showcase" className="py-32 px-6 lg:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-6">
           <div className="space-y-4">
              <div className="h-1 w-20 bg-teal-500" />
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase italic">Showcase</h2>
           </div>
           <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] max-w-xs text-right hidden md:block">
              Click any device to initialize live environment link.
           </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 w-full">
          {projectData.map((p, i) => <PhoneCard key={i} project={p} />)}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
