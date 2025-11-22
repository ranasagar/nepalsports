import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();

    // 1. Seed Matches (Nepal Focused)
    const matches = [
        {
            home_team: 'Nepal',
            away_team: 'UAE',
            home_score: 184,
            away_score: 180,
            match_time: new Date().toISOString(),
            status: 'Live',
            tournament: 'ACC Premier Cup',
            venue: 'TU Cricket Ground, Kirtipur',
            home_flag: 'https://flagcdn.com/w80/np.png',
            away_flag: 'https://flagcdn.com/w80/ae.png',
            status_note: 'Nepal needs 1 wkt to win',
            details: {
                lineups: {
                    home: [{ name: 'Rohit Paudel (C)' }, { name: 'Kushal Bhurtel' }, { name: 'Aasif Sheikh (wk)' }, { name: 'Sandeep Lamichhane' }],
                    away: [{ name: 'Muhammad Waseem (C)' }, { name: 'Vriitya Aravind' }, { name: 'Rohan Mustafa' }]
                },
                stats: {
                    possession: { home: 60, away: 40 }, // Cricket doesn't have possession, using as win probability
                    shots: { home: 12, away: 8 },
                    on_target: { home: 5, away: 3 },
                    corners: { home: 6, away: 4 }
                },
                voting: { home: 85, away: 10, draw: 5 }
            }
        },
        {
            home_team: 'Machhindra FC',
            away_team: 'Three Star Club',
            home_score: 2,
            away_score: 1,
            match_time: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            status: 'Finished',
            tournament: 'Martyr\'s Memorial A-Division League',
            venue: 'Dasharath Rangasala',
            home_flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Machhindra_FC_logo.svg/1200px-Machhindra_FC_logo.svg.png',
            away_flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Three_Star_Club_logo.svg/1200px-Three_Star_Club_logo.svg.png',
            status_note: 'FT',
            details: {}
        },
        {
            home_team: 'Nepal',
            away_team: 'India',
            home_score: 0,
            away_score: 0,
            match_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            status: 'Upcoming',
            tournament: 'SAFF Championship',
            venue: 'Sree Kanteerava Stadium',
            home_flag: 'https://flagcdn.com/w80/np.png',
            away_flag: 'https://flagcdn.com/w80/in.png',
            status_note: '19:30',
            details: {}
        },
        {
            home_team: 'Tribhuvan Army FC',
            away_team: 'Nepal Police Club',
            home_score: 0,
            away_score: 0,
            match_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
            status: 'Upcoming',
            tournament: 'A Division League',
            venue: 'Dasharath Rangasala',
            home_flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Tribhuvan_Army_Club_logo.svg/1200px-Tribhuvan_Army_Club_logo.svg.png',
            away_flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Nepal_Police_Club_logo.svg/1200px-Nepal_Police_Club_logo.svg.png',
            status_note: '15:00',
            details: {}
        }
    ];

    const { error: matchError } = await supabase.from('matches').upsert(matches as any, { onConflict: 'home_team, match_time' } as any);

    // 2. Seed Schools (Nepal Top Schools)
    const schools = [
        {
            name: 'St. Xavier\'s School',
            location: 'Jawalakhel, Lalitpur',
            logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/St_Xaviers_School_Jawalakhel_Logo.png/220px-St_Xaviers_School_Jawalakhel_Logo.png',
            primary_color: '#003087',
            is_verified: true
        },
        {
            name: 'Budhanilkantha School',
            location: 'Budhanilkantha, Kathmandu',
            logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Budhanilkantha_School_Logo.png/220px-Budhanilkantha_School_Logo.png',
            primary_color: '#800000',
            is_verified: true
        },
        {
            name: 'Little Angels\' School',
            location: 'Hattiban, Lalitpur',
            logo_url: 'https://las.edu.np/wp-content/uploads/2020/06/las-logo.png',
            primary_color: '#000080',
            is_verified: true
        }
    ];

    const { error: schoolError } = await supabase.from('schools').upsert(schools as any, { onConflict: 'name' } as any);

    // 3. Seed Predictions (Nepal Context)
    const predictions = [
        {
            question: 'Who will be the top scorer for Nepal in SAFF?',
            options: ['Anjan Bista', 'Manish Dangi', 'Nawayug Shrestha', 'Ayush Ghalan'],
            status: 'Active',
            end_time: new Date(Date.now() + 604800000).toISOString() // 1 week later
        },
        {
            question: 'Will Nepal beat UAE in the ACC Premier Cup Final?',
            options: ['Yes', 'No'],
            status: 'Active',
            end_time: new Date(Date.now() + 259200000).toISOString() // 3 days later
        }
    ];

    const { error: predictionError } = await supabase.from('predictions').upsert(predictions as any, { onConflict: 'question' } as any);


    if (matchError || schoolError || predictionError) {
        return NextResponse.json({ error: 'Failed to seed data', details: { matchError, schoolError, predictionError } }, { status: 500 });
    }

    return NextResponse.json({ message: 'Database seeded successfully!' });
}
