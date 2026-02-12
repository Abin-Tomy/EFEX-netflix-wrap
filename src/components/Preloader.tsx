"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; // 2 seconds load time
        const startTime = performance.now();

        const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smoother counter
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setPercent(Math.floor(easeOut * 100));

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                setTimeout(() => setIsLoading(false), 500); // Small delay after 100%
            }
        };

        requestAnimationFrame(update);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="preloader"
                        initial={{ opacity: 1 }}
                        exit={{
                            y: "-100%",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                        }}
                        className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col items-center gap-8">
                            {/* Logo / N Icon */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E50914] rounded-sm flex items-center justify-center shadow-[0_0_40px_rgba(229,9,20,0.4)] relative"
                            >
                                <span className="font-display font-bold text-4xl sm:text-5xl text-white">N</span>
                                {/* Pulsing glow */}
                                <div className="absolute inset-0 bg-[#E50914] blur-xl opacity-50 animate-pulse rounded-sm" />
                            </motion.div>

                            {/* Counter */}
                            <div className="overflow-hidden h-[120px] sm:h-[160px] flex items-center justify-center">
                                <motion.h1
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="font-hero text-[100px] sm:text-[140px] leading-none text-white tracking-tighter"
                                >
                                    {percent}%
                                </motion.h1>
                            </div>

                            {/* Loading Bar */}
                            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    className="h-full bg-[#E50914]"
                                />
                            </div>

                            {/* Status text */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: percent > 50 ? 1 : 0 }}
                                className="font-display text-white/40 text-xs tracking-[0.2em] uppercase mt-4"
                            >
                                Buffering Memories...
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={isLoading ? "h-screen overflow-hidden" : ""}>
                {children}
            </div>
        </>
    );
}
