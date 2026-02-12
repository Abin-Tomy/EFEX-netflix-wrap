"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSound } from "./SoundManager";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { isMuted, toggleMute } = useSound();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                >
                    <span className="text-netflix-red font-display font-bold text-xl tracking-wider">
                        NETFLIX
                    </span>
                    <span className="text-white font-display font-light text-xl tracking-wider">
                        WRAP
                    </span>
                </motion.div>

                {/* Mute Toggle */}
                <motion.button
                    onClick={toggleMute}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? (
                        <svg
                            className="w-5 h-5 text-white/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H3.75a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75h3"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-5 h-5 text-netflix-red"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v12.74a.75.75 0 01-1.28.53l-4.72-3.15H3.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h3"
                            />
                        </svg>
                    )}
                </motion.button>
            </div>

            {/* Scroll Progress */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-netflix-red origin-left"
                style={{ scaleX }}
            />
        </motion.nav>
    );
}
