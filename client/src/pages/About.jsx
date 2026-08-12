import { useState } from 'react';
import {
  FiCpu, FiCode, FiTerminal, FiRadio, FiActivity, FiShield,
  FiGitBranch, FiCheckCircle, FiAward, FiLayers
} from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import SkillBar from '../components/SkillBar';
import { useAbout, useSkills } from '../hooks/useFirestore';

const About = () => {
  const { about } = useAbout();
  const { skills } = useSkills();
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 max-w-6xl mx-auto w-full relative">
      {/* Background Hologram Grid Glow */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="mb-10 relative z-10">
        <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>// Interactive Developer ID & Systems</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          About <span className="gradient-text">Me</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Cyberpunk Holographic ID Badge */}
        <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-24">
          <div className="glass-card w-full p-6 rounded-3xl border-t-2 border-t-purple-500 relative overflow-hidden shadow-2xl group">
            {/* Scan Line Animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scanline opacity-75 pointer-events-none z-20" />

            {/* Badge Header Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-purple-400">
                <FiShield />
                <span>DEV-ID: #AYUSH-2003</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Profile Avatar with Spinning Neon Aura */}
            <div className="relative w-44 h-44 mx-auto mb-6">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 animate-spin blur-sm" style={{ animationDuration: '6s' }} />
              <img
                src="/ayush.jpg"
                alt="Ayush Srivastava"
                className="relative w-full h-full object-cover rounded-full border-4 border-slate-950 p-1 bg-slate-900 shadow-2xl"
              />
              <div className="absolute bottom-1 right-2 bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full border-2 border-slate-950 text-white shadow-lg">
                <FiCpu size={16} />
              </div>
            </div>

            {/* Profile Details */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-extrabold text-white tracking-wide">Ayush Srivastava</h2>
              <p className="text-xs font-mono text-purple-400 mt-1">
                {about.tagline || 'IoT + Embedded / Full Stack Developer'}
              </p>
            </div>

            {/* Specs Pills */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-2">
                  <FiCpu className="text-purple-400" /> Major:
                </span>
                <span className="text-purple-300 font-bold">B.Tech ECE</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-2">
                  <RiRobot2Line className="text-pink-400" /> Specialty:
                </span>
                <span className="text-pink-300 font-bold">IoT & Robotics</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-2">
                  <FiCode className="text-indigo-400" /> Web Stack:
                </span>
                <span className="text-indigo-300 font-bold">React & Node</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Cyber Studio */}
        <div className="lg:col-span-8 space-y-6">
          {/* Terminal View Component */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Terminal Top Window Controls */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <FiTerminal className="text-purple-400" />
                  <span>ayush@workspace:~/{activeTab}</span>
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1 font-mono text-xs">
                {[
                  { id: 'bio', label: 'whoami.sh' },
                  { id: 'hardware', label: 'hardware.cpp' },
                  { id: 'web', label: 'stack.jsx' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-lg text-xs transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-sans text-sm min-h-[220px]">
              {activeTab === 'bio' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                    {about.bio}
                  </p>
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 font-mono text-xs text-purple-300">
                    <span className="text-pink-400 font-bold">$ intent:</span> Combining Hardware & Embedded Systems with modern Full Stack Web Architecture to create practical smart solutions.
                  </div>
                </div>
              )}

              {activeTab === 'hardware' && (
                <div className="space-y-3 font-mono text-xs text-slate-300 animate-fade-in">
                  <div className="text-purple-400 font-bold">// Embedded Hardware & IoT Matrix</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-pink-400 font-bold mb-1">🎮 Microcontrollers</div>
                      <div>Arduino Uno, ESP32, ESP8266</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-purple-400 font-bold mb-1">📡 Wireless Comms</div>
                      <div>GSM Modules, Bluetooth, Wi-Fi</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-emerald-400 font-bold mb-1">⚙️ Actuators & Relays</div>
                      <div>Relay Appliance Switching, Servo Motors, DC Motors</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-indigo-400 font-bold mb-1">🔍 Sensors</div>
                      <div>Ultrasonic, IR, Temperature & Network Monitoring</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'web' && (
                <div className="space-y-3 font-mono text-xs text-slate-300 animate-fade-in">
                  <div className="text-pink-400 font-bold">// Modern Web & API Stack</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-purple-400 font-bold mb-1">⚛️ Frontend</div>
                      <div>React.js, Tailwind CSS, Framer Motion</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-indigo-400 font-bold mb-1">⚡ Backend</div>
                      <div>Node.js, Express, Telegram Bot API</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-pink-400 font-bold mb-1">🔥 Cloud & DB</div>
                      <div>Firebase Firestore, Auth, Storage, Vercel</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="text-emerald-400 font-bold mb-1">🛠️ Tools</div>
                      <div>Git, GitHub, VS Code, Arduino IDE</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skill Snapshot with Glowing Energy Bars */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FiActivity className="text-purple-400 animate-pulse" />
                <span>Skill Snapshot</span>
              </span>
              <span className="text-xs font-mono text-purple-400">// Reloads & fills on view</span>
            </h3>

            <div className="space-y-4">
              {skills
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((skill) => (
                  <SkillBar
                    key={skill.id}
                    name={skill.name}
                    percentage={skill.percentage}
                  />
                ))}
            </div>
          </div>

          {/* Experience Journey Roadmap */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <FiLayers className="text-pink-400" />
              <span>Journey & Engineering Milestones</span>
            </h3>

            <div className="space-y-4 font-sans text-xs">
              <div className="relative pl-6 border-l-2 border-purple-500/40">
                <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                <div className="font-bold text-white text-sm">Obstacle Avoiding Autonomous Robot</div>
                <div className="font-mono text-purple-400 text-[11px]">Arduino Uno • Ultrasonic Sensor • Servo Motor</div>
                <p className="text-slate-400 mt-1">Built intelligent robotic navigation system capable of scanning environments and choosing optimal paths without human intervention.</p>
              </div>

              <div className="relative pl-6 border-l-2 border-pink-500/40">
                <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />
                <div className="font-bold text-white text-sm">Voltura4 — ESP32 Smart Home Automation</div>
                <div className="font-mono text-pink-400 text-[11px]">ESP32 • GSM Remote SMS • Bluetooth Appliance Switching</div>
                <p className="text-slate-400 mt-1">Dual-mode home automation allowing remote control from anywhere using SMS or nearby via Bluetooth with EEPROM state saving.</p>
              </div>

              <div className="relative pl-6 border-l-2 border-indigo-500/40">
                <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                <div className="font-bold text-white text-sm">Full-Stack Platforms & Startup Projects</div>
                <div className="font-mono text-indigo-400 text-[11px]">Visualize LeetCode • Flight One • Skill Rathi EdTech</div>
                <p className="text-slate-400 mt-1">Shipped interactive web apps using React.js, Node.js, and modern APIs with slick responsive user interfaces.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
