-- Enable public read access for matches
alter table matches enable row level security;
create policy "Public matches are viewable by everyone"
  on matches for select
  using ( true );

-- Enable public read access for schools
alter table schools enable row level security;
create policy "Public schools are viewable by everyone"
  on schools for select
  using ( true );

-- Enable public read access for predictions
alter table predictions enable row level security;
create policy "Public predictions are viewable by everyone"
  on predictions for select
  using ( true );
