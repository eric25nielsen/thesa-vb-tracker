# THESA Volleyball Tracker

A mobile-first web app for THESA volleyball parents to follow their teams live during the **Dallas Angels Classic 2026** (HSAA Texas homeschool state tournament).

**Event Details:**
- **Dates:** Friday, October 2 – Saturday, October 3, 2026
- **Venue:** Fieldhouse USA Grapevine (inside Grapevine Mills Mall, Grapevine, TX)

## Features

- **Live Match Tracking**: Real-time scores and schedules from AES (Advanced Event Systems) public API
- **Team Following**: Track multiple THESA teams with saved preferences
- **Next Match Display**: Countdown timer and match details for upcoming games
- **Ref/Work Duties**: See when your team needs to ref or work
- **Pool Standings**: Live standings with tiebreaker calculations and bracket projections
- **Schedule & Results**: Complete schedule with set scores as they're posted
- **Mobile-First Design**: Optimized for viewing on phones in bright gym lighting
- **Dark Mode**: Full dark mode support
- **Share Links**: Share with other parents via Web Share API or copy link
- **Auto-Refresh**: Updates every 60 seconds while the app is open
- **Offline Fallback**: Works with bundled data if the AES API is unreachable

## THESA Teams

The app tracks five THESA teams:
- **THESA JH Black** (Middle School Pool A) - *Default*
- **THESA JH Red** (Middle School Pool D)
- **THESA JV Red** (Junior Varsity Pool D)
- **THESA JV Black** (Junior Varsity Pool E)
- **THESA Var** (Varsity Pool D)

## Data Source

This app fetches live data from the **Advanced Event Systems (AES)** public JSON API:
- Base URL: `https://results.advancedeventsystems.com/event/RGFsbGFzX0FuZ2Vsc19DbGFzc2ljXzIwMjY1`
- The API provides real-time event data, team rosters, pool matches, bracket matches, and standings
- Data is fetched client-side with 60-second caching via Next.js ISR
- If the API is unavailable, the app falls back to bundled snapshot data with a clear timestamp

## Technology Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Client-side data fetching** with fallback support

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment on Vercel

### Quick Deploy

1. **Import Repository**: Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository

2. **Framework Detection**: Vercel will automatically detect Next.js

3. **Environment Variables**: **None required!** This app has zero environment variables

4. **Deploy**: Click "Deploy" and Vercel will build and deploy your app

### Manual Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Configuration

No special configuration needed. The app:
- ✅ Works as a static export (all data fetched client-side)
- ✅ Requires zero environment variables
- ✅ Uses Next.js ISR (Incremental Static Regeneration) for optimal performance
- ✅ Mobile-optimized and responsive

## Usage

### For Parents at the Gym

1. Open the app from a texted link
2. The app defaults to following THESA JH Black
3. Tap team chips at the top to follow additional teams
4. Scroll to see upcoming matches, ref duties, and standings
5. Use the refresh button to manually update or wait for auto-refresh (every 60s)
6. Share the link with other parents using the share button

### Share Links with Team Preselection

Share custom links with specific teams pre-selected:
- Single team: `?team=jh-black`
- Multiple teams: `?team=jh-black,jvred,var`

Team codes: `jh-black`, `jh-red`, `jv-red`, `jv-black`, `var`

## Browser Support

- Modern iOS Safari (iOS 15+)
- Modern Android Chrome (Android 10+)
- Modern desktop browsers (Chrome, Firefox, Safari, Edge)

## License

MIT License - Built for THESA volleyball parents

## Notes

- All times displayed in **Central Time (America/Chicago)**
- Team names preserved as-is from AES (including any organizer typos)
- No personal information, kid names, or photos included
- Public app, no login required
- Complies with HSAA and AES data usage policies
