import { Injectable, signal, computed, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState, User as FirebaseUser } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private userService = inject(UserService);
  private googleProvider = new GoogleAuthProvider();
  
  // Signal for current user
  private currentUserSignal = signal<User | null>(null);
  
  // Observable for auth state changes
  public authState$ = authState(this.auth);
  
  // Computed values
  public currentUser = computed(() => this.currentUserSignal());
  public isLoggedIn = computed(() => !!this.currentUserSignal());
  public isAdmin = computed(() => this.currentUserSignal()?.isAdmin || false);

  constructor() {
    // Listen to auth state changes
    this.authState$.subscribe(firebaseUser => {
      if (firebaseUser) {
        // Lade das vollständige Benutzerprofil aus Firestore
        this.loadUserProfile(firebaseUser.uid).subscribe({
          next: (user) => {
            this.currentUserSignal.set(user);
          },
          error: (error) => {
            console.error('Fehler beim Laden des Benutzerprofils:', error);
            // Fallback auf Firebase-Daten
            const user = this.mapFirebaseUserToUser(firebaseUser);
            this.currentUserSignal.set(user);
          }
        });
      } else {
        this.currentUserSignal.set(null);
      }
    });
  }

  // Lade das vollständige Benutzerprofil aus Firestore
  private loadUserProfile(uid: string): Observable<User> {
    return this.userService.getUserById(uid).pipe(
      switchMap(user => {
        if (user) {
          // Benutzer existiert bereits, lade ihn einfach
          return of(user);
        } else {
          // Benutzer existiert nicht in Firestore, erstelle ein neues Profil
          const firebaseUser = this.auth.currentUser;
          if (firebaseUser) {
            const newUser = this.mapFirebaseUserToUser(firebaseUser);
            return this.userService.createOrUpdateUser(uid, newUser);
          } else {
            throw new Error('Kein Firebase-Benutzer gefunden');
          }
        }
      }),
      catchError(error => {
        console.error('Fehler beim Laden des Benutzerprofils:', error);
        throw error;
      })
    );
  }

  // Google Sign-In
  googleSignIn(): Observable<User> {
    return from(signInWithPopup(this.auth, this.googleProvider)).pipe(
      switchMap(result => {
        const firebaseUser = result.user;
        
        // Prüfe zuerst, ob der Benutzer bereits existiert
        return this.userService.getUserById(firebaseUser.uid).pipe(
          switchMap(existingUser => {
            if (existingUser) {
              // Benutzer existiert bereits - nur Login-relevante Felder aktualisieren
              return this.userService.updateUserLoginInfo(firebaseUser.uid, {
                email: firebaseUser.email || existingUser.email,
                profilePicture: firebaseUser.photoURL || existingUser.profilePicture
              });
            } else {
              // Neuer Benutzer - vollständiges Profil erstellen
              const userData = this.mapFirebaseUserToUser(firebaseUser);
              return this.userService.createOrUpdateUser(firebaseUser.uid, userData);
            }
          })
        );
      }),
      map(user => {
        this.currentUserSignal.set(user);
        return user;
      }),
      catchError(error => {
        console.error('Fehler beim Google Sign-In:', error);
        throw error;
      })
    );
  }

  // Legacy method for backward compatibility
  socialLogin(provider: 'google' | 'github' | 'linkedin'): Observable<User> {
    if (provider === 'google') {
      return this.googleSignIn();
    }
    throw new Error(`Provider ${provider} is not supported yet. Only Google authentication is available.`);
  }

  // Sign out
  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      map(() => {
        this.currentUserSignal.set(null);
      }),
      catchError(error => {
        console.error('Fehler beim Abmelden:', error);
        throw error;
      })
    );
  }

  // Update profile in Firestore
  updateProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) {
      throw new Error('Kein angemeldeter Benutzer gefunden');
    }

    return this.userService.updateUser(currentUser.id, userData).pipe(
      map(updatedUser => {
        this.currentUserSignal.set(updatedUser);
        return updatedUser;
      }),
      catchError(error => {
        console.error('Fehler beim Aktualisieren des Profils:', error);
        throw error;
      })
    );
  }

  // Get current user profile
  getCurrentUserProfile(): Observable<User | null> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) {
      return of(null);
    }

    return this.userService.getUserById(currentUser.id).pipe(
      map(user => {
        if (user) {
          this.currentUserSignal.set(user);
        }
        return user || null;
      }),
      catchError(error => {
        console.error('Fehler beim Laden des aktuellen Benutzerprofils:', error);
        return of(null);
      })
    );
  }

  // Delete user account
  deleteAccount(): Observable<boolean> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) {
      throw new Error('Kein angemeldeter Benutzer gefunden');
    }

    return this.userService.deleteUser(currentUser.id).pipe(
      switchMap(() => {
        // Auch Firebase-Benutzer löschen
        if (this.auth.currentUser) {
          return from(this.auth.currentUser.delete()).pipe(
            map(() => true),
            catchError(() => of(true)) // Auch wenn Firebase-Löschung fehlschlägt, Firestore wurde gelöscht
          );
        }
        return of(true);
      }),
      map(() => {
        this.currentUserSignal.set(null);
        return true;
      }),
      catchError(error => {
        console.error('Fehler beim Löschen des Accounts:', error);
        throw error;
      })
    );
  }

  // Map Firebase User to our User model
  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      location: '',
      company: '',
      role: 'AI Automation Engineer',
      bio: '',
      profilePicture: firebaseUser.photoURL || '',
      skills: [],
      experience: '',
      linkedinUrl: '',
      githubUrl: '',
      websiteUrl: '',
      isPublic: true,
      isAdmin: false, // Set based on your admin logic
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}