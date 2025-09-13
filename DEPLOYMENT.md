# Deployment Guide for Dots Platform

## Overview

The Dots platform is built with Astro.js and React, using Wix integrations for backend services. This guide provides multiple deployment options and recommendations.

## Architecture

- **Frontend**: Astro.js with React components
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Wix Studio integrations (CMS, E-commerce, Authentication)
- **AI Assistant**: Local fallback with support for external AI APIs
- **State Management**: React hooks and local storage
- **Build Tool**: Vite

## Deployment Options

### 1. Wix Studio (Recommended for Production)

**Best for**: Production deployment with full Wix ecosystem integration

**Steps**:
1. Install Wix CLI: `npm install -g @wix/cli`
2. Authenticate: `wix login`
3. Deploy: `wix build && wix deploy`

**Advantages**:
- Seamless integration with Wix services
- Built-in CDN and global distribution
- Automatic SSL certificates
- Integrated analytics and monitoring
- E-commerce features fully functional

**Configuration Required**:
```bash
# Environment variables in Wix Studio dashboard
VITE_WIX_API_KEY=your_wix_api_key
VITE_AI_PROVIDER=openai  # or anthropic
VITE_AI_API_KEY=your_ai_api_key
VITE_PAYMENT_GATEWAY=wix
```

### 2. Vercel (Recommended for Development/Demo)

**Best for**: Fast deployment, preview environments, development

**Steps**:
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps` (REQUIRED - resolves dependency conflicts)
   - Node.js Version: 18.x

**Advantages**:
- Automatic deployments from Git
- Preview deployments for PRs
- Edge functions support
- Fast global CDN

**Limitations**:
- Wix integrations may require additional configuration
- E-commerce features limited without Wix backend

**Environment Variables**:
```bash
VITE_API_BASE_URL=https://your-api.vercel.app
VITE_AI_PROVIDER=local
VITE_PAYMENT_GATEWAY=mock
VITE_FEATURE_AI_ASSISTANT=true
```

### 3. Netlify

**Best for**: Static site hosting with serverless functions

**Steps**:
1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

**Advantages**:
- Form handling built-in
- Split testing capabilities
- Branch-based deployments
- Serverless functions support

**Configuration**:
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 4. Cloudflare Pages

**Best for**: Global edge deployment with excellent performance

**Steps**:
1. Connect GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Build Command: `npm run build`
   - Build Output Directory: `dist`

**Advantages**:
- Global edge network
- Serverless functions (Workers)
- Excellent performance
- DDoS protection included

### 5. AWS Amplify

**Best for**: Integration with AWS services

**Steps**:
1. Connect GitHub repository to AWS Amplify
2. Configure build settings in `amplify.yml`

**Configuration** (`amplify.yml`):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 6. GitHub Pages (For Demo/Portfolio)

**Best for**: Free hosting for open source projects

**Steps**:
1. Enable GitHub Pages in repository settings
2. Add GitHub Actions workflow for deployment

**Configuration** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v1
        with:
          artifact_name: github-pages
          path: ./dist
```

## Environment Configuration

### Required Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=https://api.dots.com
VITE_WIX_API_KEY=your_wix_api_key

# AI Assistant
VITE_AI_PROVIDER=openai  # openai | anthropic | local
VITE_AI_API_KEY=your_ai_api_key
VITE_AI_MODEL=gpt-3.5-turbo

# Payment Configuration
VITE_PAYMENT_GATEWAY=razorpay  # stripe | razorpay | wix | mock
VITE_PAYMENT_PUBLIC_KEY=your_payment_key

# Feature Flags
VITE_FEATURE_AI_ASSISTANT=true
VITE_FEATURE_CUSTOM_ORDERS=true
VITE_FEATURE_INTERNATIONAL_SHIPPING=true
VITE_FEATURE_WISHLIST=true
VITE_FEATURE_REVIEWS=true

# Business Configuration
VITE_CURRENCY=INR
VITE_DEFAULT_SHIPPING_COST=100
VITE_FREE_SHIPPING_THRESHOLD=2000
VITE_TAX_RATE=0.18
VITE_SUPPORT_EMAIL=support@dots.com
```

### Optional Environment Variables

```bash
# UI Configuration
VITE_ITEMS_PER_PAGE=20
VITE_MAX_IMAGE_SIZE=5242880
VITE_SUPPORTED_IMAGE_FORMATS=jpeg,jpg,png,webp
VITE_THEME=light

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_HOTJAR_ID=your_hotjar_id

# Social Login
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

## Performance Optimization

### Build Optimization

1. **Image Optimization**: Images are optimized using Astro's built-in image optimization
2. **Code Splitting**: React components are lazy-loaded where appropriate
3. **CSS Optimization**: Tailwind CSS is purged of unused styles
4. **Bundle Analysis**: Use `npm run build -- --analyze` to analyze bundle size

### Runtime Performance

1. **Lazy Loading**: Product images and components are lazy-loaded
2. **Caching**: API responses are cached using React Query patterns
3. **Service Workers**: Can be added for offline functionality
4. **CDN**: Static assets should be served from a CDN

## Security Considerations

### API Security

1. **Environment Variables**: Never expose API keys in client-side code
2. **CORS**: Configure CORS policies for your API endpoints
3. **Rate Limiting**: Implement rate limiting for API calls
4. **Authentication**: Use secure authentication tokens

### Content Security

1. **Content Security Policy**: Implement CSP headers
2. **XSS Protection**: Input validation and sanitization
3. **HTTPS**: Always use HTTPS in production
4. **Secure Headers**: Implement security headers

### Example Security Headers

```nginx
# Nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## Monitoring and Analytics

### Recommended Tools

1. **Error Tracking**: Sentry or Bugsnag
2. **Analytics**: Google Analytics 4
3. **Performance**: Web Vitals monitoring
4. **Uptime**: UptimeRobot or Pingdom
5. **User Experience**: Hotjar or FullStory

### Implementation

Add to your app configuration:

```typescript
// Analytics configuration
if (isProduction()) {
  // Initialize analytics
  gtag('config', 'GA_MEASUREMENT_ID');
  
  // Initialize error tracking
  Sentry.init({
    dsn: 'your_sentry_dsn',
    environment: getEnvironment(),
  });
}
```

## Deployment Checklist

### Pre-deployment

- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] SSL certificate configured
- [ ] Domain configured
- [ ] Analytics tracking implemented
- [ ] Error monitoring setup
- [ ] Performance testing completed
- [ ] Security headers configured
- [ ] Backup strategy in place

### Post-deployment

- [ ] DNS propagation verified
- [ ] All features tested in production
- [ ] Analytics data flowing
- [ ] Error tracking working
- [ ] Performance metrics baseline established
- [ ] SEO metadata verified
- [ ] Social media previews tested
- [ ] Search console configured

## Recommended Production Setup

For a production deployment, we recommend:

1. **Primary**: Wix Studio for full feature integration
2. **CDN**: Cloudflare for performance and security
3. **Monitoring**: Sentry for error tracking
4. **Analytics**: Google Analytics 4
5. **Backup**: Automated daily backups
6. **CI/CD**: GitHub Actions for automated deployment

This setup provides the best balance of functionality, performance, and maintainability for the Dots platform.