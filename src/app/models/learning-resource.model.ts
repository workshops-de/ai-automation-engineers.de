export interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course' | 'tool';
  url: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  author: string;
  createdAt: Date;
  imageUrl: string;
}