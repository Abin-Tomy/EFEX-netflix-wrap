"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motionVariants";

export default function Footer() {
    return (
        <motion.footer
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative py-16 border-t border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-netflix-red font-display font-bold text-lg tracking-wider">
                        NETFLIX
                    </span>
                    <span className="text-white/60 font-display font-light text-lg tracking-wider">
                        WRAP
                    </span>
                    <span className="text-white/30 font-display font-light text-lg">
                        2025
                    </span>
                </div>

                {/* Description */}
                <p className="text-white/20 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    A cinematic showcase experience. This is a fictional project and is not
                    affiliated with or endorsed by Netflix, Inc.
                </p>

                {/* Divider */}
                <div className="w-16 h-px bg-white/10 mx-auto mb-6" />

                {/* Credits */}
                <p className="text-white/15 text-xs">
                    Designed &amp; built with ❤️ — {new Date().getFullYear()}
                </p>
            </div>
        </motion.footer>
    );
}
