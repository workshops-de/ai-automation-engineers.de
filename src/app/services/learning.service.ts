import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LearningResource } from '../models/learning-resource.model';

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  private resourcesSubject = new BehaviorSubject<LearningResource[]>([]);
  public resources$ = this.resourcesSubject.asObservable();

  constructor() {
    this.loadMockResources();
  }

  private loadMockResources(): void {
    const mockResources: LearningResource[] = [
      {
        id: '1',
        title: 'Python for AI Automation',
        description: 'Complete guide to using Python for building AI automation solutions',
        type: 'course',
        url: 'https://example.com/python-ai-automation',
        level: 'beginner',
        tags: ['Python', 'AI', 'Automation', 'Programming'],
        author: 'AI Academy',
        createdAt: new Date('2024-01-15'),
        imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
      },
      {
        id: '2',
        title: 'Machine Learning Operations (MLOps)',
        description: 'Learn how to deploy and maintain ML models in production',
        type: 'course',
        url: 'https://example.com/mlops',
        level: 'intermediate',
        tags: ['MLOps', 'Machine Learning', 'DevOps', 'Production'],
        author: 'Tech University',
        createdAt: new Date('2024-02-20'),
        imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
      },
      {
        id: '3',
        title: 'Advanced Process Automation',
        description: 'Enterprise-level automation strategies and implementation',
        type: 'video',
        url: 'https://example.com/advanced-automation',
        level: 'advanced',
        tags: ['Process Automation', 'Enterprise', 'Strategy', 'Implementation'],
        author: 'Automation Experts',
        createdAt: new Date('2024-03-10'),
        imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
      },
      {
        id: '4',
        title: 'AutoML Tools Comparison',
        description: 'Comprehensive comparison of popular AutoML platforms',
        type: 'article',
        url: 'https://example.com/automl-comparison',
        level: 'intermediate',
        tags: ['AutoML', 'Tools', 'Comparison', 'Analysis'],
        author: 'Data Science Weekly',
        createdAt: new Date('2024-04-05'),
        imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
      }
    ];
    
    this.resourcesSubject.next(mockResources);
  }

  getResources(): Observable<LearningResource[]> {
    return this.resources$;
  }

  getResourcesByType(type: string): Observable<LearningResource[]> {
    return new Observable(observer => {
      this.resources$.subscribe(resources => {
        observer.next(resources.filter(resource => resource.type === type));
      });
    });
  }

  getResourcesByLevel(level: string): Observable<LearningResource[]> {
    return new Observable(observer => {
      this.resources$.subscribe(resources => {
        observer.next(resources.filter(resource => resource.level === level));
      });
    });
  }
}