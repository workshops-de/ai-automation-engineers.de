// Utility functions for newsletter generation

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  url: string;
}

/**
 * Get blog posts from the last N days
 */
export function getPostsFromLastDays(allPosts: BlogPost[], days: number = 7): BlogPost[] {
  const now = new Date();
  const cutoffDate = new Date(now);
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return allPosts.filter(post => {
    const postDate = new Date(post.publishDate);
    return postDate >= cutoffDate && postDate <= now;
  });
}


/**
 * Format date in German locale
 */
export function formatDateGerman(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format date range for newsletter
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = startDate.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const end = endDate.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    return `${startDate.getDate()}. - ${endDate.getDate()}. ${endDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}`;
  }
  
  return `${start} - ${end}`;
}

