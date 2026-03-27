'use client';

import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Contact() {
  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      value: "warmuzamil68@gmail.com",
      link: "mailto:warmuzamil68@gmail.com?subject=Portfolio Inquiry"
    },
    {
      icon: <FiPhone />,
      title: "Phone / WhatsApp",
      value: "+91 9682645127",
      link: "https://wa.me/919682645127?text=Hello%20Muzamil%2C%20I%20saw%20your%20portfolio..."
    },
    {
      icon: <FiMapPin />,
      title: "Location",
      value: "Srinagar, India",
      link: "https://maps.google.com/?q=Srinagar+India"
    }
  ];

  const socialLinks = [
    { 
      name: "GitHub", 
      link: "https://github.com/muzamilCodes", 
      icon: <FiGithub />,
      color: "bg-gray-800 hover:bg-gray-900" 
    },
    { 
      name: "LinkedIn", 
      link: "https://www.linkedin.com/in/muzamilCodes", 
      icon: <FiLinkedin />,
      color: "bg-blue-600 hover:bg-blue-700" 
    },
    { 
      name: "Twitter", 
      link: "https://x.com/MuzamilCoder", 
      icon: <FiTwitter />,
      color: "bg-blue-400 hover:bg-blue-500" 
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{info.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                  {info.title === "Phone / WhatsApp" && (
                    <p className="text-xs text-green-600 mt-1">Click to message on WhatsApp</p>
                  )}
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-xl font-bold mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-3 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center`}
                    aria-label={social.name}
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - USING FORMSUBMIT.CO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            {/* FORMSUBMIT.CO FORM */}
            <form 
              action="https://formsubmit.co/warmuzamil68@gmail.com" 
              method="POST"
              className="space-y-6"
            >
              {/* Hidden fields */}
              <input type="hidden" name="_subject" value="New Message from Portfolio!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://muzamilcodes.vercel.app/thank-you" />
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Project Inquiry / Job Opportunity"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                />
              </div>

              <div className="space-y-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                >
                  <FiSend />
                  Send Message
                </motion.button>
                
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Messages go directly to my email inbox
                </p>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <h4 className="text-lg font-semibold mb-2">Response Time</h4>
            <p className="text-gray-600 dark:text-gray-400">
              I typically respond within 24 hours. For urgent inquiries, please WhatsApp me.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}