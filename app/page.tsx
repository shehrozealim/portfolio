"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Database,
  Layers,
  Mail,
  Menu,
  Server,
  TerminalSquare,
  X,
  Clock,
  MapPin,
  Asterisk
} from "lucide-react";

// --- DATA ---
const projects = [
  {
    title: "Real-Time Chat Engine",
    category: "SYSTEM ARCHITECTURE",
    description: "A low-latency, scalable communication platform built around WebSockets with end-to-end asynchronous persistence.",
    tech: ["Node.js", "Redis", "WebSockets", "Next.js"],
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    link: "#",
    color: "bg-[#ffffff]", 
  },
  {
    title: "Media Discovery Hub",
    category: "PRODUCT ENGINEERING",
    description: "An immersive media platform featuring a custom API aggregation layer and an infinite-scroll discovery engine.",
    tech: ["Express.js", "React", "PostgreSQL", "Tailwind"],
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    link: "#",
    color: "bg-[#f4f4f0]", 
  },
  {
    title: "Algorithmic Price Tracker",
    category: "DATA ENGINEERING",
    description: "Background processing engine for concurrent API polling, intelligent caching, and live optimistic UI updates.",
    tech: ["TypeScript", "Cron", "Redis", "Shadcn"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    link: "#",
    color: "bg-[#e8e6df]", 
  },
];

// --- MAGNETIC COMPONENT ---
function Magnetic({ children, strength = 30 }: { children: React.ReactElement; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// --- TEXT REVEAL COMPONENT ---
// Added "as const" to the ease array to fix the TypeScript build error
const RevealText = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div 
      initial={{ y: "100%" }} 
      whileInView={{ y: 0 }} 
      viewport={{ once: true, margin: "-10%" }} 
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  </div>
);

// --- STICKY PROJECT CARD ---
const Card = ({ project, i, progress, range, targetScale }: any) => {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  const filter = useTransform(progress, range, ["brightness(1)", "brightness(0.5)"]);

  return (
    <div ref={container} className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{ 
          scale,
          filter,
          top: `calc(5vh + ${i * 30}px)`, 
          transformOrigin: "top" 
        }}
        className={`group relative flex h-[550px] w-full max-w-6xl flex-col justify-between overflow-hidden border-2 border-black ${project.color} shadow-[16px_16px_0_rgba(0,0,0,1)] md:h-[650px] md:flex-row md:p-0`}
      >
        {/* Content Half */}
        <div className="flex h-full flex-col justify-between p-8 md:w-1/2 md:p-14">
          <div>
            <div className="mb-8 flex items-center gap-4 border-b-2 border-black pb-4">
              <span className="flex h-8 w-8 items-center justify-center bg-black font-mono text-xs font-bold text-white">
                0{i + 1}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                {project.category}
              </span>
            </div>
            
            <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl md:text-6xl text-black leading-[0.9]">
              {project.title}
            </h2>
            <p className="mt-6 max-w-md text-sm sm:text-base font-medium leading-relaxed text-black/70">
              {project.description}
            </p>
          </div>
          
          <div className="mt-8 flex items-end justify-between">
            <div className="flex flex-wrap gap-2 max-w-[75%]">
              {project.tech.map((t: string) => (
                <span key={t} className="border border-black px-3 py-1 font-mono text-[10px] font-bold uppercase text-black bg-white shadow-[2px_2px_0_#111]">
                  {t}
                </span>
              ))}
            </div>
            <Magnetic strength={40}>
              <a href={project.link} className="flex h-16 w-16 items-center justify-center border-2 border-black bg-[#c9ff00] text-black transition-transform hover:-translate-y-1 hover:translate-x-1 shadow-[4px_4px_0_#111]">
                <ArrowUpRight size={28} strokeWidth={2} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Image Half */}
        <div className="relative h-full w-full overflow-hidden border-t-2 md:border-t-0 md:border-l-2 border-black md:w-1/2 bg-black">
          <motion.div style={{ scale: imageScale }} className="h-full w-full">
            <img 
              src={project.img} 
              alt={project.title} 
              className="h-full w-full object-cover opacity-80 grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-[#c9ff00]/0 mix-blend-multiply transition duration-500 group-hover:bg-[#c9ff00]/30" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Portfolio() {
  const mainContainer = useRef(null);
  const projectsContainer = useRef(null);
  
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress: globalScroll } = useScroll();
  const smoothGlobal = useSpring(globalScroll, { stiffness: 100, damping: 20 });

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsContainer,
    offset: ["start start", "end end"],
  });

  const cursorX = useSpring(cursor.x, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(cursor.y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true }));
    }, 1000);

    const move = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main ref={mainContainer} className="relative min-h-screen bg-[#f4f4f0] text-[#111111] selection:bg-[#c9ff00] selection:text-black font-sans overflow-x-hidden">
      
      {/* SCROLL BAR */}
      <motion.div style={{ scaleX: smoothGlobal }} className="fixed left-0 top-0 z-[100] h-1.5 w-full origin-left bg-[#c9ff00]" />

      {/* CUSTOM CURSOR */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      />

      {/* HEADER NAV */}
      <header className="fixed left-0 right-0 top-0 z-[60] border-b-2 border-black bg-[#f4f4f0]/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-6 py-4 md:px-12">
          
          <Magnetic strength={20}>
            <button onClick={() => goTo("home")} className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tighter">SM.</span>
              <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.2em] md:block border-l-2 border-black pl-2 ml-2">
                Portfolio 2026
              </span>
            </button>
          </Magnetic>

          <nav className="hidden items-center gap-10 md:flex">
            {["about", "work"].map((id) => (
              <Magnetic key={id} strength={20}>
                <button onClick={() => goTo(id)} className="group relative font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  {id}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#c9ff00] transition-all group-hover:w-full" />
                </button>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic strength={20}>
              <a href="mailto:shehrozealim@gmail.com" className="hidden items-center gap-2 border-2 border-black bg-[#c9ff00] px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_#111] sm:flex">
                Available <ArrowUpRight size={14} />
              </a>
            </Magnetic>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border-2 border-black bg-white hover:bg-[#c9ff00] transition-colors md:hidden">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-[10] bg-[#f4f4f0] mb-[100vh] border-b-2 border-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* HERO SECTION */}
        <section id="home" className="relative flex min-h-screen w-full flex-col justify-center border-b-2 border-black pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

          <div className="relative z-10 flex flex-col justify-between h-full min-h-[calc(100vh-10rem)]">
            
            <div className="px-6 md:px-12 w-full max-w-[1800px] mx-auto mt-12 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <RevealText>
                  <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] bg-white border-2 border-black w-fit px-4 py-2 shadow-[4px_4px_0_#111] mb-8">
                    <span className="h-2 w-2 bg-[#c9ff00] animate-pulse border border-black" />
                    System Online
                  </div>
                </RevealText>
                
                <h1 className="text-[17vw] md:text-[14vw] font-black uppercase leading-[0.8] tracking-tighter flex flex-col">
                  <RevealText delay={0.1}><span className="block text-black">SHEHROZE</span></RevealText>
                  <RevealText delay={0.2}>
                    <span className="block text-transparent flex items-center gap-4 md:gap-8" style={{ WebkitTextStroke: '3px #111'}}>
                      MALIK
                      <motion.span 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="hidden md:flex text-[#c9ff00]"
                        style={{ WebkitTextStroke: '0px' }}
                      >
                        <Asterisk size={100} strokeWidth={1.5} />
                      </motion.span>
                    </span>
                  </RevealText>
                </h1>
              </div>

              <RevealText delay={0.3} className="md:pb-6">
                <div className="flex flex-col gap-4 border-2 border-black bg-white p-6 shadow-[8px_8px_0_#111] max-w-[280px]">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/50 border-b-2 border-black/10 pb-2">
                    Profile Data
                  </p>
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <MapPin size={16} className="text-[#c9ff00] fill-black" /> Mumbai, IN
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <Clock size={16} className="text-[#c9ff00] fill-black" /> {mounted ? time : "00:00:00"}
                  </div>
                  <p className="text-xs font-medium leading-relaxed mt-2 text-black/70">
                    Architecting robust backends & engineering fluid frontends.
                  </p>
                </div>
              </RevealText>
            </div>

            {/* Scrolling Marquee Tape */}
            <div className="mt-auto border-t-2 border-black bg-[#c9ff00] py-3 overflow-hidden flex whitespace-nowrap">
              <motion.div
                className="flex items-center gap-8 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 15, repeat: Infinity }}
              >
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    <span>Full-Stack Engineering</span>
                    <Asterisk size={12} />
                    <span>System Architecture</span>
                    <Asterisk size={12} />
                    <span>Real-time Systems</span>
                    <Asterisk size={12} />
                    <span>Product Mindset</span>
                    <Asterisk size={12} />
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

          </div>
        </section>

        {/* BENTO GRID (THE ARSENAL) */}
        <section id="about" className="px-6 py-24 md:px-12 lg:py-40 border-b-2 border-black bg-[#f4f4f0]">
          <div className="mx-auto max-w-[1500px]">
            <RevealText>
              <div className="mb-16 flex items-center gap-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">01 // The Arsenal</span>
                <div className="h-0.5 w-full max-w-[150px] bg-black" />
              </div>
            </RevealText>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:grid-rows-2">
              
              <div className="group relative col-span-1 flex flex-col justify-between overflow-hidden border-2 border-black bg-white p-8 md:col-span-2 md:row-span-2 shadow-[8px_8px_0_#111] transition-transform hover:-translate-y-1">
                <div className="relative z-10">
                  <Code2 className="mb-6 text-black" size={32} />
                  <h3 className="text-3xl font-black uppercase tracking-[-0.04em] md:text-5xl leading-none">Engineering<br/>with Intent.</h3>
                  <p className="mt-6 text-sm font-medium leading-relaxed text-black/70 max-w-md">
                    I don't just write code; I design systems. From raw database optimizations to creating fluid user interfaces, I obsess over the micro-details that elevate good products to great ones.
                  </p>
                </div>

                <div className="relative z-10 mt-10">
                  <div className="border-2 border-black bg-[#111] p-5 font-mono text-[11px] md:text-xs text-white shadow-[4px_4px_0_#c9ff00]">
                    <div className="flex gap-2 mb-4 border-b border-white/20 pb-4">
                      <div className="h-3 w-3 rounded-full border border-black bg-red-500" />
                      <div className="h-3 w-3 rounded-full border border-black bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full border border-black bg-[#c9ff00]" />
                    </div>
                    <p><span className="text-[#c9ff00]">const</span> <span className="text-white">engineer</span> = <span className="text-[#c9ff00]">new</span> Developer();</p>
                    <p className="mt-2">engineer.<span className="text-blue-400">architect</span>(&#123;</p>
                    <p className="pl-4">scale: <span className="text-orange-400">"infinite"</span>,</p>
                    <p className="pl-4">ui: <span className="text-orange-400">"pixel-perfect"</span></p>
                    <p>&#125;);</p>
                    <div className="mt-4 flex items-center gap-2 text-[#c9ff00]">
                      <TerminalSquare size={12} />
                      <span className="uppercase tracking-widest font-bold text-[9px]">System compiled.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 border-2 border-black bg-[#e8e6df] p-8 shadow-[8px_8px_0_#111] transition-transform hover:-translate-y-1 hover:bg-[#c9ff00]">
                <Server className="mb-6 text-black" size={28} />
                <h4 className="font-black text-2xl uppercase tracking-[-0.02em] text-black">Backend</h4>
                <ul className="mt-6 space-y-4 font-mono text-[10px] font-bold uppercase tracking-widest text-black/70">
                  <li className="border-b-2 border-black/10 pb-2">Node.js / NestJS</li>
                  <li className="border-b-2 border-black/10 pb-2">Microservices</li>
                  <li className="border-b-2 border-black/10 pb-2">WebSockets</li>
                  <li>Docker / AWS</li>
                </ul>
              </div>

              <div className="col-span-1 border-2 border-black bg-black text-white p-8 shadow-[8px_8px_0_#c9ff00] transition-transform hover:-translate-y-1">
                <Database className="mb-6 text-[#c9ff00]" size={28} />
                <h4 className="font-black text-2xl uppercase tracking-[-0.02em]">Data</h4>
                <ul className="mt-6 space-y-4 font-mono text-[10px] font-bold uppercase tracking-widest text-white/80">
                  <li className="border-b-2 border-white/20 pb-2">PostgreSQL</li>
                  <li className="border-b-2 border-white/20 pb-2">MongoDB</li>
                  <li className="border-b-2 border-white/20 pb-2">Redis</li>
                  <li>Prisma / Drizzle</li>
                </ul>
              </div>

              <div className="col-span-1 border-2 border-black bg-white p-8 md:col-span-2 shadow-[8px_8px_0_#111] transition-transform hover:-translate-y-1 flex flex-col justify-center">
                <Layers className="mb-6 text-black" size={28} />
                <h4 className="font-black text-2xl uppercase tracking-[-0.02em] text-black">Frontend</h4>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"].map(t => (
                    <span key={t} className="border-2 border-black bg-[#f4f4f0] px-4 py-2 font-mono text-[10px] font-bold uppercase text-black shadow-[2px_2px_0_#111]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STACKED PROJECT SCROLL */}
        <section id="work" ref={projectsContainer} className="relative w-full py-32 md:py-48 border-b-2 border-black">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 mb-24">
            <RevealText>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="mb-6 flex items-center gap-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">02 // Selected Works</span>
                    <div className="h-0.5 w-[150px] bg-black" />
                  </div>
                  <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-7xl md:text-[6rem]">
                    Built for <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px #111'}}>the real world.</span>
                  </h2>
                </div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-[#c9ff00] border-2 border-black px-4 py-2 shadow-[4px_4px_0_#111]">
                  03 Projects / 2026
                </div>
              </div>
            </RevealText>
          </div>
          
          <div className="px-4 md:px-12 pb-32">
            {projects.map((project, i) => {
              const targetScale = 1 - ((projects.length - 1 - i) * 0.05);
              const start = i * (1 / projects.length);
              const end = start + (1 / projects.length);
              
              return (
                <Card 
                  key={`p_${i}`} 
                  i={i} 
                  project={project} 
                  progress={projectsProgress} 
                  range={[start, end]} 
                  targetScale={targetScale} 
                />
              );
            })}
          </div>
        </section>

      </div>

      {/* FOOTER / CONTACT (CURTAIN REVEAL) */}
      <footer className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#111111] flex flex-col justify-between pt-32 pb-12 px-6 lg:pl-24 md:px-12">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.15]">
          <div className="h-[40vw] w-[40vw] rounded-full bg-[#c9ff00] blur-[200px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-[#c9ff00] mb-8 border-2 border-[#c9ff00] px-6 py-2 shadow-[4px_4px_0_#c9ff00]">
            Got an idea?
          </p>
          <h2 className="text-[15vw] md:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(201,255,0,0.1)]">
            Let's <br/> Build.
          </h2>
          
          <Magnetic strength={40}>
            <a 
              href="mailto:shehrozealim@gmail.com"
              className="mt-16 group flex items-center gap-4 border-2 border-[#c9ff00] bg-transparent px-8 py-5 transition-all hover:bg-[#c9ff00] hover:text-black text-[#c9ff00] shadow-[6px_6px_0_#c9ff00] hover:shadow-[0_0_0_#c9ff00] hover:translate-x-1 hover:translate-y-1"
            >
              <Mail size={20} />
              <span className="font-mono text-sm font-bold uppercase tracking-widest">shehrozealim@gmail.com</span>
            </a>
          </Magnetic>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row w-full items-center justify-between gap-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 border-t-2 border-white/10 pt-8">
          <div className="flex gap-8">
            <Magnetic><a href="#" className="hover:text-[#c9ff00] transition-colors">Github</a></Magnetic>
            <Magnetic><a href="#" className="hover:text-[#c9ff00] transition-colors">LinkedIn</a></Magnetic>
          </div>
          <p className="flex items-center gap-3">
            © {new Date().getFullYear()} <span className="h-1.5 w-1.5 bg-[#c9ff00]" /> Shehroze Malik
          </p>
        </div>
      </footer>

    </main>
  );
}