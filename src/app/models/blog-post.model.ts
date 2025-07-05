export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: Date;
  tags: string[];
  readTimeMinutes: number;
  imageUrl: string;
}