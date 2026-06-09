import Link from "next/link";

export default function HomePage() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">MLP Library</h1>
        <p className="mt-2 text-slate-600">Система управления библиотекой: авторы и книги</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold">📚 30+ Авторов</h2>
          <p className="mt-2 text-sm text-slate-600">
            Русские и зарубежные классики, современные писатели
          </p>
        </div>
        
        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold">📖 60+ Книг</h2>
          <p className="mt-2 text-sm text-slate-600">
            Полноценный CRUD с поиском, фильтрацией и пагинацией
          </p>
        </div>
        
        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold">⚡ Next.js 14</h2>
          <p className="mt-2 text-sm text-slate-600">
            TypeScript, Tailwind CSS, API Route Handlers
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/authors" className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition">
          📋 Открыть авторов
        </Link>
        <Link href="/books" className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition">
          📚 Открыть книги
        </Link>
      </div>
    </div>
  );
}
