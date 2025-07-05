import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { BlogComponent } from './pages/blog/blog.component';
import { LearningComponent } from './pages/learning/learning.component';
import { TrainingComponent } from './pages/training/training.component';
import { ProfileManagementComponent } from './pages/profile-management/profile-management.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'learning', component: LearningComponent },
  { path: 'training', component: TrainingComponent },
  { 
    path: 'profile', 
    component: ProfileManagementComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: '' }
];