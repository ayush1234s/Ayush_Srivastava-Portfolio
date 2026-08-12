import { useState, useEffect } from 'react';
import {
  collection, getDocs, query, orderBy, updateDoc, deleteDoc, doc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import AdminLayout from '../components/AdminLayout';
import { FiMail, FiRefreshCw, FiCheck, FiTrash2 } from 'react-icons/fi';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | unread | read
  const [alert, setAlert] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { read: true });
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete message from "${name}"?`)) return;
    try {
      await deleteDoc(doc(db, 'contacts', id));
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setAlert({ type: 'success', msg: `Message from ${name} deleted.` });
    } catch (e) {
      setAlert({ type: 'error', msg: 'Failed to delete message.' });
    }
  };

  const filtered = filter === 'all'
    ? messages
    : filter === 'unread'
      ? messages.filter((m) => !m.read)
      : messages.filter((m) => m.read);

  const unreadCount = messages.filter((m) => !m.read).length;

  const formatDate = (ts) => {
    if (!ts) return '';
    try {
      return new Date(ts.seconds * 1000).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return ''; }
  };

  return (
    <AdminLayout pageTitle="Contact Messages" pageSubtitle={`// ${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`}>
      {alert && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-semibold ${alert.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {alert.msg}
        </div>
      )}

      <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FiMail className="text-purple-400" />
            <span>Messages ({messages.length})</span>
          </h2>

          <div className="flex items-center gap-2">
            {['all', 'unread', 'read'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                id={`filter-msg-${f}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase font-mono transition-all ${
                  filter === f
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
            <button
              onClick={load}
              id="btn-refresh-messages"
              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <FiRefreshCw size={14} />
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            Loading messages...
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            {filter === 'unread' ? 'No unread messages 🎉' : 'No messages received yet.'}
          </div>
        )}

        <div className="space-y-4">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-xl bg-white/5 border transition-all ${
                !msg.read ? 'border-l-4 border-l-purple-500 border-white/10' : 'border-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{msg.name}</span>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />}
                  </h4>
                  <p className="text-[11px] font-mono text-purple-400">{msg.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-500">{formatDate(msg.timestamp)}</span>
                  {!msg.read && (
                    <button
                      onClick={() => markRead(msg.id)}
                      id={`btn-read-${msg.id}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold flex items-center gap-1 hover:bg-emerald-500/30 transition-colors"
                    >
                      <FiCheck size={12} /> Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id, msg.name)}
                    id={`btn-delete-msg-${msg.id}`}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                    title="Delete message"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-semibold text-slate-200 mb-1">
                  Subject: {msg.subject}
                </div>
              )}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{msg.message}</p>

              <a
                href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your portfolio message'}`}
                id={`btn-reply-${msg.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-purple-300 hover:bg-purple-500/10 transition-colors"
              >
                <FiMail size={12} />
                <span>Reply via Email</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactMessages;
