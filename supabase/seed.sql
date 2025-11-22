-- Seed Matches
INSERT INTO matches (home_team, away_team, home_score, away_score, match_time, status, tournament, venue, home_flag, away_flag, status_note, details)
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
  '{}'
)
ON CONFLICT (home_team, match_time) DO UPDATE SET
  home_score = EXCLUDED.home_score,
  away_score = EXCLUDED.away_score,
  status = EXCLUDED.status,
  details = EXCLUDED.details;

-- Seed Schools
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
)
ON CONFLICT (name) DO UPDATE SET
  location = EXCLUDED.location,
  logo_url = EXCLUDED.logo_url,
  primary_color = EXCLUDED.primary_color;

-- Seed Predictions
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
)
ON CONFLICT (question) DO NOTHING;
