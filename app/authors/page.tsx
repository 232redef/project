"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Author {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadAuthors = async (newPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/authors?page=${newPage}&limit=5`);
      const data = await res.json();
      setAuthors(data.items);
      setTotalPages(data.pages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors(1);
  }, []);

  const deleteAuthor = async (id: string) => {
    if (!confirm("Удалить автора?")) return;
    await fetch(`/api/authors/${id}`, { method: "DELETE" });
    loadAuthors(page);
  };

  if (loading && authors.length === 0) {
    return <div className="p-8 text-center">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Авторы</h1>
        <Link href="/authors/new" className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
          + Новый автор
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Имя</th>
              <th className="p-3">Email</th>
              <th className="p-3">Возраст</th>
              <th className="p-3">Активен</th>
              <th className="p-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id} className="border-t">
                <td className="p-3">
                  <Link href={`/authors/${author.id}`} className="text-indigo-700 font-semibold">
                    {author.name}
                  </Link>
                 </td>
                <td className="p-3">{author.email}</td>
                <td className="p-3">{author.age}</td>
                <td className="p-3">{author.isActive ? "Да" : "Нет"}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/authors/${author.id}/edit`} className="border px-3 py-1 rounded-lg">
                    Редактировать
                  </Link>
                  <button onClick={() => deleteAuthor(author.id)} className="border px-3 py-1 rounded-lg text-red-600">
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => loadAuthors(page - 1)}
          className="border px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Назад
        </button>
        <span className="py-2">Страница {page} из {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => loadAuthors(page + 1)}
          className="border px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Далее
        </button>
      </div>
    </div>
  );
}