export interface Author {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  authorId: string;
  title: string;
  isbn: string;
  genre: string;
  pages: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookWithAuthor extends Book {
  author: Author | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface ApiError {
  error: string;
}

export type AuthorInput = Omit<Author, "id" | "createdAt" | "updatedAt">;
export type BookInput = Omit<Book, "id" | "createdAt" | "updatedAt">;
