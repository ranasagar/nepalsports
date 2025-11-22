import React from 'react';
import { Star } from 'lucide-react';

interface KhukuriPointsBadgeProps {
    points: number;
}

export const KhukuriPointsBadge: React.FC<KhukuriPointsBadgeProps> = ({ points }) => {
    return (
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white font-bold text-sm">{points} KP</span>
        </div>
    );
};
