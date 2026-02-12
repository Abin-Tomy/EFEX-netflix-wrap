"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, letterReveal } from "@/lib/motionVariants";

const title = "This was your year on screen.";

function ConfettiParticle({ delay }: { delay: number }) {
    const colors = ["#E50914", "#FF2E2E", "#FF6B6B", "#ffffff", "#B20710"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = `${Math.random() * 100}%`;
    const duration = 2 + Math.random() * 2;
    const size = 4 + Math.random() * 8;

    return (
        <motion.div
            className="confetti-particle"
            style={{
                left,
                top: "-10px",
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
            initial={{ opacity: 0, y: 0, rotate: 0 }}
            animate={{
                opacity: [0, 1, 1, 0],
                y: [0, window?.innerHeight || 800],
                rotate: [0, 360 + Math.random() * 360],
                x: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
                duration,
                delay,
                ease: "easeIn",
            }}
        />
    );
}

export default function FinalReveal() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });
    const [showConfetti, setShowConfetti] = useState(false);
    const [particles, setParticles] = useState<number[]>([]);

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => {
                setShowConfetti(true);
                setParticles(Array.from({ length: 50 }, (_, i) => i));
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    const handleReplay = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <section ref={ref} className="section-full relative overflow-hidden min-h-screen">
            {/* Confetti */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-20">
                    {particles.map((i) => (
                        <ConfettiParticle key={i} delay={i * 0.04} />
                    ))}
                </div>
            )}

            {/* Background glow */}
            <motion.div
                animate={
                    inView
                        ? {
                            opacity: [0.05, 0.15, 0.05],
                        }
                        : {}
                }
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-radial from-netflix-red/10 via-transparent to-transparent"
            />

            <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
                {/* Title */}
                <motion.h1
                    className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {title.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            variants={letterReveal}
                            className={`inline-block ${char === " " ? "w-2 sm:w-4" : ""
                                } ${["y", "e", "a", "r"].includes(char.toLowerCase()) && i > 13
                                    ? "text-netflix-red"
                                    : "text-white"
                                }`}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Replay button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 2.5, duration: 0.8 }}
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 50px rgba(229, 9, 20, 0.4)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleReplay}
                        className="px-10 py-4 bg-transparent border-2 border-netflix-red text-netflix-red font-display font-semibold text-lg rounded-full 
                       hover:bg-netflix-red hover:text-white transition-all duration-300"
                    >
                        Watch Again
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
