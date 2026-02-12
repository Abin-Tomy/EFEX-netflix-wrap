"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motionVariants";

interface GenreCardProps {
    genre: string;
    percentage: number;
    icon: string;
    color: string;
    index: number;
}

export default function GenreCard({
    genre,
    percentage,
    icon,
    color,
    index,
}: GenreCardProps) {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{
                scale: 1.05,
                boxShadow: `0 0 30px ${color}20`,
            }}
            className="glass-card rounded-2xl p-6 cursor-pointer group transition-all duration-300"
        >
            {/* Icon */}
            <div className="text-3xl sm:text-4xl mb-4">{icon}</div>

            {/* Genre name */}
            <h3 className="font-display font-semibold text-lg sm:text-xl text-white mb-3">
                {genre}
            </h3>

            {/* Bar */}
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                />
            </div>

            {/* Percentage */}
            <p className="text-white/40 text-sm">{percentage}% of watch time</p>
        </motion.div>
    );
}
