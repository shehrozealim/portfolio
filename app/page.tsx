"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Layers3,
  Link,
  Mail,
  MapPin,
  Menu,
  Server,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { url } from "inspector";

const heroPackages = [
  {
    name: "Next.js",
    className: "left-[48%] top-[22%]",
    delay: 0,
    duration: 5.5,
  },
  {
    name: "NestJS",
    className: "right-[12%] top-[18%]",
    delay: 0.8,
    duration: 6.5,
  },
  {
    name: "Express.js",
    className: "left-[70%] top-[28%]",
    delay: 1.4,
    duration: 6,
  },
  {
    name: "Tailwind CSS",
    className: "right-[4%] top-[33%]",
    delay: 0.5,
    duration: 7,
  },
  {
    name: "TypeScript",
    className: "left-[60%] top-[47%]",
    delay: 1.8,
    duration: 6.2,
  },
  {
    name: "Redis",
    className: "right-[16%] top-[49%]",
    delay: 1.1,
    duration: 5.8,
  },
  {
    name: "PostgreSQL",
    className: "right-[30%] top-[11%]",
    delay: 2,
    duration: 6.8,
  },
  {
    name: "WebSockets",
    className: "left-[49%] top-[35%]",
    delay: 1.2,
    duration: 7.2,
  },
];

const skills = [
  {
    title: "Languages",
    icon: Terminal,
    description: "The fundamentals I build everything around.",
    items: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    title: "Frontend",
    icon: Layers3,
    description: "Interfaces that feel fast, clean and intentional.",
    items: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "ShadCN UI",
      "Redux",
      "Zustand",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "APIs, real-time systems and application architecture.",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Redis",
      "WebSockets",
      "JWT",
    ],
  },
  {
    title: "Data",
    icon: Database,
    description: "Structured data and reliable persistence.",
    items: ["MongoDB", "PostgreSQL", "Prisma", "Drizzle"],
  },
  {
    title: "Cloud & DevOps",
    icon: Layers3,
    description: "Shipping and running applications in production.",
    items: ["AWS", "Docker", "Vercel", "Git", "Lambda", "S3"],
  },
];

const projects = [
  {
    number: "01",
    title: "Real-Time Chat",
    category: "REAL-TIME SYSTEM",
    description:
      "A low-latency communication platform built around WebSockets, secure authentication and asynchronous persistence.",
    tech: ["Node.js", "WebSockets", "Next.js", "JWT"],
    gradient: "from-cyan-400/20 via-cyan-400/5 to-transparent",
    url: "https://fakelf-chat-app.netlify.app/login",
    icon: Zap,
  },
  {
    number: "02",
    title: "Media Discovery",
    category: "FULL-STACK PLATFORM",
    description:
      "An IMDb-inspired media platform with an API aggregation layer, optimized media delivery and infinite discovery.",
    tech: ["Express.js", "Next.js", "REST APIs"],
    gradient: "from-violet-400/20 via-violet-400/5 to-transparent",
    url: "https://imbd-movie-stats.netlify.app/",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Price Tracking Engine",
    category: "DATA ENGINE",
    description:
      "A background processing system for concurrent API polling, caching and live optimistic UI updates.",
    tech: ["Node.js", "Tailwind", "ShadCN UI"],
    gradient: "from-blue-400/20 via-blue-400/5 to-transparent",
    url: "https://aio-crypto-stats.netlify.app/",
    icon: Database,
  },
];

function SectionLabel({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-white/90">
          {number}
        </span>

        <div className="h-px w-8 bg-white/30" />

        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
          {title}
        </span>
      </div>

      {description && (
        <p className="max-w-xl text-sm leading-6 text-white/35">
          {description}
        </p>
      )}
    </div>
  );
}

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(
            500px circle at ${position.x}px ${position.y}px,
            rgba(255,255,255,0.075),
            transparent 45%
          )`,
        }}
      />

      {children}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 20,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rotateY.set((x - rect.width / 2) / 22);
    rotateX.set(-(y - rect.height / 2) / 22);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group"
    >
      <div className="relative h-full min-h-[550px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#0a0a0d] p-7">

        <div
          className={`pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br ${project.gradient} blur-3xl opacity-40 transition-all duration-700 group-hover:scale-125 group-hover:opacity-80`}
        />

        <div className="relative flex items-center justify-between">
          <span className="font-mono text-xs text-white/20">
            {project.number}
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-white/40">
            <project.icon size={15} />
          </div>
        </div>

        <div className="relative my-10 flex h-28 items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-28 w-28 rounded-full border border-white/[0.05] border-t-white/20"
          />

          <div className="absolute h-20 w-20 rounded-full border border-white/[0.06]" />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
          >
            <project.icon size={20} className="text-white/60" />
          </motion.div>
        </div>

        <div className="relative">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300/50">
            {project.category}
          </p>

          <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white transition-colors group-hover:text-cyan-100">
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-white/35">
            {project.description}
          </p>
        </div>

        <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 font-mono text-[9px] text-white/35"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
          >
            <ArrowUpRight size={16} className="text-white/50" onClick={() => window.open(project.url)}/>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingPackage({
  name,
  className,
  delay,
  duration,
}: {
  name: string;
  className: string;
  delay: number;
  duration: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });

  const springY = useSpring(mouseY, {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x =
      (e.clientX - rect.left - rect.width / 2) * 0.18;

    const y =
      (e.clientY - rect.top - rect.height / 2) * 0.18;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={`pointer-events-auto absolute hidden lg:block ${className}`}
    >
      <motion.div
        ref={ref}
        style={{
          x: springX,
          y: springY,
        }}
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.7,
          delay: delay + 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.08,
        }}
        className="
          group relative cursor-default
          rounded-full
          border border-white/[0.09]
          bg-white/[0.035]
          px-4 py-2
          font-mono text-[10px]
          tracking-wide
          text-white/35
          backdrop-blur-xl
          transition-[background,border-color,color,box-shadow]
          duration-300
          hover:border-cyan-300/20
          hover:bg-cyan-300/[0.06]
          hover:text-cyan-100/80
          hover:shadow-[0_0_30px_rgba(34,211,238,0.10)]
        "
      >

        <span
          className="
            mr-2 inline-block h-1.5 w-1.5 rounded-full
            bg-cyan-300/30
            transition-all duration-300
            group-hover:bg-cyan-300
            group-hover:shadow-[0_0_10px_rgba(103,232,249,0.8)]
          "
        />

        {name}

        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span
            className="
              absolute -inset-y-full left-[-40%]
              w-[25%] rotate-12
              bg-white/[0.08]
              blur-md
              transition-transform duration-700
              group-hover:translate-x-[500%]
            "
          />
        </span>
      </motion.div>
    </div>
  );
}


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 60,
    damping: 22,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 60,
    damping: 22,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileOpen(false);
  };


  const heroX1 = useTransform(smoothMouseX, [0, 1920], [-25, 25]);
  const heroY1 = useTransform(smoothMouseY, [0, 1080], [-20, 20]);

  const heroX2 = useTransform(smoothMouseX, [0, 1920], [30, -30]);
  const heroY2 = useTransform(smoothMouseY, [0, 1080], [20, -20]);

  const heroX3 = useTransform(smoothMouseX, [0, 1920], [-45, 45]);
  const heroY3 = useTransform(smoothMouseY, [0, 1080], [35, -35]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507] text-white">

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <motion.div
          style={{
            left: smoothMouseX,
            top: smoothMouseY,
            x: "-50%",
            y: "-50%",
          }}
          className="absolute h-[550px] w-[550px] rounded-full bg-cyan-400/[0.035] blur-[100px]"
        />

        <motion.div
          style={{
            x: heroX2,
            y: heroY2,
          }}
          className="absolute left-[8%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.045] blur-[130px]"
        />

        <motion.div
          style={{
            x: heroX1,
            y: heroY1,
          }}
          className="absolute right-[5%] top-[28%] h-[550px] w-[550px] rounded-full bg-violet-500/[0.04] blur-[140px]"
        />

        <div className="absolute bottom-[10%] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.025] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.6)_100%)]" />
      </div>

      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
        className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
      />

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto mt-5 w-[calc(100%-2rem)] max-w-6xl">
          <nav className="flex items-center justify-between rounded-full border border-white/[0.08] bg-black/40 px-3 py-2 backdrop-blur-2xl">

            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-3 px-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/50" />
                <span className="relative h-2 w-2 rounded-full bg-cyan-300" />
              </span>

              <span className="text-sm font-medium tracking-tight">
                SM.
              </span>
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {["home", "about", "skills", "projects"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className="relative rounded-full px-4 py-2 text-xs capitalize text-white/35 transition-colors hover:text-white"
                  >
                    {activeSection === item && (
                      <motion.span
                        layoutId="nav"
                        className="absolute inset-0 rounded-full bg-white/[0.07]"
                      />
                    )}

                    <span className="relative">{item}</span>
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] md:hidden"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </nav>

          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 rounded-2xl border border-white/[0.08] bg-[#0a0a0c]/95 p-2 backdrop-blur-xl md:hidden"
            >
              {["home", "about", "skills", "projects"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className="block w-full rounded-xl px-4 py-3 text-left text-sm capitalize text-white/45 hover:bg-white/[0.04] hover:text-white"
                  >
                    {item}
                  </button>
                )
              )}
            </motion.div>
          )}
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <section
          id="home"
          className="relative flex min-h-screen items-center scroll-mt-20 pt-24"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-[47%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.025] blur-[100px]"
            />

            {[...Array(7)].map((_, index) => (
              <motion.span
                key={index}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.15, 0.5, 0.15],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 3 + index * 0.7,
                  delay: index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute hidden h-1 w-1 rounded-full bg-cyan-300/50 lg:block"
                style={{
                  left: `${18 + index * 11}%`,
                  top: `${20 + ((index * 17) % 55)}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 w-full py-20">
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mb-6 flex items-center gap-3 text-xs text-white/30">
                <span className="h-px w-8 bg-cyan-300/40" />
                SOFTWARE / FULL-STACK / SYSTEMS
              </div>

              <h1 className="relative z-10 max-w-5xl text-[4rem] font-semibold leading-[0.88] tracking-[-0.075em] sm:text-7xl md:text-[6.5rem] lg:text-[8rem]">
                Shehroze
                <br />
                <span className="bg-gradient-to-r from-white via-white to-white/25 bg-clip-text text-transparent">
                  Malik.
                </span>
              </h1>

              <div className="mt-8 grid max-w-4xl gap-7 md:grid-cols-[1fr_auto] md:items-end">
                <p className="relative z-10 max-w-2xl text-lg leading-8 text-white/40 md:text-xl">
                  Computer Science Engineering student building
                  full-stack products, real-time systems and scalable
                  backend infrastructure.
                </p>

                <div className="relative z-20 flex gap-2">
                  <motion.a
                    whileHover={{ y: -3, scale: 1.05 }}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/40 transition hover:text-white"
                  >
                    <GitBranch size={17} />
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -3, scale: 1.05 }}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/40 transition hover:text-white"
                  >
                    <Link size={17} />
                  </motion.a>
                </div>
              </div>

              <div className="relative z-20 mt-8 flex flex-wrap gap-3">
                <motion.a
                  href="mailto:shehrozealim@gmail.com"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
                >
                  Let&apos;s talk
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-6 py-3 text-sm text-white/60 backdrop-blur transition hover:text-white"
                >
                  View work
                </motion.button>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 text-xs text-white/25">
                <span className="flex items-center gap-2">
                  <MapPin size={13} />
                  Mumbai, India
                </span>

                <span className="flex items-center gap-2">
                  <Code2 size={13} />
                  Full-stack development
                </span>
              </div>
            </motion.div>

            <motion.button
              onClick={() => scrollTo("about")}
              animate={{
                y: [0, 7, 0],
                opacity: [0.25, 0.6, 0.25],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
            >
              <ArrowDown size={18} />
            </motion.button>
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {heroPackages.map((pkg) => (
              <FloatingPackage
                key={pkg.name}
                name={pkg.name}
                className={pkg.className}
                delay={pkg.delay}
                duration={pkg.duration}
              />
            ))}
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-24 py-20"
        >
          <SectionLabel
            number="01"
            title="About"
            description="A little context behind the developer."
          />

          <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
            <SpotlightCard className="p-7 sm:p-9">
              <p className="text-xl leading-8 text-white/65 sm:text-2xl">
                I&apos;m currently pursuing a B.Tech in Computer
                Science and Engineering at{" "}
                <span className="text-white">
                  Dwarkadas J. Sanghvi College of Engineering.
                </span>
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/35">
                My specialization covers IoT, Cybersecurity and
                Blockchain Technology. I enjoy turning complicated
                technical problems into simple user experiences.
              </p>
            </SpotlightCard>

            <SpotlightCard className="flex flex-col justify-between p-7 sm:p-9">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Education
                </p>

                <h3 className="mt-4 text-2xl font-semibold">
                  B.Tech CSE
                </h3>

                <p className="mt-2 text-sm text-white/35">
                  2025 — 2029
                </p>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Current CGPA
                </p>

                <p className="mt-1 text-4xl font-semibold tracking-[-0.05em] text-cyan-100">
                  8.93
                </p>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <section className="py-16">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] border-y border-white/[0.06] sm:grid-cols-4">
            {[
              ["8.93", "CGPA"],
              ["3", "Featured projects"],
              ["5+", "Core domains"],
              ["∞", "Things to build"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="px-5 py-7 sm:px-8"
              >
                <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {value}
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="scroll-mt-24 py-20"
        >
          <SectionLabel
            number="02"
            title="Stack"
            description="Tools and technologies I use to turn ideas into software."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.07,
                  }}
                  className={
                    index === 0
                      ? "md:col-span-2 lg:col-span-2"
                      : ""
                  }
                >
                  <SpotlightCard className="h-full p-6">
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                          <Icon
                            size={17}
                            className="text-cyan-200/70"
                          />
                        </div>

                        <span className="font-mono text-[10px] text-white/15">
                          0{index + 1}
                        </span>
                      </div>

                      <div className="mt-7">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {skill.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-white/30">
                          {skill.description}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {skill.items.map((item, i) => (
                          <motion.span
                            key={item}
                            whileHover={{
                              y: -2,
                            }}
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            whileInView={{
                              opacity: 1,
                              scale: 1,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              delay: index * 0.05 + i * 0.03,
                            }}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-xs text-white/40 transition hover:border-cyan-300/20 hover:text-cyan-100"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section
          id="projects"
          className="scroll-mt-24 py-20"
        >
          <SectionLabel
            number="03"
            title="Projects"
            description="A selection of systems and products I've worked on."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-white/[0.02] p-8 sm:p-10"
          >
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/[0.04] blur-[100px]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                    Currently building
                  </span>
                </div>

                <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  More systems.
                  <br />
                  More experiments.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
                  Exploring scalable architectures, real-time
                  applications and better ways to build products.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Real-time",
                  "Architecture",
                  "Backend",
                  "Product",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="rounded-2xl border border-white/[0.06] bg-black/20 p-4"
                  >
                    <p className="text-sm text-white/50">
                      {item}
                    </p>

                    <div className="mt-4 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-20">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative overflow-hidden rounded-[3rem] border border-white/[0.08] bg-gradient-to-br from-cyan-400/[0.07] via-transparent to-violet-400/[0.05] p-8 text-center sm:p-14"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
            />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/50">
                Have an idea?
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Let&apos;s make something
                <span className="text-white/30">
                  {" "}
                  interesting.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/35">
                Whether it&apos;s a product, experiment or technically
                challenging problem, I&apos;m always interested in
                building something worthwhile.
              </p>

              <motion.a
                href="mailto:shehrozealim@gmail.com"
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black"
              >
                <Mail size={15} />
                Get in touch
                <ArrowUpRight size={15} />
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium">
              Shehroze Malik.
            </p>

            <p className="mt-1 text-xs text-white/25">
              Full-stack developer & CS student.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <GitBranch size={16} className="text-white/25" />
            <Link size={16} className="text-white/25" />
            <Mail size={16} className="text-white/25" />

            <span className="ml-2 text-[10px] text-white/15">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}