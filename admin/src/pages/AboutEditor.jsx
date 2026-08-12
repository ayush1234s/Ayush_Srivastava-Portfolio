import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import AdminLayout from '../components/AdminLayout';
import { FiSave, FiUser } from 'react-icons/fi';

const DEFAULT = {
  bio: `I'm a B.Tech student in Electronics and Communication Engineering and a passionate developer who enjoys building clean UI, fun web apps, and visually attractive projects that stand out from normal templates. I'm particularly interested in IoT and Embedded Systems, combining my engineering background with modern development practices.`,
  tagline: 'IoT + Embedded / Full Stack Developer',
};

const AboutEditor = () => {
  const [form, setForm] = useState(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'about', 'main'));
        if (snap.exists()) setForm({ ...DEFAULT, ...snap.data() });
      } catch {}
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setAlert(null);
    try {
      await setDoc(doc(db, 'about', 'main'), form);
      setAlert({ type: 'success', msg: '✓ About section updated! Changes live on client portfolio.' });
    } catch (e) {
      setAlert({ type: 'error', msg: 'Failed to save to Firestore.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout pageTitle="About & Bio Editor" pageSubtitle="// Edit biography and tagline">
      {alert && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-semibold ${alert.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {alert.msg}
        </div>
      )}

      <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FiUser className="text-purple-400" />
          <span>Bio Information</span>
        </h2>

        <div>
          <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5" htmlFor="about-tagline">
            Tagline / Subtitle
          </label>
          <input
            id="about-tagline"
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            value={form.tagline}
            onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
            placeholder="IoT + Embedded / Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-1.5" htmlFor="about-bio">
            Biography Paragraph
          </label>
          <textarea
            id="about-bio"
            rows="6"
            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-y min-h-[140px]"
            value={form.bio}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            placeholder="Your bio..."
          />
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            {form.bio.length} characters
          </div>
        </div>

        {/* Live Preview */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
          <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">// Client Preview</div>
          <div className="text-xs font-bold text-purple-300">{form.tagline}</div>
          <p className="text-xs text-slate-300 leading-relaxed">{form.bio}</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          id="btn-save-about"
          className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <FiSave size={16} />
          <span>{saving ? 'Saving to Firestore...' : 'Save Changes'}</span>
        </button>
      </div>
    </AdminLayout>
  );
};

export default AboutEditor;
