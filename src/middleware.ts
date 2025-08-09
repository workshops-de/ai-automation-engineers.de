import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = (context, next) => {
  const url = context.url;
  
  // Force HTTPS redirect (GitHub Pages handles this automatically, but this is a backup)
  if (url.protocol === 'http:' && !url.hostname.includes('localhost') && !url.hostname.includes('127.0.0.1')) {
    const httpsUrl = url.toString().replace('http://', 'https://');
    return context.redirect(httpsUrl, 301);
  }
  
  // Redirect www to non-www
  if (url.hostname.startsWith('www.')) {
    const nonWwwUrl = url.toString().replace('://www.', '://');
    return context.redirect(nonWwwUrl, 301);
  }
  
  return next();
};