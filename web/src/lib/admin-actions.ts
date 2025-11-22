'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

// --- MATCH CONTROL ---

export async function updateMatchScore(matchId: string, team1Score: string, team2Score: string, status: string) {
    const supabase = await createClient() as any;

    const { error } = await supabase
        .from('matches')
        .update({
            team1_score: team1Score,
            team2_score: team2Score,
            status: status
        } as any)
        .eq('id', matchId);

    if (error) throw new Error('Failed to update score');
    revalidatePath(`/admin/matches/${matchId}/control`);
    revalidatePath('/'); // Update home page live scores
}

export async function declareWinner(matchId: string, winnerTeam: string) {
    // Implementation for declaring winner
}

// --- USER MANAGEMENT ---

export async function banUser(userId: string, reason: string) {
    const supabase = await createClient() as any;

    // 1. Log the action
    await supabase.from('audit_logs').insert({
        action: 'BAN_USER',
        target_id: userId,
        details: { reason }
    } as any);

    // 2. Update user status (assuming a status column or separate ban table)
    // For now, we might just set a flag in profiles if it existed, or use Supabase Auth admin API
}

export async function verifyUser(userId: string, role: string) {
    const supabase = await createClient() as any;

    const { error } = await supabase
        .from('profiles')
        .update({ role: role, is_verified: true } as any) // Type assertion for now
        .eq('id', userId);

    if (error) throw new Error('Failed to verify user');
    revalidatePath('/admin/users');
}

// --- SCHOOL MANAGEMENT ---

export async function approveSchool(schoolId: string) {
    const supabase = await createClient() as any;

    const { error } = await supabase
        .from('schools')
        .update({ is_verified: true } as any)
        .eq('id', schoolId);

    if (error) throw new Error('Failed to approve school');
    revalidatePath('/admin/schools');
}

// --- SYSTEM ---

export async function broadcastPushNotification(title: string, body: string, target: string) {
    const supabase = await createClient() as any;

    // Insert into log, which triggers Edge Function via Database Webhook
    const { error } = await supabase
        .from('push_notifications')
        .insert({ title, body, target_audience: target } as any);

    if (error) throw new Error('Failed to queue notification');
}
