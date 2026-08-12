import { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import AdminLayout from '../components/AdminLayout';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiCode, FiX, FiUpload, FiRefreshCw } from 'react-icons/fi';

const DEFAULT_PROJECTS = [
  {
    title: 'Obstacle Avoiding Robot',
    shortDesc: 'A smart autonomous robot using Arduino Uno, ultrasonic sensor, servo motor, and DC motors for intelligent navigation without human intervention.',
    description: 'A smart autonomous obstacle avoiding robot developed using Arduino Uno, ultrasonic sensor, servo motor, motor shield, and DC motors. The robot can automatically detect obstacles, scan surroundings, and choose the safest direction for movement without human intervention.',
    tags: ['Arduino Uno', 'Ultrasonic Sensor', 'Servo Motor', 'Motor Shield', 'DC Motors'],
    githubUrl: 'https://github.com/ayush1234s/Obstacle-Avoiding-Robot-Using-Arduino-UNO',
    liveUrl: '',
    thumbnailUrl: '',
    emoji: '🤖',
    featured: true,
    order: 1,
  },
  {
    title: 'Home Automation — Voltura4',
    shortDesc: 'ESP32-based Smart Home Automation via SMS and Bluetooth. Control appliances remotely even without internet.',
    description: 'Voltura4 is a powerful ESP32-based Smart Home Automation System that allows users to control home appliances from anywhere using SMS commands or nearby using Bluetooth. Combines GSM remote control, Bluetooth automation, relay switching, buzzer notifications, memory state saving, and network monitoring.',
    tags: ['ESP32', 'GSM', 'Bluetooth', 'Relay Switching', 'Notifications'],
    githubUrl: 'https://github.com/ayush1234s/Home-Automation-',
    liveUrl: '',
    thumbnailUrl: '',
    emoji: '🏠',
    featured: true,
    order: 2,
  },
  {
    title: 'Visualize LeetCode',
    shortDesc: 'DSA learning & revision platform that visually explains algorithms and data structures.',
    description: 'Visualize LeetCode | DSA Learning & Revision Platform — interactive visual explanations of LeetCode problems and algorithms.',
    tags: ['React', 'DSA', 'Algorithms', 'Visualization'],
    githubUrl: 'https://github.com/ayush1234s/visualiseleetcode',
    liveUrl: 'https://visualiseleetcode.vercel.app/',
    thumbnailUrl: '',
    emoji: '💡',
    featured: false,
    order: 3,
  },
  {
    title: 'Flight One',
    shortDesc: 'Smart travel & flight intelligence platform for seamless flight discovery and booking insights.',
    description: 'Flight One | Smart Travel & Flight Intelligence Platform — making air travel smarter and more intuitive.',
    tags: ['React', 'API', 'Travel', 'UI/UX'],
    githubUrl: 'https://github.com/ayush1234s/FlightOne',
    liveUrl: 'https://flightone.vercel.app/',
    thumbnailUrl: '',
    emoji: '✈️',
    featured: false,
    order: 4,
  },
  {
    title: 'MovieShow',
    shortDesc: 'Movie browsing web app built with React.js for exploring popular movies with rich UI.',
    description: 'A movie browsing web app using React.js, where users can explore popular movies with a clean and rich interface.',
    tags: ['React.js', 'API', 'Movies', 'UI'],
    githubUrl: 'https://lnkd.in/gpp2jaip',
    liveUrl: 'https://lnkd.in/gCFjX_dN',
    thumbnailUrl: '',
    emoji: '🎬',
    featured: false,
    order: 5,
  },
  {
    title: 'Laughing Jokes Bot',
    shortDesc: 'A fun Telegram bot built with Node.js that delivers jokes on demand via the Telegram Bot API.',
    description: 'Laughing Jokes Bot is a fun Telegram bot built using Node.js and the Telegram Bot API.',
    tags: ['Node.js', 'Telegram Bot', 'API'],
    githubUrl: 'https://lnkd.in/eTuTrv6F',
    liveUrl: 'https://lnkd.in/eHpbryiQ',
    thumbnailUrl: '',
    emoji: '😂',
    featured: false,
    order: 6,
  },
  {
    title: 'Skill Rathi',
    shortDesc: 'Startup-style e-learning platform developed as a group project — a full EdTech experience.',
    description: 'Startup-style e-learning platform developed as a group project. A full-featured EdTech experience.',
    tags: ['EdTech', 'Group Project', 'Full Stack', 'React'],
    githubUrl: 'https://github.com/ayush1234s/SkillRathi',
    liveUrl: 'https://skillrathi.com/',
    thumbnailUrl: '',
    emoji: '📚',
    featured: false,
    order: 7,
  },
];

const EMPTY_PROJECT = {
  title: '',
  shortDesc: '',
  description: '',
  tags: '',
  githubUrl: '',
  liveUrl: '',
  thumbnailUrl: '',
  emoji: '🚀',
  featured: false,
  order: 99,
};

const Modal = ({ project, onClose, onSave }) => {
  const [form, setForm] = useState(project);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `thumbnails/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((p) => ({ ...p, thumbnailUrl: url }));
    } catch {
      alert('Image upload failed. Check Firebase Storage rules.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    const data = {
      ...form,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : form.tags,
    };
    await onSave(data);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="glass-card w-full max-w-xl p-6 md:p-8 rounded-2xl border-t-2 border-t-purple-500 max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-white">{project._isNew ? 'Add New Project' : `Edit — ${project.title}`}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Title *</label>
              <input type="text" className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Project title" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Emoji</label>
              <input type="text" className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white text-center focus:outline-none focus:border-purple-500" value={form.emoji} onChange={(e) => setForm((p) => ({ ...p, emoji: e.target.value }))} placeholder="🚀" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Short Description</label>
            <input type="text" className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500" value={form.shortDesc} onChange={(e) => setForm((p) => ({ ...p, shortDesc: e.target.value }))} placeholder="Brief summary" />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Full Description</label>
            <textarea rows="3" className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Detailed project bio" />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              value={typeof form.tags === 'string' ? form.tags : form.tags?.join(', ')}
              onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
              placeholder="React, Node.js, ESP32"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">GitHub URL</label>
              <input type="url" className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500" value={form.githubUrl} onChange={(e) => setForm((p) => ({ ...p, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Live URL</label>
              <input type="url" className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500" value={form.liveUrl} onChange={(e) => setForm((p) => ({ ...p, liveUrl: e.target.value }))} placeholder="https://..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Display Order</label>
              <input type="number" className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} min={1} />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Featured?</label>
              <select className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500" value={String(form.featured)} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.value === 'true' }))}>
                <option value="true">⭐ Yes — Featured</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Thumbnail Image</label>
            {form.thumbnailUrl && (
              <img src={form.thumbnailUrl} alt="thumbnail" className="w-full h-28 object-cover rounded-xl mb-2 border border-white/10" />
            )}
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 cursor-pointer">
              <FiUpload />
              <span>{uploading ? 'Uploading...' : 'Upload Thumbnail'}</span>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-white/10 mt-6">
          <button onClick={handleSubmit} disabled={saving || uploading} id="btn-modal-save-project" className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 flex items-center gap-2 cursor-pointer disabled:opacity-50">
            <FiSave size={14} />
            <span>{saving ? 'Saving...' : 'Save Project'}</span>
          </button>
          <button onClick={onClose} id="btn-modal-cancel" className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [alert, setAlert] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'projects'), orderBy('order'));
      const snap = await getDocs(q);
      if (snap.empty) {
        await seedDefaults();
      } else {
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    } catch (e) {
      setAlert({ type: 'error', msg: `Failed to load: ${e.message}` });
    }
    setLoading(false);
  };

  const seedDefaults = async () => {
    setSeeding(true);
    try {
      const existingSnap = await getDocs(collection(db, 'projects'));
      const existingTitles = new Set(
        existingSnap.docs.map((d) => d.data().title?.trim().toLowerCase())
      );

      let added = 0;
      for (const p of DEFAULT_PROJECTS) {
        const key = p.title.trim().toLowerCase();
        if (!existingTitles.has(key)) {
          await addDoc(collection(db, 'projects'), p);
          added++;
        }
      }

      const q = query(collection(db, 'projects'), orderBy('order'));
      const snap = await getDocs(q);
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));

      if (added > 0) {
        setAlert({ type: 'success', msg: `✓ ${added} project(s) added to Firestore!` });
      } else {
        setAlert({ type: 'success', msg: 'All default projects already exist.' });
      }
    } catch (e) {
      setAlert({ type: 'error', msg: `Seed failed: ${e.message}` });
    }
    setSeeding(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    try {
      if (modalProject.id) {
        await updateDoc(doc(db, 'projects', modalProject.id), data);
        setAlert({ type: 'success', msg: '✓ Project updated!' });
      } else {
        await addDoc(collection(db, 'projects'), data);
        setAlert({ type: 'success', msg: '✓ Project added!' });
      }
      setModalProject(null);
      await load();
    } catch {
      setAlert({ type: 'error', msg: 'Failed to save.' });
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      setAlert({ type: 'success', msg: `"${title}" deleted.` });
      await load();
    } catch {
      setAlert({ type: 'error', msg: 'Failed to delete.' });
    }
  };

  return (
    <AdminLayout pageTitle="Projects Manager" pageSubtitle="// Add, edit, or delete projects">
      {alert && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-semibold ${alert.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {alert.msg}
        </div>
      )}

      {modalProject && (
        <Modal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onSave={handleSave}
        />
      )}

      <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FiCode className="text-purple-400" />
            <span>Projects ({projects.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              disabled={loading || seeding}
              id="btn-refresh-projects"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiRefreshCw size={14} />
            </button>
            <button
              onClick={seedDefaults}
              disabled={seeding || loading}
              id="btn-seed-projects"
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🌱</span>
              <span>{seeding ? 'Seeding...' : 'Seed Defaults'}</span>
            </button>
            <button
              onClick={() => setModalProject({ ...EMPTY_PROJECT, _isNew: true })}
              id="btn-add-project"
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus size={16} />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{p.emoji || '🚀'}</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate flex items-center gap-2">
                    <span>{p.title}</span>
                    {p.featured && <span className="text-[10px] font-mono text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded">Featured</span>}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{p.shortDesc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setModalProject(p)}
                  id={`btn-edit-${p.id}`}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FiEdit2 size={12} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  id={`btn-delete-${p.id}`}
                  className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectsManager;
