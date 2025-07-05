import { Component, OnInit, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
            <h1 class="text-3xl font-bold text-white mb-2">Profile Management</h1>
            <p class="text-blue-100">Manage your professional profile and showcase your expertise</p>
          </div>

          <!-- Loading State -->
          @if (isLoading()) {
            <div class="p-8 text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p class="mt-4 text-gray-600">Loading profile...</p>
            </div>
          }

          <!-- Error State -->
          @if (errorMessage()) {
            <div class="p-8">
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline"> {{ errorMessage() }}</span>
              </div>
            </div>
          }

          <!-- Success Message -->
          @if (successMessage()) {
            <div class="p-8">
              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong class="font-bold">Success!</strong>
                <span class="block sm:inline"> {{ successMessage() }}</span>
              </div>
            </div>
          }

          <!-- Profile Form -->
          @if (user && !isLoading()) {
            <div class="p-8">
              <form (ngSubmit)="onSubmit()" #profileForm="ngForm">
                <!-- Profile Picture -->
                <div class="mb-8">
                  <div class="flex items-center space-x-6">
                    <div class="relative">
                      <img [src]="user.profilePicture || 'https://via.placeholder.com/96x96?text=User'" 
                           [alt]="user.name" 
                           class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg">
                      <button type="button" class="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </button>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-900">Profile Picture</h3>
                      <p class="text-gray-600 mb-2">Update your profile picture to make a great first impression</p>
                      <div class="flex space-x-2">
                        <input type="url" [(ngModel)]="user.profilePicture" name="profilePicture" 
                               class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                               placeholder="Enter image URL">
                        <button type="button" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm">
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Basic Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" [(ngModel)]="user.name" name="name" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="Enter your full name">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" [(ngModel)]="user.email" name="email" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="Enter your email">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input type="text" [(ngModel)]="user.location" name="location"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="e.g., Berlin, Germany">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input type="text" [(ngModel)]="user.company" name="company"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="Enter your company">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input type="text" [(ngModel)]="user.role" name="role"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="e.g., AI Automation Engineer">
                  </div>
                </div>

                <!-- Bio -->
                <div class="mb-8">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea [(ngModel)]="user.bio" name="bio" rows="4"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Tell us about yourself, your expertise, and what you're passionate about..."></textarea>
                  <p class="text-sm text-gray-500 mt-2">{{ (user.bio || '').length }}/500 characters</p>
                </div>

                <!-- Experience -->
                <div class="mb-8">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select [(ngModel)]="user.experience" name="experience" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select experience level</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                <!-- Skills -->
                <div class="mb-8">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div class="flex flex-wrap gap-2 mb-4">
                    @for (skill of user.skills; track $index) {
                      <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center">
                        {{ skill }}
                        <button type="button" (click)="removeSkill($index)" class="ml-2 hover:text-blue-800">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </span>
                    }
                  </div>
                  <div class="flex gap-2">
                    <input type="text" [(ngModel)]="newSkill" name="newSkill" (keyup.enter)="addSkill()"
                           class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="Add a skill and press Enter">
                    <button type="button" (click)="addSkill()" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Add
                    </button>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="mb-8">
                  <h3 class="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <input type="url" [(ngModel)]="user.linkedinUrl" name="linkedinUrl"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                             placeholder="https://linkedin.com/in/yourprofile">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                      <input type="url" [(ngModel)]="user.githubUrl" name="githubUrl"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                             placeholder="https://github.com/yourusername">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input type="url" [(ngModel)]="user.websiteUrl" name="websiteUrl"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                             placeholder="https://yourwebsite.com">
                    </div>
                  </div>
                </div>

                <!-- Privacy Settings -->
                <div class="mb-8">
                  <h3 class="text-lg font-bold text-gray-900 mb-4">Privacy Settings</h3>
                  <div class="flex items-center">
                    <input type="checkbox" [(ngModel)]="user.isPublic" name="isPublic" 
                           class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    <label class="ml-2 block text-sm text-gray-700">
                      Make my profile public (visible to other community members)
                    </label>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-between items-center border-t pt-6">
                  <button type="button" (click)="confirmDeleteAccount()" 
                          class="text-red-600 hover:text-red-800 font-medium">
                    Delete Account
                  </button>
                  <div class="flex space-x-4">
                    <button type="button" (click)="onCancel()" 
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            [disabled]="!profileForm.valid || isSaving()">
                      @if (isSaving()) {
                        <span class="flex items-center">
                          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      } @else {
                        Save Changes
                      }
                    </button>
                  </div>
                </div>
              </form>
            </div>
          }

          <!-- Delete Account Confirmation Modal -->
          @if (showDeleteConfirmation()) {
            <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                  <h3 class="text-lg font-medium text-gray-900">Delete Account</h3>
                  <div class="mt-2 px-7 py-3">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete your account? This action cannot be undone.
                    </p>
                  </div>
                  <div class="items-center px-4 py-3">
                    <button (click)="cancelDeleteAccount()" 
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mr-2">
                      Cancel
                    </button>
                    <button (click)="deleteAccount()" 
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            [disabled]="isDeleting()">
                      @if (isDeleting()) {
                        Deleting...
                      } @else {
                        Delete Account
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ProfileManagementComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  user: User | null = null;
  newSkill = '';
  
  // State signals
  isLoading = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);
  showDeleteConfirmation = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor() {
    // Use effect to react to currentUser changes
    effect(() => {
      const currentUser = this.authService.currentUser();
      if (currentUser) {
        this.user = { ...currentUser };
        this.isLoading.set(false);
      }
    });
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.clearMessages();
    
    // Initialize with current user if available
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user = { ...currentUser };
      this.isLoading.set(false);
    } else {
      // Load profile from service
      this.authService.getCurrentUserProfile().subscribe({
        next: (user) => {
          if (user) {
            this.user = { ...user };
          }
          this.isLoading.set(false);
        },
        error: (error) => {
          this.errorMessage.set('Failed to load profile: ' + error.message);
          this.isLoading.set(false);
        }
      });
    }
  }

  addSkill() {
    if (!this.user || !this.newSkill.trim()) return;
    
    if (!this.user.skills.includes(this.newSkill.trim())) {
      this.user.skills.push(this.newSkill.trim());
      this.newSkill = '';
    }
  }

  removeSkill(index: number) {
    if (this.user) {
      this.user.skills.splice(index, 1);
    }
  }

  onSubmit() {
    if (!this.user) return;
    
    this.isSaving.set(true);
    this.clearMessages();
    
    this.authService.updateProfile(this.user).subscribe({
      next: (updatedUser) => {
        this.user = { ...updatedUser };
        this.successMessage.set('Profile updated successfully!');
        this.isSaving.set(false);
        this.clearMessagesAfterDelay();
      },
      error: (error) => {
        this.errorMessage.set('Failed to update profile: ' + error.message);
        this.isSaving.set(false);
        this.clearMessagesAfterDelay();
      }
    });
  }

  onCancel() {
    this.router.navigate(['/profiles']);
  }

  confirmDeleteAccount() {
    this.showDeleteConfirmation.set(true);
  }

  cancelDeleteAccount() {
    this.showDeleteConfirmation.set(false);
  }

  deleteAccount() {
    this.isDeleting.set(true);
    this.clearMessages();
    
    this.authService.deleteAccount().subscribe({
      next: () => {
        this.successMessage.set('Account deleted successfully!');
        this.isDeleting.set(false);
        this.showDeleteConfirmation.set(false);
        
        // Redirect to home after successful deletion
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage.set('Failed to delete account: ' + error.message);
        this.isDeleting.set(false);
        this.showDeleteConfirmation.set(false);
        this.clearMessagesAfterDelay();
      }
    });
  }

  private clearMessages() {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private clearMessagesAfterDelay() {
    setTimeout(() => {
      this.clearMessages();
    }, 5000);
  }
}