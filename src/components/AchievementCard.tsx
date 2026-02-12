"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motionVariants";

interface AchievementCardProps {
    icon: string;
    title: string;
    description: string;
}

export default function AchievementCard({
    icon,
    title,
    description,
}: AchievementCardProps) {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(229, 9, 20, 0.15)",
            }}
            className="glass-card rounded-2xl p-6 sm:p-8 cursor-pointer group border border-white/5 hover:border-netflix-red/20 transition-colors duration-300"
        >
            {/* Icon */}
            <motion.div
                className="text-4xl sm:text-5xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {icon}
            </motion.div>

            {/* Title */}
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-white/40 text-sm leading-relaxed">{description}</p>

            {/* Unlocked badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-netflix-red/10 text-netflix-red text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-netflix-red animate-pulse" />
                Unlocked
            </div>
        </motion.div>
    );
}
