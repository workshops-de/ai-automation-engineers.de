import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="section-title">AI Automation Engineers</h1>
          <p class="section-subtitle">Connect with talented professionals in the AI automation field</p>
        </div>

        <!-- Filter Section -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select class="input-field">
                <option value="">All Locations</option>
                <option value="remote">Remote</option>
                <option value="us">United States</option>
                <option value="eu">Europe</option>
                <option value="asia">Asia</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select class="input-field">
                <option value="">All Levels</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <select class="input-field">
                <option value="">All Skills</option>
                <option value="python">Python</option>
                <option value="ml">Machine Learning</option>
                <option value="rpa">RPA</option>
                <option value="ai">AI/ML</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="btn-primary w-full">Filter</button>
            </div>
          </div>
        </div>

        <!-- Profiles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let user of users" class="card overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <div class="relative">
              <img [src]="user.profilePicture" [alt]="user.name" class="w-full h-48 object-cover">
              <div class="absolute top-4 right-4">
                <span class="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">Available</span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center mb-3">
                <h3 class="font-bold text-xl text-gray-900">{{ user.name }}</h3>
                <div class="ml-auto flex space-x-2">
                  <a *ngIf="user.linkedinUrl" [href]="user.linkedinUrl" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a *ngIf="user.githubUrl" [href]="user.githubUrl" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.750.097.118.112.212.083.327-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div class="text-sm text-gray-600 mb-2">
                <span class="font-medium">{{ user.role }}</span> at {{ user.company }}
              </div>
              
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ user.location }}
              </div>
              
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ user.bio }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let skill of user.skills.slice(0, 3)" class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {{ skill }}
                </span>
                <span *ngIf="user.skills.length > 3" class="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                  +{{ user.skills.length - 3 }} more
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ user.experience }}</span>
                <button class="btn-primary text-sm">Connect</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center mt-12">
          <button class="btn-outline">Load More Profiles</button>
        </div>
      </div>
    </div>
  `
})
export class ProfilesComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getPublicUsers().subscribe(users => {
      this.users = users;
    });
  }
}