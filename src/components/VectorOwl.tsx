export default function VectorOwl({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Minimalist Geometric Owl */}
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" className="opacity-10" /> {/* Shield/Body outline */}
            <path d="M7 10C7 10 9 13 12 13C15 13 17 10 17 10" /> {/* Eyes/Brows curve */}
            <circle cx="9" cy="9" r="1.5" />
            <circle cx="15" cy="9" r="1.5" />
            <path d="M12 13V16" /> {/* Beak line */}
            <path d="M8 17L12 16L16 17" /> {/* Chin/Feather detail */}
            <path d="M4 7L12 10L20 7" /> {/* Top header line */}
        </svg>
    );
}
