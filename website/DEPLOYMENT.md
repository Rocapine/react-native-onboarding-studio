# Docusaurus Deployment Guide

## Local Development

### Start Development Server

```bash
# From root directory
npm run docs:start

# Or from website directory
cd website
npm start
```

This starts a local development server at `http://localhost:3000` with hot reloading.

### Build Locally

```bash
# From root directory
npm run docs:build

# Or from website directory
cd website
npm run build
```

This builds the static site into `website/build/` directory.

### Serve Built Site Locally

```bash
# From root directory
npm run docs:serve

# Or from website directory
cd website
npm run serve
```

This serves the built site locally to test the production build.

---

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

The site is configured to deploy automatically to GitHub Pages when you push to `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub
   - Navigate to `Settings` → `Pages`
   - Under "Build and deployment" → "Source", select **GitHub Actions**

2. **Push to Main Branch:**
   ```bash
   git add .
   git commit -m "docs: update documentation"
   git push origin main
   ```

3. **Monitor Deployment:**
   - Go to `Actions` tab in your repository
   - Watch the "Deploy Docs to GitHub Pages" workflow
   - Once complete, site will be live at: `https://rocapine.github.io/react-native-onboarding-studio/`

**Workflow Triggers:**
- Automatically on push to `main` branch when files in `docs/` or `website/` change
- Manually via GitHub Actions "Run workflow" button

### Manual Deployment

If you prefer manual deployment:

```bash
# From root directory
npm run docs:deploy

# Or from website directory
cd website
USE_SSH=true npm run deploy
```

**Note:** Manual deployment requires:
- GitHub SSH key configured
- Write access to the repository

---

## Alternative Deployment Options

### Netlify

1. **Connect Repository:**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   - **Base directory:** `website`
   - **Build command:** `npm run build`
   - **Publish directory:** `website/build`

3. **Deploy:**
   - Netlify will auto-deploy on every push to `main`

### Vercel

1. **Import Repository:**
   - Sign up at [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure:**
   - **Framework Preset:** Docusaurus
   - **Root Directory:** `website`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

3. **Deploy:**
   - Vercel will auto-deploy on every push

### Cloudflare Pages

1. **Connect Repository:**
   - Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub/GitLab repository

2. **Configure Build Settings:**
   - **Production branch:** `main`
   - **Framework preset:** `Docusaurus`
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
   - **Root directory:** `website`

3. **Advanced Settings (Optional):**
   - **Node version:** Set to `20` or higher
   - **Environment variables:** None required for basic setup

4. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare Pages will auto-deploy on every push to `main`
   - Preview deployments created automatically for pull requests

**Benefits:**
- ⚡ Global CDN with 200+ locations
- 🔒 Free SSL certificate
- 🚀 Unlimited bandwidth
- 📊 Built-in analytics
- 🔄 Automatic atomic deployments

**Post-Deployment:**
- Site will be available at `https://your-project.pages.dev`
- Configure custom domain in Cloudflare Pages dashboard
- Set up redirects and headers in `website/static/_redirects` if needed

### Custom Domain

#### For GitHub Pages:

1. Add `CNAME` file to `website/static/`:
   ```bash
   echo "docs.yourdomain.com" > website/static/CNAME
   ```

2. Update `docusaurus.config.ts`:
   ```typescript
   url: 'https://docs.yourdomain.com',
   baseUrl: '/',
   ```

3. Configure DNS:
   - Add CNAME record pointing to `your-org.github.io`

#### For Netlify/Vercel:

- Follow their custom domain setup in dashboard settings

#### For Cloudflare Pages:

1. **Add Custom Domain:**
   - Go to Cloudflare Pages dashboard
   - Select your project → "Custom domains"
   - Click "Set up a custom domain"
   - Enter your domain (e.g., `docs.yourdomain.com`)

2. **DNS Configuration:**
   - If domain is on Cloudflare DNS: DNS records added automatically
   - If domain is external: Add CNAME record pointing to `your-project.pages.dev`

3. **Update Config:**
   ```typescript
   url: 'https://docs.yourdomain.com',
   baseUrl: '/',
   ```

**Benefits of Cloudflare:**
- Automatic SSL certificate provisioning
- DNS managed in same dashboard
- Advanced caching and performance settings
- DDoS protection included

---

## Configuration

### Update Base URL

If deploying to a different location, update `website/docusaurus.config.ts`:

```typescript
const config: Config = {
  url: 'https://your-domain.com',
  baseUrl: '/your-path/',  // For subdirectory deployment
  // or
  baseUrl: '/',  // For root domain
};
```

### Update GitHub Organization

Update these fields in `website/docusaurus.config.ts`:

```typescript
organizationName: 'your-org',
projectName: 'your-repo',
```

---

## Troubleshooting

### Build Fails

**Check Node Version:**
```bash
node --version  # Should be 20.x or higher
```

**Clear Cache and Rebuild:**
```bash
cd website
rm -rf node_modules package-lock.json .docusaurus build
npm install
npm run build
```

### Deployment Fails

**GitHub Actions:**
- Check the Actions tab for error logs
- Ensure GitHub Pages is enabled in repository settings
- Verify workflow has necessary permissions

**Manual Deployment:**
- Ensure SSH key is configured: `ssh -T git@github.com`
- Check repository write permissions

### 404 on GitHub Pages

**Check Base URL:**
- Ensure `baseUrl` in `docusaurus.config.ts` matches your deployment path
- For `https://user.github.io/repo/`, use `baseUrl: '/repo/'`
- For custom domain, use `baseUrl: '/'`

**Verify Deployment:**
- Check if `gh-pages` branch exists
- Ensure branch has content in it

---

## Scripts Reference

From root directory:

- `npm run docs:start` - Start development server
- `npm run docs:build` - Build production site
- `npm run docs:serve` - Serve built site locally
- `npm run docs:deploy` - Deploy to GitHub Pages

From website directory:

- `npm start` - Start development server
- `npm run build` - Build production site
- `npm run serve` - Serve built site locally
- `npm run deploy` - Deploy to GitHub Pages

---

## Continuous Integration

The GitHub Actions workflow (`.github/workflows/deploy-docs.yml`) automatically:

1. ✅ Checks out code
2. ✅ Sets up Node.js 20
3. ✅ Installs dependencies
4. ✅ Builds site
5. ✅ Deploys to GitHub Pages

**Monitoring:**
- View workflow runs in the "Actions" tab
- Receive email notifications on failure
- Check deployment status on Pages settings

---

## Best Practices

1. **Test Locally First:**
   ```bash
   npm run docs:build
   npm run docs:serve
   ```

2. **Check for Broken Links:**
   - Build fails if internal links are broken
   - Fix any `onBrokenLinks` errors before deploying

3. **Preview Deployments:**
   - Use Netlify/Vercel for preview deployments on PRs
   - Test changes before merging to main

4. **Keep Dependencies Updated:**
   ```bash
   cd website
   npm update
   ```

---

## Support

- **Docusaurus Docs:** https://docusaurus.io/docs
- **Deployment Guide:** https://docusaurus.io/docs/deployment
- **GitHub Pages:** https://docs.github.com/en/pages

For issues specific to this project, open an issue on GitHub.
