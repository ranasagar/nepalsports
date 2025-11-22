'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

const MOCK_ADVANCED_DATA = {
    voting: {
        home: 65,
        away: 25,
        draw: 10,
        home_votes: "5.2k",
        away_votes: "1.1k",
        draw_votes: "0.4k"
    },
    referee: {
        name: "Buddhi Pradhan",
        country: "Nepal",
        image: "https://i.pravatar.cc/150?img=12",
        avg_cards: { red: 0.02, yellow: 0.45 }
    },
    lineups: {
        home: [
            { name: "Kushal B", rating: "8.2", top: "20%", left: "50%" },
            { name: "Aasif S", rating: "7.5", top: "30%", left: "30%" },
            { name: "Rohit P", rating: "9.0", top: "30%", left: "70%" },
            { name: "Dipendra S", rating: "8.8", top: "50%", left: "50%" },
            { name: "Sandeep L", rating: "9.5", top: "70%", left: "50%" }
        ]
    },
    stats: {
        possession: { home: "60%", away: "40%" },
        shots: { home: 15, away: 10 },
        on_target: { home: 8, away: 4 },
        corners: { home: 4, away: 2 }
    }
};

export async function generateMatchData(matchId: number) {
    const supabase = await createClient();

    const { error } = await (supabase
        .from('matches') as any)
        .update({ details: MOCK_ADVANCED_DATA })
        .eq('id', matchId);

    if (error) {
        console.error('Error updating match details:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/matches');
    return { success: true };
}

export async function createMatch(formData: FormData) {
    const home_team = formData.get('home_team') as string;
    const away_team = formData.get('away_team') as string;
    const home_flag = formData.get('home_flag') as string;
    const away_flag = formData.get('away_flag') as string;
    const tournament = formData.get('tournament') as string;
    const match_time = formData.get('match_time') as string;
    const venue = formData.get('venue') as string;

    const supabase = await createClient();

    const { error } = await (supabase
        .from('matches') as any)
        .insert({
            home_team,
            away_team,
            home_flag,
            away_flag,
            tournament,
            match_time,
            venue,
            status: 'Upcoming',
            home_score: 0,
            away_score: 0
        });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/matches');
    return { success: true };
}
