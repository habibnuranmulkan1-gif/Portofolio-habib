import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User, Calculator, Github, Mail } from 'lucide-react';
import profileImg from './assets/img.jpg'; 

// KONFIGURASI SUPABASE
const supabase = createClient('https://wfqorweuuihqagnjhnlf.supabase.co', 'sb_publishable_kTRGKTrHgKuiac8RN1RkeA_kMdxWfxJ');

const App = () => {
  const [emojis, setEmojis] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({ name: '', content: '' });

  // Handle Emoji interaction
  const handleInteraction = (e) => {
    const newEmoji = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      char: ['⚽', '🔥', '🏆', '🔴', '⭐'][Math.floor(Math.random() * 5)]
    };
    setEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setEmojis((prev) => prev.filter((em) => em.id !== newEmoji.id));
    }, 1000);
  };

  // FETCH COMMENTS
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    setComments(data || []);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.name || !commentData.content) return;
    
    const { error } = await supabase.from('comments').insert([commentData]);
    if (!error) {
      setCommentData({ name: '', content: '' });
      fetchComments();
    }
  };

  const data = {
    nama: "Habib Nuran Mulkan",
    role: "THE KING OF MANCHESTER | WEB DEVELOPER",
    tentang: "Membangun sistem dengan presisi taktik Sir Alex Ferguson dan agresivitas serangan balik era Treble Winner. Nama saya Habib Nuran Mulkan, hobi saya nonton film dan tidur, saya tinggal di rukoh, cita-cita saya ingin menjadi orang kaya",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Git", "Supabase", "Framer Motion"],
    projects: [
      { 
        nama: "SCIENTIFIC CALCULATOR", 
        desc: "Kalkulator kompleks dengan desain glassmorphism yang interaktif.",
        link: "https://scientific-calculator-mybr.vercel.app/",
        isSpecial: true
      },
      { 
        nama: "THEATER OF DREAMS", 
        desc: "Sistem manajemen web berperforma tinggi dengan antarmuka modern.",
        link: "https://github.com/habibnuranmulkan1-gif/Portofolio-habib" 
      },
    ],
    kontak: {
      github: "https://github.com/habibnuranmulkan1-gif/Portofolio-habib", 
      email: "habibnuran@example.com" 
    }
  };

  return (
    <div 
      onClick={handleInteraction}
      className="bg-white text-slate-900 min-h-screen font-sans selection:bg-red-600 selection:text-white overflow-x-hidden scroll-smooth"
    >
      {/* Emoji Particles */}
      {emojis.map((em) => (
        <span
          key={em.id}
          className="fixed pointer-events-none text-2xl z-[9999]"
          style={{ 
            left: em.x - 10, 
            top: em.y - 10, 
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        >
          {em.char}
        </span>
      ))}

      {/* Navigation */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-white/70 backdrop-blur-xl border border-gray-200 p-4 rounded-3xl flex justify-between items-center z-50 shadow-xl">
        <h1 className="text-xl font-black italic tracking-tighter text-red-600">MU.DEV</h1>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">
          <a href="#home" className="hover:text-red-600 transition">Home</a>
          <a href="#projects" className="hover:text-red-600 transition">Project</a>
          <a href="#guestbook" className="hover:text-red-600 transition">Guestbook</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-48 pb-20 px-6 text-center min-h-screen flex flex-col items-center">
        <div className="relative inline-block mb-12 group">
          <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/40 transition duration-700"></div>
          <img 
            src={profileImg} 
            alt={data.nama} 
            className="relative w-48 h-48 rounded-full object-cover border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-3 rounded-full shadow-lg font-black italic text-xs">KING</div>
        </div>
        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 bg-gradient-to-b from-gray-950 to-gray-600 bg-clip-text text-transparent">
          {data.nama}
        </h2>
        <p className="text-red-600 font-black tracking-[0.4em] uppercase text-[11px] mb-10">{data.role}</p>
        <div className="max-w-2xl mx-auto text-gray-700 italic text-lg bg-red-50/50 p-8 rounded-[2rem] border border-red-100 shadow-inner">
          "{data.tentang}"
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 mb-20">
            <div className="h-1 w-20 bg-red-600"></div>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter">The Trophy Room</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {data.projects.map((p, i) => (
              <div key={i} className={`group relative p-12 rounded-3xl transition-all duration-500 shadow-xl border ${p.isSpecial ? 'bg-gray-900 text-white border-red-600' : 'bg-white border-gray-100 text-slate-900'}`}>
                <h4 className="text-3xl font-black mb-6 uppercase italic tracking-tighter">{p.nama}</h4>
                <p className={`mb-10 font-medium ${p.isSpecial ? 'text-gray-400' : 'text-gray-500'}`}>{p.desc}</p>
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${p.isSpecial ? 'bg-red-600 text-white hover:bg-white hover:text-red-600' : 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white'}`}
                >
                  {p.isSpecial && <Calculator size={14}/>} {p.isSpecial ? 'Open Calculator' : 'View Project'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT / GUESTBOOK SECTION */}
      <section id="guestbook" className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black uppercase italic tracking-tighter">Fans Message & Funfacts</h3>
            <p className="text-gray-500 uppercase tracking-widest text-[10px] mt-2">Leave a trace like a Red Devil</p>
          </div>

          <form onSubmit={handleCommentSubmit} className="mb-16 space-y-4 bg-slate-50 p-8 rounded-[2.5rem] border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-200">
              <User className="text-red-600" size={20}/>
              <input 
                className="w-full bg-transparent outline-none font-bold text-sm"
                placeholder="Your Name"
                value={commentData.name}
                onChange={(e) => setCommentData({...commentData, name: e.target.value})}
              />
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-200">
              <textarea 
                className="w-full bg-transparent outline-none text-sm h-32 resize-none"
                placeholder="Share a funfact or ask something..."
                value={commentData.content}
                onChange={(e) => setCommentData({...commentData, content: e.target.value})}
              />
            </div>
            <button className="w-full py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3">
              Send Message <Send size={18}/>
            </button>
          </form>

          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {comments.map((c) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                key={c.id} 
                className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-l-8 border-l-red-600"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-black italic text-red-600 uppercase text-sm tracking-tight">{c.name}</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{c.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 bg-gray-950 text-white px-6 text-center">
        <div className="flex justify-center gap-10 mb-10">
          <a href={data.kontak.github} target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors">
            <Github size={32}/>
          </a>
          <a href={`mailto:${data.kontak.email}`} className="hover:text-red-600 transition-colors">
            <Mail size={32}/>
          </a>
        </div>
        <p className="text-[10px] font-black tracking-[1em] text-gray-500 uppercase italic">
          Glory Glory Manchester United &copy; 2026 | {data.nama}
        </p>
      </footer>
    </div>
  );
};

export default App;