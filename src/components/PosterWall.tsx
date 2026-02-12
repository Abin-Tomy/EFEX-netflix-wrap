"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const highResPosters = [
    // ROW 1
    { title: "Stranger Things", color: "from-red-900 to-red-950", id: 1 },
    { title: "Squid Game", color: "from-emerald-900 to-emerald-950", id: 2 },
    { title: "The Witcher", color: "from-slate-800 to-black", id: 3 },
    { title: "Wednesday", color: "from-purple-900 to-purple-950", id: 4 },
    { title: "Black Mirror", color: "from-zinc-900 to-black", id: 5 },
    { title: "Arcane", color: "from-blue-900 to-violet-950", id: 6 },
    { title: "Cyberpunk", color: "from-yellow-500 to-yellow-700", id: 7 },
    { title: "The Sandman", color: "from-indigo-900 to-black", id: 8 },
    { title: "Umbrella Academy", color: "from-gray-900 to-black", id: 9 },
    { title: "Dark", color: "from-amber-900 to-black", id: 10 },
    { title: "Money Heist", color: "from-red-700 to-red-900", id: 11 },
    { title: "Queens Gambit", color: "from-teal-900 to-black", id: 12 },
    // ROW 2
    { title: "Bridgerton", color: "from-sky-800 to-sky-950", id: 13 },
    { title: "The Crown", color: "from-yellow-800 to-yellow-950", id: 14 },
    { title: "Narcos", color: "from-orange-800 to-orange-950", id: 15 },
    { title: "Ozark", color: "from-cyan-900 to-blue-950", id: 16 },
    { title: "Mindhunter", color: "from-neutral-800 to-neutral-950", id: 17 },
    { title: "Cobra Kai", color: "from-red-800 to-black", id: 18 },
    { title: "Peaky Blinders", color: "from-stone-800 to-black", id: 19 },
    { title: "Breaking Bad", color: "from-green-900 to-green-950", id: 20 },
    { title: "Better Call Saul", color: "from-yellow-600 to-red-800", id: 21 },
    { title: "Love, Death & Robots", color: "from-pink-600 to-black", id: 22 },
    { title: "Drive to Survive", color: "from-red-600 to-black", id: 23 },
    { title: "Sex Education", color: "from-orange-500 to-orange-700", id: 24 },
];

export default function PosterWall() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Parallax layers
    // Row 1 moves LEFT (0% -> -50%)
    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    // Row 2 moves RIGHT (-50% -> 0%)
    const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

    // Background text parallax
    const textX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Fade in/out scaling effect for the whole section
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                {/* Cinematic Background Layer */}
                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-netflix-red/10 via-black to-black"
                />

                {/* Parallax Background Text */}
                <motion.div
                    style={{ x: textX, opacity }}
                    className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap z-0 select-none pointer-events-none"
                >
                    <span className="font-display font-bold text-[20vw] text-white/5 leading-none tracking-tighter">
                        ORIGINALS SERIES NETFLIX
                    </span>
                </motion.div>

                {/* Content Scaling Wrapper */}
                <motion.div
                    style={{ scale, opacity }}
                    className="relative z-10 w-full flex flex-col gap-8 sm:gap-12"
                >
                    {/* Header */}
                    <div className="text-center px-4 mb-4">
                        <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            Unlimited Stories.
                        </h2>
                        <p className="text-white/50 text-xl">
                            One massive year of entertainment.
                        </p>
                    </div>

                    {/* Row 1 (Movies Left) */}
                    <motion.div style={{ x: x1 }} className="flex gap-6 pl-8 will-change-transform">
                        {highResPosters.slice(0, 12).map((poster) => (
                            <PosterCard key={poster.id} poster={poster} />
                        ))}
                        {/* Duplicate for infinite feel if needed, usually seamless loop is complex but this is fine for linear scroll */}
                    </motion.div>

                    {/* Row 2 (Moves Right) */}
                    <motion.div style={{ x: x2 }} className="flex gap-6 pr-8 will-change-transform flex-row-reverse self-end w-[200%]">
                        {highResPosters.slice(12, 24).map((poster) => (
                            <PosterCard key={poster.id} poster={poster} />
                        ))}
                    </motion.div>

                </motion.div>

                {/* Fade overlay edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            </div>
        </section>
    );
}

function PosterCard({ poster }: { poster: typeof highResPosters[0] }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, zIndex: 10, filter: "brightness(1.2)" }}
            className="flex-shrink-0 w-48 sm:w-64 aspect-[2/3] rounded-xl overflow-hidden relative group cursor-pointer shadow-lg shadow-black/50"
        >
            {/* Background Gradient / Image Placeholder */}
            <div className={`absolute inset-0 bg-gradient-to-br ${poster.color}`} />

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            {/* Info Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display font-bold text-xl text-white leading-tight">
                    {poster.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-medium text-netflix-red bg-white/10 px-2 py-0.5 rounded">
                        TOP 10
                    </span>
                    <span className="text-xs text-white/60">98% Match</span>
                </div>
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-netflix-red/50 transition-colors duration-300 rounded-xl" />
        </motion.div>
    );
}
