import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User } from 'lucide-react';

// GANTI DENGAN MILIKMU
const supabase = createClient('https://wfqorweuuihqagnjhnlf.supabase.co', 'sb_publishable_kTRGKTrHgKuiac8RN1RkeA_kMdxWfxJ');

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  // Ambil data saat halaman dibuka
  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    setComments(data);
  }

  async function sendComment(e) {
    e.preventDefault();
    if (!name || !text) return;

    const { error } = await supabase
      .from('comments')
      .insert([{ name: name, content: text }]);

    if (!error) {
      setName('');
      setText('');
      getComments(); // Refresh daftar komentar
    }
  }

  return (
    <div className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <MessageSquare className="text-blue-400" /> Guestbook & Fun Facts
      </h3>

      {/* Form Input */}
      <form onSubmit={sendComment} className="space-y-4 mb-10">
        <div className="flex gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white outline-none focus:border-blue-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <textarea 
          placeholder="Tulis pesan atau fun fact tentang saya..."
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white h-32 outline-none focus:border-blue-400 transition"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
          Kirim Pesan <Send size={18} />
        </button>
      </form>

      {/* List Komentar */}
      <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
        {comments.map((item) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={item.id} 
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-300 font-semibold">
              <User size={16} /> {item.name}
            </div>
            <p className="text-gray-300 leading-relaxed">{item.content}</p>
            <span className="text-[10px] text-gray-500 block mt-3">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}