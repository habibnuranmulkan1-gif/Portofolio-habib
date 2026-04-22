import React, { useState } from 'react';
import profileImg from './assets/img.jpg'; 

const App = () => {
  const [emojis, setEmojis] = useState([]);

  // FUNGSI INTERAKTIF: Mengeluarkan Emoji saat Klik
  const handleInteraction = (e) => {
    const newEmoji = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      char: ['⚽', '🔥', '🏆', '🔴', '⭐'][Math.floor(Math.random() * 5)]
    };
    setEmojis((prev) => [...prev, newEmoji]);
    
    // Hapus emoji setelah 1 detik agar tidak memenuhi memori
    setTimeout(() => {
      setEmojis((prev) => prev.filter((em) => em.id !== newEmoji.id));
    }, 1000);
  };

  const data = {
    nama: "Habib Nuran Mulkan",
    role: "THE KING OF MANCHESTER | WEB DEVELOPER",
    tentang: "Membangun sistem dengan presisi taktik Sir Alex Ferguson dan agresivitas serangan balik era Treble Winner. Fokus pada performa tinggi dan mentalitas juara di setiap baris kode.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Git", "UI Design"],
    projects: [
      { 
        nama: "THEATER OF DREAMS", 
        desc: "Sistem manajemen web berperforma tinggi dengan antarmuka modern.",
        link: "https://github.com/habibnuranmulkan1-gif/Portofolio-habib" 
      { 
        nama: "RED DEVIL ANALYTICS", 
        desc: "Dashboard visualisasi data real-time untuk analisis taktis.",
        link: "https://github.com/habibnuran" 
      }
    ],
    kontak: {
      github: "https://github.com/habibnuranmulkan1-gif", 
      email: "habibnuran@example.com" 
    }
  };

  return (
    <div 
      onClick={handleInteraction}
      className="bg-white text-slate-900 min-h-screen font-sans selection:bg-red-600 selection:text-white overflow-x-hidden scroll-smooth"
    >
      {/* ANIMASI EMOJI BURST */}
      {emojis.map((em) => (
        <span
          key={em.id}
          className="fixed pointer-events-none animate-bounce text-2xl z-[9999]"
          style={{ 
            left: em.x - 10, 
            top: em.y - 10, 
            transition: 'all 1s ease-out',
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        >
          {em.char}
        </span>
      ))}

      {/* NAVBAR GLASSMORPHISM */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-white/70 backdrop-blur-xl border border-gray-200 p-4 rounded-3xl flex justify-between items-center z-50 shadow-xl">
        <h1 className="text-xl font-black italic tracking-tighter text-red-600">MU.DEV</h1>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">
          <a href="#home" className="hover:text-red-600 transition underline-offset-8 hover:underline">Home</a>
          <a href="#skills" className="hover:text-red-600 transition underline-offset-8 hover:underline">Tactics</a>
          <a href="#projects" className="hover:text-red-600 transition underline-offset-8 hover:underline">Squad</a>
          <a href="#contact" className="hover:text-red-600 transition underline-offset-8 hover:underline">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-48 pb-20 px-6 text-center min-h-screen flex flex-col items-center">
        <div className="relative inline-block mb-12 group cursor-pointer">
          <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/40 transition duration-700"></div>
          <img 
            src={profileImg} 
            alt={data.nama} 
            className="relative w-48 h-48 rounded-full object-cover border-8 border-white shadow-2xl transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"
          />
          <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-3 rounded-full shadow-lg font-black italic text-xs uppercase">King</div>
        </div>

        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 bg-gradient-to-b from-gray-950 to-gray-600 bg-clip-text text-transparent leading-none">
          {data.nama}
        </h2>
        <p className="text-red-600 font-black tracking-[0.4em] uppercase text-[11px] mb-10">{data.role}</p>
        
        <div className="max-w-2xl mx-auto text-gray-700 leading-relaxed italic text-lg bg-red-50/50 p-8 rounded-[2rem] border border-red-100 backdrop-blur-sm shadow-inner transition-all hover:shadow-lg">
          "{data.tentang}"
        </div>
        
        <a href="#projects" className="mt-12 px-10 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-black hover:-translate-y-2 transition-all duration-300 shadow-xl shadow-red-200">
          Explore Matches →
        </a>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px] mb-12 font-black">The Tactical Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.skills.map((skill, i) => (
              <div key={i} className="px-10 py-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-red-600 hover:text-red-600 hover:-rotate-2 transition-all duration-300 cursor-default font-black uppercase text-sm tracking-tighter shadow-sm hover:shadow-md">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 mb-20">
            <div className="h-1 w-20 bg-red-600"></div>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter">The Trophy Room</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {data.projects.map((p, i) => (
              <div key={i} className="group relative p-12 bg-white border-b-8 border-gray-100 rounded-3xl hover:border-red-600 hover:-translate-y-4 transition-all duration-500 shadow-xl overflow-hidden border border-gray-50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 group-hover:bg-red-600 transition-colors duration-500"></div>
                <h4 className="relative z-10 text-3xl font-black mb-6 group-hover:text-red-600 transition-colors uppercase italic tracking-tighter leading-none">{p.nama}</h4>
                <p className="relative z-10 text-gray-500 mb-10 leading-relaxed font-medium">{p.desc}</p>
                <a href={p.link} target="_blank" rel="noreferrer" className="relative z-10 inline-block px-8 py-3 border-2 border-red-600 text-red-600 font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-red-600 hover:text-white transition-all">
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contact" className="py-32 bg-gray-950 text-white px-6 text-center relative">
        {/* Garis pemisah merah di atas footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-red-600"></div>
        
        <h3 className="text-6xl font-black uppercase italic mb-12 tracking-tighter leading-none">
          Sign for the <span className="text-red-600">Squad</span>
        </h3>
        
        <div className="flex flex-wrap justify-center gap-10">
          {/* TOMBOL GITHUB */}
          <a 
            href={data.kontak.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center cursor-pointer"
          >
            <span className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-red-600 transition-all duration-300 text-2xl mb-4 italic font-black shadow-lg">
              GH
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">GitHub</span>
          </a>

          {/* TOMBOL EMAIL (POP-UP) */}
          <div 
            onClick={() => alert(`Silahkan hubungi Habib di: ${data.kontak.email}`)} 
            className="group flex flex-col items-center cursor-pointer"
          >
            <span className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-red-600 transition-all duration-300 text-2xl mb-4 italic font-black shadow-lg">
              EM
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Email</span>
          </div>
        </div>

        <div className="mt-32 pt-10 border-t border-white/5">
          <p className="text-[10px] font-black tracking-[1em] text-gray-500 uppercase italic">
            Glory Glory Manchester United &copy; 2026 | {data.nama}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;