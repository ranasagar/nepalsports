-- DROP TABLES (Clean Slate)
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS predictions CASCADE;
DROP TABLE IF EXISTS radio_stations CASCADE;
DROP TABLE IF EXISTS reels CASCADE;
DROP TABLE IF EXISTS leagues CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS coaches CASCADE;

-- RECREATE MATCHES
CREATE TABLE matches (
  id uuid default uuid_generate_v4() primary key,
  home_team text not null,
  away_team text not null,
  home_score integer default 0,
  away_score integer default 0,
  match_time timestamp with time zone,
  status text,
  tournament text,
  venue text,
  home_flag text,
  away_flag text,
  status_note text,
  sport text default 'football', -- football, cricket, basketball, volleyball
  details jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RECREATE SCHOOLS
CREATE TABLE schools (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  location text,
  logo_url text,
  primary_color text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RECREATE PREDICTIONS
CREATE TABLE predictions (
  id uuid default uuid_generate_v4() primary key,
  question text not null unique,
  options text[] not null,
  status text default 'Active',
  end_time timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RECREATE RADIO STATIONS
CREATE TABLE radio_stations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  stream_url text not null,
  logo_url text,
  location text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RECREATE REELS
CREATE TABLE reels (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  video_url text not null,
  thumbnail_url text,
  author text,
  likes integer default 0,
  views integer default 0,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RECREATE LEAGUES
CREATE TABLE leagues (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  sport text not null, -- football, cricket, basketball, volleyball
  logo_url text,
  season text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RECREATE NEWS
CREATE TABLE news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  image_url text,
  sport text, -- football, cricket, basketball, volleyball, all
  author text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE RLS & POLICIES
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public matches are viewable by everyone" ON matches FOR SELECT USING (true);

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public schools are viewable by everyone" ON schools FOR SELECT USING (true);

ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public predictions are viewable by everyone" ON predictions FOR SELECT USING (true);

ALTER TABLE radio_stations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public radio stations are viewable by everyone" ON radio_stations FOR SELECT USING (true);

ALTER TABLE reels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reels are viewable by everyone" ON reels FOR SELECT USING (true);

ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public leagues are viewable by everyone" ON leagues FOR SELECT USING (true);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public news are viewable by everyone" ON news FOR SELECT USING (true);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public teams are viewable by everyone" ON teams FOR SELECT USING (true);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public players are viewable by everyone" ON players FOR SELECT USING (true);

ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public coaches are viewable by everyone" ON coaches FOR SELECT USING (true);

-- SEED DATA (Nepal Centric)
INSERT INTO matches (home_team, away_team, home_score, away_score, match_time, status, tournament, venue, home_flag, away_flag, status_note, sport, details)
VALUES
(
  'Nepal',
  'UAE',
  184,
  180,
  NOW(),
  'Live',
  'ACC Premier Cup',
  'TU Cricket Ground, Kirtipur',
  'https://flagcdn.com/w80/np.png',
  'https://flagcdn.com/w80/ae.png',
  'Nepal needs 1 wkt to win',
  'cricket',
  '{"lineups": {"home": [{"name": "Rohit Paudel (C)"}, {"name": "Kushal Bhurtel"}, {"name": "Aasif Sheikh (wk)"}, {"name": "Sandeep Lamichhane"}], "away": [{"name": "Muhammad Waseem (C)"}, {"name": "Vriitya Aravind"}, {"name": "Rohan Mustafa"}]}, "stats": {"possession": {"home": 60, "away": 40}, "shots": {"home": 12, "away": 8}, "on_target": {"home": 5, "away": 3}, "corners": {"home": 6, "away": 4}}, "voting": {"home": 85, "away": 10, "draw": 5}}'
),
(
  'Machhindra FC',
  'Three Star Club',
  2,
  1,
  NOW() - INTERVAL '1 hour',
  'Finished',
  'Martyr''s Memorial A-Division League',
  'Dasharath Rangasala',
  'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Machhindra_FC_logo.svg/1200px-Machhindra_FC_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Three_Star_Club_logo.svg/1200px-Three_Star_Club_logo.svg.png',
  'FT',
  'football',
  '{}'
),
(
  'Nepal',
  'India',
  0,
  0,
  NOW() + INTERVAL '1 day',
  'Upcoming',
  'SAFF Championship',
  'Sree Kanteerava Stadium',
  'https://flagcdn.com/w80/np.png',
  'https://flagcdn.com/w80/in.png',
  '19:30',
  'football',
  '{}'
),
(
  'Tribhuvan Army FC',
  'Nepal Police Club',
  0,
  0,
  NOW() + INTERVAL '2 days',
  'Upcoming',
  'A Division League',
  'Dasharath Rangasala',
  'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Tribhuvan_Army_Club_logo.svg/1200px-Tribhuvan_Army_Club_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Nepal_Police_Club_logo.svg/1200px-Nepal_Police_Club_logo.svg.png',
  '15:00',
  'football',
  '{}'
),
(
  'Kathmandu Kings XI',
  'Lalitpur Patriots',
  150,
  140,
  NOW() - INTERVAL '2 days',
  'Finished',
  'Everest Premier League',
  'TU Cricket Ground',
  'https://via.placeholder.com/50',
  'https://via.placeholder.com/50',
  'KKXI won by 10 runs',
  'cricket',
  '{}'
),
(
  'Times College',
  'Golden Gate',
  78,
  75,
  NOW() - INTERVAL '3 hours',
  'Finished',
  'KBL',
  'Covered Hall, Tripureshwor',
  'https://via.placeholder.com/50',
  'https://via.placeholder.com/50',
  'FT',
  'basketball',
  '{}'
),
(
  'Help Nepal',
  'APF Club',
  3,
  1,
  NOW() - INTERVAL '5 hours',
  'Finished',
  'NVA Club Championship',
  'Covered Hall, Tripureshwor',
  'https://via.placeholder.com/50',
  'https://via.placeholder.com/50',
  'Sets: 25-20, 22-25, 25-18, 25-22',
  'volleyball',
  '{}'
);

INSERT INTO schools (name, location, logo_url, primary_color, is_verified)
VALUES
(
  'St. Xavier''s School',
  'Jawalakhel, Lalitpur',
  'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/St_Xaviers_School_Jawalakhel_Logo.png/220px-St_Xaviers_School_Jawalakhel_Logo.png',
  '#003087',
  true
),
(
  'Budhanilkantha School',
  'Budhanilkantha, Kathmandu',
  'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Budhanilkantha_School_Logo.png/220px-Budhanilkantha_School_Logo.png',
  '#800000',
  true
),
(
  'Little Angels'' School',
  'Hattiban, Lalitpur',
  'https://las.edu.np/wp-content/uploads/2020/06/las-logo.png',
  '#000080',
  true
);

INSERT INTO predictions (question, options, status, end_time)
VALUES
(
  'Who will be the top scorer for Nepal in SAFF?',
  ARRAY['Anjan Bista', 'Manish Dangi', 'Nawayug Shrestha', 'Ayush Ghalan'],
  'Active',
  NOW() + INTERVAL '1 week'
),
(
  'Will Nepal beat UAE in the ACC Premier Cup Final?',
  ARRAY['Yes', 'No'],
  'Active',
  NOW() + INTERVAL '3 days'
);

INSERT INTO radio_stations (name, stream_url, logo_url, location)
VALUES
(
  'Radio Nepal',
  'http://stream.zeno.fm/yn8v8z8v8z8uv',
  'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Radio_Nepal_logo.svg/1200px-Radio_Nepal_logo.svg.png',
  'Singha Durbar, Kathmandu'
),
(
  'Kantipur FM',
  'http://broadcast.radiokantipur.com:7248/stream',
  'https://radiokantipur.com/images/logo.png',
  'Pulchowk, Lalitpur'
),
(
  'Ujyaalo 90 Network',
  'https://stream.zeno.fm/h527zwd11uquv',
  'https://ujyaaloonline.com/images/logo.png',
  'Kathmandu'
);

INSERT INTO reels (title, video_url, thumbnail_url, author, likes, views, is_approved)
VALUES
(
  'Paras Khadka SIX!',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://i.ytimg.com/vi/xyz/hqdefault.jpg',
  'CricketCrazy',
  1200,
  5000,
  true
),
(
  'Sandeep Lamichhane Wicket',
  'https://www.w3schools.com/html/movie.mp4',
  'https://i.ytimg.com/vi/abc/hqdefault.jpg',
  'NepalCricketFan',
  850,
  3200,
  true
);

INSERT INTO leagues (name, sport, logo_url, season)
VALUES
('Martyr''s Memorial A-Division League', 'football', 'https://via.placeholder.com/50', '2024'),
('Nepal Super League (NSL)', 'football', 'https://via.placeholder.com/50', '2024'),
('Everest Premier League (EPL)', 'cricket', 'https://via.placeholder.com/50', '2024'),
('PM Cup', 'cricket', 'https://via.placeholder.com/50', '2024'),
('Nepal Basketball League (KBL)', 'basketball', 'https://via.placeholder.com/50', '2024'),
('NVA Club Championship', 'volleyball', 'https://via.placeholder.com/50', '2024');

INSERT INTO news (title, content, image_url, sport, author)
VALUES
('Nepal qualifies for Asia Cup!', 'In a historic match against UAE, Nepal secured their spot in the Asia Cup...', 'https://via.placeholder.com/600x400', 'cricket', 'Sandeep'),
('A-Division League: Machhindra stays on top', 'Machhindra FC continues their dominance with a win over Three Star...', 'https://via.placeholder.com/600x400', 'football', 'Anjan'),
('KBL Finals: Times College vs Golden Gate', 'The finals of the KBL will be held tomorrow at the Covered Hall...', 'https://via.placeholder.com/600x400', 'basketball', 'Rabin'),
('NVA Championship: Help Nepal lifts the trophy', 'Help Nepal Sports Club defeated APF in a thrilling final...', 'https://via.placeholder.com/600x400', 'volleyball', 'Saraswoti');

-- SEED TEAMS
INSERT INTO teams (name, logo_url, sport, founded_year, home_ground) VALUES
('Machhindra FC', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Machhindra_FC_logo.svg/1200px-Machhindra_FC_logo.svg.png', 'football', '1973', 'Dasharath Rangasala'),
('Three Star Club', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Three_Star_Club_logo.svg/1200px-Three_Star_Club_logo.svg.png', 'football', '1954', 'Patan'),
('Kathmandu Kings XI', 'https://via.placeholder.com/50', 'cricket', '2017', 'TU Cricket Ground'),
('Times College', 'https://via.placeholder.com/50', 'basketball', '2010', 'Times College Court');

-- SEED PLAYERS (Linking to teams via subquery for simplicity in seed, ideally use IDs)
INSERT INTO players (name, team_id, position, jersey_number, nationality, image_url, stats, bio) VALUES
('Sujal Shrestha', (SELECT id FROM teams WHERE name = 'Machhindra FC'), 'Midfielder', 10, 'Nepal', 'https://via.placeholder.com/150', '{"goals": 5, "assists": 8, "appearances": 12}', 'Captain of Machhindra FC and key playmaker.'),
('Bishal Shrestha', (SELECT id FROM teams WHERE name = 'Machhindra FC'), 'Goalkeeper', 20, 'Nepal', 'https://via.placeholder.com/150', '{"clean_sheets": 6, "saves": 45}', 'Reliable shot-stopper.'),
('Sandeep Lamichhane', (SELECT id FROM teams WHERE name = 'Kathmandu Kings XI'), 'Bowler', 25, 'Nepal', 'https://via.placeholder.com/150', '{"wickets": 15, "economy": 5.5}', 'Global T20 superstar from Nepal.');

-- SEED COACHES
INSERT INTO coaches (name, team_id, role, nationality, image_url, experience) VALUES
('Prabesh Katuwal', (SELECT id FROM teams WHERE name = 'Machhindra FC'), 'Head Coach', 'Nepal', 'https://via.placeholder.com/150', '3x A-Division League Winner'),
('Pubudu Dassanayake', (SELECT id FROM teams WHERE name = 'Kathmandu Kings XI'), 'Head Coach', 'Sri Lanka', 'https://via.placeholder.com/150', 'Former Nepal National Team Coach');
