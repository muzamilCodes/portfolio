'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import TiltCard3D from './3d/TiltCard3D';

const Contact3D = dynamic(() => import('./3d/Contact3D'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center text-xs text-gray-500">Loading 3D Beacon...</div>,
});

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactInfo = [
    {
      icon: <FiMail className="text-lg" />,
      title: "Email",
      value: "warmuzamil68@gmail.com",
      link: "mailto:warmuzamil68@gmail.com?subject=Portfolio Inquiry",
      actionText: "Send an email"
    },
    {
      icon: <FiPhone className="text-lg" />,
      title: "Phone / WhatsApp",
      value: "+91 9682645127",
      link: "https://wa.me/919682645127?text=Hello%20Muzamil%2C%20I%20saw%20your%20portfolio...",
      actionText: "Message on WhatsApp"
    },
    {
      icon: <FiMapPin className="text-lg" />,
      title: "Location",
      value: "Handwara, Srinagar",
      link: "https://maps.google.com/?q=Handwara+India",
      actionText: "Find on Google Maps"
    }
  ];

  const socialLinks = [
    { 
      name: "GitHub", 
      link: "https://github.com/muzamilCodes", 
      icon: <FiGithub />,
      color: "bg-slate-900 border-slate-800 text-white hover:text-primary" 
    },
    { 
      name: "LinkedIn", 
      link: "https://www.linkedin.com/in/muzamilCodes", 
      icon: <FiLinkedin />,
      color: "bg-blue-600 border-blue-500 text-white hover:text-secondary" 
    },
    { 
      name: "Twitter", 
      link: "https://x.com/MuzamilCoder", 
      icon: <FiTwitter />,
      color: "bg-sky-400 border-sky-300 text-white hover:text-primary" 
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/warmuzamil68@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (response.ok && result.success === "true") {
        setFormState('success');
      } else {
        setFormState('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormState('error');
      setErrorMessage('Could not connect to the mail server. Please check your internet connection.');
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-background transition-colors duration-300">
      {/* Background glow orb */}
      <div className="absolute top-1/4 right-0 w-[200px] h-[200px] rounded-full bg-secondary/5 dark:bg-secondary/10 glow-blur -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Get In Touch
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Have a project in mind, want to discuss a 3D web experience or full-stack role, or just want to say hi? Let&apos;s connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Contact Info + 3D Holographic Radar */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            {/* 3D Radar Visualizer */}
            <div className="relative rounded-3xl glass-panel border border-card-border p-4 overflow-hidden bg-slate-950/40">
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Holographic Transmission Node</span>
              </div>
              <Contact3D />
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <TiltCard3D key={info.title} depth={10}>
                  <motion.a
                    href={info.link}
                    className="flex items-center space-x-4 p-4 bg-white/40 dark:bg-slate-900/40 glass-panel border border-card-border rounded-2xl shadow-sm hover:shadow-lg transition-all group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="p-3 bg-primary/10 text-primary border border-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-350 shadow-sm">
                      {info.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">
                        {info.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {info.value}
                      </p>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1 block">
                        {info.actionText} →
                      </span>
                    </div>
                  </motion.a>
                </TiltCard3D>
              ))}
            </div>

            {/* Social Grid */}
            <div className="pt-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                Follow My Developments
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="p-3.5 border border-card-border bg-white/60 dark:bg-slate-900/60 rounded-2xl text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all flex items-center justify-center hover:shadow-md"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <span className="text-base">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form Card wrapped in TiltCard3D */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <TiltCard3D depth={8} glowColor="rgba(99, 102, 241, 0.15)" className="bg-white/40 dark:bg-slate-900/40 glass-panel border border-card-border rounded-3xl p-6 sm:p-8 shadow-xl relative min-h-[460px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                /* Success Card View */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 space-y-6 flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                  >
                    <FiCheckCircle className="text-6xl text-emerald-500" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Message Sent Successfully!</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
                      Thank you for reaching out. I have received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormState('idle')}
                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-md"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                /* Main Form View */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-2xl font-bold tracking-tight mb-6 text-left">
                    Send a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          disabled={formState === 'loading'}
                          className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 disabled:opacity-55"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          disabled={formState === 'loading'}
                          className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 disabled:opacity-55"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        disabled={formState === 'loading'}
                        className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 disabled:opacity-55"
                        placeholder="Freelance Project / Job Opportunity"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        disabled={formState === 'loading'}
                        className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 resize-none disabled:opacity-55"
                        placeholder="Outline your project scope, deadlines, and requirements..."
                      />
                    </div>

                    {/* Error message notification block */}
                    {formState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 rounded-xl text-xs"
                      >
                        <FiAlertCircle className="text-base flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    <div className="space-y-4 pt-2">
                      <motion.button
                        type="submit"
                        disabled={formState === 'loading'}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-55 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {formState === 'loading' ? (
                          <div className="flex items-center space-x-2">
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Sending Message...</span>
                          </div>
                        ) : (
                          <>
                            <FiSend className="text-sm" />
                            <span>Send Inquiry Message</span>
                          </>
                        )}
                      </motion.button>
                      
                      <p className="text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Inquiries are routed directly to my personal inbox
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            </TiltCard3D>
          </motion.div>
        </div>

        {/* Reply policy badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-4 bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-2xl max-w-md">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Response Guarantee</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              I read and reply to all valid inquiries within 24 hours. For rapid communications, please ping me via WhatsApp link above.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}