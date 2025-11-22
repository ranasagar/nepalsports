'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSystemSetting(key: string, value: any) {
    const supabase = await createClient();

    const { error } = await (supabase
        .from('system_settings') as any)
        .upsert({ key, value, updated_at: new Date().toISOString() });

    if (error) {
        console.error(`Error updating setting ${key}:`, error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/god-tools');
    return { success: true };
}

export async function getSystemSettings() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('system_settings')
        .select('*');

    if (error) {
        return {};
    }

    // Convert array to object for easier access
    const settings: Record<string, any> = {};
    data.forEach((item: any) => {
        settings[item.key] = item.value;
    });

    return settings;
}

export async function flushCache() {
    // In a real Next.js app, this might involve more complex cache tagging.
    // For now, we revalidate the entire admin path.
    revalidatePath('/', 'layout');
    return { success: true, message: 'Cache flushed successfully' };
}
