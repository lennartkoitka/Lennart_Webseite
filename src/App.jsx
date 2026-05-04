import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowDown, Plus, Minus, Volume2, VolumeX, Building2 } from 'lucide-react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';

// --- 1. DEINE SOCIAL MEDIA LINKS (HIER EINTRAGEN) ---
const SOCIAL_LINKS = {
  email: "mailto:kontakt@lennartkoitka.de", // Deine E-Mail Adresse
  instagram: "https://instagram.com/lennart.koitka", // Dein Instagram Link
  linkedin: "https://linkedin.com/in/lennart-koitka-a28468191", // Dein LinkedIn Link
};

// --- 2. BEWERBUNGS-KONFIGURATION ---
const COMPANY_CONFIG = {
  default: {
    greeting: null,
    subGreeting: null,
    logoUrl: null,
    blocks: [],
    expandablesTitle: null,
    expandables: [],
    portfolioTransitionText: null
  },
  klangmalereitv: {
    // 1. Die große Überschrift
    greeting: "Hi liebes Klangmalerei Team!",
    // 2. Die zweite, mittige Textzeile darunter
    subGreeting: "Ich bin Lennart, Kameramann & Cutter aus Köln\nund ich glaube, wir passen perfekt zusammen.",
    // 3. Das Firmenlogo
    logoUrl: "https://lennart-portfolio.b-cdn.net/Klangmalerei.tv%20Logo.png",  
    
    // 4. Der Text für den Übergang zum Portfolio
    portfolioTransitionText: "Im Folgenden findet ihr einige Auszüge meiner bisherigen Projekte",

    // 5. Die abwechselnden Bild-Text Blöcke
    blocks: [
      {
        text: "Über DWDL habe ich gelesen, dass ihr musik- und reisebegeisterte Unterstützung sucht. Daher möchte ich mich euch gern vorstellen.",
        imageUrl: "https://lennart-portfolio.b-cdn.net/Lennart%20Foto%20Kamera.jpeg"
      },
      {
        text: "Als gelernter Mediengestalter arbeite ich aktuell festangestellt bei Picture Puzzle Medien sowohl an der Kamera als auch in der Postproduktion für verschiedene TV-Formate.\n\n Als DoP liegt mein Fokus auf der technischen Umsetzung und visuellen Gestaltung von Doku(-Soaps), Reportagen, Magazinbeiträgen und Werbeformaten. In enger Zusammenarbeit mit den Kund:innen begleite ich Projekte von der ersten Idee über den Dreh bis hin zum finalen Schnitt, für private und öffentlich-rechtliche Sender sowie Streaminganbieter.",
        imageUrl: "https://lennart-portfolio.b-cdn.net/WhatsApp%20Image%202025-10-13%20at%2016.18.10.jpeg"
      },
      {
        text: "Meine Kameraerfahrung reicht von der Arbeit mit einer Spiegelreflex bis hin zum Umgang mit der kompletten Sony-FX-Reihe. Zudem arbeite ich seit Jahren mit der gesamten Adobe Creative Cloud. Am Set-Alltag schätze ich besonders, dass nichts wirklich alltäglich ist. \n\nEs reizt mich spannende Einblicke in unterschiedliche Lebensweisen zu bekommen; umso schöner, wenn mich diese an neue Orte führen. Durch verschiedenste Produktionen und meine private Ungebundenheit konnte ich umfangreiche Auslandserfahrung sammeln.",
        imageUrl: "https://lennart-portfolio.b-cdn.net/WhatsApp%20Image%202025-10-13%20at%2016.18.10%20(2).jpeg"
      },
      {
        text: "In der Postproduktion ist die Entwicklung eines stimmungsvollen Musikkonzepts für mich der Moment, in dem ich dem Film seinen entscheidenden Schliff geben kann. \n\nAber auch abseits der Arbeit spielt Musik für mich eine große Rolle: Seit meinem 17. Lebensjahr besuche ich regelmäßig Konzerte und Events. Für elektronische Sets nehme ich auch gerne längere Wege auf mich, um Künstler wie XY, ZZ oder YY live zu erleben.",
        imageUrl: "https://lennart-portfolio.b-cdn.net/WhatsApp%20Image%202026-05-04%20at%2020.35.33.jpeg"
      },
      {
        text: "Ich habe Bock, meine Leidenschaft für Musik und Reisen in eurem Team mit meiner Berufung zu verbinden. \n\nMeldet euch gern bei mir – vielleicht können wir schon bald gemeinsam tolle Momente erleben und ein „Ich bin hautnah dabei“-Gefühl für das Publikum kreieren.",
        imageUrl: "https://lennart-portfolio.b-cdn.net/WhatsApp%20Image%202026-05-04%20at%2020.36.00.jpeg"
      }
    ],

    // 6. Ausklappbare Textboxen (FAQ, Hard Facts, etc.)
    expandablesTitle: "Gut zu wissen",
    expandables: [
      {
        title: "Frühester Eintrittstermin",
        content: "Ich stehe euch ab dem 01. Juli 2026 zur Verfügung."
      },
      {
        title: "Gehaltsvorstellung",
        content: "Meine Gehaltsvorstellung liegt bei 54.000 Euro brutto im Jahr. Ich bin jedoch offen für ein persönliches Gespräch, um die genauen Rahmenbedingungen zu besprechen."
      },
      {
        title: "Reisebereitschaft",
        content: "Durch regelmäßige Fernreisen (z. B. Nepal, Mongolei, China, Thailand, Australien) bin ich längere Auslandsaufenthalte gewohnt und jederzeit bereit, Projekte weltweit über mehrere Wochen zu begleiten."
      }
    ]
  }
};

// --- 3. VIDEO KONFIGURATION (Hintergrund-Videos) ---
const VIDEO_CONFIG = {
  default: "https://lennart-portfolio.b-cdn.net/Lennart%20Showreel.mp4",
};

// --- 4. PROJEKTE ---
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
  { 
    title: "Peter & Alex - Über den Tellerrand", 
    category: "unreleased", 
    role: "Kamera & Schnitt", 
    year: "unreleased",
    videoUrl: "https://lennart-portfolio.b-cdn.net/Trailer_Peter%26Alex__Finalv3.mp4"
  },
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

// --- HILFS-FUNKTION: ELEGANTES SCROLLEN ---
const smoothScrollToGlobal = (targetY, duration = 1300, callback = null) => {
  const startPosition = window.scrollY;
  const distance = targetY - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    const ease = (t, b, c, d) => {
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    window.scrollTo(0, ease(timeElapsed, startPosition, distance, duration));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetY);
      if (callback) callback();
    }
  };
  requestAnimationFrame(animation);
};

// --- HILFS-KOMPONENTEN ---
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            setVisible(true);
        }
      });
    }, { threshold: 0.15 });
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);
  
  return (
    <div ref={domRef} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </div>
  );
};

// --- NEU: AUSKLAPPBARES TEXT-ITEM (Akkordeon) ---
const ExpandableItem = ({ title, content, isOpen, onClick }) => {
  const itemRef = useRef(null);

  // Das automatische Scrollen wurde hier absichtlich entfernt,
  // damit die Sektion fest stehen bleibt und nicht "nach unten rutscht".

  return (
    <div ref={itemRef} className="border-t border-white/20">
      <div 
        onClick={onClick}
        className="group relative py-6 md:py-8 cursor-pointer overflow-hidden flex justify-between items-center transition-colors duration-500 hover:bg-white/5 px-4"
      >
        <h3 className={`text-xl md:text-3xl font-bold tracking-tight transition-all duration-500 pr-8 ${isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
          {title}
        </h3>
        <div className={`w-10 h-10 rounded-full border border-white/20 flex shrink-0 items-center justify-center transition-all duration-500 ${isOpen ? 'bg-white text-black rotate-180' : 'text-white group-hover:bg-white/10'}`}>
           {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-12 pt-4">
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 font-light leading-relaxed whitespace-pre-line max-w-4xl">
              {content}
            </p>
        </div>
      </div>
    </div>
  );
};

// --- SINGLE PROJECT ITEM ---
const ProjectItem = ({ title, category, role, year, videoUrl, isOpen, onClick, forceMute }) => {
  const itemRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (forceMute) {
      setIsMuted(true);
    }
  }, [forceMute]);

  useEffect(() => {
    if (isOpen && itemRef.current) {
      setTimeout(() => {
        const targetPosition = itemRef.current.getBoundingClientRect().top + window.scrollY;
        smoothScrollToGlobal(targetPosition, 1000); 
      }, 50);
    }
  }, [isOpen]);

  const toggleMute = (e) => {
    e.stopPropagation(); 
    setIsMuted(!isMuted);
  };

  return (
    <div ref={itemRef} className="border-t border-white/20">
      <div 
        onClick={onClick}
        className="group relative py-8 md:py-12 cursor-pointer overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-end px-4 md:px-12 transition-all duration-500 ease-out hover:scale-[1.02] origin-center"
      >
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

// --- IMPRESSUM SEITE ---
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
          <p>Lennart Koitka<br />Merheimer Straße 49a<br />50733 Köln</p>
        </div>
        <div className="space-y-4 text-neutral-400">
          <h2 className="text-white text-xl font-bold">Kontakt</h2>
          <p>Telefon: +49 (0) 15256360156<br />E-Mail: <a href={SOCIAL_LINKS.email} className="hover:text-white underline decoration-white/20">kontakt@lennart-koitka.de</a></p>
        </div>
        <div className="space-y-4 text-neutral-400">
          <h2 className="text-white text-xl font-bold">Redaktionell verantwortlich</h2>
          <p>Lennart Koitka<br />(Adresse wie oben)</p>
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
            <p>**Allgemeine Hinweise:** Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
          </section>
          <section>
            <h2 className="text-white text-xl font-bold mb-2">2. Hosting und Content Delivery Networks (CDN)</h2>
            <p className="mb-4">**Externes Hosting durch Vercel:** <br/>Diese Website wird bei dem externen Dienstleister Vercel Inc. gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich um IP-Adressen und Webseitenzugriffe handeln.</p>
            <p>**Bunny.net (CDN für Videos):** <br/>Auf unserer Website nutzen wir das Content Delivery Network (CDN) von BunnyWay d.o.o. (Bunny.net) zum Abspielen von Videos. Wenn Sie die Seite aufrufen, wird eine Verbindung zu den Servern von Bunny.net hergestellt, um die Videodateien zu laden. Dabei wird Ihre IP-Adresse an Bunny.net übermittelt (Art. 6 Abs. 1 lit. f DSGVO).</p>
          </section>
          <section>
            <h2 className="text-white text-xl font-bold mb-2">3. Allgemeine Hinweise</h2>
            <p>**Verantwortliche Stelle:** <br/>Lennart Koitka <br/>Merheimer Straße 49a <br/>50733 Köln <br/>E-Mail: lennart.koitka@gmx.de</p>
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
  
  // State für Portfolio-Videos
  const [openProjects, setOpenProjects] = useState([]);
  const [lastOpenedIndex, setLastOpenedIndex] = useState(null);

  // State für die Ausklappbaren Texte
  const [openExpandables, setOpenExpandables] = useState([]);

  const companyKey = company ? company.toLowerCase() : 'default';
  const currentCompanyData = COMPANY_CONFIG[companyKey] || COMPANY_CONFIG.default;
  const currentVideoUrl = VIDEO_CONFIG.default; 
  const isApplicationPage = !!company && !!COMPANY_CONFIG[companyKey]; 

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  // --- ELEGANTES SCROLL-SYSTEM ---
  useEffect(() => {
    if (!isApplicationPage) return;

    let isScrolling = false;

    const handleWheel = (e) => {
      const portfolioSection = document.getElementById('portfolio-section');
      if (!portfolioSection) return;
      const portfolioTop = portfolioSection.offsetTop;

      if (window.scrollY > portfolioTop + 5) return;
      if (window.scrollY >= portfolioTop - 5 && e.deltaY > 0) return;
      if (Math.abs(e.deltaY) < 15) return;

      e.preventDefault();
      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const sections = Array.from(document.querySelectorAll('.snap-section'));

      let currentIndex = 0;
      let minDistance = Infinity;

      sections.forEach((sec, idx) => {
        const distance = Math.abs(window.scrollY - sec.offsetTop);
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = idx;
        }
      });

      let targetIndex = currentIndex + direction;
      let targetY = 0;

      if (targetIndex < 0) {
        targetY = 0;
      } else if (targetIndex >= sections.length) {
        targetY = portfolioTop;
      } else {
        targetY = sections[targetIndex].offsetTop;
      }

      isScrolling = true;
      smoothScrollToGlobal(targetY, 1300, () => {
        setTimeout(() => isScrolling = false, 50);
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isApplicationPage]);

  const handleStart = () => setHasStarted(true);
  
  const toggleProject = (index) => {
      setOpenProjects(prev => {
          if (prev.includes(index)) return prev.filter(i => i !== index);
          setLastOpenedIndex(index); 
          return [...prev, index];
      });
  };

  const toggleExpandable = (index) => {
    setOpenExpandables(prev => {
        if (prev.includes(index)) return prev.filter(i => i !== index);
        return [index]; 
    });
  };

  const greeting = company ? ` // BEWERBUNG` : "";

  return (
    <div className={`min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black ${!hasStarted ? 'overflow-hidden h-[100dvh]' : 'overflow-x-hidden'}`}>
      
      {/* Intro Overlay */}
      <div 
        onClick={!hasStarted ? handleStart : undefined}
        className={`fixed z-[60] transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center justify-center w-full h-full
          ${hasStarted ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 bg-black cursor-pointer'}
        `}
      >
        <div className="flex flex-col items-center gap-8 hover:scale-105 transition-transform duration-700">
            {isApplicationPage && currentCompanyData.logoUrl ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                    <h1 className="font-black uppercase tracking-tighter leading-[0.9] text-center text-5xl md:text-[8vw]">Lennart</h1>
                    <span className="text-neutral-600 font-light text-4xl md:text-6xl hidden md:inline">×</span>
                    <div className="h-24 md:h-40 lg:h-48 flex items-center justify-center">
                       <img src={currentCompanyData.logoUrl} alt="Company Logo" className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                    </div>
                </div>
            ) : (
                <h1 className="font-black uppercase tracking-tighter leading-[0.9] text-center text-5xl md:text-[8vw] flex flex-col items-center">
                    <span>Lennart</span><span>Koitka</span>
                </h1>
            )}
            {!hasStarted && <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 animate-pulse mt-12">[ Click to Enter ]</div>}
        </div>
      </div>

      <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-start mix-blend-difference text-white transition-opacity duration-1000 delay-500 ${hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col text-left">
           <div className="text-xs font-mono uppercase tracking-widest mb-1">Cologne, GER</div>
           <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">{currentTime}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
            <a href={SOCIAL_LINKS.email} className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors bg-black/50 backdrop-blur-sm">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"/>Contact
            </a>
            {isApplicationPage && <span className="text-xs font-mono text-neutral-300 tracking-widest bg-white/10 px-2 py-1 backdrop-blur-md animate-pulse">{greeting}</span>}
        </div>
      </nav>

      {/* Hauptinhalt */}
      <div className={`transition-opacity duration-[2000ms] delay-500 ${hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* 1. Video Hintergrund Hero-Sektion */}
        <section className="h-[100dvh] w-full relative overflow-hidden flex items-end pb-12 px-4 md:px-8 snap-section">
          <div className="absolute inset-0 z-0">
            <video key={currentVideoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80" src={currentVideoUrl} />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>
          <div className="relative z-10 w-full flex justify-between items-end border-b border-white/20 pb-6">
            <div className="hidden md:block"><h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Lennart Koitka</h2></div>
            <div className="animate-bounce absolute left-1/2 -translate-x-1/2 bottom-6"><ArrowDown className="w-6 h-6 text-white opacity-50" /></div>
            <div className="text-right w-full md:w-auto"><div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Role</div><div className="text-xl md:text-3xl font-bold uppercase tracking-tight">DOP & Editor</div></div>
          </div>
        </section>

        {isApplicationPage && (
            <>
                {/* Intro Zeilen */}
                {(currentCompanyData.greeting || currentCompanyData.subGreeting) && (
                    <section className="h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-12 bg-neutral-900 border-b border-white/10 snap-section">
                        <Reveal>
                            {currentCompanyData.greeting && <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-8 text-center uppercase">{currentCompanyData.greeting}</h2>}
                            {currentCompanyData.subGreeting && <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-neutral-300 text-center max-w-5xl mx-auto whitespace-pre-line leading-relaxed">{currentCompanyData.subGreeting}</h3>}
                        </Reveal>
                    </section>
                )}

                {/* Abwechselnde Text & Bild Blöcke */}
                {currentCompanyData.blocks && currentCompanyData.blocks.map((block, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <section key={`block-${index}`} className="h-[100dvh] w-full relative flex items-center justify-center px-4 md:px-12 lg:px-24 bg-neutral-900 border-b border-white/10 snap-section">
                            <div className="w-full h-full max-w-[1800px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 py-24">
                                <div className={`w-full lg:w-3/5 flex flex-col justify-center h-full order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <Reveal><p className="text-xl md:text-3xl lg:text-4xl text-neutral-300 font-light leading-relaxed whitespace-pre-line">{block.text}</p></Reveal>
                                </div>
                                <div className={`w-full lg:w-[35%] h-[40vh] lg:h-[70vh] order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} group`}>
                                    <Reveal delay={100} className="w-full h-full">
                                        <div className="relative w-full h-full bg-neutral-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                            {block.imageUrl ? <img src={block.imageUrl} alt="Bewerbungsbild" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0" /> : <div className="w-full h-full flex items-center justify-center text-neutral-600 text-sm font-mono">[ BILD EINFÜGEN ]</div>}
                                            <div className="absolute bottom-6 left-6 text-sm font-mono text-neutral-500 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">Lennart Koitka</div>
                                        </div>
                                    </Reveal>
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* Ausklappbare FAQ / Text-Boxen Sektion */}
                {currentCompanyData.expandables && currentCompanyData.expandables.length > 0 && (
                    <section className="min-h-[100dvh] w-full flex flex-col justify-center px-4 md:px-12 py-24 bg-neutral-900 border-b border-white/10 snap-section">
                        <div className="max-w-5xl mx-auto w-full">
                            <Reveal>
                                {currentCompanyData.expandablesTitle && (
                                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-12 uppercase">
                                        {currentCompanyData.expandablesTitle}
                                    </h2>
                                )}
                                <div className="flex flex-col border-b border-white/20">
                                    {currentCompanyData.expandables.map((item, index) => (
                                        <ExpandableItem 
                                            key={`exp-${index}`}
                                            title={item.title}
                                            content={item.content}
                                            isOpen={openExpandables.includes(index)}
                                            onClick={() => toggleExpandable(index)}
                                        />
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </section>
                )}

                {/* Letzter Slide vor dem Portfolio (Nur Text, Dicke Schrift) */}
                {currentCompanyData.portfolioTransitionText && (
                    <section className="h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-12 bg-black border-b border-white/10 snap-section">
                        <Reveal>
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white text-center uppercase max-w-5xl mx-auto leading-[1.1]">
                                {currentCompanyData.portfolioTransitionText}
                            </h2>
                        </Reveal>
                    </section>
                )}
            </>
        )}

        {/* 3. Portfolio Liste */}
        <section id="portfolio-section" className="bg-black z-10 relative pt-12">
          <div className="flex flex-col">
            {PROJECTS_DATA.map((project, index) => (
              <ProjectItem key={index} title={project.title} category={project.category} role={project.role} year={project.year} videoUrl={project.videoUrl} isOpen={openProjects.includes(index)} onClick={() => toggleProject(index)} forceMute={lastOpenedIndex !== null && lastOpenedIndex !== index} />
            ))}
          </div>
        </section>

        {/* 4. About Section */}
        <section className="px-4 md:px-12 py-24 bg-neutral-900 text-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <Reveal>
                <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-12">About</h2>
                <div className="space-y-6 md:space-y-8">
                  <p className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">Kameramann & Cutter <br/><span className="text-neutral-500">aus Köln.</span></p>
                  <div className="h-px w-24 bg-white/20 my-8"></div>
                  <div className="text-lg md:text-xl text-neutral-400 leading-relaxed space-y-6 font-light">
                    <p>Nach meiner Ausbildung als Mediengestalter Bild und Ton bei <strong>Picture Puzzle Medien</strong> (2021–2023) arbeite ich heute festangestellt an der Kamera und in der Postproduktion für diverse TV-Formate.</p>
                    <p>Mein Fokus liegt auf der technischen Umsetzung und visuellen Gestaltung von Doku-Soaps, Magazinbeiträgen und Werbung für Sender wie <strong>RTL2, Discovery+, Kabel Eins, ARD, VOX und RTL+</strong>. Dabei übernehme ich Verantwortung von der technischen Planung über den Dreh bis zum finalen Schnitt.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200} className="w-full h-full">
                <div className="relative aspect-[3/4] w-full max-w-sm md:max-w-md mx-auto md:ml-auto bg-neutral-800 rounded-lg overflow-hidden border border-white/10 mt-12 md:mt-0 group">
                   <img src="https://lennart-portfolio.b-cdn.net/Lennart%20Foto%20Kamera.jpeg" alt="Lennart Koitka" className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700 grayscale hover:grayscale-0" />
                   <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-500 bg-black/50 px-2 py-1 backdrop-blur-md">[ Lennart Koitka ]</div>
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