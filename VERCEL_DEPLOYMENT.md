# Vercel Deployment Setup

This document explains how to deploy the Dots platform to Vercel.

## Quick Setup

1. **Connect Repository to Vercel**
   - Import your GitHub repository in Vercel dashboard
   - The `vercel.json` configuration will be automatically detected

2. **Set Environment Variables in Vercel Dashboard**
   ```
   VITE_API_BASE_URL=https://your-api.vercel.app
   VITE_AI_PROVIDER=local
   VITE_PAYMENT_GATEWAY=mock
   VITE_FEATURE_AI_ASSISTANT=true
   ```

3. **Deploy**
   - Vercel will automatically use the custom build script
   - The build process will use simplified dependencies compatible with Vercel

## How It Works

The Vercel deployment uses:
- `astro.config.vercel.mjs` - Simplified Astro configuration
- `package.vercel.json` - Minimal dependencies for Vercel build
- `build-vercel.sh` - Custom build script that swaps files for Vercel compatibility
- Fallback components that don't require Wix integrations

## Environment Variables

Required:
- `VITE_API_BASE_URL` - API endpoint (defaults to https://api.dots.com)
- `VITE_AI_PROVIDER` - AI provider (local/openai/anthropic, defaults to local)
- `VITE_PAYMENT_GATEWAY` - Payment gateway (mock/stripe/razorpay, defaults to mock)
- `VITE_FEATURE_AI_ASSISTANT` - Enable AI assistant (true/false, defaults to true)

## Notes

- This deployment excludes Wix-specific features for compatibility
- Full feature set requires Wix Studio deployment
- Suitable for development, demo, and basic functionality testing