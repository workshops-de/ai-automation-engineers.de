# GitHub Pages Deployment Setup

This guide explains how to deploy your Angular application to GitHub Pages using GitHub Actions.

## Prerequisites

1. Your repository must be hosted on GitHub
2. GitHub Pages must be enabled for your repository
3. The repository must be public (or you need GitHub Pro/Team for private repos)

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the configuration

### 2. Repository Configuration

The GitHub Action workflow (`.github/workflows/deploy.yml`) is already configured for this repository with the following settings:

- **Repository Name**: `ai-automations-engineer.de` (based on your workspace)
- **Base Href**: `/ai-automations-engineer.de/`
- **Build Output**: `dist/demo/browser`

### 3. Automatic Deployment

The workflow will automatically:

1. **Trigger on**: 
   - Push to `main` branch
   - Pull requests to `main` branch (build only, no deployment)

2. **Build Process**:
   - Install Node.js 20
   - Install dependencies with `npm ci`
   - Build the Angular app for production with correct base href
   - Upload the built files to GitHub Pages

3. **Deployment**:
   - Deploy to GitHub Pages (only on pushes to `main`)
   - Set up the correct environment and permissions

### 4. Client-Side Routing

Since GitHub Pages doesn't support server-side routing, the setup includes:

- **404.html**: Handles direct URL access to routes by redirecting to the Angular app
- **Base Href**: Configured to match your repository path
- **Prerendering**: Angular's prerendering feature generates static files for better SEO

### 5. Access Your Site

After successful deployment, your site will be available at:
```
https://[your-username].github.io/ai-automations-engineer.de/
```

Replace `[your-username]` with your actual GitHub username.

## Troubleshooting

### Common Issues

1. **404 Errors on Routes**: 
   - Make sure the base href is correctly set in the build command
   - Verify that 404.html is included in the assets

2. **Build Failures**:
   - Check that all dependencies are properly listed in `package.json`
   - Ensure the build command works locally first

3. **Assets Not Loading**:
   - Verify that the base href matches your repository name
   - Check that all assets are correctly referenced with relative paths

### Debugging

- Check the **Actions** tab in your GitHub repository for build logs
- Verify that the workflow has the correct permissions
- Ensure your repository settings allow GitHub Actions

## Customization

### Changing Repository Name

If you rename your repository, update:

1. The base href in `.github/workflows/deploy.yml`:
   ```yaml
   run: npm run build -- --base-href /your-new-repo-name/
   ```

2. The redirect URL in `src/404.html`:
   ```html
   <base href="/your-new-repo-name/">
   ```

3. The fallback redirect in `src/404.html`:
   ```javascript
   window.location.href = '/your-new-repo-name/';
   ```

### Custom Domain

If you want to use a custom domain:

1. Add a `CNAME` file to the `src` directory with your domain
2. Update the base href to `/` in the workflow
3. Configure DNS settings as per GitHub Pages documentation

## Security Considerations

- The workflow uses minimal permissions (contents: read, pages: write, id-token: write)
- Only the `main` branch can trigger deployments
- The workflow uses official GitHub Actions for security

## Performance

- The build uses production configuration with optimizations
- Angular's prerendering generates static files for better loading performance
- Assets are properly hashed for caching

## Support

For issues with the deployment:
1. Check the GitHub Actions logs in your repository
2. Verify that GitHub Pages is enabled in repository settings
3. Ensure your account has the necessary permissions