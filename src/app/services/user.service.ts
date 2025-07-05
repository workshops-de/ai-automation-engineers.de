import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { 
  Firestore, 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp
} from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private usersCollection = collection(this.firestore, 'users');
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor() {
    this.loadUsers();
  }

  // Lade alle öffentlichen Benutzer aus Firestore
  private loadUsers(): void {
    // Vereinfachte Abfrage ohne Index-Requirement
    const publicUsersQuery = query(
      this.usersCollection,
      where('isPublic', '==', true)
    );

    from(getDocs(publicUsersQuery)).subscribe({
      next: (snapshot) => {
        const users = snapshot.docs.map(doc => this.convertDocToUser(doc));
        // Sortiere die Benutzer nach updatedAt im Client
        users.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        this.usersSubject.next(users);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Benutzer:', error);
        // Fallback auf Mock-Daten
        this.loadMockUsers();
      }
    });
  }

  private loadMockUsers(): void {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        location: 'San Francisco, CA',
        company: 'TechFlow Inc',
        role: 'Senior AI Automation Engineer',
        bio: 'Specializing in ML pipeline automation and intelligent process optimization. 5+ years experience in enterprise automation solutions.',
        profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        skills: ['Python', 'TensorFlow', 'Apache Airflow', 'Docker', 'Kubernetes'],
        experience: '5+ years',
        linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
        githubUrl: 'https://github.com/sarahjohnson',
        isPublic: true,
        isAdmin: false,
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2024-12-01')
      },
      {
        id: '2',
        name: 'Marcus Chen',
        email: 'marcus@example.com',
        location: 'New York, NY',
        company: 'DataCorp Solutions',
        role: 'AI Automation Specialist',
        bio: 'Expert in robotic process automation and intelligent document processing. Passionate about democratizing AI automation.',
        profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        skills: ['RPA', 'Python', 'Power Automate', 'OCR', 'Natural Language Processing'],
        experience: '3+ years',
        linkedinUrl: 'https://linkedin.com/in/marcus-chen',
        websiteUrl: 'https://marcuschen.dev',
        isPublic: true,
        isAdmin: false,
        createdAt: new Date('2023-03-20'),
        updatedAt: new Date('2024-11-15')
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily@example.com',
        location: 'Austin, TX',
        company: 'AutomateAI',
        role: 'Lead AI Engineer',
        bio: 'Building the next generation of intelligent automation platforms. Focus on conversational AI and workflow optimization.',
        profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        skills: ['Machine Learning', 'FastAPI', 'LangChain', 'React', 'PostgreSQL'],
        experience: '4+ years',
        linkedinUrl: 'https://linkedin.com/in/emily-rodriguez',
        githubUrl: 'https://github.com/emilyrodriguez',
        websiteUrl: 'https://emilyrodriguez.com',
        isPublic: true,
        isAdmin: true,
        createdAt: new Date('2023-02-10'),
        updatedAt: new Date('2024-12-05')
      }
    ];
    
    this.usersSubject.next(mockUsers);
  }

  // Hilfsmethode zur Konvertierung von Firestore-Dokumenten zu User-Objekten
  private convertDocToUser(doc: QueryDocumentSnapshot<DocumentData>): User {
    const data = doc.data();
    return {
      id: doc.id,
      name: data['name'] || '',
      email: data['email'] || '',
      location: data['location'] || '',
      company: data['company'] || '',
      role: data['role'] || '',
      bio: data['bio'] || '',
      profilePicture: data['profilePicture'] || '',
      skills: data['skills'] || [],
      experience: data['experience'] || '',
      linkedinUrl: data['linkedinUrl'] || '',
      githubUrl: data['githubUrl'] || '',
      websiteUrl: data['websiteUrl'] || '',
      isPublic: data['isPublic'] || false,
      isAdmin: data['isAdmin'] || false,
      createdAt: data['createdAt']?.toDate() || new Date(),
      updatedAt: data['updatedAt']?.toDate() || new Date()
    };
  }

  // Hilfsmethode zur Konvertierung von User-Objekten zu Firestore-Daten
  private convertUserToFirestoreData(user: Partial<User>): DocumentData {
    const data: DocumentData = {};
    
    // Füge die ID hinzu, damit sie in der Anwendung verfügbar ist
    if (user.id !== undefined) data['id'] = user.id;
    if (user.name !== undefined) data['name'] = user.name;
    if (user.email !== undefined) data['email'] = user.email;
    if (user.location !== undefined) data['location'] = user.location;
    if (user.company !== undefined) data['company'] = user.company;
    if (user.role !== undefined) data['role'] = user.role;
    if (user.bio !== undefined) data['bio'] = user.bio;
    if (user.profilePicture !== undefined) data['profilePicture'] = user.profilePicture;
    if (user.skills !== undefined) data['skills'] = user.skills;
    if (user.experience !== undefined) data['experience'] = user.experience;
    if (user.linkedinUrl !== undefined) data['linkedinUrl'] = user.linkedinUrl;
    if (user.githubUrl !== undefined) data['githubUrl'] = user.githubUrl;
    if (user.websiteUrl !== undefined) data['websiteUrl'] = user.websiteUrl;
    if (user.isPublic !== undefined) data['isPublic'] = user.isPublic;
    if (user.isAdmin !== undefined) data['isAdmin'] = user.isAdmin;
    if (user.createdAt !== undefined) data['createdAt'] = Timestamp.fromDate(user.createdAt);
    
    data['updatedAt'] = serverTimestamp();
    
    return data;
  }

  // Erstelle einen neuen Benutzer in Firestore
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Observable<User> {
    return from(addDoc(this.usersCollection, {})).pipe(
      switchMap(docRef => {
        const userData = this.convertUserToFirestoreData({
          ...user,
          id: docRef.id,
          createdAt: new Date()
        });
        
        return from(setDoc(docRef, userData)).pipe(
          switchMap(() => this.getUserById(docRef.id)),
          map(user => user!)
        );
      }),
      catchError(error => {
        console.error('Fehler beim Erstellen des Benutzers:', error);
        throw error;
      })
    );
  }

  // Aktualisiere nur Login-relevante Felder eines bestehenden Benutzers
  updateUserLoginInfo(uid: string, loginData: { email?: string, profilePicture?: string }): Observable<User> {
    const minimalUpdate: Partial<User> = {
      ...loginData,
      updatedAt: new Date()
    };
    
    return this.updateUser(uid, minimalUpdate);
  }

  // Erstelle oder aktualisiere einen Benutzer mit einer spezifischen ID
  // HINWEIS: Diese Methode überschreibt bestehende Daten! Nur für neue Benutzer verwenden.
  // Für bestehende Benutzer updateUserLoginInfo() verwenden.
  createOrUpdateUser(uid: string, userData: Partial<User>): Observable<User> {
    const userDocRef = doc(this.firestore, 'users', uid);
    
    return from(getDoc(userDocRef)).pipe(
      switchMap(docSnapshot => {
        if (docSnapshot.exists()) {
          // Benutzer existiert bereits, aktualisiere nur minimale Felder
          const minimalUpdate: Partial<User> = {
            // Nur Email aktualisieren falls sich geändert hat
            email: userData.email,
            // Profilbild aktualisieren falls sich geändert hat
            profilePicture: userData.profilePicture,
            // Timestamp aktualisieren
            updatedAt: new Date()
          };
          
          return this.updateUser(uid, minimalUpdate);
        } else {
          // Neuer Benutzer, erstelle ihn mit setDoc
          const newUserData = this.convertUserToFirestoreData({
            ...userData,
            id: uid,
            createdAt: new Date()
          });
          
          return from(setDoc(userDocRef, newUserData)).pipe(
            switchMap(() => this.getUserById(uid)),
            map(user => user!)
          );
        }
      }),
      catchError(error => {
        console.error('Fehler beim Erstellen/Aktualisieren des Benutzers:', error);
        throw error;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getPublicUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: string): Observable<User | undefined> {
    const userDoc = doc(this.firestore, 'users', id);
    
    return from(getDoc(userDoc)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return this.convertDocToUser(docSnapshot as QueryDocumentSnapshot<DocumentData>);
        }
        return undefined;
      }),
      catchError(error => {
        console.error('Fehler beim Laden des Benutzers:', error);
        return of(undefined);
      })
    );
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    const userDoc = doc(this.firestore, 'users', id);
    const updateData = this.convertUserToFirestoreData(userData);
    
    return from(updateDoc(userDoc, updateData)).pipe(
      switchMap(() => this.getUserById(id)),
      map(user => {
        if (!user) {
          throw new Error('Benutzer nicht gefunden nach dem Update');
        }
        // Aktualisiere auch das lokale Subject
        this.refreshUsers();
        return user;
      }),
      catchError(error => {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
        throw error;
      })
    );
  }

  deleteUser(id: string): Observable<boolean> {
    const userDoc = doc(this.firestore, 'users', id);
    
    return from(deleteDoc(userDoc)).pipe(
      map(() => {
        // Aktualisiere auch das lokale Subject
        this.refreshUsers();
        return true;
      }),
      catchError(error => {
        console.error('Fehler beim Löschen des Benutzers:', error);
        throw error;
      })
    );
  }

  // Lade Benutzer neu
  refreshUsers(): void {
    this.loadUsers();
  }
}