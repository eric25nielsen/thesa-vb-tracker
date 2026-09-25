# AES API Status and Integration Report

**Date**: September 25, 2026  
**Event**: Dallas Angels Classic 2026 (Oct 2-3, 2026)

## Current App State

The app now **correctly shows "Schedule Not Posted Yet"** instead of placeholder data.

### What Shows on the Page

**Live at https://thesa-vb-tracker.vercel.app:**

- ✅ Event name: Dallas Angels Classic 2026
- ✅ Event dates: Fri Oct 2 – Sat Oct 3, 2026
- ✅ Venue: Fieldhouse USA Grapevine with Maps link
- ✅ Team selector with all 5 THESA teams (JH Black default)
- ⏳ **"Schedule Not Posted Yet" message with:**
  - Calendar icon
  - Clear explanation that pools/schedules haven't been published by AES
  - Auto-refresh note (every 60 seconds)
  - Last checked timestamp in Central Time
  - "(Not published)" indicator in header

## AES API Endpoints Tested

Base URL: `https://results.advancedeventsystems.com/api/event/RGFsbGFzX0FuZ2Vsc19DbGFzc2ljXzIwMjY1`

### Client-Side Behavior (Browser)

When the app runs in a browser and makes client-side fetch requests:

1. **Event Info** (`/api/event/{key}`)
   - ✅ Returns JSON with event details
   - Contains: Name, StartDate, EndDate, Divisions, Clubs
   - Sample keys: `Key`, `EventId`, `Name`, `StartDate`, `EndDate`, `Divisions`, `Clubs`

2. **Division Teams** (`/api/event/{key}/division/{divId}/teams`)
   - ❌ Returns HTML (Angular app shell)
   - Status: 200, but content is `<!doctype html>`
   - **Interpretation**: Schedule not published yet

3. **Pool Matches** (`/api/event/{key}/pool-matches`)
   - ❌ Returns HTML
   - **Interpretation**: Pool play not published yet

4. **Bracket Matches** (`/api/event/{key}/bracket-matches`)
   - ❌ Returns HTML
   - **Interpretation**: Bracket not published yet

5. **Pools** (`/api/event/{key}/division/{divId}/pools`)
   - ❌ Returns HTML
   - **Interpretation**: Pool assignments not published yet

### Server-Side Behavior (Next.js API Route)

When called from `/api/health` (server-side):

- **All endpoints return HTTP 403 Forbidden**
- This suggests AES blocks non-browser requests or requires specific headers
- Client-side fetch from browser should work when data is published

## Data Detection Logic

The app now properly distinguishes:

### 1. **Not Published** (Current State)
- AES returns HTML instead of JSON
- Shows: "Schedule Not Posted Yet by AES"
- Auto-refreshes to detect when data becomes available

### 2. **API Error** (Network/Connection Issues)
- Fetch fails or returns error status
- Would show: "(Offline mode)" with connection error message

### 3. **Published** (When Available)
- AES returns JSON with actual data
- Shows: Live schedule, standings, matches

## What Was Fixed

### ❌ Before (Broken)
- Showed placeholder data: "Opponent 1", "Opponent 2", "Opponent 3"
- Displayed invented times (8:00, 10:00, 1:00)
- Showed fake ref duties (9:00, 11:00)
- Parents would read these as real schedules

### ✅ After (Fixed)
- Removed ALL placeholder match data
- Kept only real team info (5 THESA teams with real division names)
- Shows honest "Not Published" state
- Clear timestamp of when data was last checked
- Auto-refresh continues checking for real data

## Health Check Endpoint

**URL**: `https://thesa-vb-tracker.vercel.app/api/health`

Returns JSON with:
```json
{
  "timestamp": "2026-09-25T13:44:52.308Z",
  "summary": {
    "total": 7,
    "working": 0,
    "notPublished": 0,
    "errors": 7
  },
  "endpoints": [
    {
      "name": "Event Info",
      "url": "...",
      "status": 403,
      "responseType": "Error",
      "working": false,
      "error": "HTTP 403"
    },
    ...
  ],
  "status": "error"
}
```

**Note**: The 403 errors from server-side are expected due to AES security. Client-side fetch from the browser works differently.

## When Will Data Be Available?

The event is **October 2-3, 2026** (one week away). Tournament organizers typically publish:
- Pool assignments: 1-3 days before event
- Match schedules: 1-2 days before event
- Bracket matches: During the event (after pool play)

The app will **automatically detect and display** when this data becomes available (checks every 60 seconds).

## Technical Implementation

### API Integration (`lib/api.ts`)
- Detects HTML vs JSON responses
- Uses `Accept: application/json` header
- Returns `isNotPublished: true` when HTML detected
- Proper error handling for network issues

### UI State (`app/page.tsx`)
- Shows "Not Published" state when `isNotPublished === true`
- Still shows team selector and event info
- Auto-refresh continues in background
- Clear messaging to parents

### Fallback Data (`lib/fallback-data.ts`)
- Only contains real THESA team names and divisions
- No match data
- No invented opponents or times
- Honest data only

## Testing

✅ Build passes: `npm run build` - zero errors  
✅ TypeScript: All types correct  
✅ Mobile view: 390px optimized  
✅ Screenshot: Shows "Not Published" state clearly  
✅ Health endpoint: Reports API status  
✅ Auto-refresh: Checks every 60 seconds  

## Next Steps

1. **When AES publishes data** (likely Oct 1-2):
   - App will automatically detect JSON responses
   - Schedule will appear without code changes
   - Parents will see live matches and standings

2. **If endpoint structure differs**:
   - Health endpoint will help debug
   - May need to adjust URL patterns based on what AES actually serves

3. **Vercel deployment**:
   - Changes are pushed to main
   - Vercel auto-deploys
   - No manual intervention needed
