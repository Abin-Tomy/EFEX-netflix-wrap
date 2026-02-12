"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell,
} from "recharts";
import GenreCard from "./GenreCard";
import { staggerContainer, fadeInUp } from "@/lib/motionVariants";

const genres = [
    { genre: "Sci-Fi", percentage: 35, icon: "🚀", color: "#E50914" },
    { genre: "Thriller", percentage: 25, icon: "🔪", color: "#FF4444" },
    { genre: "Drama", percentage: 20, icon: "🎭", color: "#CC0711" },
    { genre: "Comedy", percentage: 12, icon: "😂", color: "#FF6B6B" },
    { genre: "Horror", percentage: 5, icon: "👻", color: "#8B0000" },
    { genre: "Documentary", percentage: 3, icon: "📽️", color: "#A0522D" },
];

const chartData = genres.map((g) => ({
    name: g.genre,
    hours: Math.round(g.percentage * 1.87),
    color: g.color,
}));

export default function GenreSection() {
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
                        Your Genre DNA
                    </h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto">
                        Every viewer has a signature. Here&apos;s yours.
                    </p>
                </motion.div>

                {/* Genre cards grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-16"
                >
                    {genres.map((genre, i) => (
                        <GenreCard key={genre.genre} {...genre} index={i} />
                    ))}
                </motion.div>

                {/* Chart */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.5 }}
                    className="glass-card rounded-2xl p-6 sm:p-8"
                >
                    <h3 className="font-display font-semibold text-xl text-white mb-6">
                        Hours by Genre
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData} barCategoryGap="20%">
                            <XAxis
                                dataKey="name"
                                tick={{ fill: "#808080", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#808080", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                unit="h"
                            />
                            <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </section>
    );
}
