import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import AdminLayout from '../components/AdminLayout';
import { FiSave, FiUser, FiUpload, FiX } from 'react-icons/fi';

const DEFAULT = {
  bio: `I'm a B.Tech student in Electronics and Communication Engineering and a passionate developer who enjoys building clean UI, fun web apps, and visually attractive projects that stand out from normal templates. I'm particularly interested in IoT and Embedded Systems, combining my engineering background with modern development practices.`,
  tagline: 'IoT + Embedded / Full Stack Developer',
};

export default function AboutEditor() {
  const [form, setForm] = useState(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageSaving, setImageSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'about', 'main'));
        if (snap.exists()) setForm({ ...DEFAULT, ...snap.data() });
      } catch {}
    };
    load();
  }, []);

  useEffect(() => () => { if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

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

  const selectImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAlert({ type: 'error', msg: 'Please select an image file.' });
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const saveImage = async () => {
    if (!imageFile) return;
    setImageSaving(true);
    setAlert(null);
    try {
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const imageRef = ref(storage, `about/profile-${Date.now()}-${safeName}`);
      await uploadBytes(imageRef, imageFile, { contentType: imageFile.type });
      const imageUrl = await getDownloadURL(imageRef);
      const updated = { ...form, imageUrl };
      await setDoc(doc(db, 'about', 'main'), updated);
      setForm(updated);
      setImageFile(null);
      setImagePreview('');
      setImageModal(false);
      setAlert({ type: 'success', msg: 'Profile image updated! It is now live on the client portfolio.' });
    } catch {
      setAlert({ type: 'error', msg: 'Image update failed. Check Firebase Storage rules and try again.' });
    } finally {
      setImageSaving(false);
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
          <div className="block text-xs font-mono font-semibold text-slate-400 uppercase mb-2">About Profile Image</div>
          <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); setImageModal(true); }} className="group relative block w-36 h-36 rounded-2xl overflow-hidden border border-white/15 focus:outline-none focus:ring-2 focus:ring-purple-500" aria-label="Update profile image">
            <img src={form.imageUrl || '/ayush.jpg'} alt="Current About profile" className="w-full h-full object-cover" />
            <span className="absolute inset-0 bg-slate-950/65 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition flex flex-col items-center justify-center gap-2 text-white text-xs font-semibold"><FiUpload size={20} />Update image</span>
          </button>
          <p className="text-[11px] text-slate-500 mt-2">Click the image to choose a replacement.</p>
        </div>

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
      {imageModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setImageModal(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="about-image-title" className="glass-card w-full max-w-md p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-5"><h2 id="about-image-title" className="text-base font-bold text-white">Update About image</h2><button onClick={() => setImageModal(false)} aria-label="Close" className="text-slate-400 hover:text-white"><FiX size={20} /></button></div>
            <label className="block cursor-pointer rounded-xl border border-dashed border-white/20 p-4 text-center text-xs text-slate-300 hover:bg-white/5"><FiUpload className="inline mr-2" />Choose image<input type="file" accept="image/*" className="sr-only" onChange={(e) => selectImage(e.target.files?.[0])} /></label>
            <div className="mt-4 aspect-square max-h-72 flex justify-center"><img src={imagePreview || form.imageUrl || '/ayush.jpg'} alt="Selected image preview" className="max-h-72 max-w-full rounded-xl object-contain" /></div>
            <div className="flex gap-3 mt-6"><button onClick={saveImage} disabled={!imageFile || imageSaving} className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 flex items-center gap-2 disabled:opacity-50"><FiSave size={14} />{imageSaving ? 'Saving image...' : 'Save and update'}</button><button onClick={() => setImageModal(false)} className="px-4 py-2.5 rounded-xl text-xs text-slate-300 bg-white/5 border border-white/10">Cancel</button></div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
