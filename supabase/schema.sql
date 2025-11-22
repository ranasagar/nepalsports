-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS / PROFILES
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'verified_player', 'coach', 'school_admin', 'district_admin', 'super_admin')),
  khukuri_points integer default 0,
  school_id uuid, -- if affiliated with a school
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SCHOOLS
create table public.schools (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  logo_url text,
  district text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SPORTS
create table public.sports (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique, -- Cricket, Football, etc.
  icon_url text
);

-- PLAYERS
create table public.players (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id), -- Link if player has app account
  name text not null,
  sport_id uuid references public.sports(id),
  team_name text, -- Current team
  school_id uuid references public.schools(id), -- If school player
  stats jsonb default '{}'::jsonb,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MATCHES
create table public.matches (
  id uuid default uuid_generate_v4() primary key,
  sport_id uuid references public.sports(id),
  team1_name text not null,
  team1_logo text,
  team1_score text,
  team2_name text not null,
  team2_logo text,
  team2_score text,
  status text default 'UPCOMING' check (status in ('UPCOMING', 'LIVE', 'COMPLETED', 'ABANDONED')),
  target_text text,
  start_time timestamp with time zone,
  venue text,
  is_school_match boolean default false,
  school_id uuid references public.schools(id), -- If hosted by a school
  player_of_match_id uuid references public.players(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- KHUKURI POINTS LOG
create table public.khukuri_points_log (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  points integer not null,
  reason text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AUDIT LOGS
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  admin_id uuid references public.profiles(id),
  action text not null,
  target_table text,
  target_id uuid,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CONTENT REPORTS
create table public.content_reports (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references public.profiles(id),
  target_type text check (target_type in ('comment', 'post', 'reel', 'user')),
  target_id uuid not null,
  reason text not null,
  status text default 'PENDING' check (status in ('PENDING', 'REVIEWED', 'RESOLVED', 'DISMISSED')),
  resolved_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SYSTEM SETTINGS (Global Config)
create table public.system_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PUSH NOTIFICATIONS LOG
create table public.push_notifications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  body text not null,
  target_audience text, -- 'all', 'school:uuid', 'district:name'
  sent_by uuid references public.profiles(id),
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Basic Setup)
alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.sports enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.audit_logs enable row level security;
alter table public.content_reports enable row level security;
alter table public.system_settings enable row level security;
alter table public.push_notifications enable row level security;

-- Public Read Access
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Public schools are viewable by everyone" on public.schools for select using (true);
create policy "Public sports are viewable by everyone" on public.sports for select using (true);
create policy "Public players are viewable by everyone" on public.players for select using (true);
create policy "Public matches are viewable by everyone" on public.matches for select using (true);
create policy "System settings are viewable by everyone" on public.system_settings for select using (true);

-- User Update Own Profile
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Admin Access (Placeholder - needs proper role check function)
-- create policy "Admins can view audit logs" on public.audit_logs for select using (auth.uid() in (select id from public.profiles where role in ('super_admin', 'district_admin')));
