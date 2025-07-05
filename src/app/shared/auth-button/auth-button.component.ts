import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-button">
      @if (authService.isLoggedIn()) {
        <div class="user-info flex items-center gap-4">
          <img [src]="authService.currentUser()?.profilePicture" 
               [alt]="authService.currentUser()?.name"
               class="w-8 h-8 rounded-full">
          <span class="text-sm font-medium">{{ authService.currentUser()?.name }}</span>
          <button (click)="logout()" 
                  class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Abmelden
          </button>
        </div>
      } @else {
        <button (click)="signInWithGoogle()" 
                [disabled]="isLoading"
                class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          @if (isLoading) {
            <span>Anmelden...</span>
          } @else {
            <span>Mit Google anmelden</span>
          }
        </button>
      }
    </div>
  `
})
export class AuthButtonComponent {
  protected authService = inject(AuthService);
  public isLoading = false;

  signInWithGoogle(): void {
    this.isLoading = true;
    this.authService.googleSignIn().subscribe({
      next: (user) => {
        console.log('Successfully signed in:', user);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Sign in error:', error);
        this.isLoading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Successfully signed out');
      },
      error: (error) => {
        console.error('Sign out error:', error);
      }
    });
  }
} 