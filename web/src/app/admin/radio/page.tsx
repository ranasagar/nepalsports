"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash2, Plus, Radio, Play } from "lucide-react";

export default function AdminRadioPage() {
    const [stations, setStations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newStation, setNewStation] = useState({
        name: "",
        stream_url: "",
        logo_url: "",
        location: "",
    });
    const supabase = createClient();

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        const { data, error } = await supabase
            .from("radio_stations")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setStations(data);
        setLoading(false);
    };

    const handleAddStation = async () => {
        if (!newStation.name || !newStation.stream_url) return;

        const { error } = await supabase.from("radio_stations").insert([newStation]);

        if (!error) {
            setNewStation({ name: "", stream_url: "", logo_url: "", location: "" });
            fetchStations();
        } else {
            alert("Error adding station");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase.from("radio_stations").delete().eq("id", id);
        if (!error) fetchStations();
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Radio className="w-8 h-8 text-[#0052D4]" />
                    Radio Stations
                </h1>
            </div>

            {/* Add Station Form */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Add New Station</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Station Name"
                        className="p-3 border rounded-xl"
                        value={newStation.name}
                        onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Stream URL"
                        className="p-3 border rounded-xl"
                        value={newStation.stream_url}
                        onChange={(e) => setNewStation({ ...newStation, stream_url: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Logo URL"
                        className="p-3 border rounded-xl"
                        value={newStation.logo_url}
                        onChange={(e) => setNewStation({ ...newStation, logo_url: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        className="p-3 border rounded-xl"
                        value={newStation.location}
                        onChange={(e) => setNewStation({ ...newStation, location: e.target.value })}
                    />
                </div>
                <button
                    onClick={handleAddStation}
                    className="bg-[#0052D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Station
                </button>
            </div>

            {/* Stations List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stations.map((station) => (
                    <div key={station.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <img
                            src={station.logo_url || "https://via.placeholder.com/100"}
                            alt={station.name}
                            className="w-16 h-16 rounded-full object-cover border border-gray-200"
                        />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{station.name}</h3>
                            <p className="text-sm text-gray-500">{station.location}</p>
                            <a
                                href={station.stream_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                            >
                                <Play className="w-3 h-3" /> Test Stream
                            </a>
                        </div>
                        <button
                            onClick={() => handleDelete(station.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
