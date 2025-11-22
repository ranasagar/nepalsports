"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash2, Plus, Video, CheckCircle, XCircle } from "lucide-react";

export default function AdminReelsPage() {
    const [reels, setReels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newReel, setNewReel] = useState({
        title: "",
        video_url: "",
        thumbnail_url: "",
        author: "",
    });
    const supabase = createClient();

    useEffect(() => {
        fetchReels();
    }, []);

    const fetchReels = async () => {
        const { data, error } = await supabase
            .from("reels")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setReels(data);
        setLoading(false);
    };

    const handleAddReel = async () => {
        if (!newReel.title || !newReel.video_url) return;

        const { error } = await supabase.from("reels").insert([newReel]);

        if (!error) {
            setNewReel({ title: "", video_url: "", thumbnail_url: "", author: "" });
            fetchReels();
        } else {
            alert("Error adding reel");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase.from("reels").delete().eq("id", id);
        if (!error) fetchReels();
    };

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from("reels")
            .update({ is_approved: !currentStatus })
            .eq("id", id);
        if (!error) fetchReels();
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Video className="w-8 h-8 text-[#0052D4]" />
                    Viral Reels
                </h1>
            </div>

            {/* Add Reel Form */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Add New Reel</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="p-3 border rounded-xl"
                        value={newReel.title}
                        onChange={(e) => setNewReel({ ...newReel, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Video URL (MP4)"
                        className="p-3 border rounded-xl"
                        value={newReel.video_url}
                        onChange={(e) => setNewReel({ ...newReel, video_url: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Thumbnail URL"
                        className="p-3 border rounded-xl"
                        value={newReel.thumbnail_url}
                        onChange={(e) => setNewReel({ ...newReel, thumbnail_url: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Author Name"
                        className="p-3 border rounded-xl"
                        value={newReel.author}
                        onChange={(e) => setNewReel({ ...newReel, author: e.target.value })}
                    />
                </div>
                <button
                    onClick={handleAddReel}
                    className="bg-[#0052D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Reel
                </button>
            </div>

            {/* Reels List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reels.map((reel) => (
                    <div key={reel.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden">
                            <img
                                src={reel.thumbnail_url || "https://via.placeholder.com/300x500"}
                                alt={reel.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                <p className="text-white font-bold truncate">{reel.title}</p>
                                <p className="text-white/80 text-xs">{reel.author}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => toggleApproval(reel.id, reel.is_approved)}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${reel.is_approved
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {reel.is_approved ? (
                                    <>
                                        <CheckCircle className="w-3 h-3" /> Approved
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-3 h-3" /> Pending
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => handleDelete(reel.id)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
