import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff, FiShield, FiKey } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-900/30 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Cyber Vault Security Card Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-8 rounded-3xl border-t-2 border-t-purple-500 shadow-2xl relative overflow-hidden group">
          {/* Laser Scan Line Motion */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scanline opacity-75 pointer-events-none" />

          {/* Rotating Cyber Security Vault Ring */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            {/* Spinning Neon Ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 animate-spin blur-sm" style={{ animationDuration: '6s' }} />
            <div className="absolute -inset-1 rounded-full border border-purple-400/40 animate-spin" style={{ animationDuration: '12s' }} />

            {/* Shield Icon Badge */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(168,85,247,0.6)]">
              <FiShield size={32} className="animate-pulse" />
            </div>
          </div>

          {/* Title Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-wide">Admin Cyber Vault</h1>
            <p className="text-xs font-mono text-purple-400 mt-1 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTHENTICATION REQUIRED // #AYUSH-2003</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5 flex items-center justify-between" htmlFor="login-email">
                <span>Admin Identifier</span>
                <span className="text-[10px] text-purple-400">EMAIL</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  id="login-email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
                  placeholder="Ayush@2003.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5 flex items-center justify-between" htmlFor="login-password">
                <span>Passcode</span>
                <span className="text-[10px] text-pink-400">ENCRYPTED</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="font-mono text-xs">Authenticating Vault Access...</span>
              ) : (
                <>
                  <FiKey size={16} />
                  <span>Unlock Admin Vault</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center font-mono text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Restricted Gateway • Authorized Admin Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
