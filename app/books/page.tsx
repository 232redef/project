"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  authorId: string;
  isbn: string;
  genre: string;
  pages: number;
  isPublished: boolean;
  publishedAt?: string;
  author?: { id: string; name: string };
}

interface Author {
  id: string;
  name: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadBooks = async (newPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(newPage));
      params.set("limit", "5");
      if (search) params.set("q", search);
      if (authorId) params.set("authorId", authorId);
      
      const res = await fetch(`/api/books?${params}`);
      const data = await res.json();
      setBooks(data.items);
      setTotalPages(data.pages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadAuthors = async () => {
    try {
      const res = await fetch("/api/authors?page=1&limit=100");
      const data = await res.json();
      setAuthors(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => loadBooks(1), 300);
    return () => clearTimeout(timer);
  }, [search, authorId]);

  const deleteBook = async (id: string) => {
    if (!confirm("Удалить книгу?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    loadBooks(page);
  };

  if (loading && books.length === 0) {
    return <div className="p-8 text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Книги</h1>
        <Link href="/books/new" className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
          + Новая книга
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 bg-white p-4 rounded-2xl shadow">
        <input
          type="text"
          placeholder="Поиск по названию, жанру, ISBN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-3 py-2"
        />
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="">Все авторы</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold text-indigo-700">{book.title}</h2>
            <p className="text-gray-600">{book.author?.name} · {book.genre}</p>
            <p className="text-sm mt-2">ISBN: {book.isbn}</p>
            <p className="text-sm">Страниц: {book.pages}</p>
            <div className="flex gap-2 mt-4">
              <Link href={`/books/${book.id}/edit`} className="border px-3 py-1 rounded-lg">
                Редактировать
              </Link>
              <button onClick={() => deleteBook(book.id)} className="border px-3 py-1 rounded-lg text-red-600">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => loadBooks(page - 1)}
          className="border px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Назад
        </button>
        <span className="py-2">Страница {page} из {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => loadBooks(page + 1)}
          className="border px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Далее
        </button>
      </div>
    </div>
  );
}