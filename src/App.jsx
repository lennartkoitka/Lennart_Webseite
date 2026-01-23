import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowDown, Plus, Minus, Volume2, VolumeX } from 'lucide-react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';

// --- 1. DEINE SOCIAL MEDIA LINKS (HIER EINTRAGEN) ---
const SOCIAL_LINKS = {
  email: "mailto:kontakt@lennartkoitka.de", // Deine E-Mail Adresse
  instagram: "https://instagram.com/lennart.koitka", // Dein Instagram Link
  linkedin: "https://linkedin.com/in/lennart-koitka-a28468191", // Dein LinkedIn Link
  // Falls du kein LinkedIn hast, lass den Link einfach leer "" oder lösche die Zeile unten im Footer
};

// --- 2. VIDEO KONFIGURATION ---
const VIDEO_CONFIG = {
  default: "https://lennart-portfolio.b-cdn.net/Lennart%20Showreel.mp4",
  netflix: "https://assets.mixkit.co/videos/preview/mixkit-red-fog-in-a-dark-forest-4243-large.mp4",
  rtl2: "https://assets.mixkit.co/videos/preview/mixkit-urban-traffic-at-night-time-lapse-4309-large.mp4",
};

// --- 3. PROJEKTE ---
const PROJECTS_DATA = [
  { 
    title: "Martin Brambach - Kurzfilm", 
    category: "Commercial", 
    role: "Kamera & Schnitt", 
    year: "2025",
    videoUrl: "https://lennart-portfolio.b-cdn.net/Volkssolidarit%C3%A4t_Dresden_Final.mp4"
  },
  { 
    title: "Diese Büchners", 
    category: "RTL 2", 
    role: "Kamera & Schnitt", 
    year: "2024–2025",
    videoUrl: "https://lennart-portfolio.b-cdn.net/Diese%20B%C3%BCchners%20-%20Familientrubel%20unter%20Palmen%20Trailer%20(1080p_25fps_H264-128kbit_AAC).mp4"
  },
  { 
    title: "Alles im Loth! - Die Kader und Isi Story", 
    category: "RTL 2", 
    role: "Kamera & Schnitt", 
    year: "2025",
    videoUrl: "https://lennart-portfolio.b-cdn.net/Alles%20im%20Loth!%20Die%20Kader%20und%20Isi%20Story%20Trailer%20(1080p_25fps_H264-128kbit_AAC).mp4"
  },
  { 
    title: "My Big Fat Italian Wedding - Nathalie und Cosimo heiraten", 
    category: "RTL 2", 
    role: "Kamera & Schnitt", 
    year: "2025",
    videoUrl: "https://lennart-portfolio.b-cdn.net/My%20Big%20Fat%20Italian%20Wedding%20-%20Nathalie%20%26%20Cosimo%20heiraten!%20Trailer%20(1080p_25fps_H264-128kbit_AAC).mp4"
  },
  // REIHENFOLGE GETAUSCHT: Erst Filip & Serkan, dann Katzenberger
  { 
    title: "Filip & Serkan at Work", 
    category: "Discovery Plus", 
    role: "Kamera & Schnitt", 
    year: "2023",
    videoUrl: "https://lennart-portfolio.b-cdn.net/Filip%20und%20Serkan%20%40Work%20-%20Praktikum%20statt%20Party%20Trailer(1080p_25fps_H264-128kbit_AAC).mp4"
  },
  { 
    title: "Katzenberger At Work", 
    category: "Discovery Plus", 
    role: "Kamera & Schnitt", 
    year: "2022",
    videoUrl: "https://lennart-portfolio.b-cdn.net/Kkatzenberger%20%40%20Work%20Trailer.mp4"
  },
  { 
    title: "Wo die Liebe hinfällt", 
    category: "VOX", 
    role: "Kamera & Schnitt", 
    year: "2021–Heute",
    videoUrl: "https://lennart-portfolio.b-cdn.net/WDLH%20Showreel%20Lennart.mp4"
  },
  { 
    title: "Goodbye Deutschland", 
    category: "VOX", 
    role: "Kamera & Schnitt", 
    year: "2021–Heute",
    videoUrl: "https://lennart-portfolio.b-cdn.net/GBD%20Showreel%20Lennart.mp4"
  },
  { 
    title: "Achtung Kontrolle", 
    category: "Kabel 1", 
    role: "Kamera & Schnitt", 
    year: "2021–Heute",
    videoUrl: "https://lennart-portfolio.b-cdn.net/AK%20Showreel%20Lennart.mp4"
  }
];

// --- HILFS-KOMPONENTEN ---

const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);
  return (
    <div ref={domRef} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {children}
    </div>
  );
};

// --- SINGLE PROJECT ITEM ---
const ProjectItem = ({ title, category, role, year, videoUrl, imageUrl, imagePosition, isOpen, onClick, forceMute }) => {
  const itemRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (forceMute) {
      setIsMuted(true);
    }
  }, [forceMute]);

  useEffect(() => {
    let animationFrameId;
    let timeoutId;

    if (isOpen && itemRef.current) {
      timeoutId = setTimeout(() => {
        const targetElement = itemRef.current;
        const duration = 1500; 
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const ease = (t, b, c, d) => {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
          };
          const nextScrollTop = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, nextScrollTop);
          if (timeElapsed < duration) {
            animationFrameId = requestAnimationFrame(animation);
          }
        };
        animationFrameId = requestAnimationFrame(animation);
      }, 50);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  const toggleMute = (e) => {
    e.stopPropagation(); 
    setIsMuted(!isMuted);
  };

  return (
    <div ref={itemRef} className="border-t border-white/20">
      <div 
        onClick={onClick}
        // HIER: Hover Effekt hinzugefügt (scale-102)
        className="group relative py-8 md:py-12 cursor-pointer overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-end px-4 md:px-12 transition-all duration-500 ease-out hover:scale-[1.02] origin-center"
      >
        {/* Hover-Bild entfernt für Clean Look */}
        <div className="mb-4 md:mb-0 pointer-events-none relative z-10">
          <div className="flex items-center gap-4 text-xs md:text-sm font-mono text-neutral-500 mb-2 uppercase tracking-widest group-hover:text-neutral-300 transition-colors">
            <span>{year}</span>
            <span>/</span>
            <span>{category}</span>
          </div>
          <h3 className={`text-4xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-500 ${isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
            {title}
          </h3>
        </div>
        <div className="text-right pointer-events-none flex flex-col items-end relative z-10">
          <span className="block text-sm font-mono text-neutral-400 uppercase tracking-widest mb-4 group-hover:text-neutral-300 transition-colors">{role}</span>
          <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-white text-black rotate-180' : 'text-white group-hover:bg-white/10'}`}>
             {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[150vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 md:px-12 pb-12">
            <div className="mx-auto w-full md:w-auto max-w-full aspect-video md:h-[calc(100vh-14rem)] bg-neutral-900 rounded-lg overflow-hidden relative shadow-2xl group/video">
                {isOpen && (
                    <video 
                        className="w-full h-full object-cover"
                        src={videoUrl}
                        autoPlay 
                        muted={isMuted}
                        loop 
                        playsInline
                    />
                )}
                {isOpen && (
                  <button onClick={toggleMute} className="absolute bottom-6 right-6 z-20 bg-black/40 hover:bg-white text-white hover:text-black p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10">
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                )}
                <div className="absolute inset-0 bg-neutral-800 -z-10 animate-pulse" />
            </div>
        </div>
      </div>
    </div>
  );
};

// --- IMPRESSUM SEITE (NEU) ---
function Impressum() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black p-8 md:p-24">
      <Link to="/" className="inline-flex items-center text-neutral-500 hover:text-white transition-colors mb-12 font-mono text-sm uppercase tracking-widest">
        ← Zurück zur Startseite
      </Link>
      
      <div className="max-w-2xl space-y-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Impressum</h1>
        
        <div className="space-y-4 text-neutral-400">
          <h2 className="text-white text-xl font-bold">Angaben gemäß § 5 TMG</h2>
          <p>
            {/* ACHTUNG: Hier musst du deine ECHTEN Daten eintragen! */}
            Lennart Koitka<br />
            Merheimer Straße 49a<br />
            50733 Köln
          </p>
        </div>

        <div className="space-y-4 text-neutral-400">
          <h2 className="text-white text-xl font-bold">Kontakt</h2>
          <p>
            Telefon: +49 (0) 15256360156<br />
            E-Mail: <a href={SOCIAL_LINKS.email} className="hover:text-white underline decoration-white/20">kontakt@lennart-koitka.de</a>
          </p>
        </div>

        <div className="space-y-4 text-neutral-400">
          <h2 className="text-white text-xl font-bold">Redaktionell verantwortlich</h2>
          <p>
            Lennart Koitka<br />
            (Adresse wie oben)
          </p>
        </div>
        
        <div className="text-xs text-neutral-600 border-t border-white/10 pt-8 mt-12">
          <p>© {new Date().getFullYear()} Lennart Koitka. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </div>
  );
}

// --- DATENSCHUTZ SEITE ---
function Datenschutz() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black p-8 md:p-24">
      <Link to="/" className="inline-flex items-center text-neutral-500 hover:text-white transition-colors mb-12 font-mono text-sm uppercase tracking-widest">
        ← Zurück zur Startseite
      </Link>
      
      <div className="max-w-3xl space-y-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Datenschutz</h1>
        
        <div className="space-y-6 text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-white text-xl font-bold mb-2">1. Datenschutz auf einen Blick</h2>
            <p>
              **Allgemeine Hinweise:** Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-2">2. Hosting und Content Delivery Networks (CDN)</h2>
            <p className="mb-4">
              **Externes Hosting durch Vercel:** <br/>
              Diese Website wird bei dem externen Dienstleister Vercel Inc. gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich um IP-Adressen und Webseitenzugriffe handeln.
            </p>
            <p>
              **Bunny.net (CDN für Videos):** <br/>
              Auf unserer Website nutzen wir das Content Delivery Network (CDN) von BunnyWay d.o.o. (Bunny.net) zum Abspielen von Videos. Wenn Sie die Seite aufrufen, wird eine Verbindung zu den Servern von Bunny.net hergestellt, um die Videodateien zu laden. Dabei wird Ihre IP-Adresse an Bunny.net übermittelt (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-2">3. Allgemeine Hinweise</h2>
            <p>
              **Verantwortliche Stelle:** <br/>
              Lennart Koitka <br/>
              Merheimer Straße 49a <br/>
              50733 Köln <br/>
              E-Mail: lennart.koitka@gmx.de
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

// --- HAUPT INHALT (Portfolio) ---

function PortfolioContent() {
  const { company } = useParams();
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [openProjects, setOpenProjects] = useState([]);
  const [lastOpenedIndex, setLastOpenedIndex] = useState(null);

  const companyKey = company ? company.toLowerCase() : 'default';
  const currentVideoUrl = VIDEO_CONFIG[companyKey] || VIDEO_CONFIG.default;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    setHasStarted(true);
  };
  
  const toggleProject = (index) => {
      setOpenProjects(prev => {
          if (prev.includes(index)) {
              return prev.filter(i => i !== index);
          } else {
              setLastOpenedIndex(index); 
              return [...prev, index];
          }
      });
  };

  const greeting = company ? ` // FOR ${company.toUpperCase()}` : "";

  return (
    <div className={`min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black ${!hasStarted ? 'overflow-hidden h-screen' : 'overflow-x-hidden'}`}>
      
      {/* Intro */}
      <div 
        onClick={!hasStarted ? handleStart : undefined}
        className={`fixed z-[60] transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-center justify-center
          ${hasStarted 
            ? 'top-6 left-1/2 -translate-x-1/2 cursor-default scale-75 md:scale-50 origin-top' 
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-105 origin-center'
          }
        `}
      >
        <h1 className={`font-black uppercase tracking-tighter leading-[0.9] text-center transition-all duration-1000 whitespace-nowrap ${hasStarted ? 'text-5xl' : 'text-5xl md:text-[8vw]'}`}>
          Lennart<br/>Koitka
        </h1>
        
        {!hasStarted && (
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-widest text-neutral-500 animate-pulse whitespace-nowrap">
            [ Click to Enter ]
          </div>
        )}
      </div>

      <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-start mix-blend-difference text-white transition-opacity duration-1000 delay-500 ${hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col text-left">
           <div className="text-xs font-mono uppercase tracking-widest mb-1">Cologne, GER</div>
           <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">{currentTime}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
            <a href={SOCIAL_LINKS.email} className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors bg-black/50 backdrop-blur-sm">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"/>
                Contact
            </a>
            {greeting && (
                <span className="text-xs font-mono text-neutral-300 tracking-widest bg-white/10 px-2 py-1 backdrop-blur-md animate-pulse">
                {greeting}
                </span>
            )}
        </div>
      </nav>

      <div className={`transition-opacity duration-[2000ms] delay-700 ${hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        <section className="h-screen w-full relative overflow-hidden flex items-end pb-12 px-4 md:px-8">
          <div className="absolute inset-0 z-0">
            <video 
              key={currentVideoUrl}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover opacity-80"
              src={currentVideoUrl}
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>

          <div className="relative z-10 w-full flex justify-between items-end border-b border-white/20 pb-6">
            <div className="hidden md:block"></div>
            <div className="animate-bounce absolute left-1/2 -translate-x-1/2 bottom-6">
                <ArrowDown className="w-6 h-6 text-white opacity-50" />
            </div>
            <div className="text-right w-full md:w-auto">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Role</div>
              <div className="text-xl md:text-3xl font-bold uppercase tracking-tight">DOP & Editor</div>
            </div>
          </div>
        </section>

        <section className="bg-black z-10 relative pt-12">
          <div className="flex flex-col">
            {PROJECTS_DATA.map((project, index) => (
              <ProjectItem 
                key={index}
                index={index} 
                title={project.title} 
                category={project.category} 
                role={project.role}
                year={project.year}
                videoUrl={project.videoUrl}
                imageUrl={project.imageUrl}
                imagePosition={project.imagePosition}
                isOpen={openProjects.includes(index)}
                onClick={() => toggleProject(index)}
                forceMute={lastOpenedIndex !== null && lastOpenedIndex !== index}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="px-4 md:px-12 py-24 bg-neutral-900 text-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              
              <Reveal>
                <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-12">About</h2>
                <div className="space-y-6 md:space-y-8">
                  <p className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                    Kameramann & Cutter <br/>
                    <span className="text-neutral-500">aus Köln.</span>
                  </p>
                  <div className="h-px w-24 bg-white/20 my-8"></div>
                  <div className="text-lg md:text-xl text-neutral-400 leading-relaxed space-y-6 font-light">
                    <p>
                      Nach meiner Ausbildung als Mediengestalter Bild und Ton bei <strong>Picture Puzzle Medien</strong> (2021–2023) arbeite ich heute festangestellt an der Kamera und in der Postproduktion für diverse TV-Formate.
                    </p>
                    <p>
                      Mein Fokus liegt auf der technischen Umsetzung und visuellen Gestaltung von Doku-Soaps, Magazinbeiträgen und Werbung für Sender wie <strong>RTL2, Discovery+, Kabel Eins, ARD, VOX und RTL+</strong>. Dabei übernehme ich Verantwortung von der technischen Planung über den Dreh bis zum finalen Schnitt.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="relative aspect-[3/4] w-full max-w-sm md:max-w-md mx-auto md:ml-auto bg-neutral-800 rounded-lg overflow-hidden border border-white/10 mt-12 md:mt-0 group">
                   <img 
                     src="https://lennart-portfolio.b-cdn.net/Lennart%20Foto%20Kamera.jpeg" 
                     alt="Lennart Koitka" 
                     className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700 grayscale hover:grayscale-0"
                   />
                   <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-500 bg-black/50 px-2 py-1 backdrop-blur-md">
                     [ Lennart Koitka ]
                   </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        <footer className="bg-black py-12 px-4 md:px-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black uppercase tracking-tighter">Lennart Koitka</div>
          <div className="flex gap-8">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-mono uppercase tracking-widest hover:text-white text-neutral-500 transition-colors">Instagram</a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-mono uppercase tracking-widest hover:text-white text-neutral-500 transition-colors">LinkedIn</a>
              <a href={SOCIAL_LINKS.email} className="text-xs font-mono uppercase tracking-widest hover:text-white text-neutral-500 transition-colors">Email</a>
              <Link to="/impressum" className="text-xs font-mono uppercase tracking-widest hover:text-white text-neutral-500 transition-colors">Impressum</Link>
              <Link to="/datenschutz" className="text-xs font-mono uppercase tracking-widest hover:text-white text-neutral-500 transition-colors">Datenschutz</Link>
          </div>
        </footer>
      
      </div>

    </div>
  );
}

// --- APP WRAPPER ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioContent />} />
        <Route path="/:company" element={<PortfolioContent />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </BrowserRouter>
  );
}