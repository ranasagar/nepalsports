import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { MapPin, School, ShieldCheck } from 'lucide-react';

export default async function SchoolsPage() {
    const supabase = await createClient();
    const { data: schoolsData } = await supabase
        .from('schools')
        .select('*')
        .order('name');

    const schools = schoolsData as any[] | null;

    return (
        <div className="min-h-screen bg-[#F8FBFF] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 font-mukta mb-2">School Sports Hub</h1>
                    <p className="text-gray-500">Find and follow your school teams.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schools?.map((school) => (
                        <div key={school.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                            <div className="h-24 relative" style={{ backgroundColor: school.primary_color || '#003087' }}>
                                <div className="absolute -bottom-8 left-6 w-16 h-16 bg-white rounded-xl p-1 shadow-md">
                                    {school.logo_url ? (
                                        <img src={school.logo_url} alt={school.name} className="w-full h-full object-contain rounded-lg" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                            <School className="text-gray-400" size={24} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-10 px-6 pb-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#003087] transition-colors">
                                        {school.name}
                                    </h3>
                                    {school.is_verified && <ShieldCheck size={16} className="text-blue-500" />}
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-500 font-bold mt-3">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {school.location || 'Unknown'}</span>
                                </div>

                                <button className="w-full mt-4 py-2 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-[#003087] hover:text-white transition-colors text-sm">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
