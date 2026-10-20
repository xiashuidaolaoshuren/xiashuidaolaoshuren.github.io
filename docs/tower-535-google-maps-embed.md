# Tower 535 Google Maps Embed — pin and info panel

Notes from adding the Gekko internship office location on the experience detail page (`gekko-2026` in `src/data/experience.ts`). The site uses the [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/embedding-map) `place` mode via `mapQuery` / `resolveMapEmbedQuery`.

## Symptoms

1. **Wrong POI from a text query**  
   `mapQuery: "Tower 535, 535 Jaffe Road, Causeway Bay, Hong Kong"` resolved to a basement retail unit (**Shop B01, Basement, Tower…**) instead of the office building. Tower 535 is mixed-use; Google’s text geocoder preferred a shop-level place inside the same address.

2. **Missing top-left info panel with coordinates**  
   Switching to raw coordinates (`mapQuery: "22.28133,114.18393"`) pinned the correct area on the map, but the Embed UI **no longer showed** the place card (name, address, rating, directions) that appears for text-based queries (e.g. Tsang Mui Millennium School). A bare pin is not enough when we want the same panel as other experience locations.

3. **Invalid or wrong `place_id` values**  
   Guessed or third-party place IDs produced a world-map / empty place view. Only a place ID returned by Google’s Places API for **TOWER 535** worked reliably.

## Root cause

In Embed `place` mode, `q` can be a place name, address, or `place_id:…`:

| `q` style | Pin accuracy here | Info panel |
|-----------|-------------------|------------|
| Building name + address text | Often wrong (Shop B01) | Yes (for the matched POI) |
| `lat,lng` | Correct point | No |
| `place_id:…` for the building | Correct building | Yes |

Coordinates are not tied to a named Places record, so Google does not render the POI panel. Text search for this address is ambiguous among retail and building records.

## Solution

Keep displaying the full office address in `location.address` (Room 1606, 16/F, …) for page copy, and set `mapQuery` to the **verified Place ID** for the building:

```ts
location: {
  address:
    "Room 1606, 16/F, Tower 535, 535 Jaffe Road, Causeway Bay, Hong Kong",
  mapQuery: "place_id:ChIJAQDw9FYABDQRCsDB1gbNuQg",
  zoom: 17,
},
```

That ID was obtained with Places **Find Place From Text** for input like `Tower 535 Causeway Bay` (result name: **TOWER 535**, address: `535 Jaffe Rd, Causeway Bay, Hong Kong`). Do not rely on unverified place IDs from search snippets.

Result: pin on Tower 535 (not Shop B01), and the top-left info panel restored (building name, address, rating, directions).

## How to re-verify or refresh the place ID

Place IDs can change over time; Google recommends refreshing if they are old. Example (replace `YOUR_API_KEY`):

```bash
curl.exe -s "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Tower%20535%20Causeway%20Bay&inputtype=textquery&fields=place_id,name,formatted_address&key=YOUR_API_KEY"
```

Confirm `name` is **TOWER 535** (or the intended building), then use `place_id:…` in `mapQuery`. Spot-check `/experience/gekko-2026` with `VITE_GOOGLE_MAPS_API_KEY` set.

## Deployment: the embedded map needs the key at build time

Vite inlines `VITE_GOOGLE_MAPS_API_KEY` into the bundle at build time. The local key lives in `.env.local` (gitignored), so GitHub Actions never sees it unless the repository defines it as a secret.

1. Add a repository Actions secret named `VITE_GOOGLE_MAPS_API_KEY` (Settings → Secrets and variables → Actions → New repository secret).
2. `.github/workflows/deploy.yml` passes it to both the key check and the build step, so `npm run build` bakes it into `dist`.
3. Restrict the key in Google Cloud to the **Maps Embed API**, with HTTP referrers for `https://xiashuidaolaoshuren.github.io/*` and `http://localhost:*`. An embed key is visible in the browser bundle; the referrer restriction keeps it from being reused elsewhere.

If the secret is missing, the deploy still succeeds and each `/experience/:id` page shows the address with an "Open in Google Maps" link instead of the iframe. The workflow prints a warning in that case.

## Related code

- Data: `src/data/experience.ts` (`gekko-2026.location`)
- Embed URL builder: `src/pages/ExperienceDetailPage.tsx` (`googleMapsEmbedPlaceUrl`)
- No-key fallback link: `googleMapsSearchUrl` in `src/pages/ExperienceDetailPage.tsx`
- Query resolution: `resolveMapEmbedQuery` in `src/data/experience.ts`
