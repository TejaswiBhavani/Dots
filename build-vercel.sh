#!/bin/bash
set -e

echo "Preparing for Vercel build..."

# Copy Vercel-specific files  
cp package.vercel.json package.json

# Backup and replace config files
mv tailwind.config.mjs tailwind.config.mjs.bak 2>/dev/null || true
cp tailwind.config.vercel.mjs tailwind.config.mjs

mv src/tailwind.config.mjs src/tailwind.config.mjs.bak 2>/dev/null || true
cp tailwind.config.vercel.mjs src/tailwind.config.mjs

# Backup original files and replace with Vercel versions
mv src/components/ui/image.tsx src/components/ui/image.tsx.bak 2>/dev/null || true
cp src/components/ui/image.vercel.tsx src/components/ui/image.tsx 

# Remove integrations directory (Wix-specific code not needed for Vercel)
mv integrations integrations.bak 2>/dev/null || true

# Create simplified page without Wix SEO dependencies
cat > src/pages/index.astro << 'EOF'
---
import { Head } from "@/components/Head";
import AppRouter from "@/components/Router";
import "@/styles/global.css";
---

<html lang="en" class="w-full h-full">
  <head>
    <Head />
    <title>Dots - Connecting Arts to Hearts</title>
    <meta name="description" content="Discover unique handmade crafts and connect with talented artisans at Dots platform" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  </head>
  <body class="w-full h-full">
    <div id="root" class="w-full h-full">
      <AppRouter client:only="react" />
    </div>
  </body>
</html>
EOF

echo "Installing dependencies..."
npm install

echo "Building for Vercel..."
npm run build

echo "Vercel build completed successfully!"