"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/motionVariants";

interface AnimatedCounterProps {
    target: number;
    duration?: number;
    suffix?: string;
    label?: string;
}

export default function AnimatedCounter({
    target,
    duration = 2.5,
    suffix = "",
    label,
}: AnimatedCounterProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);
    }, [inView, target, duration]);

    return (
        <div ref={ref} className="text-center">
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <span className="font-display font-bold text-6xl sm:text-8xl md:text-9xl number-blur text-white tabular-nums">
                    {count.toLocaleString()}
                </span>
                {suffix && (
                    <span className="font-display text-3xl sm:text-4xl md:text-5xl text-white/50 ml-3">
                        {suffix}
                    </span>
                )}
            </motion.div>
            {label && (
                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-lg sm:text-xl text-white/40 font-light tracking-wide"
                >
                    {label}
                </motion.p>
            )}
        </div>
    );
}
