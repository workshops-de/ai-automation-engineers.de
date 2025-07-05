import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogPostsSubject = new BehaviorSubject<BlogPost[]>([]);
  public blogPosts$ = this.blogPostsSubject.asObservable();

  constructor() {
    this.loadMockPosts();
  }

  private loadMockPosts(): void {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of AI Automation: Trends to Watch in 2025',
        content: 'Artificial Intelligence automation is evolving at breakneck speed...',
        excerpt: 'Explore the emerging trends shaping the AI automation landscape and what they mean for engineers and businesses.',
        author: {
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        publishedAt: new Date('2024-12-01'),
        tags: ['AI', 'Automation', 'Trends', 'Machine Learning'],
        readTimeMinutes: 8,
        imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2'
      },
      {
        id: '2',
        title: 'Building Your First AI Automation Pipeline',
        content: 'Learn how to create an end-to-end automation pipeline using modern tools...',
        excerpt: 'A comprehensive guide to designing and implementing your first AI automation workflow from scratch.',
        author: {
          name: 'Marcus Chen',
          avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        publishedAt: new Date('2024-11-28'),
        tags: ['Tutorial', 'Python', 'Automation', 'Pipeline'],
        readTimeMinutes: 12,
        imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2'
      },
      {
        id: '3',
        title: 'Ethics in AI Automation: A Practitioner\'s Guide',
        content: 'As AI automation becomes more prevalent, ethical considerations become crucial...',
        excerpt: 'Understanding the ethical implications of AI automation and how to build responsible systems.',
        author: {
          name: 'Emily Rodriguez',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        publishedAt: new Date('2024-11-25'),
        tags: ['Ethics', 'AI', 'Responsibility', 'Best Practices'],
        readTimeMinutes: 10,
        imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2'
      }
    ];
    
    this.blogPostsSubject.next(mockPosts);
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.blogPosts$;
  }

  getBlogPost(id: string): Observable<BlogPost | undefined> {
    return new Observable(observer => {
      this.blogPosts$.subscribe(posts => {
        observer.next(posts.find(post => post.id === id));
      });
    });
  }
}