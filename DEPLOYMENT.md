# 🚀 Deployment Guide - Parrot OS Terminal Portfolio

## GitHub Pages Deployment (Recommended)

### Step 1: Create GitHub Repository
1. Create a new repository on GitHub (e.g., `username.github.io` or `parrot-portfolio`)
2. Clone this project to your local machine
3. Push the code to your GitHub repository

### Step 2: Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on push to main branch

### Step 3: Access Your Site
Your portfolio will be available at:
- `https://username.github.io/` (if repo name is username.github.io)
- `https://username.github.io/repository-name/` (for other repo names)

## Manual Deployment

### Netlify
1. Build the project: `pnpm run build`
2. Drag and drop the `dist/` folder to Netlify
3. Your site will be live instantly

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Traditional Web Hosting
1. Build the project: `pnpm run build`
2. Upload contents of `dist/` folder to your web server
3. Ensure your server serves `index.html` for all routes

## Environment Setup

### Prerequisites
```bash
# Install Node.js 18+
# Install pnpm (recommended)
npm install -g pnpm
```

### Local Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev --host

# Build for production
pnpm run build

# Preview production build
pnpm run preview --host
```

## Customization Before Deployment

### 1. Update Personal Information
Edit `src/App.jsx`:
- Update name, age, role in `whoami` command
- Update contact information in `contact` command
- Update social links in `social` command
- Update project details in `projects` command

### 2. Update GitHub Stats
Edit `src/components/GitHubStats.jsx`:
- Update GitHub username in the profile link
- Adjust stats if you want different default values

### 3. Update TryHackMe Badge
Edit `src/App.jsx`:
- Replace the TryHackMe user ID in the iframe src
- Update the profile link

### 4. Update Meta Tags
Edit `index.html`:
- Update social media URLs
- Update description and keywords
- Update Open Graph and Twitter card information

## Troubleshooting

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Vite cache
rm -rf .vite
pnpm run build
```

### GitHub Pages Not Updating
1. Check the Actions tab for deployment status
2. Ensure the workflow has proper permissions
3. Verify the branch name is correct (main vs master)

### Favicon Not Showing
1. Clear browser cache
2. Check that favicon files are in the `public/` directory
3. Verify the HTML references the correct favicon paths

## Performance Optimization

### Already Included:
- ✅ Vite bundling and minification
- ✅ CSS optimization with Tailwind
- ✅ Image optimization for favicons
- ✅ Lazy loading where appropriate

### Additional Optimizations:
- Consider using a CDN for faster global delivery
- Enable gzip compression on your server
- Use browser caching headers

## Security Considerations

### Content Security Policy
Add to your hosting provider or server config:
```
Content-Security-Policy: default-src 'self' https://tryhackme.com; style-src 'self' 'unsafe-inline'; script-src 'self'
```

### HTTPS
- GitHub Pages automatically provides HTTPS
- Ensure your custom domain has SSL certificate
- Redirect HTTP to HTTPS

## Monitoring and Analytics

### Add Google Analytics (Optional)
1. Create a Google Analytics account
2. Add the tracking code to `index.html`
3. Monitor visitor statistics

### GitHub Pages Analytics
- View traffic in your repository's Insights tab
- Monitor deployment status in Actions tab

## Maintenance

### Regular Updates
- Update dependencies: `pnpm update`
- Check for security vulnerabilities: `pnpm audit`
- Update personal information and project status

### Backup
- Keep your source code in version control
- Export any analytics data regularly
- Backup your custom configurations

---

**Need Help?** 
- Check the main README.md for detailed documentation
- Review GitHub Actions logs for deployment issues
- Test locally before deploying to production

