import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap, FiTerminal } from 'react-icons/fi';
import { useProjects } from '../hooks/useFirestore';
import ProjectCard from '../components/ProjectCard';
import WindOverlay from '../components/WindOverlay';
import DayNightSky from '../components/DayNightSky';

const Footer = () => (
  <footer className="mt-20 py-8 border-t border-white/10 glass-nav text-center relative z-10">
    <div className="flex items-center justify-center gap-3 mb-2">
      <img
        src="/ayush.jpg"
        alt="Ayush Srivastava"
        className="w-9 h-9 rounded-full object-cover border-2 border-purple-500/80 p-0.5"
      />
      <span className="font-bold text-sm text-white">Ayush Srivastava</span>
    </div>
    <p className="text-xs font-mono text-purple-400 mb-2">
      IoT + Embedded / Full Stack Developer
    </p>
    <p className="text-xs text-slate-500 font-mono">
      © 2026 Ayush Srivastava. All rights reserved.
    </p>
  </footer>
);

const TypingText = () => {
  const roles = [
    'IoT & Embedded Systems Engineer',
    'Full Stack Web Developer',
    'Electronics & Comm. Student',
    'UI/UX Creative Builder',
  ];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timer;
    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, index]);

  return (
    <span className="font-mono text-purple-400 after:content-['|'] after:animate-ping after:text-pink-500">
      {displayed}
    </span>
  );
};

const Home = () => {
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const [skyMode, setSkyMode] = useState('night');

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Hero Container */}
      <section className="px-6 md:px-12 lg:px-16 pt-4 md:pt-6 max-w-6xl mx-auto w-full relative z-10">
        {/* Real-time Sun / Sunset / Moon Celestial Sky Control & Display */}
        <DayNightSky onModeChange={setSkyMode} />

        {/* Hero Content */}
        <div className="mt-6 md:mt-8">
          {/* Greeting Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 mb-6">
            <FiZap className="text-pink-400 animate-bounce" />
            <span>Hello, World! I'm Ayush 👋</span>
            <span className="font-semibold text-amber-300">
              {skyMode === 'day' ? '• ☀️ Good Day' : skyMode === 'sunset' ? '• 🌇 Evening Twilight' : '• 🌙 Night Mode'}
            </span>
          </div>

          {/* Hero Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-none">
            <span className="gradient-text">Ayush</span>{' '}
            <span className="text-white">Srivastava</span>
          </h1>

          {/* Dynamic Role */}
          <div className="text-lg md:text-2xl font-medium text-slate-300 mb-8 min-h-[36px]">
            <TypingText />
          </div>

          {/* Bio Card */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-l-purple-500 mb-10 max-w-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-purple-500/10 group-hover:text-purple-500/20 transition-colors">
              <FiTerminal size={80} />
            </div>
            <h2 className="text-sm font-mono font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>// Who am I?</span>
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed relative z-10">
              I’m a B.Tech student in Electronics and Communication Engineering and a passionate
              developer who enjoys building clean UI, fun web apps, and visually attractive projects
              that stand out from normal templates. I'm particularly interested in IoT and Embedded
              Systems, combining my engineering background with modern development practices.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all duration-200"
              id="cta-projects"
            >
              Explore Projects <FiArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-purple-300 bg-white/5 border border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/60 transition-all duration-200"
              id="cta-contact"
            >
              Get in Touch
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-400 hover:text-white transition-colors"
              id="cta-about"
            >
              More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section with Wall-Hanging & Wind */}
      <section className="px-6 md:px-12 lg:px-16 py-12 max-w-6xl mx-auto w-full flex-1 relative z-10">
        <WindOverlay />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10">
          <div>
            <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span>// Wall-Hanging Featured Work</span>
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-400 hover:text-pink-400 transition-colors"
            id="btn-explore-projects"
          >
            Explore All ({projects.length}) <FiArrowRight />
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {featured.map((project, idx) => (
            <ProjectCard key={project.id} project={project} featured index={idx} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
