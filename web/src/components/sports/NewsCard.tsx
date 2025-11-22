import React from 'react';
import { Clock } from 'lucide-react';

interface NewsCardProps {
    news: {
        id: string;
        title: string;
        image_url: string;
        author: string;
        created_at: string;
        sport: string;
    };
    featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
    return (
        <div className={`group cursor-pointer ${featured ? 'col-span-2 row-span-2' : ''}`}>
            <div className="relative overflow-hidden rounded-2xl mb-3 shadow-sm">
                <div className={`bg-gray-200 ${featured ? 'aspect-video' : 'aspect-[4/3]'}`}>
                    <img
                        src={news.image_url || "https://via.placeholder.com/600x400"}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#003087]">
                    {news.sport}
                </div>
            </div>
            <h3 className={`font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#003087] transition-colors ${featured ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
                {news.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <span>{news.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {new Date(news.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
}
