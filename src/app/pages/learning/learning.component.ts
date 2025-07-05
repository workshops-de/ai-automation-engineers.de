import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LearningService } from '../../services/learning.service';
import { LearningResource } from '../../models/learning-resource.model';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="section-title">Learning Resources</h1>
          <p class="section-subtitle">Curated content to advance your AI automation skills</p>
        </div>

        <!-- Learning Path -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-12 text-white">
          <h2 class="text-3xl font-bold mb-4">Recommended Learning Path</h2>
          <p class="text-primary-100 mb-6">Follow our structured path to become an AI automation expert</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white/10 rounded-lg p-4">
              <div class="text-2xl font-bold mb-2">1. Foundations</div>
              <p class="text-sm text-primary-100">Learn Python, ML basics, and automation concepts</p>
            </div>
            <div class="bg-white/10 rounded-lg p-4">
              <div class="text-2xl font-bold mb-2">2. Practical Skills</div>
              <p class="text-sm text-primary-100">Build real projects and learn industry tools</p>
            </div>
            <div class="bg-white/10 rounded-lg p-4">
              <div class="text-2xl font-bold mb-2">3. Advanced Topics</div>
              <p class="text-sm text-primary-100">MLOps, scaling, and enterprise solutions</p>
            </div>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select class="input-field">
                <option value="">All Types</option>
                <option value="course">Course</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="tool">Tool</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select class="input-field">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <select class="input-field">
                <option value="">All Topics</option>
                <option value="python">Python</option>
                <option value="ml">Machine Learning</option>
                <option value="automation">Automation</option>
                <option value="mlops">MLOps</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="btn-primary w-full">Filter</button>
            </div>
          </div>
        </div>

        <!-- Resource Types -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Courses</h3>
            <p class="text-gray-600 text-sm">Comprehensive learning programs</p>
          </div>
          
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Videos</h3>
            <p class="text-gray-600 text-sm">Visual learning content</p>
          </div>
          
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Articles</h3>
            <p class="text-gray-600 text-sm">In-depth written guides</p>
          </div>
          
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Tools</h3>
            <p class="text-gray-600 text-sm">Software and platforms</p>
          </div>
        </div>

        <!-- Resources Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let resource of resources" class="card overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative">
              <img [src]="resource.imageUrl" [alt]="resource.title" class="w-full h-48 object-cover">
              <div class="absolute top-4 left-4">
                <span class="bg-white text-gray-700 text-xs px-2 py-1 rounded-full shadow-md capitalize">{{ resource.type }}</span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="bg-primary-600 text-white text-xs px-2 py-1 rounded-full capitalize">{{ resource.level }}</span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="font-bold text-xl text-gray-900 mb-2">{{ resource.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ resource.description }}</p>
              
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                {{ resource.author }}
              </div>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tag of resource.tags.slice(0, 3)" class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {{ tag }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ resource.createdAt | date:'MMM yyyy' }}</span>
                <a [href]="resource.url" target="_blank" class="btn-primary text-sm">
                  Access Resource
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center mt-12">
          <button class="btn-outline">Load More Resources</button>
        </div>
      </div>
    </div>
  `
})
export class LearningComponent implements OnInit {
  resources: LearningResource[] = [];

  constructor(private learningService: LearningService) {}

  ngOnInit() {
    this.learningService.getResources().subscribe(resources => {
      this.resources = resources;
    });
  }
}