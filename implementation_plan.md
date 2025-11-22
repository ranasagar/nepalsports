# Implementation Plan - ESPN-Style Sports Sections (Nepal Focused)

## Goal Description
Clone the ESPN app's features and styles for **Football**, **Cricket**, **Basketball**, and **Volleyball**, strictly focused on Nepali sports. The goal is to create a premium, data-rich, and interactive experience similar to ESPN but tailored for Nepal's sporting ecosystem (A-Division, NSL, EPL, PM Cup, KBL, NVA).

## User Review Required
> [!IMPORTANT]
> This is a major expansion. I will be adding new tables (`leagues`, `news`) and creating dedicated sections for each sport.

## Proposed Changes

### Database Schema (`supabase/reset_and_seed.sql`)
#### [MODIFY] `reset_and_seed.sql`
- **Add `leagues` table**: `id`, `name`, `sport` (football, cricket, basketball, volleyball), `logo_url`, `season`.
- **Add `news` table**: `id`, `title`, `content`, `image_url`, `sport`, `author`, `created_at`.
- **Update `matches` table**: Ensure `sport` column is used effectively.

### Shared Components (`web/src/components/sports`)
#### [NEW] `SportHeader.tsx`
- Sticky sub-navigation for each sport (Scores, News, Standings, Teams).
#### [NEW] `ScoreTicker.tsx`
- Horizontal scrolling ticker of live/recent scores for the specific sport.
#### [NEW] `NewsCard.tsx`
- Premium card design for news articles (large image, bold title).
#### [NEW] `StandingsWidget.tsx`
- Compact league table widget.

### Football Section (`web/src/app/football`)
#### [NEW] `page.tsx`
- Hero news, live scores, latest updates.
#### [NEW] `scores/page.tsx`
- Comprehensive list of fixtures and results.
#### [NEW] `standings/page.tsx`
- Full league tables (A-Division, NSL).

### Cricket Section (`web/src/app/cricket`)
#### [NEW] `page.tsx`
- Focus on CAN, PM Cup, EPL.
#### [NEW] `scores/page.tsx`
- Live scorecards (ball-by-ball style summary).

### Basketball Section (`web/src/app/basketball`)
#### [NEW] `page.tsx`
- Focus on KBL and College basketball.

### Volleyball Section (`web/src/app/volleyball`)
#### [NEW] `page.tsx`
- Focus on NVA and club championships.

## Player, Coach & Fan Pages
### Database Schema (`supabase/reset_and_seed.sql`)
#### [MODIFY] `reset_and_seed.sql`
- **Add `teams` table**: `id`, `name`, `logo_url`, `sport`, `founded_year`, `home_ground`.
- **Add `players` table**: `id`, `name`, `team_id`, `position`, `jersey_number`, `nationality`, `stats` (jsonb).
- **Add `coaches` table**: `id`, `name`, `team_id`, `role`, `nationality`, `experience`.

### Admin Panel (`web/src/app/admin`)
#### [NEW] `teams/page.tsx`
- CRUD for Teams.
#### [NEW] `players/page.tsx`
- CRUD for Players.

### Frontend Pages (`web/src/app`)
#### [NEW] `team/[id]/page.tsx`
- Fan page with squad, fixtures, and news.
#### [NEW] `player/[id]/page.tsx`
- Detailed player profile with stats.
#### [NEW] `coach/[id]/page.tsx`
- Coach profile.

## Verification Plan
### Automated Tests
- `npm run build` to ensure all new pages compile.
### Manual Verification
- Verify navigation between sports sections.
- Check that "Football" only shows football matches/news, etc.
- Test the responsiveness of the Score Ticker.
