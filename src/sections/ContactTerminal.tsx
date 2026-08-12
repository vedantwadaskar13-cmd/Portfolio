import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Mail, Phone, MapPin, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { sendContactMessage } from '../services/firebase';

export const ContactTerminal: React.FC = () => {
  const { email, phone, location } = RESUME_DATA.personal;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'CONNECTING' | 'PROCESSING' | 'SENT'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('// ERROR: ALL TRANSMISSION FIELDS ARE REQUIRED.');
      return;
    }

    setErrorMessage('');
    setStatus('CONNECTING');

    setTimeout(async () => {
      setStatus('PROCESSING');
      const res = await sendContactMessage(formData);
      if (res.success) {
        setTimeout(() => {
          setStatus('SENT');
          setFormData({ name: '', email: '', message: '' });
        }, 800);
      }
    }, 800);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-hud border border-cyan-500/30 font-mono text-xs text-cyan-400 tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>COMMUNICATION_LINK // ENCRYPTED</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            INITIALIZE <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">TRANSMISSION</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-mono">
            Send a direct encrypted message or telemetry ping to Vedant Wadaskar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl glass-hud border border-cyan-500/30 hud-corner-box space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl text-white">DIRECT TELEMETRY</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Open for entry-level AI/ML Engineer, Machine Learning Engineer, and Data Analytics positions.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800 font-mono text-xs">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">EMAIL_CHANNEL</span>
                    <span className="text-slate-200 group-hover:text-cyan-300 font-medium">{email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">VOICE_CHANNEL</span>
                    <span className="text-slate-200 group-hover:text-emerald-300 font-medium">{phone}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">GEO_LOCATION</span>
                    <span className="text-slate-200 font-medium">{location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Terminal Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl glass-hud border border-cyan-500/40 hud-corner-box space-y-6"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                  <span>TRANSMISSION_CONSOLE v2.7</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>SOCKET: CONNECTED</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 font-mono">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs text-cyan-400 mb-2 uppercase">
                    [01] SENDER_NAME:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name or organization..."
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-cyan-400 mb-2 uppercase">
                    [02] RETURN_EMAIL:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your contact email..."
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-cyan-400 mb-2 uppercase">
                    [03] TRANSMISSION_MESSAGE:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message or inquiry..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={status !== 'IDLE' && status !== 'SENT'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.7)] transition-all disabled:opacity-70 interactive-hover"
                >
                  {status === 'IDLE' && (
                    <>
                      <span>SEND TRANSMISSION</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                  {status === 'CONNECTING' && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>CONNECTING TO SECURE SOCKET...</span>
                    </>
                  )}
                  {status === 'PROCESSING' && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>PROCESSING TRANSMISSION...</span>
                    </>
                  )}
                  {status === 'SENT' && (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>TRANSMISSION COMPLETE!</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
