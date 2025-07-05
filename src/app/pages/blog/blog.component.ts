import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="section-title">AI Automation Blog</h1>
          <p class="section-subtitle">Insights, tutorials, and best practices from the community</p>
        </div>

        <!-- Featured Post -->
        <div *ngIf="featuredPost" class="card overflow-hidden mb-12 hover:shadow-2xl transition-shadow duration-300">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="relative">
              <img [src]="featuredPost.imageUrl" [alt]="featuredPost.title" class="w-full h-64 lg:h-full object-cover">
              <div class="absolute top-4 left-4">
                <span class="bg-accent-500 text-white text-sm px-3 py-1 rounded-full">Featured</span>
              </div>
            </div>
            <div class="p-8 flex flex-col justify-center">
              <div class="flex items-center mb-4">
                <img [src]="featuredPost.author.avatar" [alt]="featuredPost.author.name" class="w-10 h-10 rounded-full mr-3">
                <div>
                  <div class="font-medium text-gray-900">{{ featuredPost.author.name }}</div>
                  <div class="text-sm text-gray-500">{{ featuredPost.publishedAt | date:'MMM d, yyyy' }}</div>
                </div>
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ featuredPost.title }}</h2>
              <p class="text-gray-600 mb-6">{{ featuredPost.excerpt }}</p>
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-2">
                  <span *ngFor="let tag of featuredPost.tags.slice(0, 3)" class="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                    {{ tag }}
                  </span>
                </div>
                <span class="text-sm text-gray-500">{{ featuredPost.readTimeMinutes }} min read</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter and Search -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input type="text" placeholder="Search articles..." class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select class="input-field">
                <option value="">All Categories</option>
                <option value="tutorial">Tutorial</option>
                <option value="trends">Trends</option>
                <option value="case-study">Case Study</option>
                <option value="tools">Tools</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <select class="input-field">
                <option value="">All Authors</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="marcus">Marcus Chen</option>
                <option value="emily">Emily Rodriguez</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="btn-primary w-full">Filter</button>
            </div>
          </div>
        </div>

        <!-- Blog Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let post of blogPosts" class="card overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative">
              <img [src]="post.imageUrl" [alt]="post.title" class="w-full h-48 object-cover">
              <div class="absolute top-4 right-4">
                <span class="bg-white text-gray-700 text-xs px-2 py-1 rounded-full shadow-md">{{ post.readTimeMinutes }} min</span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center mb-3">
                <img [src]="post.author.avatar" [alt]="post.author.name" class="w-8 h-8 rounded-full mr-2">
                <div>
                  <div class="font-medium text-sm text-gray-900">{{ post.author.name }}</div>
                  <div class="text-xs text-gray-500">{{ post.publishedAt | date:'MMM d, yyyy' }}</div>
                </div>
              </div>
              
              <h3 class="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ post.excerpt }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tag of post.tags.slice(0, 2)" class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {{ tag }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">Read More</button>
                <div class="flex space-x-2">
                  <button class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center mt-12">
          <button class="btn-outline">Load More Posts</button>
        </div>
      </div>
    </div>
  `
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  featuredPost: BlogPost | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogPosts().subscribe(posts => {
      this.blogPosts = posts.slice(1); // Skip first post for featured
      this.featuredPost = posts[0]; // Use first post as featured
    });
  }
}