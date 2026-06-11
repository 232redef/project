import fs from 'fs';
import path from 'path';
import { Author, Book } from '@/types';

const dataPath = path.join(process.cwd(), 'data.json');

// Интерфейс для хранения данных
interface DataStore {
  authors: Author[];
  books: Book[];
}

// Функция для чтения данных из файла
export function readData(): DataStore {
  try {
    if (!fs.existsSync(dataPath)) {
      // Если файла нет, создаем с начальными данными
      const initialData: DataStore = {
        authors: [],
        books: []
      };
      fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка чтения данных:', error);
    return { authors: [], books: [] };
  }
}

// Функция для записи данных в файл
export function writeData(data: DataStore): void {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Ошибка записи данных:', error);
  }
}

// Функция для получения всех авторов
export function getAuthors(): Author[] {
  return readData().authors;
}

// Функция для сохранения авторов
export function saveAuthors(authors: Author[]): void {
  const data = readData();
  data.authors = authors;
  writeData(data);
}

// Функция для получения всех книг
export function getBooks(): Book[] {
  return readData().books;
}

// Функция для сохранения книг
export function saveBooks(books: Book[]): void {
  const data = readData();
  data.books = books;
  writeData(data);
}

// Функция для добавления автора
export function addAuthor(author: Author): void {
  const authors = getAuthors();
  authors.push(author);
  saveAuthors(authors);
}

// Функция для обновления автора
export function updateAuthor(id: string, updatedAuthor: Author): void {
  const authors = getAuthors();
  const index = authors.findIndex(a => a.id === id);
  if (index !== -1) {
    authors[index] = updatedAuthor;
    saveAuthors(authors);
  }
}

// Функция для удаления автора
export function deleteAuthor(id: string): void {
  const authors = getAuthors();
  const filtered = authors.filter(a => a.id !== id);
  saveAuthors(filtered);
}

// Функция для добавления книги
export function addBook(book: Book): void {
  const books = getBooks();
  books.push(book);
  saveBooks(books);
}

// Функция для обновления книги
export function updateBook(id: string, updatedBook: Book): void {
  const books = getBooks();
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books[index] = updatedBook;
    saveBooks(books);
  }
}

// Функция для удаления книги
export function deleteBook(id: string): void {
  const books = getBooks();
  const filtered = books.filter(b => b.id !== id);
  saveBooks(filtered);
}
