'use client';

import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Contact() {
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
            Have a project in mind, want to discuss a job role, or just want to say hi? Let&apos;s connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <h3 className="text-2xl font-bold tracking-tight mb-4">
              Contact Information
            </h3>
            
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 bg-white/40 dark:bg-slate-900/40 glass-panel border border-card-border rounded-xl shadow-sm hover:shadow-md transition-all group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-3 bg-primary/5 dark:bg-primary/10 text-primary border border-primary/10 rounded-lg group-hover:scale-105 transition-transform duration-350">
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
              ))}
            </div>

            {/* Social Grid */}
            <div className="pt-6">
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
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="p-3 border border-card-border bg-white/60 dark:bg-slate-900/60 rounded-xl text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center hover:shadow-sm"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <span className="text-base">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/40 dark:bg-slate-900/40 glass-panel border border-card-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold tracking-tight mb-6 text-left">
              Send a Message
            </h3>
            
            <form 
              action="https://formsubmit.co/warmuzamil68@gmail.com" 
              method="POST"
              className="space-y-5 text-left"
            >
              {/* FormSubmit.co configurations */}
              <input type="hidden" name="_subject" value="New Message from Portfolio!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://muzamilcodes.vercel.app/thank-you" />
              <input type="text" name="_honey" className="hidden" />
              
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
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300"
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
                  className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300"
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
                  className="w-full px-4 py-3 rounded-xl border border-card-border bg-white/50 dark:bg-slate-950/50 text-gray-800 dark:text-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 resize-none"
                  placeholder="Outline your project scope, deadlines, and requirements..."
                />
              </div>

              <div className="space-y-4 pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <FiSend className="text-sm" />
                  <span>Send Inquiry Message</span>
                </motion.button>
                
                <p className="text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Inquiries are routed directly to my personal inbox
                </p>
              </div>
            </form>
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