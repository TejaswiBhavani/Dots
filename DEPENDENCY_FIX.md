# Dependency Resolution Fix

## Issue
The project experiences npm installation failures due to peer dependency conflicts, specifically:

1. **Primary Issue**: `@tailwindcss/vite@^4.0.13` requires `vite@"^5.2.0 || ^6 || ^7"` but project uses `vite@^4.5.0`
2. **Secondary Issues**: 
   - @dnd-kit packages conflicts with Wix custom versions
   - react-leaflet@5.0.0 requires React 19 vs project's React 18

## Quick Fix (Current Solution)
Added `.npmrc` with `legacy-peer-deps=true` to allow npm to install despite peer dependency conflicts.

**For Vercel deployment**, ensure the Install Command is set to:
```bash
npm install --legacy-peer-deps
```

**For local development**:
```bash
npm install --legacy-peer-deps
```

This is safe and allows the build to proceed without major changes.

## Error Details
The exact error that occurs without this fix:

```
npm error ERESOLVE could not resolve
npm error While resolving: @tailwindcss/vite@4.1.11
npm error Found: vite@4.5.14
npm error Could not resolve dependency:
npm error peer vite@"^5.2.0 || ^6 || ^7" from @tailwindcss/vite@4.1.11
```

## Permanent Fix Options

### Option A: Upgrade Vite (Recommended)
Upgrade Vite to v5+ and ensure all related plugins are compatible:

```json
{
  "vite": "^5.4.0",
  "@vitejs/plugin-react": "^4.3.0"
}
```

**Considerations:**
- Requires testing Astro compatibility with Vite 5+
- May need to update other Vite plugins  
- Could have breaking changes in build process

### Option B: Alternative Tailwind Integration
Remove `@tailwindcss/vite` and use standard Tailwind with PostCSS:

```json
{
  "@tailwindcss/vite": "removed",
  "tailwindcss": "^3.4.14",
  "autoprefixer": "^10.4.16"
}
```

Then configure via `postcss.config.mjs` instead of the Vite plugin.

## Verification
To verify the fix works:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install --legacy-peer-deps`
3. Run `npm run build`
4. Deploy should succeed on Vercel

## Status
Currently using the quick fix (`.npmrc`) to unblock deployments. The permanent fix should be considered for long-term maintenance, but is not required for functionality.