"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
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
  Clock
} from "lucide-react";

const projects = [
  {
    title: "Real-Time Chat Engine",
    category: "SYSTEM ARCHITECTURE",
    description: "A low-latency, scalable communication platform built around WebSockets with end-to-end asynchronous persistence.",
    tech: ["Node.js", "Redis", "WebSockets", "Next.js"],
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    link: "https://fakelf-chat-app.netlify.app/login",
    color: "bg-[#fcfbf9]",
  },
  {
    title: "Media Discovery Hub",
    category: "PRODUCT ENGINEERING",
    description: "An immersive media platform featuring a custom API aggregation layer and an infinite-scroll discovery engine.",
    tech: ["Express.js", "React", "PostgreSQL", "Tailwind"],
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    link: "https://imbd-movie-stats.netlify.app/",
    color: "bg-[#f2f0e9]",
  },
  {
    title: "Algorithmic Price Tracker",
    category: "DATA ENGINEERING",
    description: "Background processing engine for concurrent API polling, intelligent caching, and live optimistic UI updates.",
    tech: ["TypeScript", "Cron", "Redis", "Shadcn"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    link: "https://aio-crypto-stats.netlify.app/",
    color: "bg-[#e5e3db]",
  },
];

function Magnetic({ children, strength = 40 }: { children: React.ReactElement; strength?: number }) {
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

const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div className="overflow-hidden">
    <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  </div>
);


const Card = ({ project, i, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex h-screen items-center justify-center pt-20">
      <motion.div
        style={{ scale, top: `calc(5vh + ${i * 30}px)` }}
        className={`group relative flex h-[550px] w-full max-w-6xl flex-col justify-between overflow-hidden border-2 border-black ${project.color} shadow-[12px_12px_0_rgba(0,0,0,1)] md:h-[650px] md:flex-row md:p-0 origin-top`}
      >
        <div className="flex h-full flex-col justify-between p-8 md:w-1/2 md:p-14">
          <div>
            <div className="mb-8 flex items-center gap-4 border-b-2 border-black pb-4">
              <span className="flex h-8 w-8 items-center justify-center bg-black font-mono text-xs font-bold text-white">
                0{i + 1}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/60">
                {project.category}
              </span>
            </div>
            
            <h2 className="text-4xl font-black uppercase tracking-[-0.04em] sm:text-5xl md:text-6xl text-black leading-[0.9]">
              {project.title}
            </h2>
            <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-black/60">
              {project.description}
            </p>
          </div>
          
          <div className="mt-8 flex items-end justify-between">
            <div className="flex flex-wrap gap-2 max-w-[75%]">
              {project.tech.map((t: string) => (
                <span key={t} className="border border-black px-3 py-1 font-mono text-[10px] font-bold uppercase text-black bg-white">
                  {t}
                </span>
              ))}
            </div>
            <Magnetic strength={50}>
              <a href={project.link} className="flex h-16 w-16 items-center justify-center border-2 border-black bg-[#c9ff00] text-black transition-transform hover:scale-110 shadow-[4px_4px_0_#111]">
                <ArrowUpRight size={28} strokeWidth={2} />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="relative h-full w-full overflow-hidden border-l-2 border-black md:w-1/2 bg-black">
          <motion.div style={{ scale: imageScale }} className="h-full w-full">
            <img 
              src={project.img} 
              alt={project.title} 
              className="h-full w-full object-cover opacity-80 grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-[#c9ff00]/0 mix-blend-multiply transition duration-500 group-hover:bg-[#c9ff00]/20" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Portfolio() {
  const container = useRef(null);
  const workContainer = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  const { scrollY } = useScroll();
  
  const { scrollYProgress: workProgress } = useScroll({
    target: workContainer,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: pageProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const progressLine = useSpring(pageProgress, { stiffness: 100, damping: 20 });
  const cursorX = useSpring(cursor.x, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(cursor.y, { stiffness: 500, damping: 40 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }
  });

  useEffect(() => {
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

  const bentoContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  const bentoItem = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="relative min-h-screen bg-[#f2f0e9] text-[#111111] selection:bg-[#c9ff00] selection:text-black font-sans overflow-x-hidden">

      <motion.div style={{ scaleX: progressLine }} className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-[#c9ff00]" />

      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      />

      <aside className="fixed bottom-0 left-0 top-0 z-[60] hidden w-16 flex-col items-center justify-between border-r-2 border-black bg-[#f2f0e9] py-8 lg:flex">
        <Magnetic>
          <button onClick={() => goTo("home")} className="font-black text-xl tracking-tighter">SM</button>
        </Magnetic>
        <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-black/40">
          Full-Stack Engineer · 2026
        </div>
        <div className="h-16 w-0.5 bg-black/20" />
      </aside>

      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={headerHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-4 z-[50] mx-4 lg:left-20 lg:mx-6 max-w-7xl lg:mr-auto rounded-none border-2 border-black bg-[#f2f0e9]/90 backdrop-blur-md shadow-[6px_6px_0_#111]"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] lg:hidden">SM / 2026</span>
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.25em] lg:block">Portfolio / 01</span>

          <nav className="hidden items-center gap-8 md:flex">
            {["work", "about"].map((id) => (
              <Magnetic key={id} strength={20}>
                <button onClick={() => goTo(id)} className="group relative font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                  {id}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#c9ff00] transition-all duration-300 group-hover:w-full" />
                </button>
              </Magnetic>
            ))}
          </nav>

          <Magnetic strength={20}>
            <a href="mailto:shehrozealim@gmail.com" className="hidden items-center gap-2 border-2 border-black bg-[#c9ff00] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#111] sm:flex">
              Available <ArrowUpRight size={14} />
            </a>
          </Magnetic>

          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border-2 border-black bg-[#c9ff00] md:hidden hover:bg-white transition-colors">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <div ref={container} className="relative z-[10] lg:pl-16 bg-[#f2f0e9] mb-[100vh] border-b-2 border-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

        <section id="home" className="relative flex min-h-screen w-full flex-col justify-center border-b-2 border-black px-6 pt-32 pb-16 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative z-10 mx-auto w-full max-w-[1500px] flex flex-col justify-between h-full min-h-[calc(100vh-12rem)]">
            
            <div className="grid gap-10 mt-10 lg:grid-cols-[1fr_auto]">
              <RevealText>
                <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] bg-white border border-black w-fit px-4 py-2 shadow-[2px_2px_0_#111]">
                  <span className="h-2 w-2 rounded-full bg-[#c9ff00] animate-pulse border border-black" />
                  System Online
                </div>
              </RevealText>

              <RevealText delay={0.1}>
                <div className="font-mono text-[10px] font-bold leading-5 text-black/50 lg:text-right uppercase tracking-[0.2em]">
                  Mumbai, India <br />
                  19.0760° N / 72.8777° E
                </div>
              </RevealText>
            </div>

            <div className="py-16 lg:py-24">
              <RevealText delay={0.2}>
                <h1 className="text-[16vw] font-black uppercase leading-[0.78] tracking-[-0.06em] lg:text-[11vw]">
                  <span className="block text-black">Build</span>
                  <span className="block pl-[10vw] text-transparent" style={{ WebkitTextStroke: '2px #111'}}>Things.</span>
                  <span className="block flex items-end gap-6">
                    Ship <span className="text-[#c9ff00] [text-shadow:4px_4px_0_#111]">Well.</span>
                  </span>
                </h1>
              </RevealText>

              <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_350px] lg:items-end">
                <RevealText delay={0.3}>
                  <p className="max-w-2xl text-xl font-bold leading-8 tracking-[-0.02em] sm:text-2xl text-black/80">
                    I am <span className="text-black bg-[#c9ff00] px-2 border border-black">Shehroze Malik</span>. I design and build resilient backend systems and craft pixel-perfect, fluid frontends.
                  </p>
                </RevealText>

                <RevealText delay={0.4}>
                  <div className="flex flex-col gap-4 p-6 border-2 border-black bg-white shadow-[8px_8px_0_#111]">
                    <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-black/50">
                      <Clock size={14} className="text-black" />
                      Local Time
                    </div>
                    <div className="font-mono text-xl font-black text-black">
                      {time || "Loading..."}
                    </div>
                  </div>
                </RevealText>
              </div>
            </div>


            <div className="flex items-end justify-between pt-8 border-t-2 border-black">
              <RevealText delay={0.5}>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                  Scroll / Explore
                </div>
              </RevealText>
              <RevealText delay={0.6}>
                <Magnetic strength={20}>
                  <button onClick={() => goTo("about")} className="group flex h-14 w-14 items-center justify-center border-2 border-black bg-black text-white hover:bg-[#c9ff00] hover:text-black transition-colors shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                    <ArrowDownRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                  </button>
                </Magnetic>
              </RevealText>
            </div>
          </div>
        </section>

        <section id="about" className="px-6 py-24 md:px-12 lg:py-32 border-b-2 border-black">
          <div className="mx-auto max-w-[1500px]">
            <RevealText>
              <div className="mb-16 flex items-center gap-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">01 / The Arsenal</span>
                <div className="h-0.5 w-full max-w-[200px] bg-black" />
              </div>
            </RevealText>

            <motion.div 
              variants={bentoContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-2"
            >

              <motion.div variants={bentoItem} className="group relative col-span-1 flex flex-col justify-between overflow-hidden border-2 border-black bg-white p-8 md:col-span-2 md:row-span-2 shadow-[8px_8px_0_#111] transition-transform hover:-translate-y-1">
                <div className="relative z-10">
                  <Code2 className="mb-6 text-black" size={32} />
                  <h3 className="text-3xl font-black uppercase tracking-[-0.04em] md:text-4xl text-black">Engineering with Intent.</h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-black/70">
                    Currently pursuing B.Tech in CSE. I don't just write code; I design systems. From raw database optimizations to creating fluid user interfaces, I obsess over the micro-details that elevate good products to great ones.
                  </p>
                </div>

                <div className="relative z-10 mt-10">
                  <div className="border-2 border-black bg-[#111] p-5 font-mono text-[11px] md:text-xs text-white shadow-[4px_4px_0_#c9ff00]">
                    <div className="flex gap-2 mb-4 border-b border-white/20 pb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <p><span className="text-[#c9ff00]">const</span> <span className="text-white">engineer</span> = <span className="text-[#c9ff00]">new</span> Developer();</p>
                    <p className="mt-2">engineer.<span className="text-blue-400">architect</span>(&#123;</p>
                    <p className="pl-4">scale: <span className="text-orange-400">"infinite"</span>,</p>
                    <p className="pl-4">ui: <span className="text-orange-400">"pixel-perfect"</span></p>
                    <p>&#125;);</p>
                    <div className="mt-4 flex items-center gap-2 text-[#c9ff00]">
                      <TerminalSquare size={12} />
                      <span className="uppercase tracking-widest font-bold text-[9px]">System compiled successfully.</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={bentoItem} className="col-span-1 border-2 border-black bg-[#f2f0e9] p-8 shadow-[8px_8px_0_#111] transition-transform hover:-translate-y-1 hover:bg-[#c9ff00]">
                <Server className="mb-6 text-black" size={24} />
                <h4 className="font-black text-xl uppercase tracking-[-0.02em] text-black">Backend</h4>
                <ul className="mt-4 space-y-3 font-mono text-[10px] font-bold uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">
                  <li className="border-b border-black/10 pb-2">Node.js / NestJS</li>
                  <li className="border-b border-black/10 pb-2">Microservices</li>
                  <li className="border-b border-black/10 pb-2">WebSockets</li>
                  <li>Docker / AWS</li>
                </ul>
              </motion.div>

              <motion.div variants={bentoItem} className="col-span-1 border-2 border-black bg-black text-[#f2f0e9] p-8 shadow-[8px_8px_0_#c9ff00] transition-transform hover:-translate-y-1">
                <Database className="mb-6 text-[#c9ff00]" size={24} />
                <h4 className="font-black text-xl uppercase tracking-[-0.02em] text-white">Persistence</h4>
                <ul className="mt-4 space-y-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white/70">
                  <li className="border-b border-white/20 pb-2">PostgreSQL</li>
                  <li className="border-b border-white/20 pb-2">MongoDB</li>
                  <li className="border-b border-white/20 pb-2">Redis</li>
                  <li>Prisma / Drizzle</li>
                </ul>
              </motion.div>

              <motion.div variants={bentoItem} className="col-span-1 border-2 border-black bg-white p-8 md:col-span-2 shadow-[8px_8px_0_#111] transition-transform hover:-translate-y-1 flex flex-col justify-center">
                <Layers className="mb-6 text-black" size={24} />
                <h4 className="font-black text-xl uppercase tracking-[-0.02em] text-black">Frontend Architecture</h4>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Zustand"].map(t => (
                    <span key={t} className="border-2 border-black bg-[#f2f0e9] px-4 py-2 font-mono text-[10px] font-bold uppercase text-black">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        <section id="work" ref={workContainer} className="relative w-full py-32 md:py-40 border-b-2 border-black">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 mb-20">
            <RevealText>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="mb-6 flex items-center gap-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">02 / Selected Works</span>
                    <div className="h-0.5 w-[100px] bg-black" />
                  </div>
                  <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                    Built for <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px #111'}}>the real world.</span>
                  </h2>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-[#c9ff00] border-2 border-black px-4 py-2 shadow-[4px_4px_0_#111]">
                  03 Projects / 2026
                </span>
              </div>
            </RevealText>
          </div>
          
          <div className="px-4 md:px-12 pb-32">
            {projects.map((project, i) => {
              const targetScale = 1 - ((projects.length - i) * 0.04);
              return (
                <Card 
                  key={`p_${i}`} 
                  i={i} 
                  project={project} 
                  progress={workProgress} 
                  range={[i * 0.25, 1]} 
                  targetScale={targetScale} 
                />
              );
            })}
          </div>
        </section>

      </div> 

      <footer className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#111111] flex flex-col justify-between pt-32 pb-12 px-6 lg:pl-24 md:px-12">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.2]">
          <div className="h-[40vw] w-[40vw] rounded-full bg-[#c9ff00] blur-[250px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-[#c9ff00] mb-8 border border-[#c9ff00] px-6 py-2">
            Got an idea?
          </p>
          <h2 className="text-[14vw] md:text-[11vw] font-black uppercase leading-[0.8] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(201,255,0,0.15)]">
            Let's <br/> Build.
          </h2>
          
          <Magnetic strength={40}>
            <a 
              href="mailto:shehrozealim@gmail.com"
              className="mt-16 group flex items-center gap-4 border-2 border-[#c9ff00] bg-transparent px-8 py-5 transition-all hover:bg-[#c9ff00] hover:text-black text-[#c9ff00]"
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
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} <span className="h-1.5 w-1.5 bg-[#c9ff00]" /> Shehroze Malik
          </p>
        </div>
      </footer>

    </main>
  );
}