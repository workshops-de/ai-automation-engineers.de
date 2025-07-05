import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthButtonComponent } from '../auth-button/auth-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthButtonComponent],
  template: `
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">AI</span>
              </div>
              <span class="text-xl font-bold text-gray-900 hidden sm:block">AI-Automations-Engineer.de</span>
            </a>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a routerLink="/" routerLinkActive="text-primary-600" [routerLinkActiveOptions]="{exact: true}"
               class="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
            <a routerLink="/profiles" routerLinkActive="text-primary-600"
               class="text-gray-700 hover:text-primary-600 transition-colors">Profiles</a>
            <a routerLink="/blog" routerLinkActive="text-primary-600"
               class="text-gray-700 hover:text-primary-600 transition-colors">Blog</a>
            <a routerLink="/learning" routerLinkActive="text-primary-600"
               class="text-gray-700 hover:text-primary-600 transition-colors">Learning</a>
            <a routerLink="/training" routerLinkActive="text-primary-600"
               class="text-gray-700 hover:text-primary-600 transition-colors">Training</a>
          </nav>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            @if (!authService.isLoggedIn()) {
              <app-auth-button></app-auth-button>
            } @else {
              <div class="relative">
                <button (click)="toggleDropdown()" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <img [src]="authService.currentUser()?.profilePicture" [alt]="authService.currentUser()?.name"
                       class="w-8 h-8 rounded-full object-cover">
                  <span class="text-gray-700 font-medium hidden sm:block">{{ authService.currentUser()?.name }}</span>
                </button>
                
                @if (isDropdownOpen) {
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div class="py-1">
                      <a routerLink="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        Manage Profile
                      </a>
                      @if (authService.currentUser()?.isAdmin) {
                        <a routerLink="/admin" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                          Admin Panel
                        </a>
                      }
                      <button (click)="logout()" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        Logout
                      </button>
                    </div>
                  </div>
                }
              </div>
            }

            <!-- Mobile menu button -->
            <button (click)="toggleMobileMenu()" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        @if (isMobileMenuOpen) {
          <div class="md:hidden border-t border-gray-200 py-4">
            <nav class="flex flex-col space-y-4">
              <a routerLink="/" routerLinkActive="text-primary-600" [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
              <a routerLink="/profiles" routerLinkActive="text-primary-600"
                 class="text-gray-700 hover:text-primary-600 transition-colors">Profiles</a>
              <a routerLink="/blog" routerLinkActive="text-primary-600"
                 class="text-gray-700 hover:text-primary-600 transition-colors">Blog</a>
              <a routerLink="/learning" routerLinkActive="text-primary-600"
                 class="text-gray-700 hover:text-primary-600 transition-colors">Learning</a>
              <a routerLink="/training" routerLinkActive="text-primary-600"
                 class="text-gray-700 hover:text-primary-600 transition-colors">Training</a>
            </nav>
            <div class="mt-4 pt-4 border-t border-gray-200">
              <app-auth-button></app-auth-button>
            </div>
          </div>
        }
      </div>
    </header>
  `
})
export class HeaderComponent {
  protected authService = inject(AuthService);
  private router = inject(Router);
  
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isDropdownOpen = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error:', error);
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}