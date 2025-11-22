'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function sendNotification(formData: FormData) {
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const target = formData.get('target') as string;

    const supabase = await createClient();

    const { error } = await (supabase
        .from('notifications') as any)
        .insert({ title, body, target_audience: target, status: 'Sent' });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/communications');
    return { success: true };
}
