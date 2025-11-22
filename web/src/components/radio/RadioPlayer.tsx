"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Radio, MapPin } from "lucide-react";

export default function RadioPlayer({ stations }: { stations: any[] }) {
    const [currentStation, setCurrentStation] = useState<any>(stations[0] || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (currentStation && audioRef.current) {
            audioRef.current.src = currentStation.stream_url;
            if (isPlaying) {
                audioRef.current.play().catch((e) => console.error("Playback failed", e));
            }
        }
    }, [currentStation]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => console.error("Playback failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const handleStationSelect = (station: any) => {
        if (currentStation?.id === station.id) {
            togglePlay();
        } else {
            setCurrentStation(station);
            setIsPlaying(true);
        }
    };

    if (!currentStation) {
        return <div className="text-center p-10">No stations available.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Main Player */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                <div className="bg-gradient-to-br from-[#0052D4] to-[#003087] p-8 text-white text-center relative overflow-hidden">
                    {/* Visualizer Placeholder */}
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center gap-1">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`w-2 bg-white rounded-full animate-pulse`} style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>

                    <div className="relative z-10">
                        <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/20 shadow-2xl">
                            <img
                                src={currentStation.logo_url || "https://via.placeholder.com/150"}
                                alt={currentStation.name}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">{currentStation.name}</h2>
                        <p className="text-blue-200 flex items-center justify-center gap-2">
                            <MapPin size={16} /> {currentStation.location}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-6 flex items-center justify-center gap-8">
                    <button className="text-gray-400 hover:text-[#0052D4] transition-colors">
                        <Volume2 size={24} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-[#E61E2A] rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/30 hover:scale-105 transition-transform"
                    >
                        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                    </button>
                    <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0052D4] w-2/3" />
                    </div>
                </div>

                <audio ref={audioRef} className="hidden" />
            </div>

            {/* Station List */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 px-2 flex items-center gap-2">
                <Radio className="text-[#0052D4]" /> All Stations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stations.map((station) => (
                    <button
                        key={station.id}
                        onClick={() => handleStationSelect(station)}
                        className={`p-4 rounded-2xl border text-left flex items-center gap-4 transition-all
              ${currentStation.id === station.id
                                ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100"
                                : "bg-white border-gray-100 hover:border-blue-100 hover:shadow-md"
                            }`}
                    >
                        <img
                            src={station.logo_url || "https://via.placeholder.com/50"}
                            alt={station.name}
                            className="w-12 h-12 rounded-full object-cover border border-gray-100"
                        />
                        <div className="flex-1">
                            <h4 className={`font-bold ${currentStation.id === station.id ? "text-[#0052D4]" : "text-gray-900"}`}>
                                {station.name}
                            </h4>
                            <p className="text-xs text-gray-500">{station.location}</p>
                        </div>
                        {currentStation.id === station.id && isPlaying && (
                            <div className="flex gap-0.5 items-end h-4">
                                <div className="w-1 bg-[#E61E2A] h-2 animate-pulse" />
                                <div className="w-1 bg-[#E61E2A] h-4 animate-pulse delay-75" />
                                <div className="w-1 bg-[#E61E2A] h-3 animate-pulse delay-150" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
