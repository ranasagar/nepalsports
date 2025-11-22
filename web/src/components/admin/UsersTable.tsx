'use client';

import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, UserX, CheckCircle } from 'lucide-react';
import { updateUserRole, toggleBanUser } from '@/app/actions/users';

export default function UsersPage({ users }: { users: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 font-mukta">User Management</h2>
                    <p className="text-gray-500 text-sm">Manage user roles, permissions, and bans.</p>
                </div>
                <div className="bg-blue-50 text-[#003087] px-4 py-2 rounded-xl font-bold text-sm">
                    Total Users: {users.length}
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No users found.</div>
                )}
            </div>
        </div>
    );
}

function UserRow({ user }: { user: any }) {
    const [loading, setLoading] = useState(false);

    const handleRoleChange = async (newRole: 'user' | 'admin' | 'moderator') => {
        setLoading(true);
        await updateUserRole(user.id, newRole);
        setLoading(false);
    };

    const handleBanToggle = async () => {
        if (!confirm(`Are you sure you want to ${user.is_banned ? 'unban' : 'ban'} this user?`)) return;
        setLoading(true);
        await toggleBanUser(user.id, user.is_banned);
        setLoading(false);
    };

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                        {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                                {user.full_name?.[0] || 'U'}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{user.full_name || 'Unknown User'}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <select
                    value={user.role || 'user'}
                    onChange={(e) => handleRoleChange(e.target.value as any)}
                    disabled={loading}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border-0 cursor-pointer focus:ring-2 focus:ring-blue-500
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'moderator' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-600'}`}
                >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </td>
            <td className="px-6 py-4">
                {user.is_banned ? (
                    <span className="px-2.5 py-1 rounded-md bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 w-fit">
                        <UserX size={12} /> Banned
                    </span>
                ) : (
                    <span className="px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1 w-fit">
                        <CheckCircle size={12} /> Active
                    </span>
                )}
            </td>
            <td className="px-6 py-4 text-right">
                <button
                    onClick={handleBanToggle}
                    disabled={loading}
                    className={`p-2 rounded-lg transition-colors ${user.is_banned ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                    title={user.is_banned ? "Unban User" : "Ban User"}
                >
                    {user.is_banned ? <CheckCircle size={18} /> : <UserX size={18} />}
                </button>
            </td>
        </tr>
    );
}
