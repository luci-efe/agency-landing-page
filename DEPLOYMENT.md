# Deployment Guide

## Overview

This project is set up for automatic deployment using Vercel and Cloudflare with a CI/CD pipeline via GitHub Actions.

## Prerequisites

### Vercel Setup

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure the following build settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm ci --legacy-peer-deps`
   - Output Directory: `.next`

### GitHub Secrets

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

### Cloudflare Setup

1. Add your domain to Cloudflare
2. Configure DNS records:
   - Type: CNAME
   - Name: @ (or your subdomain)
   - Target: Your Vercel deployment URL
   - Proxy status: Proxied (orange cloud)

## Environment Variables

### Local Development

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

### Production (Vercel Dashboard)

Configure these in your Vercel project settings:

- `NODE_ENV=production`
- Add any additional environment variables as needed

## Deployment Process

### Automatic Deployment

- Pushes to `main`/`master` branch trigger automatic deployment
- Pull requests create preview deployments
- The CI/CD pipeline runs linting, type checking, and tests before deployment

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Build Verification

Before deploying, ensure all checks pass locally:

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Run tests
npm run test

# Build project
npm run build
```

## Security Headers

The project includes security headers configured in `vercel.json`:

- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## Support

For deployment issues:

1. Check GitHub Actions logs
2. Review Vercel deployment logs
3. Verify environment variables are set correctly
4. Ensure build commands pass locally
