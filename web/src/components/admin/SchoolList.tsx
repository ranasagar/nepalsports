'use client';

import React, { useState } from 'react';
import { MapPin, Users, ShieldCheck, Palette, Edit2, X, School, Plus } from 'lucide-react';
import { updateSchoolBranding, createSchool } from '@/app/actions/schools';

export default function SchoolList({ schools }: { schools: any[] }) {
    const [editingSchool, setEditingSchool] = useState<any | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add New School Card */}
                <button
                    onClick={() => {
                        setEditingSchool({});
                        setIsCreating(true);
                    }}
                    className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-[200px] hover:bg-gray-100 hover:border-gray-300 transition-all group"
                >
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="text-gray-400 group-hover:text-[#003087]" />
                    </div>
                    <span className="font-bold text-gray-500 group-hover:text-gray-700">Add New School</span>
                </button>

                {schools.map((school) => (
                    <div key={school.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                        {/* Header / Banner */}
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
                            <button
                                onClick={() => {
                                    setEditingSchool(school);
                                    setIsCreating(false);
                                }}
                                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>

                        <div className="pt-10 px-6 pb-6">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{school.name}</h3>
                                {school.is_verified && <ShieldCheck size={16} className="text-blue-500" />}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-500 font-bold mt-3">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {school.location || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit/Create Modal */}
            {editingSchool && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{isCreating ? 'Add New School' : 'Edit Branding'}</h3>
                            <button onClick={() => setEditingSchool(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                        </div>

                        <form action={async (formData) => {
                            if (isCreating) {
                                await createSchool(formData);
                            } else {
                                await updateSchoolBranding(formData);
                            }
                            setEditingSchool(null);
                        }} className="space-y-4">
                            {!isCreating && <input type="hidden" name="school_id" value={editingSchool.id} />}

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">School Name</label>
                                <input type="text" name="name" defaultValue={editingSchool.name} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
                                <input type="text" name="location" defaultValue={editingSchool.location} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Primary Color</label>
                                <div className="flex gap-3 items-center">
                                    <input type="color" name="primary_color" defaultValue={editingSchool.primary_color || '#003087'} className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0" />
                                    <input type="text" name="primary_color_text" defaultValue={editingSchool.primary_color || '#003087'} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-mono text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Logo URL</label>
                                <input type="url" name="logo_url" defaultValue={editingSchool.logo_url} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]" />
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <input type="checkbox" name="is_verified" defaultChecked={editingSchool.is_verified} className="w-5 h-5 rounded text-[#003087] focus:ring-[#003087]" />
                                <label className="text-sm font-bold text-gray-700">Verified School</label>
                            </div>

                            <button type="submit" className="w-full bg-[#003087] text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all mt-2">
                                {isCreating ? 'Create School' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
