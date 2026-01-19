
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, X, Save, Image as ImageIcon, Globe, FileText, User, Layout, Link as LinkIcon, Cpu, RefreshCw, Upload, CheckCircle2 } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

const AdminInput = ({ label, icon: Icon, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2 group">
    <label className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-teal-400 transition-colors">
      <Icon size={12} /> {label}
    </label>
    <div className="relative">
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-teal-100 font-mono text-xs outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-all" 
      />
    </div>
  </div>
);

const ImageUpload = ({ label, icon: Icon, value, onUpload }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl group transition-all hover:border-teal-500/30">
      <label className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-teal-400">
        <Icon size={12} /> {label}
      </label>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl border border-white/10 bg-black overflow-hidden flex-shrink-0 relative group/preview">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-800">
              <ImageIcon size={20} />
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
             <RefreshCw size={14} className="text-white animate-spin-slow" />
          </div>
        </div>
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono uppercase tracking-widest rounded-xl border border-white/5 transition-all"
        >
          <Upload size={14} /> Upload Asset
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const { settings, updateSettings } = useAppState();
  const [showConsole, setShowConsole] = useState(false);
  const [form, setForm] = useState(settings);

  const handleSave = () => {
    updateSettings(form);
    setShowConsole(false);
  };

  const handleReset = () => {
    setForm(settings);
  };

  return (
    <footer className="py-16 px-6 lg:px-12 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-500/5 opacity-20 pointer-events-none" style={{ maskImage: 'radial-gradient(circle at bottom right, black, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold tracking-tighter text-white uppercase italic">VIBE <span className="text-teal-500">HQ</span></span>
          <p className="mt-2 text-zinc-600 font-mono text-[9px] uppercase tracking-[0.5em]">System_Core: Active</p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
           <button 
            onClick={() => {
              setForm(settings);
              setShowConsole(true);
            }}
            className="group flex items-center gap-3 px-8 py-3 rounded-full bg-zinc-900/50 border border-white/5 text-[10px] text-zinc-400 font-mono uppercase tracking-[0.3em] hover:text-teal-400 hover:border-teal-500/30 transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.1)]"
          >
            <Shield size={14} className="group-hover:rotate-12 transition-transform" />
            ADMIN_CONSOLE
          </button>
          <p className="text-zinc-800 font-mono text-[8px] uppercase tracking-widest">© 2024 Vibe Coding Protocol</p>
        </div>
      </div>

      <AnimatePresence>
        {showConsole && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConsole(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl h-[90vh] overflow-hidden bg-[#0c0c0c] border border-teal-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,1)] flex flex-col"
            >
              {/* Header HUD */}
              <div className="p-8 border-b border-white/5 bg-zinc-900/50 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-500/10 rounded-xl text-teal-500 animate-pulse">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tighter uppercase italic leading-none">Matrix_Admin_Panel</h3>
                    <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.5em] mt-1">Authorized_Override_Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <button onClick={handleReset} title="Reset Changes" className="p-3 text-zinc-500 hover:text-white transition-colors"><RefreshCw size={20} /></button>
                   <button onClick={() => setShowConsole(false)} className="p-3 bg-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
                </div>
              </div>

              {/* Console Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
                
                {/* Visual Identity Section - UPLOADS */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-[2px] w-6 bg-teal-500 shadow-[0_0_10px_#14b8a6]" />
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.4em]">Section 01: Character Bio-Data (Uploads)</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUpload label="Profile Display Picture (DP)" icon={User} value={form.profileImage} onUpload={(base64: string) => setForm({...form, profileImage: base64})} />
                    <ImageUpload label="Hero Character Cutout" icon={ImageIcon} value={form.heroImage} onUpload={(base64: string) => setForm({...form, heroImage: base64})} />
                  </div>
                </section>

                {/* Showcase Section - MIXED (Image Upload + Link URL) */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-[2px] w-6 bg-teal-500 shadow-[0_0_10px_#14b8a6]" />
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.4em]">Section 02: Environment Management</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 group relative overflow-hidden flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3">
                          <ImageUpload 
                            label={`Phone ${i} Display Image`} 
                            icon={Layout} 
                            value={(form as any)[`project${i}`].image} 
                            onUpload={(base64: string) => setForm({...form, [`project${i}`]: {...(form as any)[`project${i}`], image: base64}})} 
                          />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col justify-center space-y-4">
                           <div className="flex items-center gap-4 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold text-xs">{i}</div>
                              <h5 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Device_{i}_Redirect_Protocol</h5>
                           </div>
                           <AdminInput 
                             label={`Live Environment URL (Link Only)`} 
                             icon={Globe} 
                             value={(form as any)[`project${i}`].link} 
                             onChange={(val: string) => setForm({...form, [`project${i}`]: {...(form as any)[`project${i}`], link: val}})} 
                             placeholder="https://example.com" 
                           />
                           <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest italic">* Only Live Redirect uses URL. Phone image is uploaded above.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Documentation Section */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-[2px] w-6 bg-orange-500 shadow-[0_0_10px_#f97316]" />
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.4em]">Section 03: System Manuals (URLs)</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-zinc-900/30 rounded-3xl border border-white/5">
                    <AdminInput label="Standard Manual PDF Link" icon={FileText} value={form.standardPdfLink} onChange={(val: string) => setForm({...form, standardPdfLink: val})} placeholder="https://..." />
                    <AdminInput label="Premium Manual PDF Link" icon={FileText} value={form.premiumPdfLink} onChange={(val: string) => setForm({...form, premiumPdfLink: val})} placeholder="https://..." />
                  </div>
                </section>
              </div>

              {/* Action Station */}
              <div className="p-8 bg-black/60 border-t border-white/5 flex gap-4 backdrop-blur-md">
                <button 
                  onClick={handleSave} 
                  className="flex-1 bg-teal-500 hover:bg-teal-400 text-black py-5 rounded-2xl font-bold uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.6)]"
                >
                  <Save size={18} /> Sync Environmental Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
