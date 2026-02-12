"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/motionVariants";
import AnimatedCounter from "./AnimatedCounter";

export default function BingeSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} className="section-full relative overflow-hidden">
            {/* Background flashing effect */}
            <div className="absolute inset-0">
                <motion.div
                    animate={
                        inView
                            ? {
                                opacity: [0.02, 0.06, 0.02],
                            }
                            : {}
                    }
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-netflix-red/5"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-netflix-red/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <motion.h2
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-white mb-2 leading-tight"
                >
                    You don&apos;t watch.
                </motion.h2>
                <motion.h2
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.3 }}
                    className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-netflix-red mb-12 leading-tight"
                >
                    You binge.
                </motion.h2>

                {/* Streak */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                >
                    <AnimatedCounter target={47} suffix="day streak" duration={2} />
                </motion.div>

                {/* Micro icons */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-6 text-3xl"
                >
                    {["🍿", "🛋️", "🌙", "☕", "🔥"].map((emoji, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                y: [0, -5, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="inline-block"
                        >
                            {emoji}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 1.2 }}
                    className="mt-8 text-white/30 text-lg"
                >
                    Your longest binge session: 14 episodes in one sitting
                </motion.p>
            </div>
        </section>
    );
}
