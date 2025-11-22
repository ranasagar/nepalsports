import React from 'react';
import { createClient } from '@/utils/supabase/server';
import ReelsFeed from '@/components/reels/ReelsFeed';

export default async function ReelsPage() {
    const supabase = await createClient();
    const { data: reels } = await supabase
        .from('reels')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-black flex items-center justify-center md:p-4">
            <ReelsFeed reels={reels || []} />
        </div>
    );
}
