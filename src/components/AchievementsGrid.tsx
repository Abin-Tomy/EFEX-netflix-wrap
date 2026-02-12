"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AchievementCard from "./AchievementCard";
import { staggerContainer, fadeInUp } from "@/lib/motionVariants";

const achievements = [
    {
        icon: "🔥",
        title: "Binge Master",
        description: "Watched 5+ episodes in a single session, 23 times this year.",
    },
    {
        icon: "🌙",
        title: "Night Owl",
        description: "Started a show after midnight 147 times. Sleep is overrated.",
    },
    {
        icon: "🔁",
        title: "Rewatch Champion",
        description: "Rewatched your favorites 42 times. Comfort never gets old.",
    },
    {
        icon: "🎬",
        title: "Cliffhanger Addict",
        description: "Clicked 'Next Episode' within 5 seconds, 89% of the time.",
    },
    {
        icon: "🏆",
        title: "Genre Explorer",
        description: "Watched content from 12 different genres. Eclectic taste.",
    },
    {
        icon: "⚡",
        title: "Speed Watcher",
        description: "Finished 3 complete series in under a week each.",
    },
];

export default function AchievementsGrid() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section ref={ref} className="section-full relative py-20">
            <div className="max-w-6xl mx-auto px-4 w-full">
                {/* Section header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4">
                        Achievements Unlocked
                    </h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto">
                        Your badges of honor from a year well-streamed.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                    {achievements.map((achievement) => (
                        <AchievementCard key={achievement.title} {...achievement} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
