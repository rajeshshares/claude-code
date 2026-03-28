import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
    },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  },
};

const STAGGER = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return { ref, inView };
}

const stats = [
  { value: '15+', label: 'Years in Product' },
  { value: '3', label: 'Top-tier companies' },
  { value: '80%', label: 'CodePup built by me' },
  { value: '1', label: 'Live Maven cohort' },
];

const menuItems = [
  { name: 'Work', href: '#work' },
  { name: 'Story', href: '#story' },
  { name: 'Teaching', href: '#teaching' },
  { name: 'Contact', href: '#contact' },
];

function HeroHeader() {
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrolled(v > 0.03));
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <header>
      <nav
        data-state={menuState ? 'active' : undefined}
        className={cn(
          'group fixed z-20 w-full border-b border-transparent transition-colors duration-300',
          scrolled && 'bg-[#F8F7F4]/80 backdrop-blur-3xl border-[#e8e5de]',
        )}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-4 lg:gap-0">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="/" aria-label="home" className="flex items-center">
                <span className="text-base font-bold tracking-tight text-[#111]">Rajesh P.</span>
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <ul className="hidden lg:flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-[#111] block duration-150 text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F8F7F4] group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="text-muted-foreground hover:text-[#111] block duration-150"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <a href="https://codepup.ai" target="_blank" rel="noreferrer">
                    CodePup AI
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href="#contact">Say hi</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default function Index() {
  const statsSection = useReveal();
  const workSection = useReveal();
  const bentoSection = useReveal();
  const contactSection = useReveal();

  return (
    <div
      className="min-h-[100dvh] bg-[#F8F7F4] text-[#111111]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      <HeroHeader />

      {/* ── Hero ── */}
      <main className="overflow-hidden">
        <section id="story">
          <div className="relative pt-24">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,#F8F7F4_75%)]" />
            <div className="mx-auto max-w-5xl px-6">
              <div className="sm:mx-auto lg:mr-auto">
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: { staggerChildren: 0.05, delayChildren: 0.4 },
                      },
                    },
                    ...transitionVariants,
                  }}
                >
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-violet-100 text-violet-700 ring-1 ring-violet-200">
                    Product · Founder · Builder
                  </span>

                  <h1 className="mt-8 max-w-2xl text-balance text-5xl font-extrabold tracking-[-0.035em] md:text-7xl lg:mt-14 leading-[0.95]">
                    Rajesh P.
                  </h1>

                  <p className="mt-8 max-w-xl text-pretty text-lg text-[#555] leading-relaxed">
                    15+ years building products people actually use. Founder of{' '}
                    <span className="text-violet-600 font-semibold">CodePup AI</span> — an AI website
                    and app builder for non-technical founders. Previously at Zynga, Flipkart, and
                    Walmart.
                  </p>

                  <div className="mt-12 flex items-center gap-2">
                    <div className="bg-foreground/10 rounded-[14px] border p-0.5">
                      <Button asChild size="lg" className="rounded-xl px-5 text-base">
                        <a href="#work">
                          <span className="text-nowrap">View my work</span>
                        </a>
                      </Button>
                    </div>
                    <Button asChild size="lg" variant="ghost" className="h-[42px] rounded-xl px-5 text-base">
                      <a href="#teaching">
                        <span className="text-nowrap">Teaching PMs to code</span>
                      </a>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="pt-24 pb-8 px-5 md:px-16 max-w-7xl mx-auto">
          <motion.div
            ref={statsSection.ref}
            variants={STAGGER}
            initial="hidden"
            animate={statsSection.inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e2db] rounded-[2rem] overflow-hidden ring-1 ring-[#e5e2db]"
          >
            {stats.map((s) => (
              <motion.div
                key={s.value}
                variants={FADE_UP}
                className="bg-[#F8F7F4] px-8 py-10 flex flex-col gap-1.5"
              >
                <span className="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#111] leading-none">
                  {s.value}
                </span>
                <span className="text-[10px] text-[#999] uppercase tracking-[0.15em] mt-1">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Work Bento ── */}
        <section id="work" className="py-32 px-5 md:px-16 max-w-7xl mx-auto">
          <motion.div
            ref={workSection.ref}
            variants={STAGGER}
            initial="hidden"
            animate={workSection.inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={FADE_UP} className="mb-3">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/[0.04] text-[#666]">
                Career
              </span>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              className="text-[clamp(2rem,5vw,4.5rem)] font-extrabold tracking-[-0.035em] leading-tight mb-12"
            >
              Where I've built.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* CodePup hero card */}
              <motion.div
                variants={FADE_UP}
                className="md:col-span-8 p-[3px] rounded-[2rem] bg-gradient-to-br from-violet-200 via-purple-100 to-[#F0EDFF] shadow-[0_24px_64px_rgba(109,40,217,0.12)]"
              >
                <div className="rounded-[calc(2rem-3px)] bg-white p-8 md:p-12 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)] flex flex-col justify-between gap-10 min-h-[320px]">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        C
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#aaa]">2022 – present</p>
                        <p className="font-semibold text-[#111] text-sm">CodePup AI</p>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111] leading-tight tracking-tight">
                      Founder & CEO
                    </h3>
                    <p className="text-[#666] leading-relaxed max-w-md text-sm md:text-base">
                      Built an AI-powered website and app builder for non-technical founders. Wrote roughly
                      80% of the product myself using Claude Code — no traditional dev background.
                    </p>
                  </div>
                  <a
                    href="https://codepup.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="group self-start flex items-center gap-2 bg-violet-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-violet-700 active:scale-[0.97]"
                  >
                    Visit CodePup
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110 text-[10px]">
                      ↗
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* PM card */}
              <motion.div
                variants={FADE_UP}
                className="md:col-span-4 p-[3px] rounded-[2rem] bg-[#edeae4] shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
              >
                <div className="rounded-[calc(2rem-3px)] bg-[#F8F7F4] p-8 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between min-h-[220px]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#bbb]">Core skill</span>
                  <div>
                    <p className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-[#111] leading-none">
                      PM
                    </p>
                    <p className="text-sm text-[#777] mt-3 leading-relaxed">
                      Strategy, roadmapping, growth, and 0→1 product launches.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Zynga */}
              <motion.div
                variants={FADE_UP}
                className="md:col-span-4 p-[3px] rounded-[2rem] bg-[#edeae4] shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="rounded-[calc(2rem-3px)] bg-white p-7 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col gap-3 min-h-[180px]">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#bbb]">2009 – 2013</p>
                  <p className="text-lg font-bold text-[#111]">Zynga</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    Product Manager — social & mobile gaming at scale.
                  </p>
                </div>
              </motion.div>

              {/* Flipkart */}
              <motion.div
                variants={FADE_UP}
                className="md:col-span-4 p-[3px] rounded-[2rem] bg-[#edeae4] shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="rounded-[calc(2rem-3px)] bg-white p-7 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col gap-3 min-h-[180px]">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#bbb]">2013 – 2017</p>
                  <p className="text-lg font-bold text-[#111]">Flipkart</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    Senior PM — India's largest e-commerce platform.
                  </p>
                </div>
              </motion.div>

              {/* Walmart */}
              <motion.div
                variants={FADE_UP}
                className="md:col-span-4 p-[3px] rounded-[2rem] bg-[#edeae4] shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="rounded-[calc(2rem-3px)] bg-white p-7 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col gap-3 min-h-[180px]">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#bbb]">2017 – 2022</p>
                  <p className="text-lg font-bold text-[#111]">Walmart</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    Director of Product — global retail technology.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Teaching ── */}
        <section id="teaching" className="py-24 px-5 md:px-16 max-w-7xl mx-auto">
          <motion.div
            ref={bentoSection.ref}
            variants={STAGGER}
            initial="hidden"
            animate={bentoSection.inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={FADE_UP} className="mb-3">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/[0.04] text-[#666]">
                Teaching
              </span>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              className="text-[clamp(2rem,5vw,4.5rem)] font-extrabold tracking-[-0.035em] leading-tight mb-12"
            >
              AI Coding for PMs.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <motion.div
                variants={FADE_UP}
                className="md:col-span-7 p-[3px] rounded-[2rem] bg-[#edeae4] shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
              >
                <div className="rounded-[calc(2rem-3px)] bg-white p-8 md:p-10 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col gap-6 min-h-[260px]">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 text-base">
                    ✦
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#bbb]">Maven · Live Cohort</p>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111] leading-tight tracking-tight">
                      AI Coding for Product Managers
                    </h3>
                    <p className="text-[#666] leading-relaxed text-sm md:text-base">
                      I teach non-technical PMs how to build real products using AI tools. The same way I
                      built CodePup — by doing it yourself, one prompt at a time.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={FADE_UP}
                className="md:col-span-5 p-[3px] rounded-[2rem] bg-gradient-to-br from-amber-50 to-orange-50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
              >
                <div className="rounded-[calc(2rem-3px)] bg-white/70 p-8 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-center gap-5 min-h-[260px]">
                  <p className="text-[clamp(1rem,1.8vw,1.15rem)] font-medium text-[#333] leading-relaxed tracking-tight italic">
                    "The next generation of PMs won't just spec features. They'll build them."
                  </p>
                  <span className="text-[10px] text-[#bbb] uppercase tracking-[0.15em]">Rajesh P.</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-36 px-5 md:px-16 max-w-7xl mx-auto">
          <motion.div
            ref={contactSection.ref}
            variants={STAGGER}
            initial="hidden"
            animate={contactSection.inView ? 'visible' : 'hidden'}
            className="text-center flex flex-col items-center gap-6"
          >
            <motion.div variants={FADE_UP}>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/[0.04] text-[#666]">
                Get in touch
              </span>
            </motion.div>

            <motion.h2
              variants={FADE_UP}
              className="text-[clamp(3rem,8vw,7rem)] font-extrabold tracking-[-0.04em] leading-none text-[#111]"
            >
              Let's talk.
            </motion.h2>

            <motion.p variants={FADE_UP} className="text-[#777] max-w-sm text-sm leading-relaxed">
              Founder collaborations, PM advice, or just curious about CodePup AI — my inbox is open.
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href="mailto:rajesh@codepup.ai"
                className="group flex items-center gap-2 bg-[#111] text-white text-sm font-semibold px-7 py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#2a2a2a] active:scale-[0.97] shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
              >
                Send an email
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110 text-xs">
                  ↗
                </span>
              </a>
              <a
                href="https://linkedin.com/in/rajeshp"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 bg-white text-[#111] text-sm font-semibold px-7 py-4 rounded-full ring-1 ring-black/[0.08] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-black/20 active:scale-[0.97] shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
              >
                LinkedIn
                <span className="w-6 h-6 rounded-full bg-black/[0.04] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110 text-xs">
                  ↗
                </span>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-[#e8e5de] py-10 px-5 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#bbb] tracking-wide">© 2026 Rajesh P. All rights reserved.</p>
          <p className="text-xs text-[#bbb]">Founder · CodePup AI · Product Manager</p>
        </footer>
      </main>
    </div>
  );
}
