import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p class="text-gray-600 mt-2">Manage users and community content</p>
            </div>
            <div class="flex space-x-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-600">{{ users.length }}</div>
                <div class="text-sm text-gray-500">Total Users</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-secondary-600">{{ activeUsers }}</div>
                <div class="text-sm text-gray-500">Active Users</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-accent-600">{{ publicProfiles }}</div>
                <div class="text-sm text-gray-500">Public Profiles</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
              <input type="text" [(ngModel)]="searchTerm" placeholder="Search by name or email..."
                     class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select [(ngModel)]="statusFilter" class="input-field">
                <option value="">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select [(ngModel)]="roleFilter" class="input-field">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="btn-primary w-full" (click)="applyFilters()">Filter</button>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-900">User Management</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let user of filteredUsers" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img [src]="user.profilePicture" [alt]="user.name"
                             class="h-10 w-10 rounded-full object-cover">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ user.role }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ user.company }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          [class]="user.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                      {{ user.isPublic ? 'Public' : 'Private' }}
                    </span>
                    <span *ngIf="user.isAdmin" class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      Admin
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.createdAt | date:'MMM d, yyyy' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button (click)="editUser(user)" class="text-primary-600 hover:text-primary-900">
                        Edit
                      </button>
                      <button (click)="toggleUserStatus(user)" class="text-secondary-600 hover:text-secondary-900">
                        {{ user.isPublic ? 'Hide' : 'Show' }}
                      </button>
                      <button (click)="deleteUser(user)" class="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Edit User Modal -->
        <div *ngIf="selectedUser" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Edit User</h3>
              <form (ngSubmit)="updateUser()">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" [(ngModel)]="selectedUser.name" name="name" class="input-field">
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" [(ngModel)]="selectedUser.email" name="email" class="input-field">
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input type="text" [(ngModel)]="selectedUser.role" name="role" class="input-field">
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input type="text" [(ngModel)]="selectedUser.company" name="company" class="input-field">
                </div>
                <div class="mb-4">
                  <label class="flex items-center">
                    <input type="checkbox" [(ngModel)]="selectedUser.isAdmin" name="isAdmin" class="mr-2">
                    <span class="text-sm text-gray-700">Admin privileges</span>
                  </label>
                </div>
                <div class="mb-4">
                  <label class="flex items-center">
                    <input type="checkbox" [(ngModel)]="selectedUser.isPublic" name="isPublic" class="mr-2">
                    <span class="text-sm text-gray-700">Public profile</span>
                  </label>
                </div>
                <div class="flex justify-end space-x-2">
                  <button type="button" (click)="cancelEdit()" class="btn-outline">Cancel</button>
                  <button type="submit" class="btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  
  searchTerm = '';
  statusFilter = '';
  roleFilter = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  get activeUsers() {
    return this.users.filter(user => user.isPublic).length;
  }

  get publicProfiles() {
    return this.users.filter(user => user.isPublic).length;
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && user.isPublic) ||
        (this.statusFilter === 'inactive' && !user.isPublic);
      
      const matchesRole = !this.roleFilter ||
        (this.roleFilter === 'admin' && user.isAdmin) ||
        (this.roleFilter === 'user' && !user.isAdmin);
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.selectedUser = null;
      });
    }
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  toggleUserStatus(user: User) {
    this.userService.updateUser(user.id, { isPublic: !user.isPublic }).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}