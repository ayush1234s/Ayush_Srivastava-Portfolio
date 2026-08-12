import { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import AdminLayout from '../components/AdminLayout';
import { FiPlus, FiTrash2, FiSave, FiBarChart2 } from 'react-icons/fi';

const DEFAULT_SKILLS = [
  { name: 'Embedded Systems', percentage: 75, order: 1 },
  { name: 'React', percentage: 100, order: 2 },
  { name: 'Git / GitHub', percentage: 100, order: 3 },
  { name: 'HTML / CSS / JavaScript', percentage: 90, order: 4 },
];

const SkillsEditor = () => {
  const [skills, setSkills] = useState([]);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  const load = async () => {
    try {
      const q = query(collection(db, 'skills'), orderBy('order'));
      const snap = await getDocs(q);
      if (snap.empty) {
        setSkills(DEFAULT_SKILLS.map((s, i) => ({ ...s, id: `local-${i}`, _local: true })));
      } else {
        setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    } catch {
      setSkills(DEFAULT_SKILLS.map((s, i) => ({ ...s, id: `local-${i}`, _local: true })));
    }
  };

  useEffect(() => { load(); }, []);

  const addSkill = () => {
    setSkills((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, name: '', percentage: 50, order: prev.length + 1, _new: true },
    ]);
  };

  const updateSkill = (id, field, val) => {
    setSkills((prev) => prev.map((s) => s.id === id ? { ...s, [field]: val } : s));
  };

  const removeSkill = async (id) => {
    if (id.startsWith('new-') || id.startsWith('local-')) {
      setSkills((prev) => prev.filter((s) => s.id !== id));
      return;
    }
    try {
      await deleteDoc(doc(db, 'skills', id));
      setSkills((prev) => prev.filter((s) => s.id !== id));
      setAlert({ type: 'success', msg: 'Skill deleted.' });
    } catch {
      setAlert({ type: 'error', msg: 'Failed to delete skill.' });
    }
  };

  const saveAll = async () => {
    setSaving(true);
    setAlert(null);
    try {
      for (const skill of skills) {
        if (skill.id.startsWith('new-') || skill.id.startsWith('local-')) {
          const { id, _new, _local, ...data } = skill;
          await addDoc(collection(db, 'skills'), data);
        } else {
          const { id, _new, _local, ...data } = skill;
          await updateDoc(doc(db, 'skills', id), data);
        }
      }
      setAlert({ type: 'success', msg: '✓ Skills updated! Real-time sync to portfolio active.' });
      await load();
    } catch {
      setAlert({ type: 'error', msg: 'Failed to save skills.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout pageTitle="Skills Editor" pageSubtitle="// Manage skill percentages">
      {alert && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-semibold ${alert.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {alert.msg}
        </div>
      )}

      <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FiBarChart2 className="text-purple-400" />
            <span>Skill Snapshot ({skills.length})</span>
          </h2>
          <button
            onClick={addSkill}
            id="btn-add-skill"
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FiPlus size={14} />
            <span>Add Skill</span>
          </button>
        </div>

        <div className="space-y-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                placeholder="Skill Name (e.g. React)"
                id={`skill-name-${skill.id}`}
                className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />

              <div className="w-12 font-mono text-xs font-bold text-purple-400 text-center">
                {skill.percentage}%
              </div>

              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={skill.percentage}
                onChange={(e) => updateSkill(skill.id, 'percentage', Number(e.target.value))}
                id={`skill-range-${skill.id}`}
                className="w-32 accent-purple-500 cursor-pointer"
              />

              <button
                onClick={() => removeSkill(skill.id)}
                id={`btn-del-skill-${skill.id}`}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={saveAll}
            disabled={saving}
            id="btn-save-skills"
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FiSave size={16} />
            <span>{saving ? 'Saving...' : 'Save All Skills'}</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SkillsEditor;
