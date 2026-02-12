"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { dramaticReveal, fadeInUp } from "@/lib/motionVariants";

export default function PersonalityCard() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} className="section-full relative overflow-hidden">
            {/* Spotlight background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={inView ? { opacity: [0.1, 0.3, 0.1] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-netflix-red/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
                {/* Label */}
                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-netflix-red/50 text-sm uppercase tracking-[0.3em] font-display mb-8"
                >
                    Your Streaming Personality
                </motion.p>

                {/* Card */}
                <motion.div
                    variants={dramaticReveal}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="relative mx-auto rounded-3xl overflow-hidden"
                >
                    {/* Glowing border pulse */}
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(229, 9, 20, 0.1)",
                                "0 0 60px rgba(229, 9, 20, 0.3)",
                                "0 0 20px rgba(229, 9, 20, 0.1)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-3xl"
                    />

                    <div className="relative glass-card rounded-3xl p-8 sm:p-12 border border-netflix-red/10">
                        {/* Emoji */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl sm:text-7xl mb-6"
                        >
                            🌙
                        </motion.div>

                        {/* Title */}
                        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
                            The Midnight Binger
                        </h2>

                        {/* Description */}
                        <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                            You come alive after midnight. While others sleep, you discover new
                            worlds. 73% of your watch time happens between 11 PM and 4 AM.
                        </p>

                        {/* Stats */}
                        <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10">
                            <div className="text-center">
                                <p className="font-display font-bold text-2xl text-netflix-red">2.3 AM</p>
                                <p className="text-white/30 text-sm mt-1">Avg. start time</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="font-display font-bold text-2xl text-netflix-red">4.7h</p>
                                <p className="text-white/30 text-sm mt-1">Per session</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="font-display font-bold text-2xl text-netflix-red">247</p>
                                <p className="text-white/30 text-sm mt-1">Late nights</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
