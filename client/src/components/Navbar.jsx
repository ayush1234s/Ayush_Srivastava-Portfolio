import { FiLinkedin, FiGithub, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { LINKS } from '../config/links';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const letters = 'AYUSH'.split('');

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 glass-nav z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Navigation"
          id="hamburger-btn"
        >
          {sidebarOpen ? <FiX size={22} className="text-purple-400" /> : <FiMenu size={22} />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-1 font-bold text-xl md:text-2xl tracking-wider select-none">
          {letters.map((l, i) => (
            <span
              key={i}
              className="inline-block gradient-text hover:scale-125 transition-transform duration-200 cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {l}
            </span>
          ))}
          <span className="text-purple-500 font-mono text-sm ml-1 animate-pulse">.dev</span>
        </div>
      </div>

      {/* Social Icons */}
      <nav className="flex items-center gap-2 md:gap-3" aria-label="Social links">
        <a
          href={LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200"
          aria-label="LinkedIn"
          id="nav-linkedin"
          title="LinkedIn Profile"
        >
          <FiLinkedin size={18} />
        </a>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200"
          aria-label="GitHub"
          id="nav-github"
          title="GitHub Profile"
        >
          <FiGithub size={18} />
        </a>
        <a
          href={LINKS.email}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-200"
          aria-label="Email"
          id="nav-email"
          title="Send Email"
        >
          <FiMail size={18} />
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
