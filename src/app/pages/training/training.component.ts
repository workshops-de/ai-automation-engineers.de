import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="section-title">Training Programs</h1>
          <p class="section-subtitle">Professional development programs for AI automation engineers</p>
        </div>

        <!-- Training Types -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="card p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Online Courses</h3>
            <p class="text-gray-600 mb-6">Self-paced learning with expert instructors</p>
            <button class="btn-primary">Explore Courses</button>
          </div>
          
          <div class="card p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Workshops</h3>
            <p class="text-gray-600 mb-6">Interactive sessions with hands-on projects</p>
            <button class="btn-primary">Join Workshop</button>
          </div>
          
          <div class="card p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Mentorship</h3>
            <p class="text-gray-600 mb-6">1-on-1 guidance from industry experts</p>
            <button class="btn-primary">Find Mentor</button>
          </div>
        </div>

        <!-- Featured Programs -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Programs</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Program 1 -->
            <div class="card overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="relative">
                  <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2" 
                       alt="AI Automation Bootcamp" 
                       class="w-full h-48 lg:h-full object-cover">
                  <div class="absolute top-4 left-4">
                    <span class="bg-primary-600 text-white text-sm px-3 py-1 rounded-full">Popular</span>
                  </div>
                </div>
                <div class="p-6 flex flex-col justify-between">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">AI Automation Bootcamp</h3>
                    <p class="text-gray-600 mb-4">12-week intensive program covering Python, ML, and automation tools</p>
                    <div class="flex items-center text-sm text-gray-500 mb-4">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      12 weeks • 120 hours
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-primary-600">$1,299</span>
                    <button class="btn-primary">Enroll Now</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Program 2 -->
            <div class="card overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="relative">
                  <img src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2" 
                       alt="MLOps Certification" 
                       class="w-full h-48 lg:h-full object-cover">
                  <div class="absolute top-4 left-4">
                    <span class="bg-secondary-600 text-white text-sm px-3 py-1 rounded-full">Certification</span>
                  </div>
                </div>
                <div class="p-6 flex flex-col justify-between">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">MLOps Certification</h3>
                    <p class="text-gray-600 mb-4">Industry-recognized certification for ML operations and deployment</p>
                    <div class="flex items-center text-sm text-gray-500 mb-4">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      8 weeks • 80 hours
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-primary-600">$899</span>
                    <button class="btn-primary">Get Certified</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg p-6 border-l-4 border-primary-600 hover:shadow-lg transition-shadow">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900">AI Automation Workshop</h3>
                  <p class="text-gray-600">Hands-on workshop on building automation pipelines</p>
                </div>
                <span class="bg-primary-100 text-primary-600 text-sm px-2 py-1 rounded-full">Free</span>
              </div>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                January 15, 2025 • 2:00 PM CET
              </div>
              <button class="btn-outline w-full">Register</button>
            </div>
            
            <div class="bg-white rounded-lg p-6 border-l-4 border-secondary-600 hover:shadow-lg transition-shadow">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900">Enterprise AI Summit</h3>
                  <p class="text-gray-600">3-day conference on enterprise AI solutions</p>
                </div>
                <span class="bg-secondary-100 text-secondary-600 text-sm px-2 py-1 rounded-full">$299</span>
              </div>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                February 20-22, 2025 • Berlin, Germany
              </div>
              <button class="btn-outline w-full">Register</button>
            </div>
          </div>
        </div>

        <!-- Newsletter CTA -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
          <p class="text-primary-100 mb-6">Get notified about new training programs and events</p>
          <div class="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 px-4 py-3 rounded-l-lg border-0 text-gray-900 focus:ring-2 focus:ring-primary-300">
            <button class="bg-secondary-600 hover:bg-secondary-700 px-6 py-3 rounded-r-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TrainingComponent {}