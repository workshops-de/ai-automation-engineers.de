import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="animate-fade-in">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
                Connect with AI Automation Engineers
              </h1>
              <p class="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up" style="animation-delay: 0.1s;">
                Join the premier community of professionals shaping the future of intelligent automation
              </p>
              <div class="flex flex-col sm:flex-row gap-4 animate-slide-up" style="animation-delay: 0.2s;">
                <a routerLink="/profiles" class="btn-secondary text-lg px-8 py-3 inline-block text-center">
                  Explore Profiles
                </a>
                <a routerLink="/learning" class="btn-outline bg-white text-primary-600 border-white hover:bg-primary-50 text-lg px-8 py-3 inline-block text-center">
                  Start Learning
                </a>
              </div>
            </div>
            <div class="relative">
              <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2" 
                   alt="AI Automation" 
                   class="rounded-2xl shadow-2xl animate-slide-up" 
                   style="animation-delay: 0.3s;">
              <div class="absolute -bottom-6 -right-6 bg-accent-500 text-white p-4 rounded-xl shadow-lg animate-slide-up" style="animation-delay: 0.4s;">
                <div class="text-2xl font-bold">500+</div>
                <div class="text-sm opacity-90">Engineers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="section-title">Why Join Our Community?</h2>
            <p class="section-subtitle">Everything you need to excel in AI automation engineering</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="card p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Expert Network</h3>
              <p class="text-gray-600">Connect with AI automation engineers from leading companies worldwide</p>
            </div>
            
            <div class="card p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Learning Resources</h3>
              <p class="text-gray-600">Access curated courses, articles, and tools to advance your skills</p>
            </div>
            
            <div class="card p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Innovation Hub</h3>
              <p class="text-gray-600">Share ideas, collaborate on projects, and drive innovation in automation</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Blog Posts -->
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="section-title">Latest Insights</h2>
              <p class="section-subtitle">Stay updated with the latest trends and best practices</p>
            </div>
            <a routerLink="/blog" class="btn-outline">View All Posts</a>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="card overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2" 
                   alt="AI Trends" 
                   class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">AI Trends</span>
                  <span class="text-gray-500 text-sm ml-auto">Dec 1, 2024</span>
                </div>
                <h3 class="font-bold text-xl mb-2">The Future of AI Automation</h3>
                <p class="text-gray-600 text-sm">Explore the emerging trends shaping the AI automation landscape...</p>
              </div>
            </div>
            
            <div class="card overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2" 
                   alt="Automation Pipeline" 
                   class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-secondary-100 text-secondary-600 text-xs px-2 py-1 rounded-full">Tutorial</span>
                  <span class="text-gray-500 text-sm ml-auto">Nov 28, 2024</span>
                </div>
                <h3 class="font-bold text-xl mb-2">Building Your First AI Pipeline</h3>
                <p class="text-gray-600 text-sm">A comprehensive guide to designing and implementing automation workflows...</p>
              </div>
            </div>
            
            <div class="card overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2" 
                   alt="AI Ethics" 
                   class="w-full h-48 object-cover">
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-accent-100 text-accent-600 text-xs px-2 py-1 rounded-full">Ethics</span>
                  <span class="text-gray-500 text-sm ml-auto">Nov 25, 2024</span>
                </div>
                <h3 class="font-bold text-xl mb-2">Ethics in AI Automation</h3>
                <p class="text-gray-600 text-sm">Understanding the ethical implications of AI automation and building responsible systems...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-primary-600">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold text-white mb-6">Ready to Join the Community?</h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Connect with fellow AI automation engineers, share your expertise, and accelerate your career growth
          </p>
          <a routerLink="/profiles" class="btn-secondary text-lg px-8 py-3">
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {}