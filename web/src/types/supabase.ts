export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    role: 'user' | 'verified_player' | 'coach' | 'school_admin' | 'district_admin' | 'super_admin'
                    khukuri_points: number
                    school_id: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'verified_player' | 'coach' | 'school_admin' | 'district_admin' | 'super_admin'
                    khukuri_points?: number
                    school_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'verified_player' | 'coach' | 'school_admin' | 'district_admin' | 'super_admin'
                    khukuri_points?: number
                    school_id?: string | null
                    created_at?: string
                }
            }
            matches: {
                Row: {
                    id: string
                    team1_name: string
                    team1_score: string | null
                    team2_name: string
                    team2_score: string | null
                    status: 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'ABANDONED'
                    created_at: string
                }
                Insert: {
                    id?: string
                    team1_name: string
                    team1_score?: string | null
                    team2_name: string
                    team2_score?: string | null
                    status?: 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'ABANDONED'
                    created_at?: string
                }
                Update: {
                    id?: string
                    team1_name?: string
                    team1_score?: string | null
                    team2_name?: string
                    team2_score?: string | null
                    status?: 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'ABANDONED'
                    created_at?: string
                }
            }
            audit_logs: {
                Row: {
                    id: string
                    action: string
                    target_id: string | null
                    details: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    action: string
                    target_id?: string | null
                    details?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    action?: string
                    target_id?: string | null
                    details?: Json | null
                    created_at?: string
                }
            }
            schools: {
                Row: {
                    id: string
                    name: string
                    is_verified: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    is_verified?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    is_verified?: boolean
                    created_at?: string
                }
            }
            push_notifications: {
                Row: {
                    id: string
                    title: string
                    body: string
                    target_audience: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    body: string
                    target_audience?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    body?: string
                    target_audience?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
