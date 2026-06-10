import { Author, AuthorInput, BookInput, BookWithAuthor, PaginatedResponse } from "@/types";

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Ошибка запроса");
  }
  
  return data as T;
}

export const api = {
  // АВТОРЫ
  getAuthors: (page = 1, limit = 5) => 
    requestJson<PaginatedResponse<Author>>(`/api/authors?page=${page}&limit=${limit}`),
  
  getAuthor: (id: string) => 
    requestJson<Author & { books: BookWithAuthor[] }>(`/api/authors/${id}`),
  
  createAuthor: (data: AuthorInput) => 
    requestJson<Author>("/api/authors", { method: "POST", body: JSON.stringify(data) }),
  
  updateAuthor: (id: string, data: AuthorInput) => 
    requestJson<Author>(`/api/authors/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  
  deleteAuthor: (id: string) => 
    requestJson<{ success: boolean }>(`/api/authors/${id}`, { method: "DELETE" }),

  // КНИГИ
  getBooks: (page = 1, limit = 5, q = "", authorId = "") => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (q) params.set("q", q);
    if (authorId) params.set("authorId", authorId);
    return requestJson<PaginatedResponse<BookWithAuthor>>(`/api/books?${params.toString()}`);
  },
  
  getBook: (id: string) => 
    requestJson<BookWithAuthor>(`/api/books/${id}`),
  
  createBook: (data: BookInput) => 
    requestJson<BookWithAuthor>("/api/books", { method: "POST", body: JSON.stringify(data) }),
  
  updateBook: (id: string, data: BookInput) => 
    requestJson<BookWithAuthor>(`/api/books/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  
  deleteBook: (id: string) => 
    requestJson<{ success: boolean }>(`/api/books/${id}`, { method: "DELETE" })
};
