import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Mock blog posts - in a real app, this would fetch from your CMS or markdown files
  const posts = [
    {
      title: 'The Future of AI Automation',
      description: 'Explore the emerging trends shaping the AI automation landscape and how they will impact businesses.',
      pubDate: new Date('2024-12-01'),
      link: '/blog/future-of-ai-automation',
      categories: ['AI Trends', 'Automation']
    },
    {
      title: 'Building Your First AI Pipeline',
      description: 'A comprehensive guide to designing and implementing automation workflows using modern AI tools.',
      pubDate: new Date('2024-11-28'),
      link: '/blog/building-first-ai-pipeline',
      categories: ['Tutorial', 'Pipeline']
    },
    {
      title: 'Ethics in AI Automation',
      description: 'Understanding the ethical implications of AI automation and building responsible systems.',
      pubDate: new Date('2024-11-25'),
      link: '/blog/ethics-in-ai-automation',
      categories: ['Ethics', 'Best Practices']
    }
  ];

  return rss({
    title: 'AI-Automation-Engineers.de Blog',
    description: 'Latest insights, tutorials, and best practices in AI automation engineering',
    site: context.site!,
    items: posts.map(post => ({
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      link: post.link,
      categories: post.categories
    })),
    customData: `
      <language>en-us</language>
      <managingEditor>contact@ai-automation-engineers.de</managingEditor>
      <webMaster>contact@ai-automation-engineers.de</webMaster>
      <copyright>Copyright ${new Date().getFullYear()} AI-Automation-Engineers.de</copyright>
      <category>Technology</category>
      <category>AI</category>
      <category>Automation</category>
    `
  });
}