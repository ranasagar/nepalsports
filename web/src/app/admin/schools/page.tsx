import React from 'react';
import { School, MapPin, Users, ShieldCheck, Palette } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import SchoolList from '@/components/admin/SchoolList';

export default async function SchoolsPage() {
    const supabase = await createClient();

    const { data: schools } = await supabase
        .from('schools')
        .select('*')
        .order('student_count', { ascending: false });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 font-mukta flex items-center gap-2">
                    <School className="text-[#003087]" />
                    School & District Control
                </h2>
                <p className="text-gray-500 text-sm">Manage school profiles, branding, and verification status.</p>
            </div>

            <SchoolList schools={schools || []} />
        </div>
    );
}
