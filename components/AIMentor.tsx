
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageSquare, Loader2, Zap, Terminal, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

const AIMentor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: "Systems online. I am the Vibe Architect. Neural link established. How shall we manifest your vision today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsgText = input;
    setInput('');
    
    // 1. Update messages with user input
    setMessages(prev => [...prev, { role: 'user', text: userMsgText }]);
    setIsTyping(true);

    // 2. Prepare AI connection
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Add a placeholder for the AI response to stream into
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    try {
      // 3. Format history for Gemini API
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // 4. Initialize streaming
      const streamResponse = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMsgText }] }
        ],
        config: {
          systemInstruction: `You are the Vibe Coding Mentor, an elite cyber-architect advisor. 
          Your personality is inspired by Jarvis from Iron Man: professional, calm, futuristic, and slightly witty.
          Tone: Cyber-Noir, Professional, High-Tech.
          Terminology: Use 'Grid', 'Manifest', 'Syncing', 'Protocol', 'Neural Link', 'Architecture'.
          Keep responses concise and impactful. Help the user understand that you can control this portfolio's appearance through the Admin Panel.`,
          temperature: 0.8,
        }
      });

      let fullText = "";
      for await (const chunk of streamResponse) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
          // Update the last message in the list with the accumulated stream
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1] = { role: 'ai', text: fullText };
            return newMsgs;
          });
        }
      }

    } catch (error) {
      console.error("Neural Desync Error:", error);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'ai', text: "Critical Neural Desync: Uplink failed. Please verify API authorization protocol." };
        return newMsgs;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[120]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="absolute bottom-24 right-0 w-80 sm:w-[400px] h-[600px] bg-zinc-950/90 backdrop-blur-3xl border border-teal-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header HUD */}
            <div className="p-6 border-b border-teal-500/20 bg-teal-500/5 flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent animate-pulse" />
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase">Mentor_Protocol</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                    <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Neural_Sync: High</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-600 hover:text-white transition-all p-2 hover:rotate-90">
                <X size={24} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[88%] p-5 rounded-2xl font-mono text-[11px] leading-relaxed relative ${
                    msg.role === 'user' 
                      ? 'bg-teal-500 text-black font-bold ml-auto rounded-tr-none shadow-[0_4px_20px_rgba(20,184,166,0.25)]' 
                      : 'bg-zinc-900/80 text-zinc-300 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text || (msg.role === 'ai' && <Loader2 size={16} className="animate-spin text-teal-500" />)}
                    {msg.role === 'ai' && (
                       <div className="absolute -left-2 top-0 w-3 h-3 bg-zinc-900 border-l border-t border-white/5 transform rotate-[-45deg]" />
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && messages[messages.length - 1].text === "" && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/50 text-teal-500 px-5 py-4 rounded-2xl rounded-tl-none border border-teal-500/20 flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-500">Manifesting...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Station */}
            <div className="p-6 border-t border-teal-500/20 bg-black/40">
              <div className="flex gap-3 bg-zinc-900 border border-white/10 p-2 rounded-2xl focus-within:border-teal-500/50 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Transmit vision to grid..."
                  className="flex-1 bg-transparent px-4 py-2 text-white text-[11px] outline-none font-mono placeholder:text-zinc-700"
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="w-11 h-11 bg-teal-500 text-black rounded-xl flex items-center justify-center hover:bg-teal-400 disabled:opacity-20 disabled:grayscale transition-all shadow-lg active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
          isOpen 
            ? 'bg-zinc-950 border-2 border-teal-500 text-teal-500' 
            : 'bg-teal-500 text-black shadow-[0_0_35px_rgba(20,184,166,0.5)]'
        }`}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.8rem]" />
        <Bot size={30} className={isOpen ? 'animate-spin-slow' : 'group-hover:animate-bounce'} />
        {!isOpen && (
           <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#050505] animate-ping" />
        )}
      </motion.button>
    </div>
  );
};

export default AIMentor;
