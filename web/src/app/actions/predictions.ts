'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createPrediction(formData: FormData) {
    const matchId = formData.get('match_id');
    const question = formData.get('question') as string;
    const option1 = formData.get('option1') as string;
    const option2 = formData.get('option2') as string;
    const option3 = formData.get('option3') as string;

    const options = [option1, option2];
    if (option3) options.push(option3);

    const supabase = await createClient();

    const { error } = await (supabase
        .from('predictions') as any)
        .insert({
            match_id: matchId ? parseInt(matchId as string) : null,
            question,
            options: options,
            status: 'Open'
        });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/predictions');
    return { success: true };
}

export async function settlePrediction(id: number, correctOption: string) {
    const supabase = await createClient();

    const { error } = await (supabase
        .from('predictions') as any)
        .update({ status: 'Settled', correct_option: correctOption })
        .eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/predictions');
    return { success: true };
}
