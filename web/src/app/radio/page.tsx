import React from 'react';
import { createClient } from '@/utils/supabase/server';
import RadioPlayer from '@/components/radio/RadioPlayer';

export default async function RadioPage() {
    const supabase = await createClient();
    const { data: stations } = await supabase
        .from('radio_stations')
        .select('*')
        .eq('is_active', true)
        .order('name');

    return (
        <div className="min-h-screen bg-[#F8FBFF] p-4 md:p-8">
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-900 font-mukta">Khukuri Radio</h1>
                <p className="text-gray-500">Live sports commentary, music, and updates from across Nepal.</p>
            </div>

            <RadioPlayer stations={stations || []} />
        </div>
    );
}
