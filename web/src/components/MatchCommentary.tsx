import React from 'react';
import { MessageSquare } from 'lucide-react';

interface CommentaryItem {
    id: string;
    time: string;
    text: string;
    type: 'goal' | 'wicket' | 'info' | 'highlight';
}

interface MatchCommentaryProps {
    commentary: CommentaryItem[];
}

export default function MatchCommentary({ commentary }: MatchCommentaryProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                <MessageSquare size={18} className="text-[#003087]" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Live Commentary</h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
                {commentary.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex gap-4">
                        <div className="font-bold text-[#003087] text-sm w-10 shrink-0">{item.time}</div>
                        <div className="text-sm text-gray-700 leading-relaxed">
                            {item.type === 'goal' && <span className="font-bold text-green-600 mr-1">GOAL!</span>}
                            {item.type === 'wicket' && <span className="font-bold text-red-600 mr-1">WICKET!</span>}
                            {item.text}
                        </div>
                    </div>
                ))}
                {commentary.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        Commentary not available for this match yet.
                    </div>
                )}
            </div>
        </div>
    );
}
