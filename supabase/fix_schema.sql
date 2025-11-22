-- Fix Matches Table
ALTER TABLE matches 
  RENAME COLUMN team1_name TO home_team;
ALTER TABLE matches 
  RENAME COLUMN team2_name TO away_team;
ALTER TABLE matches 
  RENAME COLUMN team1_logo TO home_flag;
ALTER TABLE matches 
  RENAME COLUMN team2_logo TO away_flag;
ALTER TABLE matches 
  RENAME COLUMN team1_score TO home_score;
ALTER TABLE matches 
  RENAME COLUMN team2_score TO away_score;
ALTER TABLE matches 
  RENAME COLUMN start_time TO match_time;

ALTER TABLE matches 
  ADD COLUMN IF NOT EXISTS tournament text,
  ADD COLUMN IF NOT EXISTS status_note text,
  ADD COLUMN IF NOT EXISTS details jsonb default '{}'::jsonb;

-- Change score columns to integer if they are text (optional, but seed uses ints. If text, it handles ints fine usually, but let's keep as text to be safe for cricket scores like '180/4' if needed later, or cast to int if we want strict math. For now, text is flexible).
-- Actually, seed uses integers. Postgres text column accepts integers in INSERT.

-- Fix Schools Table
ALTER TABLE schools 
  RENAME COLUMN district TO location;
ALTER TABLE schools 
  ADD COLUMN IF NOT EXISTS primary_color text;

-- Create Predictions Table (was missing)
CREATE TABLE IF NOT EXISTS predictions (
  id uuid default uuid_generate_v4() primary key,
  question text not null unique,
  options text[] not null,
  status text default 'Active' check (status in ('Active', 'Locked', 'Settled')),
  end_time timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for new table
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public predictions are viewable by everyone" ON predictions FOR SELECT USING (true);
