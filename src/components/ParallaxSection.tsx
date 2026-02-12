"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number; // 0 = no parallax, positive = moves up slower, negative = moves up faster
    className?: string;
    id?: string;
}

export default function ParallaxSection({
    children,
    speed = 0.2,
    className = "",
    id,
}: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y, opacity }} className="will-change-transform">
                {children}
            </motion.div>
        </div>
    );
}
