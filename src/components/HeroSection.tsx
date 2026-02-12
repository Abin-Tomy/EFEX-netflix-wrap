"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
            {/* Background Video/Image Layer with Parallax */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 z-0"
            >
                {/* Netflix-style poster grid background */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2669&auto=format&fit=crop')",
                    }}
                />

                {/* Dramatic vignette gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
            </motion.div>

            {/* Main Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 h-full flex flex-col justify-between max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12"
            >
                {/* Top Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-8 h-8 bg-[#E50914] rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.4)]">
                        <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-outfit)' }}>N</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-white/90 font-semibold tracking-wider text-xs sm:text-sm uppercase" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Netflix
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Wrap 2025
                        </span>
                    </div>
                </motion.div>

                {/* Center Content */}
                <div className="flex-1 flex items-center">
                    <div className="w-full max-w-4xl">
                        {/* Main Title - Netflix Style */}
                        <div className="mb-6 sm:mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden mb-2"
                            >
                                <h1
                                    className="text-[12vw] sm:text-[10vw] lg:text-[8.5vw] font-black leading-[0.85] tracking-tighter text-white"
                                    style={{ fontFamily: 'var(--font-anton)' }}
                                >
                                    18,742
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                            >
                                <h2
                                    className="text-[6vw] sm:text-[5vw] lg:text-[4vw] font-black leading-[0.9] tracking-tight text-white/90"
                                    style={{ fontFamily: 'var(--font-anton)' }}
                                >
                                    MINUTES WATCHED
                                </h2>
                            </motion.div>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mb-8 sm:mb-10 leading-relaxed"
                            style={{ fontFamily: 'var(--font-outfit)' }}
                        >
                            That&apos;s <span className="text-white font-semibold">13 days</span> of pure entertainment.
                            <br className="hidden sm:block" />
                            Your year on screen was unforgettable.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button
                                onClick={() => {
                                    document.getElementById("cinematic-intro")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="group relative px-8 py-4 bg-white text-black rounded-sm font-bold text-base sm:text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
                                style={{ fontFamily: 'var(--font-outfit)' }}
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <span>Play Your Wrap</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <button
                                onClick={() => {
                                    document.getElementById("cinematic-intro")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-sm font-semibold text-base sm:text-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all"
                                style={{ fontFamily: 'var(--font-outfit)' }}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4M12 8h.01" />
                                    </svg>
                                    <span>More Info</span>
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 pb-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                            <span className="text-lg">🎬</span>
                        </div>
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-outfit)' }}>
                                Top Genre
                            </p>
                            <p className="text-white font-bold text-sm sm:text-base" style={{ fontFamily: 'var(--font-outfit)' }}>
                                Sci-Fi Thriller
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                            <span className="text-lg">🔥</span>
                        </div>
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-outfit)' }}>
                                Longest Binge
                            </p>
                            <p className="text-white font-bold text-sm sm:text-base" style={{ fontFamily: 'var(--font-outfit)' }}>
                                14 Episodes
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                            <span className="text-lg">⭐</span>
                        </div>
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-outfit)' }}>
                                Favorite Show
                            </p>
                            <p className="text-white font-bold text-sm sm:text-base" style={{ fontFamily: 'var(--font-outfit)' }}>
                                Stranger Things
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Scroll
                    </span>
                    <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
