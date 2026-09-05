# Medicine Search Application

Search medicines by brand name using the FDA drug label API.

Live link: https://medibuddy-machine-round.netlify.app/

## How to run

```bash
npm install
npm run dev
```

## What I built

I added a search bar that searches medicines by brand name, with debouncing so it doesn't fire a request on every keystroke. Results show up as cards with the brand name, generic name, manufacturer, type, and route. Clicking a card takes you to a detail page for that medicine, and it works correctly even if you refresh or visit the URL directly. I also added caching so the same search doesn't hit the API again, and request cancellation so an older response can't overwrite a newer one.

## Trade-offs

I focused more on getting the functionality right than on styling, so the UI is fairly simple right now. Search results also reset when you go back from the detail page to search — I'd fix that with more time by lifting the state up or storing it in the URL. I didn't use useMemo anywhere since nothing in the app was actually expensive enough to need it.
