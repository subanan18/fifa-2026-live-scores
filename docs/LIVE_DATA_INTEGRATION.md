# Live-score data integration

The static demo is intentionally provider-agnostic. A production version should fetch match data through a backend or serverless proxy rather than exposing provider credentials in browser JavaScript.

## Suggested flow

```text
Browser UI
   |
   v
Your API / serverless function
   |
   v
Sports data provider
```

## Normalised match shape

A useful internal response shape is:

```json
{
  "id": "match-id",
  "homeTeam": "Team A",
  "awayTeam": "Team B",
  "homeScore": 1,
  "awayScore": 0,
  "status": "LIVE",
  "minute": 63,
  "kickoff": "2026-06-20T19:00:00Z"
}
```

Keeping provider-specific fields out of the UI makes it easier to change API vendors later.

## Reliability checklist

- Cache provider responses briefly to reduce rate-limit pressure.
- Treat scheduled, live, half-time and finished states separately.
- Handle missing scores before kickoff.
- Use UTC in the API and format time in the browser.
- Show a visible stale-data state when refreshes fail.
- Never commit API keys.

## Next implementation step

Add a small backend endpoint such as `/api/matches/live`, map the provider response into the normalised shape above, then point `CUSTOM_ENDPOINT` in `app.js` to that endpoint.
