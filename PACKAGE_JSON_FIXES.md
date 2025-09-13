# Package.json Fix Examples

## Current package.json (Problematic)
```json
{
  "devDependencies": {
    "vite": "^4.5.0"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.13",
    "react-leaflet": "^5.0.0"
  }
}
```

## Option A: Quick Fix (.npmrc approach)
**No package.json changes needed**

**Add .npmrc:**
```
legacy-peer-deps=true
```

**Vercel Install Command:**
```bash
npm install --legacy-peer-deps
```

## Option B: Vite Upgrade (Recommended Long-term)
```json
{
  "devDependencies": {
    "vite": "^5.4.0"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.13",
    "react-leaflet": "^5.0.0"
  }
}
```

## Option C: Remove @tailwindcss/vite
```json
{
  "devDependencies": {
    "vite": "^4.5.0"
  },
  "dependencies": {
    "autoprefixer": "^10.4.16",
    "react-leaflet": "^5.0.0"
  }
}
```
**Note**: Remove `@tailwindcss/vite` from dependencies and update astro.config.mjs

## Option D: React 18 Compatible react-leaflet
```json
{
  "devDependencies": {
    "vite": "^4.5.0"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.13",
    "react-leaflet": "^4.2.1"
  }
}
```

## Option E: Combined Fix (Vite + react-leaflet)
```json
{
  "devDependencies": {
    "vite": "^5.4.0"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.13",
    "react-leaflet": "^4.2.1"
  }
}
```

## Option F: Alternative Tailwind + Vite Upgrade
```json
{
  "devDependencies": {
    "vite": "^5.4.0"
  },
  "dependencies": {
    "autoprefixer": "^10.4.16",
    "react-leaflet": "^4.2.1"
  }
}
```
**Note**: Remove `@tailwindcss/vite` and update astro.config.mjs

## Testing Commands

### Test Option A (.npmrc)
```bash
echo "legacy-peer-deps=true" > .npmrc
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Test Option B (Vite upgrade)
```bash
# Update package.json vite version first
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Test Option C (Remove @tailwindcss/vite)
```bash
# Update package.json and astro.config.mjs first
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Vercel Configuration Examples

### For Option A (.npmrc)
```bash
# Vercel Install Command
npm install --legacy-peer-deps

# Build Command
npm run build

# Output Directory
dist
```

### For Options B-F (Fixed dependencies)
```bash
# Vercel Install Command (default)
npm install

# Build Command
npm run build

# Output Directory
dist
```