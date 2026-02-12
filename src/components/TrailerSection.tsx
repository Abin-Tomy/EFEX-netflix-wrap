"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
    "In a world where sleep was optional...",
    "One viewer chose to press play.",
    "Again. And again.",
];

export default function TrailerSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} className="section-full relative overflow-hidden bg-black">
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                {lines.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            inView
                                ? {
                                    opacity: [0, 1, 1, 0],
                                    y: [30, 0, 0, -10],
                                }
                                : {}
                        }
                        transition={{
                            duration: 4,
                            delay: i * 3.5,
                            times: [0, 0.2, 0.7, 1],
                            ease: "easeInOut",
                        }}
                        className={`font-display text-2xl sm:text-3xl md:text-5xl font-light tracking-wide absolute inset-0 flex items-center justify-center px-6 ${i === 2 ? "text-netflix-red/80 italic" : "text-white/60"
                            }`}
                    >
                        {line}
                    </motion.p>
                ))}

                {/* Invisible spacer for height */}
                <div className="invisible text-5xl">&nbsp;</div>
            </div>
        </section>
    );
}
