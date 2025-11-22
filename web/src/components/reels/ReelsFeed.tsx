"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, Share2, MessageCircle, Play } from "lucide-react";

export default function ReelsFeed({ reels }: { reels: any[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const index = Math.round(container.scrollTop / container.clientHeight);
            setActiveIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    if (!reels || reels.length === 0) {
        return <div className="text-center p-10">No reels available yet.</div>;
    }

    return (
        <div
            ref={containerRef}
            className="h-[calc(100vh-80px)] w-full max-w-md mx-auto overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black rounded-3xl shadow-2xl"
        >
            {reels.map((reel, index) => (
                <div key={reel.id} className="h-full w-full snap-start relative flex items-center justify-center bg-gray-900">
                    {/* Video Player (Placeholder for now, using img or video tag) */}
                    <video
                        src={reel.video_url}
                        className="h-full w-full object-cover"
                        loop
                        muted
                        playsInline
                        autoPlay={index === activeIndex}
                        poster={reel.thumbnail_url}
                    />

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
                        <div className="flex items-end justify-between">
                            <div className="text-white flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden border border-white/50">
                                        <img src={`https://ui-avatars.com/api/?name=${reel.author}&background=random`} alt={reel.author} />
                                    </div>
                                    <span className="font-bold text-sm">{reel.author}</span>
                                </div>
                                <p className="text-sm font-medium leading-snug">{reel.title}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-6 items-center text-white">
                                <button className="flex flex-col items-center gap-1 group">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-red-500/20 transition-colors">
                                        <Heart size={24} className="group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold">{reel.likes}</span>
                                </button>
                                <button className="flex flex-col items-center gap-1">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                                        <MessageCircle size={24} />
                                    </div>
                                    <span className="text-xs font-bold">0</span>
                                </button>
                                <button className="flex flex-col items-center gap-1">
                                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                                        <Share2 size={24} />
                                    </div>
                                    <span className="text-xs font-bold">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
