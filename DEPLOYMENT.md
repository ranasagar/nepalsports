# Deployment Guide - NepalSportsHub

This guide covers the deployment process for the NepalSportsHub Web (Next.js) and Mobile (Expo) applications, as well as the Supabase backend.

## 1. Database (Supabase)

Before deploying the apps, ensure your production database is ready.

1.  **Create a Project:** Create a new project on [Supabase](https://supabase.com).
2.  **Schema Setup:**
    *   Go to the **SQL Editor**.
    *   Run the content of `supabase/reset_and_seed.sql` to set up the tables and initial data.
3.  **Environment Variables:**
    *   Get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from **Project Settings > API**.

## 2. Web Application (Vercel)

The web app is built with Next.js and is optimized for deployment on Vercel.

### Prerequisites
*   Vercel Account
*   GitHub Repository connected

### Steps
1.  **Push to GitHub:** Ensure your latest code is pushed to your repository.
2.  **Import Project:** Go to Vercel Dashboard -> Add New -> Project -> Import `NepalSportsHub/web`.
3.  **Configure Settings:**
    *   **Framework Preset:** Next.js
    *   **Root Directory:** `web`
4.  **Environment Variables:** Add the following variables in the Vercel deployment settings:
    *   `NEXT_PUBLIC_SUPABASE_URL`: (Your Supabase URL)
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
5.  **Deploy:** Click **Deploy**.

### Manual Build (Testing Locally)
To test the production build locally:
```bash
cd web
npm run build
npm start
```

## 3. Mobile Application (Expo EAS)

The mobile app uses Expo Application Services (EAS) for building and distribution.

### Prerequisites
*   Expo Account
*   EAS CLI installed (`npm install -g eas-cli`)

### Configuration (`eas.json`)
The `mobile/eas.json` file is already configured with profiles for `development`, `preview`, and `production`.

### Steps
1.  **Login:**
    ```bash
    eas login
    ```
2.  **Configure Project:**
    ```bash
    cd mobile
    eas build:configure
    ```
3.  **Build for Android (APK):**
    ```bash
    eas build -p android --profile preview
    ```
4.  **Build for iOS (IPA):**
    *   *Requires Apple Developer Account*
    ```bash
    eas build -p ios --profile production
    ```
5.  **Over-the-Air Updates:**
    To publish an update without a new build:
    ```bash
    eas update --branch preview --message "Update description"
    ```

## 4. Troubleshooting

*   **Missing Columns/Data:** If the app crashes due to missing data, ensure you have run the `reset_and_seed.sql` script in Supabase.
*   **CORS Issues:** Ensure your Supabase project allows requests from your Vercel domain (Project Settings > API > Config).
