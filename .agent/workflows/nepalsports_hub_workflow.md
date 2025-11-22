---
description: NepalSports Hub Development Workflow & Constitution
---

# NepalSports Hub - Project Constitution & Workflow

## 1. Core Identity
- **App Name:** NepalSports Hub
- **Tagline:** "Jaha Khel, Tyaha Nepal" (Where there is sports, there is Nepal)
- **Primary Color:** Royal Blue (`#0052D4`) - Used for Headers, Primary Buttons, Active States.
- **Secondary Color:** Nepal Red (`#E61E2A`) - Used for Live badges, Urgent actions, Accents.
- **Design Style:** Modern, Clean, Rounded Cards (`rounded-3xl`), Shadows, Glassmorphism.

## 2. Tech Stack
- **Monorepo Structure:**
  - `/web`: Next.js 14 (App Router), Tailwind CSS, Lucide React.
  - `/mobile`: Expo (React Native), NativeWind v4, Lucide React Native.
  - `/supabase`: Database schema and functions.
- **Backend:** Supabase (PostgreSQL, Auth, Realtime).
- **State Management:** React Context / Local State (Keep it simple).

## 3. Development Rules (Strict)
- **Mock Data First:** Always implement features with robust mock data fallbacks *before* connecting to the backend. This ensures the UI is testable immediately.
- **Type Safety:** Use TypeScript. Fix lint errors immediately.
- **Component Reusability:** Create shared components in `/components` (e.g., `MatchCard`, `LiveHeader`).
- **Mobile First:** For web, ensure responsive design. For mobile, ensure safe area handling.

## 4. Current Project State (as of Nov 2025)
- **Mobile App:** Fully implemented (Splash, Onboarding, Home, Match Detail, Wallet, Radio, etc.).
- **Web App:** Admin Panel fully implemented (Dashboard, Users, Matches, etc.) with mock data fallbacks.
- **Backend:** Supabase schema exists (`schema.sql`). Integration is wired but relies on mock data until `.env.local` is configured.

## 5. Next Steps Workflow
1.  **Database Connection:**
    - User must provide `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `web/.env.local`.
    - Once connected, the app will automatically switch from mock data to real data (logic already implemented in pages).
2.  **Deployment:**
    - **Web:** Deploy to Vercel. Ensure `npm run build` passes.
    - **Mobile:** Configure EAS Build (`eas.json`). Run `eas build`.

## 6. Common Patterns
- **Fetching Data:**
  ```typescript
  const supabase = await createClient();
  let { data, error } = await supabase.from('table').select('*');
  if (error || !data) data = MOCK_DATA; // Fallback pattern
  ```
