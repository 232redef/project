import { authors, books } from "@/lib/store";
import { AuthorInput, BookInput } from "@/types";

export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const rawLimit = Math.max(1, Number(searchParams.get("limit") || 5));
  const limit = Math.min(rawLimit, 20);
  return { page, limit };
}

export function paginate<T>(items: T[], page: number, limit: number) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return { items: items.slice(start, start + limit), total, page, pages };
}

export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    const text = await request.text();
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export function validateAuthorInput(data: Partial<AuthorInput>, currentId?: string): string | null {
  if (!data.name || typeof data.name !== "string") return "Поле name обязательно и должно быть строкой";
  if (!data.email || typeof data.email !== "string") return "Поле email обязательно и должно быть строкой";
  if (!Number.isFinite(Number(data.age))) return "Поле age обязательно и должно быть числом";
  if (typeof data.isActive !== "boolean") return "Поле isActive обязательно и должно быть булевым";
  
  const emailExists = authors.some((author) => author.email === data.email && author.id !== currentId);
  if (emailExists) return "Автор с таким email уже существует";
  
  return null;
}

export function validateBookInput(data: Partial<BookInput>, currentId?: string): string | null {
  if (!data.authorId || typeof data.authorId !== "string") return "Поле authorId обязательно";
  if (!authors.some((author) => author.id === data.authorId)) return "Выбранный автор не найден";
  if (!data.title || typeof data.title !== "string") return "Поле title обязательно и должно быть строкой";
  if (!data.isbn || typeof data.isbn !== "string") return "Поле isbn обязательно и должно быть строкой";
  if (!data.genre || typeof data.genre !== "string") return "Поле genre обязательно и должно быть строкой";
  if (!Number.isFinite(Number(data.pages))) return "Поле pages обязательно и должно быть числом";
  if (typeof data.isPublished !== "boolean") return "Поле isPublished обязательно и должно быть булевым";
  
  const isbnExists = books.some((book) => book.isbn === data.isbn && book.id !== currentId);
  if (isbnExists) return "Книга с таким ISBN уже существует";
  
  return null;
}
