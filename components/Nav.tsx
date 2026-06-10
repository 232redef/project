import Link from "next/link";
export default function Nav() {
  return (
    <header className="border-b bg-white shadow-sm">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-700">
          📚 MLP Library
        </Link>
        
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          <Link className="rounded-lg px-3 py-2 hover:bg-indigo-50 transition" href="/authors">
            👤 Авторы
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-indigo-50 transition" href="/authors/new">
            ➕ Добавить автора
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-indigo-50 transition" href="/books">
            📖 Книги
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-indigo-50 transition" href="/books/new">
            ➕ Добавить книгу
          </Link>
        </div>
      </nav>
    </header>
  );
}
