"use client";

import { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    AnimatePresence,
    useMotionValue,
    useVelocity,
    useSpring,
    useAnimationFrame
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

/* ═══════════════════════════════════════════
   NETFLIX WRAP 2025 — Single Page Experience
   ═══════════════════════════════════════════ */

// ── Mock Data ──────────────────────────────
const PARALLAX_POSTERS = [
    "/images/breakingbad.jpeg", "/images/bettercallsaul.jpeg", "/images/blackmiror.jpeg",
    "/images/bridgerton.jpeg", "/images/cobrakai.jpeg", "/images/crown.jpeg",
    "/images/cyberpunk.jpeg", "/images/formula1.jpeg", "/images/lovespiderrose.jpeg",
    "/images/mindhunter.jpeg", "/images/money.jpeg", "/images/narcos.jpeg",
    "/images/ozark.jpeg", "/images/peaky.jpeg", "/images/queens.jpeg",
    "/images/sandman.jpeg", "/images/sexeducation.jpeg", "/images/umberlla.jpeg"
];

const GENERES = [
    { name: "Sci-Fi", pct: 34, color: "#E50914" },
    { name: "Thriller", pct: 22, color: "#ffffff" },
    { name: "Drama", pct: 18, color: "#ffffff" },
    { name: "Comedy", pct: 14, color: "#ffffff" },
    { name: "Horror", pct: 8, color: "#E50914" },
    { name: "Anime", pct: 4, color: "#E50914" },
];

const SHOWS = [
    {
        title: "STRANGER THINGS",
        img: "/images/stranger-things.jpeg",
        banner: "/images/stranger-things.jpeg",
        match: 98,
        rank: 1,
        tag: "Your #1 Show",
        hours: 127,
        episodes: 34,
        rewatches: 4,
        desc: "You watched 34 episodes across all 4 seasons — and rewatched it 4 times. Your longest streak? 8 episodes in one sitting. This was your ultimate comfort show of 2025."
    },
    {
        title: "SQUID GAME",
        img: "/images/squid-game.jpeg",
        banner: "/images/squid-banner.jpeg",
        match: 95,
        rank: 2,
        tag: "Most Binged",
        hours: 48,
        episodes: 16,
        rewatches: 2,
        desc: "You binged both seasons in just 3 days. Season 2 dropped and you finished it in a single night — 7 episodes, zero breaks. Respect."
    },
    {
        title: "WEDNESDAY",
        img: "/images/wednesday.jpeg",
        banner: "/images/wednesday-banner.jpeg",
        match: 97,
        rank: 3,
        tag: "Guilty Pleasure",
        hours: 32,
        episodes: 8,
        rewatches: 3,
        desc: "8 episodes, rewatched 3 times. You couldn't get enough of Nevermore Academy. The dance scene alone? You replayed that 14 times."
    },
    {
        title: "THE WITCHER",
        img: "/images/the-witcher.jpeg",
        banner: "/images/witch-banner.jpeg",
        match: 92,
        rank: 4,
        tag: "Fantasy Escape",
        hours: 56,
        episodes: 24,
        rewatches: 1,
        desc: "24 episodes across 3 seasons. Your go-to weekend escape. You spent more time on the Continent than some characters did."
    },
    {
        title: "BLACK MIRROR",
        img: "/images/blackmiror.jpeg",
        banner: "/images/blackmiror.jpeg",
        match: 90,
        rank: 5,
        tag: "Mind Bender",
        hours: 41,
        episodes: 27,
        rewatches: 2,
        desc: "27 episodes that made you question reality. You paused 'White Bear' 6 times to process what just happened. Peak existential viewing."
    },
];

const ACHIEVEMENTS = [
    { icon: "🔥", title: "Binge Master", desc: "Watched 8+ episodes in one sitting" },
    { icon: "🌙", title: "Night Owl", desc: "70% of your viewing was after midnight" },
    { icon: "🔁", title: "Rewatch King", desc: "Rewatched Stranger Things 4 times" },
    { icon: "🎬", title: "Cliffhanger Addict", desc: "Never stopped mid-season" },
    { icon: "⚡", title: "Speed Watcher", desc: "Finished 3 series in one week" },
    { icon: "🌍", title: "World Explorer", desc: "Watched shows from 12 countries" },
];

function Preloader({ onComplete }: { onComplete: () => void }) {
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const start = performance.now();
        const dur = 2200;
        const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setPct(Math.floor((1 - Math.pow(1 - p, 3)) * 100));
            if (p < 1) requestAnimationFrame(tick);
            else setTimeout(onComplete, 400);
        };
        requestAnimationFrame(tick);
    }, [onComplete]);

    return (
        <motion.div
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative mb-8"
            >
                <div className="w-20 h-20 flex items-center justify-center">
                    <img src="/images/Netflix_Symbol_RGB.png" alt="Netflix" className="w-full h-full object-contain" />
                </div>
            </motion.div>

            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bebas text-[120px] sm:text-[160px] leading-none text-white"
            >
                {pct}
            </motion.span>

            <div className="w-48 h-[3px] bg-white/10 rounded-full mt-6 overflow-hidden">
                <motion.div
                    animate={{ width: `${pct}%` }}
                    className="h-full bg-[#E50914] rounded-full"
                />
            </div>

            <motion.p
                animate={{ opacity: pct > 40 ? 0.5 : 0 }}
                className="font-inter text-white/50 text-xs tracking-[0.25em] uppercase mt-6"
            >
                Loading your memories...
            </motion.p>
        </motion.div>
    );
}

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, value, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Parallax Text ──────────────────────────
function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity?: number }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax-text-container overflow-hidden whitespace-nowrap flex flex-nowrap m-0 leading-[0.85] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.04] pointer-events-none w-full">
            <motion.div style={{ x }} className="font-bebas text-[20vw] sm:text-[30vw] font-bold uppercase flex flex-nowrap gap-8 text-white">
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
            </motion.div>
        </div>
    );
}

// Helper for wrap
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

// ══════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════
export default function Home() {
    // ... existing Home component logic ...
    // (imports need to include useMotionValue, useVelocity, useSpring, useAnimationFrame from framer-motion)
    // updating imports at top of file separately
    const [loading, setLoading] = useState(true);

    // Hero parallax
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroTextY = useTransform(heroScroll, [0, 1], [0, 200]);
    const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
    const heroBgScale = useTransform(heroScroll, [0, 1], [1, 1.2]);

    // Poster wall parallax
    const wallRef = useRef(null);
    const { scrollYProgress: wallScroll } = useScroll({ target: wallRef });
    const row1X = useTransform(wallScroll, [0, 1], ["0%", "-40%"]);
    const row2X = useTransform(wallScroll, [0, 1], ["-40%", "0%"]);

    // Binge parallax
    const bingeRef = useRef(null);
    const { scrollYProgress: bingeScroll } = useScroll({ target: bingeRef, offset: ["start end", "end start"] });
    const bingeTextLeft = useTransform(bingeScroll, [0, 1], [-200, 200]);
    const bingeTextRight = useTransform(bingeScroll, [0, 1], [300, -300]);

    // Personality Parallax
    const personalityRef = useRef(null);
    const { scrollYProgress: personalityScroll } = useScroll({ target: personalityRef, offset: ["start end", "end start"] });
    const personalityY = useTransform(personalityScroll, [0, 1], [-100, 100]);
    const personalityRotate = useTransform(personalityScroll, [0, 1], [-5, 5]);

    const [activeShowIndex, setActiveShowIndex] = useState(0);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            <div className={loading ? "h-screen overflow-hidden" : ""}>
                {/* ═══ NAV ═══ */}
                <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between mix-blend-difference">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 flex items-center justify-center">
                            <img src="/images/Netflix_Symbol_RGB.png" alt="Netflix" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-inter text-sm font-medium text-white tracking-wider uppercase ml-2">Wrap 2025</span>
                    </div>
                </nav>

                {/* ═══ SECTION 1: HERO ═══ */}
                <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                    {/* BG */}
                    <motion.div style={{ scale: heroBgScale }} className="absolute inset-0">
                        <img src="/images/netflix hero-image.jpg" alt="Hero Background" className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
                    </motion.div>

                    {/* Content */}
                    <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={!loading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="font-inter text-[#E50914] text-sm sm:text-base font-semibold tracking-[0.3em] uppercase mb-8"
                        >
                            Your 2025 in Review
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={!loading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="mb-8 w-full max-w-2xl px-4"
                        >
                            <img src="/images/Netflix_Logo_RGB.png" alt="Netflix Logo" className="w-full h-auto mb-4 mx-auto max-w-[400px]" />
                            <h1 className="font-bebas text-[12vw] sm:text-[10vw] lg:text-[140px] leading-[0.85] tracking-tight text-white">
                                WRAPPED
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={!loading ? { opacity: 1 } : {}}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="font-inter text-white/60 text-base sm:text-lg max-w-lg mx-auto mb-10"
                        >
                            Every frame you watched. Every story you lived. Relive your year on screen.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={!loading ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
                            className="font-inter font-semibold text-base px-10 py-4 bg-[#E50914] text-white rounded-sm hover:bg-[#f6121d] transition-colors shadow-[0_0_30px_rgba(229,9,20,0.4)]"
                        >
                            ▶ Start Your Wrap
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={!loading ? { opacity: 1 } : {}}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                    >
                        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M19 14l-7 7m0 0l-7-7" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ═══ SECTION 2: TOTAL MINUTES ═══ */}
                <section id="stats" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />

                    {/* Parallax Background Text */}
                    <ParallaxText baseVelocity={-2}>WATCH TIME WATCH TIME</ParallaxText>

                    <div className="relative z-10 text-center px-6">
                        <Reveal>
                            <p className="font-inter text-white/40 text-sm tracking-[0.3em] uppercase mb-4">Total Watch Time</p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <h2 className="font-bebas text-[22vw] sm:text-[16vw] lg:text-[12vw] leading-none text-white">
                                <Counter value={18742} />
                            </h2>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="font-bebas text-4xl sm:text-6xl text-white/80 mt-2">MINUTES</p>
                        </Reveal>
                        <Reveal delay={0.45}>
                            <p className="font-inter text-white/50 text-lg sm:text-xl mt-6 max-w-md mx-auto">
                                That&apos;s <span className="text-[#E50914] font-semibold">13 days</span> of pure, non-stop entertainment.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* ═══ SECTION 3: YOUR TOP SHOWS & GENRE DNA ═══ */}
                <section className="relative min-h-screen py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-black via-[#0a0505] to-black">
                    {/* Dynamic Background Banner */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeShowIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute top-0 inset-x-0 h-[80vh] pointer-events-none"
                        >
                            <img src={SHOWS[activeShowIndex].banner} alt="" className="w-full h-full object-cover mask-gradient-to-b" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
                        <Reveal>
                            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 mb-20">
                                {/* Left Column: Featured Show Slideshow */}
                                <div className="flex-1 max-w-2xl w-full">
                                    <Swiper
                                        modules={[Autoplay, EffectCoverflow]}
                                        effect={'fade'}
                                        fadeEffect={{ crossFade: true }}
                                        speed={1000}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                        loop={true}
                                        onSlideChange={(swiper) => setActiveShowIndex(swiper.realIndex)}
                                        className="w-full"
                                    >
                                        {SHOWS.map((show, i) => (
                                            <SwiperSlide key={i}>
                                                <div className="bg-transparent">
                                                    <p className="font-inter text-[#E50914] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-6">#{show.rank} Most Watched</p>
                                                    <h2 className="font-bebas text-7xl sm:text-8xl lg:text-9xl text-white leading-[0.85] mb-6">
                                                        {show.title}
                                                    </h2>

                                                    <div className="flex items-center gap-4 text-white/60 text-sm font-semibold mb-6 tracking-wider uppercase">
                                                        <span>{show.hours} Hours</span>
                                                        <span>•</span>
                                                        <span>{show.episodes} Episodes</span>
                                                        <span>•</span>
                                                        <span>{show.rewatches}x Rewatched</span>
                                                    </div>

                                                    <p className="font-inter text-white/80 text-lg leading-relaxed mb-8 text-shadow-sm min-h-[100px]">
                                                        {show.desc}
                                                    </p>

                                                    <div className="flex items-center gap-4">
                                                        <span className="font-inter text-sm font-bold text-[#46d369] bg-white/10 px-3 py-1 rounded">{show.tag}</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Right Column: Genre DNA (Static) */}
                                <div className="flex-1 w-full lg:max-w-xl bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-white/5">
                                    <p className="font-inter text-[#E50914] text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">Genre DNA</p>
                                    <h3 className="font-bebas text-4xl sm:text-5xl text-white mb-8">WHAT YOU WATCHED</h3>
                                    <div className="space-y-5">
                                        {GENERES.map((g, i) => (
                                            <div key={g.name} className="flex items-center gap-4 group">
                                                <span className="font-bebas text-xl text-white/80 w-24">{g.name}</span>
                                                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden relative">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${g.pct}%` }}
                                                        viewport={{ once: true, margin: "-50px" }}
                                                        transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                                        className="h-full rounded-full relative"
                                                        style={{ background: `linear-gradient(90deg, ${g.color}, ${g.color}88)` }}
                                                    />
                                                </div>
                                                <span className="font-bebas text-xl text-white/60 w-12 text-right">{g.pct}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row: Carousel */}
                            <div className="w-full border-t border-white/10 pt-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-inter text-white/50 text-sm font-semibold tracking-widest uppercase">Based On Your 2025 Wrap, You&apos;ll Love</h3>
                                </div>

                                <Swiper
                                    grabCursor={true}
                                    centeredSlides={false}
                                    slidesPerView={'auto'}
                                    spaceBetween={20}
                                    loop={true}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                    breakpoints={{
                                        640: { slidesPerView: 2, spaceBetween: 20 },
                                        768: { slidesPerView: 3, spaceBetween: 30 },
                                        1024: { slidesPerView: 4, spaceBetween: 30 },
                                        1280: { slidesPerView: 5, spaceBetween: 40 },
                                    }}
                                    modules={[Autoplay]}
                                    className="w-full !pb-12"
                                >
                                    {[...SHOWS.slice(1), ...SHOWS].map((show, i) => (
                                        <SwiperSlide key={`${show.title}-${i}`} className="!w-[200px] sm:!w-[240px]">
                                            <div className="group relative aspect-[2/3] rounded-md overflow-hidden bg-[#141414] cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                                                <img src={show.img} alt={show.title} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <h4 className="font-bebas text-xl text-white mb-1 truncate">{show.title}</h4>
                                                    <div className="flex items-center gap-2 text-[10px] text-[#46d369] font-bold">
                                                        <span>{show.match}% Match</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══ SECTION 5: BINGE MODE ═══ */}
                <section ref={bingeRef} className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0000] via-black to-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.08),transparent_60%)]" />
                    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto overflow-hidden">
                        <Reveal>
                            <p className="font-inter text-[#E50914] text-sm tracking-[0.3em] uppercase mb-6">Binge Mode</p>
                        </Reveal>

                        <div className="mb-12 py-10 flex flex-col items-center">
                            <motion.h2 style={{ x: bingeTextLeft }} className="font-bebas text-6xl sm:text-8xl lg:text-[10rem] leading-[0.85] text-white w-full text-center">
                                YOU DON&apos;T
                            </motion.h2>
                            <motion.h2 style={{ x: bingeTextRight }} className="font-bebas text-6xl sm:text-8xl lg:text-[10rem] leading-[0.85] text-white my-2 w-full text-center">
                                WATCH.
                            </motion.h2>
                            <motion.h2 style={{ x: bingeTextLeft }} className="font-bebas text-6xl sm:text-8xl lg:text-[10rem] leading-[0.85] text-[#E50914] w-full text-center">
                                YOU BINGE.
                            </motion.h2>
                        </div>

                        <Reveal delay={0.3}>
                            <div className="flex items-center justify-center gap-8 sm:gap-16">
                                <div>
                                    <p className="font-bebas text-6xl sm:text-8xl text-white"><Counter value={14} duration={1.5} /></p>
                                    <p className="font-inter text-white/40 text-xs sm:text-sm tracking-widest uppercase mt-1">Episode Streak</p>
                                </div>
                                <div className="w-px h-20 bg-white/10" />
                                <div>
                                    <p className="font-bebas text-6xl sm:text-8xl text-white"><Counter value={47} duration={1.5} /></p>
                                    <p className="font-inter text-white/40 text-xs sm:text-sm tracking-widest uppercase mt-1">Series Finished</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══ SECTION 6: YOUR PERSONALITY ═══ */}
                <section ref={personalityRef} className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0000]" />

                    {/* Vertical Parallax Text Background */}
                    <motion.div
                        style={{ y: personalityY, opacity: 0.1 }}
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap text-center"
                    >
                        <h2 className="font-bebas text-[20vw] leading-none text-white/10 blur-sm select-none">
                            PERSONALITY
                        </h2>
                    </motion.div>

                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <Reveal>
                            <p className="font-inter text-[#E50914] text-sm tracking-[0.3em] uppercase mb-8">Your Streaming Personality</p>
                        </Reveal>

                        <div className="relative group">
                            {/* Floating Emoji/Icon Parallax */}
                            <motion.div
                                style={{ y: useTransform(personalityScroll, [0, 1], [50, -50]), rotate: personalityRotate }}
                                className="absolute -top-20 -right-10 sm:-right-20 text-[8rem] sm:text-[10rem] drop-shadow-2xl z-20 pointer-events-none"
                            >
                                🦉
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
                                whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                                transition={{ duration: 0.8, type: "spring" }}
                                whileHover={{ scale: 1.02, rotateY: 5 }}
                                className="relative p-10 sm:p-14 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_50px_rgba(229,9,20,0.1)] overflow-hidden"
                            >
                                {/* Animated Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/20 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Scanline/Noise Texture */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6 backdrop-blur-md"
                                    >
                                        <p className="font-inter text-white/80 text-[10px] tracking-widest uppercase font-bold">Top 1% Viewer</p>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4, type: "spring" }}
                                        className="font-bebas text-7xl sm:text-9xl text-white mb-6 drop-shadow-lg group-hover:text-[#ff4d5a] transition-colors duration-300"
                                    >
                                        THE MIDNIGHT<br />BINGER
                                    </motion.h2>

                                    <motion.div
                                        initial={{ maxWidth: 0 }}
                                        whileInView={{ maxWidth: "5rem" }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="h-px w-20 bg-gradient-to-r from-transparent via-[#E50914] to-transparent mx-auto mb-6"
                                    />

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="font-inter text-white/70 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed"
                                    >
                                        You live for the late-night marathon. Silence, darkness, and <span className="text-white font-semibold">"just one more episode."</span> Sleep is optional when the story is this good.
                                    </motion.p>
                                </div>

                                {/* Dynamic Glow Border (Pulse) */}
                                <div className="absolute inset-0 rounded-3xl border border-[#E50914]/30 animate-pulse pointer-events-none" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══ SECTION 7: ACHIEVEMENTS ═══ */}
                <section className="relative py-24 sm:py-32 overflow-hidden bg-[#050505]">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

                    <div className="relative z-10 max-w-7xl mx-auto px-6">
                        <Reveal>
                            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
                                <div>
                                    <p className="font-inter text-[#E50914] text-sm tracking-[0.3em] uppercase mb-4">Player Profile</p>
                                    <h2 className="font-bebas text-6xl sm:text-8xl text-white leading-none">UNLOCKED<br /><span className="text-white/20">ACHIEVEMENTS</span></h2>
                                </div>
                                <div className="hidden sm:block text-right">
                                    <p className="font-bebas text-4xl text-white">6 / 6</p>
                                    <p className="font-inter text-white/40 text-xs tracking-widest uppercase">Completed</p>
                                </div>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ACHIEVEMENTS.map((a, i) => (
                                <Reveal key={a.title} delay={i * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="group relative h-full p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#E50914]/50 hover:to-[#E50914]/10 transition-colors duration-500"
                                    >
                                        <div className="relative h-full bg-[#0a0a0a] rounded-xl p-8 overflow-hidden border border-white/5 group-hover:border-transparent transition-colors">
                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out" />

                                            <div className="flex items-start justify-between mb-8">
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#E50914]/20 group-hover:text-white transition-all duration-300">
                                                    {a.icon}
                                                </div>
                                                <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-white/50 tracking-widest uppercase group-hover:bg-[#E50914] group-hover:text-white group-hover:border-[#E50914] transition-colors">
                                                    Unlocked
                                                </div>
                                            </div>

                                            <h3 className="font-bebas text-3xl text-white mb-3 group-hover:text-[#E50914] transition-colors">{a.title}</h3>
                                            <p className="font-inter text-white/50 text-sm leading-relaxed mb-6">{a.desc}</p>

                                            {/* Fake Progress Bar */}
                                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: "100%" }}
                                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                                    className="h-full bg-[#E50914]"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ SECTION 8: POSTER WALL (Parallax) ═══ */}
                <section ref={wallRef} className="relative h-[250vh]">
                    <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.06),transparent_60%)]" />

                        <Reveal>
                            <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white text-center mb-8 relative z-10">UNLIMITED STORIES</h2>
                        </Reveal>

                        {/* Row 1 — moves left */}
                        <motion.div style={{ x: row1X }} className="flex gap-4 sm:gap-6 mb-4 sm:mb-6 will-change-transform">
                            {[...PARALLAX_POSTERS].map((img, i) => (
                                <div key={`r1-${i}`} className="flex-shrink-0 w-36 sm:w-48 lg:w-56 aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 relative group">
                                    <img
                                        src={img}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            ))}
                        </motion.div>

                        {/* Row 2 — moves right */}
                        <motion.div style={{ x: row2X }} className="flex gap-4 sm:gap-6 will-change-transform">
                            {[...PARALLAX_POSTERS].reverse().map((img, i) => (
                                <div key={`r2-${i}`} className="flex-shrink-0 w-36 sm:w-48 lg:w-56 aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 relative group">
                                    <img
                                        src={img}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            ))}
                        </motion.div>

                        {/* Edge fades */}
                        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
                    </div>
                </section>

                {/* ═══ SECTION 9: FINAL REVEAL ═══ */}
                <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.1),transparent_50%)]" />
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <Reveal>
                            <h2 className="font-bebas text-6xl sm:text-8xl lg:text-[10rem] leading-[0.85] text-white mb-8">
                                THIS WAS YOUR<br />
                                <span className="text-[#E50914]">YEAR ON SCREEN.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="font-inter text-white/50 text-lg sm:text-xl max-w-lg mx-auto mb-10">
                                Every late night. Every binge. Every &quot;just one more episode.&quot;
                                <br />It all added up to something unforgettable.
                            </p>
                        </Reveal>
                        <Reveal delay={0.5}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="font-inter font-semibold text-base px-10 py-4 border border-white/20 text-white rounded-sm hover:bg-white/10 transition-colors"
                            >
                                ↑ Watch It Again
                            </motion.button>
                        </Reveal>
                    </div>
                </section>

                {/* ═══ FOOTER ═══ */}
                <footer className="relative py-12 border-t border-white/5">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <img src="/images/Netflix_Symbol_RGB.png" alt="Netflix" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-inter text-white/40 text-sm tracking-wider">Netflix Wrap 2025</span>
                        </div>
                        <p className="font-inter text-white/20 text-xs">A cinematic showcase experience. Not affiliated with Netflix, Inc.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
