export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  company: string;
  role: string;
  bio: string;
  profilePicture: string;
  skills: string[];
  experience: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  isPublic: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}