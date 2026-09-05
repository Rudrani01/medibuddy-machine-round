# Medicine Search Application

Search medicines by brand name using the FDA drug label API.

Live link: https://medibuddy-machine-round.netlify.app/

## How to run

```bash
npm install
npm run dev
```

## What I built

- Search by brand name with debouncing
- Result cards showing brand name, generic name, manufacturer, type, and route
- Detail page for each medicine, works on direct visit/refresh
- Caching to avoid re-fetching the same search
- Request cancellation so old responses don't overwrite new ones

## Trade-offs

- Focused more on functionality than styling, so the UI is simple
- Search results reset when going back from the detail page — would fix with more time
- Skipped useMemo since nothing in the app actually needed it
