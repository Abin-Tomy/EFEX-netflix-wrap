"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { dramaticReveal } from "@/lib/motionVariants";

export default function WrapSlide() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        setHoverPos({ x, y });
    };

    const handleMouseLeave = () => setHoverPos({ x: 0, y: 0 });

    return (
        <section ref={ref} className="section-full relative overflow-hidden">
            {/* Background subtle glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-netflix-red/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-netflix-red/60 text-sm sm:text-base uppercase tracking-[0.3em] font-display mb-8"
                >
                    Your Comfort Show
                </motion.p>

                {/* Card */}
                <motion.div
                    variants={dramaticReveal}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `perspective(1000px) rotateY(${hoverPos.x}deg) rotateX(${-hoverPos.y}deg)`,
                    }}
                    className="relative mx-auto max-w-sm sm:max-w-md rounded-2xl overflow-hidden gradient-border animate-glow-pulse cursor-pointer group transition-transform duration-200"
                >
                    {/* Poster placeholder */}
                    <div className="relative aspect-[2/3] bg-gradient-to-br from-netflix-dark via-netflix-gray to-netflix-dark overflow-hidden">
                        {/* Abstract cinematic visual */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-netflix-red/20 blur-xl animate-glow-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 sm:w-20 sm:h-20 text-netflix-red/60" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        {/* Text content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left">
                            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                                Stranger Things
                            </h3>
                            <p className="text-white/40 text-sm sm:text-base">
                                Rewatched 7 times this year
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-netflix-red/20 text-netflix-red text-xs font-medium">
                                    #1 Most Watched
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hover border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-netflix-red/0 group-hover:border-netflix-red/30 transition-colors duration-500 pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}
