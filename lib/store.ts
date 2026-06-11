// ============================================
// ГЛОБАЛЬНОЕ ХРАНИЛИЩЕ ДАННЫХ (In-Memory)
// ============================================
// Используем globalThis для сохранения данных между hot reload

import { Author, Book } from "@/types";

const now = () => new Date().toISOString();

// Начальные данные
const getInitialAuthors = (): Author[] => [
  { id: "a1", name: "Лев Толстой", email: "tolstoy@example.com", age: 82, isActive: false, bio: "Великий русский писатель", createdAt: now(), updatedAt: now() },
  { id: "a2", name: "Фёдор Достоевский", email: "dostoevsky@example.com", age: 59, isActive: false, bio: "Классик русской литературы", createdAt: now(), updatedAt: now() },
  { id: "a3", name: "Антон Чехов", email: "chekhov@example.com", age: 44, isActive: false, bio: "Мастер короткого рассказа", createdAt: now(), updatedAt: now() },
  { id: "a4", name: "Александр Пушкин", email: "pushkin@example.com", age: 37, isActive: false, bio: "Солнце русской поэзии", createdAt: now(), updatedAt: now() },
  { id: "a5", name: "Николай Гоголь", email: "gogol@example.com", age: 43, isActive: false, bio: "Автор Мёртвых душ", createdAt: now(), updatedAt: now() },
  { id: "a6", name: "Стивен Кинг", email: "king@example.com", age: 76, isActive: true, bio: "Король ужасов", createdAt: now(), updatedAt: now() },
  { id: "a7", name: "Джоан Роулинг", email: "rowling@example.com", age: 58, isActive: true, bio: "Автор Гарри Поттера", createdAt: now(), updatedAt: now() },
  { id: "a8", name: "Джордж Мартин", email: "martin@example.com", age: 75, isActive: true, bio: "Автор Песни Льда и Пламени", createdAt: now(), updatedAt: now() },
  { id: "a9", name: "Эрнест Хемингуэй", email: "hemingway@example.com", age: 61, isActive: false, bio: "Американский писатель", createdAt: now(), updatedAt: now() },
  { id: "a10", name: "Франц Кафка", email: "kafka@example.com", age: 40, isActive: false, bio: "Пражский писатель", createdAt: now(), updatedAt: now() }
];

const getInitialBooks = (): Book[] => [
  { id: "b1", authorId: "a1", title: "Война и мир", isbn: "978-5-001-00001-1", genre: "Роман-эпопея", pages: 1300, isPublished: true, publishedAt: "1869-01-01", createdAt: now(), updatedAt: now() },
  { id: "b2", authorId: "a1", title: "Анна Каренина", isbn: "978-5-001-00002-8", genre: "Роман", pages: 864, isPublished: true, publishedAt: "1877-01-01", createdAt: now(), updatedAt: now() },
  { id: "b3", authorId: "a2", title: "Преступление и наказание", isbn: "978-5-001-00003-5", genre: "Роман", pages: 672, isPublished: true, publishedAt: "1866-01-01", createdAt: now(), updatedAt: now() },
  { id: "b4", authorId: "a2", title: "Братья Карамазовы", isbn: "978-5-001-00004-2", genre: "Роман", pages: 800, isPublished: true, publishedAt: "1880-01-01", createdAt: now(), updatedAt: now() },
  { id: "b5", authorId: "a3", title: "Вишнёвый сад", isbn: "978-5-001-00005-9", genre: "Пьеса", pages: 96, isPublished: true, publishedAt: "1904-01-01", createdAt: now(), updatedAt: now() },
  { id: "b6", authorId: "a3", title: "Чайка", isbn: "978-5-001-00006-6", genre: "Пьеса", pages: 88, isPublished: true, publishedAt: "1896-01-01", createdAt: now(), updatedAt: now() },
  { id: "b7", authorId: "a6", title: "Сияние", isbn: "978-5-001-00007-3", genre: "Ужасы", pages: 512, isPublished: true, publishedAt: "1977-01-01", createdAt: now(), updatedAt: now() },
  { id: "b8", authorId: "a6", title: "Оно", isbn: "978-5-001-00008-0", genre: "Ужасы", pages: 1168, isPublished: true, publishedAt: "1986-01-01", createdAt: now(), updatedAt: now() },
  { id: "b9", authorId: "a7", title: "Гарри Поттер и философский камень", isbn: "978-5-001-00009-7", genre: "Фэнтези", pages: 352, isPublished: true, publishedAt: "1997-06-26", createdAt: now(), updatedAt: now() },
  { id: "b10", authorId: "a8", title: "Игра престолов", isbn: "978-5-001-00010-3", genre: "Фэнтези", pages: 768, isPublished: true, publishedAt: "1996-08-01", createdAt: now(), updatedAt: now() }
];

// Глобальное хранилище (сохраняется между hot reload)
interface GlobalStore {
  authors: Author[];
  books: Book[];
  initialized: boolean;
}

const global = globalThis as unknown as { __store?: GlobalStore };

if (!global.__store) {
  console.log("🔥 Инициализация глобального хранилища");
  global.__store = {
    authors: getInitialAuthors(),
    books: getInitialBooks(),
    initialized: true
  };
}

export const authors = global.__store.authors;
export const books = global.__store.books;

// Функции для работы с данными
export function getAuthors(): Author[] {
  return authors;
}

export function getBooks(): Book[] {
  return books;
}

export function addBook(book: Book): void {
  books.push(book);
  console.log(`📚 Книга добавлена. Всего книг: ${books.length}`);
}

export function addAuthor(author: Author): void {
  authors.push(author);
  console.log(`👤 Автор добавлен. Всего авторов: ${authors.length}`);
}

export function updateAuthor(id: string, updatedAuthor: Author): void {
  const index = authors.findIndex(a => a.id === id);
  if (index !== -1) {
    authors[index] = updatedAuthor;
    console.log(`✏️ Автор обновлён: ${id}`);
  }
}

export function deleteAuthor(id: string): void {
  const index = authors.findIndex(a => a.id === id);
  if (index !== -1) {
    authors.splice(index, 1);
    console.log(`🗑️ Автор удалён: ${id}`);
  }
}

export function updateBook(id: string, updatedBook: Book): void {
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books[index] = updatedBook;
    console.log(`✏️ Книга обновлена: ${id}`);
  }
}

export function deleteBook(id: string): void {
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    console.log(`🗑️ Книга удалена: ${id}`);
  }
}