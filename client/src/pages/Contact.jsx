import { useState, useRef } from 'react';
import {
  FiSend, FiMail, FiGithub, FiLinkedin, FiMapPin, FiCheck, FiAlertCircle, FiNavigation, FiLock
} from 'react-icons/fi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { LINKS } from '../config/links';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | flying | success | error
  const [error, setError] = useState('');
  const [stepText, setStepText] = useState('Packaging message...');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setStatus('sending');
    setStepText('Encrypting message payload...');
    setError('');

    try {
      // Step 1: Firestore Save
      setTimeout(() => setStepText('Saving to Firebase Firestore...'), 600);
      await addDoc(collection(db, 'contacts'), {
        ...form,
        timestamp: serverTimestamp(),
        read: false,
      });

      // Step 2: EmailJS send
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        setTimeout(() => setStepText('Dispatching EmailJS notification...'), 1200);
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      }

      // Trigger Flight Animation
      setTimeout(() => {
        setStepText('Flying message to Ayush...');
        setStatus('flying');
      }, 1500);

      // Finish Animation
      setTimeout(() => {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }, 3500);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('Failed to send message. Please try again or email directly.');
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-6xl mx-auto w-full relative">
      {/* Flight Launch Modal Overlay */}
      {(status === 'sending' || status === 'flying') && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-4">
          <div className="relative flex flex-col items-center max-w-sm w-full text-center">
            {/* Flying Paper Plane Icon */}
            <div className={`p-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-5xl shadow-[0_0_50px_rgba(168,85,247,0.7)] mb-6 ${status === 'flying' ? 'animate-plane-fly' : 'animate-bounce'}`}>
              <FiNavigation />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2">Dispatching Message</h3>
            <p className="text-xs font-mono text-purple-400 mb-6 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span>{stepText}</span>
            </p>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-2">
          <span>// Direct Communication Portal</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Have a project idea, hardware query, or collaboration? Drop me a line below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-xl font-bold text-white mb-2">Let's Build Something Amazing</h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Whether you want to build an IoT automation system, a modern web app, or collaborate on tech projects, feel free to reach out.
            </p>

            <div className="space-y-3">
              <a
                href={LINKS.email}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 text-xs text-slate-300 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                  <FiMail size={16} />
                </div>
                <span className="truncate">{LINKS.emailAddress}</span>
              </a>

              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 text-xs text-slate-300 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                  <FiLinkedin size={16} />
                </div>
                <span className="truncate">linkedin.com/in/ayushsrivastava06</span>
              </a>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 text-xs text-slate-300 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform">
                  <FiGithub size={16} />
                </div>
                <span className="truncate">github.com/ayush1234s</span>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <FiMapPin size={16} />
                </div>
                <span>India 🇮🇳</span>
              </div>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="glass-card p-4 rounded-xl font-mono text-xs text-slate-300 space-y-1">
            <div className="text-slate-500">$ status --contact</div>
            <div className="text-emerald-400">✓ Real-time Sync to Admin Panel & Email</div>
            <div className="text-purple-400">→ Response time: &lt; 24 hours</div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 md:p-8 rounded-2xl border-t-2 border-t-purple-500">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
              <span>Send Message 💬</span>
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1">
                <FiLock size={12} /> Encrypted
              </span>
            </h2>

            {status === 'success' ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_30px_rgba(52,211,153,0.4)] animate-bounce">
                  <FiCheck />
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-400">Message Delivered! 🚀</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your message has flown into Ayush's inbox and saved directly to the Admin Panel. You'll receive a response soon!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 rounded-xl bg-purple-600/30 border border-purple-500/50 text-xs font-bold text-white hover:bg-purple-600/50 transition-all cursor-pointer"
                  id="btn-send-another"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5" htmlFor="contact-name">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5" htmlFor="contact-email">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ayushoffice3@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5" htmlFor="contact-message">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-y min-h-[120px]"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    <FiAlertCircle />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'flying'}
                  id="btn-contact-submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <FiSend />
                  <span>Send Message & Launch Plane</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
