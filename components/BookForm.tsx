"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Author, BookWithAuthor } from "@/types";
import { ErrorBox, PrimaryButton } from "@/components/Ui";

export default function BookForm({ book }: { book?: BookWithAuthor }) {
  const router = useRouter();
  
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorId, setAuthorId] = useState(book?.authorId || "");
  const [title, setTitle] = useState(book?.title || "");
  const [isbn, setIsbn] = useState(book?.isbn || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const [pages, setPages] = useState(book?.pages || 1);
  const [isPublished, setIsPublished] = useState(book?.isPublished ?? true);
  const [publishedAt, setPublishedAt] = useState(book?.publishedAt || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await api.getAuthors(1, 100);
        setAuthors(data.items);
        if (!authorId && data.items.length > 0) {
          setAuthorId(data.items[0].id);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Не удалось загрузить авторов");
      }
    };
    
    loadAuthors();
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const payload = { 
        authorId, 
        title, 
        isbn, 
        genre, 
        pages: Number(pages), 
        isPublished, 
        publishedAt: publishedAt || undefined 
      };
      
      if (book) {
        await api.updateBook(book.id, payload);
      } else {
        await api.createBook(payload);
      }
      
      router.push("/books");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      {error ? <ErrorBox message={error} /> : null}
      
      <label className="block text-sm font-medium">
        Автор *
        <select
          required
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Выберите автора</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </label>
      
      <label className="block text-sm font-medium">
        Название *
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <label className="block text-sm font-medium">
        ISBN *
        <input
          required
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <label className="block text-sm font-medium">
        Жанр *
        <input
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <label className="block text-sm font-medium">
        Страниц *
        <input
          required
          type="number"
          min={1}
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        Опубликована
      </label>
      
      <label className="block text-sm font-medium">
        Дата публикации
        <input
          type="date"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <PrimaryButton disabled={loading}>
        {loading ? "Сохранение..." : "Сохранить"}
      </PrimaryButton>
    </form>
  );
}
