"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cinemaFade } from "@/lib/motionVariants";

const lines = [
    "Every story you watched...",
    "left a mark.",
];

function FloatingParticle({ delay, x, y }: { delay: number; x: string; y: string }) {
    return (
        <motion.div
            className="absolute w-1 h-1 rounded-full bg-netflix-red/30"
            style={{ left: x, top: y }}
            animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
            }}
            transition={{
                duration: 4,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export default function CinematicIntro() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section
            id="cinematic-intro"
            ref={ref}
            className="section-full relative overflow-hidden bg-black"
        >
            {/* Floating particles */}
            <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <FloatingParticle
                        key={i}
                        delay={i * 0.3}
                        x={`${Math.random() * 100}%`}
                        y={`${Math.random() * 100}%`}
                    />
                ))}
            </div>

            {/* Center content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
                {lines.map((line, i) => (
                    <motion.p
                        key={i}
                        variants={cinemaFade}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        transition={{ delay: i * 1.2 + 0.3 }}
                        className={`font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-6 ${i === 1 ? "text-netflix-red/80" : "text-white/70"
                            }`}
                    >
                        {line}
                    </motion.p>
                ))}
            </div>

            {/* Radial gradient spotlight */}
            <div className="absolute inset-0 bg-gradient-radial from-netflix-red/5 via-transparent to-transparent pointer-events-none" />
        </section>
    );
}
