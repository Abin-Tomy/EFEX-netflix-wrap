"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playSound: (name: string) => void;
}

const SoundContext = createContext<SoundContextType>({
    isMuted: true,
    toggleMute: () => { },
    playSound: () => { },
});

export const useSound = () => useContext(SoundContext);

export default function SoundManager({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(true);
    const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => !prev);
    }, []);

    const playSound = useCallback(
        (name: string) => {
            if (isMuted) return;
            const audio = audioRefs.current.get(name);
            if (audio) {
                audio.currentTime = 0;
                audio.volume = 0.3;
                audio.play().catch(() => { });
            }
        },
        [isMuted]
    );

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}
