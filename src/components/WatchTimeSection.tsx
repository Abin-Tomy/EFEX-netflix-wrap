"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/motionVariants";
import AnimatedCounter from "./AnimatedCounter";

export default function WatchTimeSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} className="section-full relative overflow-hidden">
            {/* Red glow background */}
            <motion.div
                animate={
                    inView
                        ? {
                            opacity: [0.05, 0.12, 0.05],
                        }
                        : {}
                }
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-radial from-netflix-red/10 via-transparent to-transparent"
            />

            <div className="relative z-10 text-center">
                {/* Label */}
                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-netflix-red/50 text-sm uppercase tracking-[0.3em] font-display mb-12"
                >
                    Total Watch Time
                </motion.p>

                {/* Counter */}
                <AnimatedCounter
                    target={18742}
                    duration={3}
                    suffix="minutes"
                    label="That's 13 days of non-stop streaming."
                />
            </div>
        </section>
    );
}
