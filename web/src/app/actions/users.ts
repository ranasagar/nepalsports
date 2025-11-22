'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateUserRole(userId: string, role: 'user' | 'admin' | 'moderator') {
    const supabase = await createClient();

    const { error } = await (supabase
        .from('profiles') as any)
        .update({ role })
        .eq('id', userId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/users');
    return { success: true };
}

export async function toggleBanUser(userId: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { error } = await (supabase
        .from('profiles') as any)
        .update({ is_banned: !currentStatus })
        .eq('id', userId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/users');
    return { success: true };
}
