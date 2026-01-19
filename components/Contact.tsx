
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Send, X, ExternalLink, Globe, Cpu } from 'lucide-react';

const Contact: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulated EmailJS logic - Developer can plug in service ID here
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => {
        setShowModal(false);
        setFormStatus('idle');
      }, 2500);
    }, 1800);
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-[#050505] relative">
      <div className="absolute inset-0 bg-teal-500/5 opacity-30 pointer-events-none" style={{ maskImage: 'radial-gradient(circle at center, black, transparent 70%)' }} />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-500 text-[10px] font-mono tracking-[0.4em] uppercase mb-8"
        >
          <Globe size={14} className="animate-spin-slow" /> Terminal_Uplink
        </motion.div>

        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 uppercase italic leading-none">Manifest<br/><span className="text-teal-500">The_Vibe</span></h2>
        
        <p className="text-zinc-500 font-mono text-sm mb-16 max-w-xl mx-auto tracking-widest leading-relaxed uppercase">
          Ready to transcend the ordinary? Initialize connection with our grid and let's forge your digital legacy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            href="#" 
            className="group flex flex-col items-center gap-4 p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem] hover:border-teal-500 transition-all overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 bg-teal-500 text-black rounded-2xl flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transition-all">
               <ExternalLink size={24} />
            </div>
            <span className="text-xs font-bold text-white tracking-widest uppercase mt-2">Order on Fiverr</span>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            href="#" 
            className="group flex flex-col items-center gap-4 p-8 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] hover:border-orange-500 transition-all overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 bg-orange-500 text-black rounded-2xl flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all">
               <Phone size={24} />
            </div>
            <span className="text-xs font-bold text-white tracking-widest uppercase mt-2">WhatsApp Vibe</span>
          </motion.a>

          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setShowModal(true)}
            className="group flex flex-col items-center gap-4 p-8 bg-zinc-900/50 border-2 border-dashed border-teal-500/20 rounded-[2.5rem] hover:border-teal-500/60 transition-all overflow-hidden relative"
          >
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 bg-teal-500/5"
            />
            <div className="w-14 h-14 bg-transparent border-2 border-teal-500/50 text-teal-500 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 group-hover:text-black transition-all">
               <Send size={24} />
            </div>
            <span className="text-xs font-bold text-white tracking-widest uppercase mt-2">Custom Request</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-teal-500/30 rounded-[3rem] p-10 md:p-16 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 via-orange-500 to-teal-500 animate-pulse" />
              
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <div className="flex items-center gap-4 mb-10">
                 <div className="p-3 bg-teal-500/10 rounded-xl text-teal-500">
                    <Cpu size={28} />
                 </div>
                 <div>
                    <h3 className="text-3xl font-bold text-white uppercase italic tracking-tighter">Request Protocol</h3>
                    <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em]">Initialize Direct Uplink Sequence</p>
                 </div>
              </div>

              {formStatus === 'sent' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-24 h-24 bg-teal-500 text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(20,184,166,0.6)]">
                    <Send size={40} />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4 uppercase italic">Signal Transmitted</h4>
                  <p className="text-zinc-500 font-mono text-sm tracking-widest">Our architecture team will manifest shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.4em]">Identity</label>
                      <input required type="text" placeholder="Subject Name" className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-teal-500 outline-none transition-all font-mono text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.4em]">Comm_Link</label>
                      <input required type="tel" placeholder="+91 Phone" className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-teal-500 outline-none transition-all font-mono text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.4em]">Vibe_Class</label>
                    <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-teal-500 outline-none transition-all font-mono text-sm appearance-none">
                      <option className="bg-zinc-950">Birthday Protocol</option>
                      <option className="bg-zinc-950">Anniversary System</option>
                      <option className="bg-zinc-950">Custom Dimension</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.4em]">Manifesto_Details</label>
                    <textarea rows={4} required placeholder="Describe your vision to the architect..." className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-teal-500 outline-none transition-all font-mono text-sm resize-none" />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02, shadow: '0 0 40px rgba(20,184,166,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'sending'}
                    type="submit" 
                    className="w-full py-6 bg-teal-500 text-black font-bold uppercase tracking-[0.4em] text-xs mt-6 rounded-2xl hover:bg-teal-400 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : 'Initiate Sequence'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
