'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSchoolBranding(formData: FormData) {
    const schoolId = formData.get('school_id');
    const primaryColor = formData.get('primary_color') as string;
    const logoUrl = formData.get('logo_url') as string;
    const isVerified = formData.get('is_verified') === 'on';
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;

    const supabase = await createClient();

    const updateData: any = {
        primary_color: primaryColor,
        logo_url: logoUrl,
        is_verified: isVerified
    };

    if (name) updateData.name = name;
    if (location) updateData.location = location;

    const { error } = await (supabase
        .from('schools') as any)
        .update(updateData)
        .eq('id', schoolId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/schools');
    return { success: true };
}

export async function createSchool(formData: FormData) {
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const primaryColor = formData.get('primary_color') as string;
    const logoUrl = formData.get('logo_url') as string;
    const isVerified = formData.get('is_verified') === 'on';

    const supabase = await createClient();

    const { error } = await (supabase
        .from('schools') as any)
        .insert({
            name,
            location,
            primary_color: primaryColor,
            logo_url: logoUrl,
            is_verified: isVerified
        });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/schools');
    return { success: true };
}
