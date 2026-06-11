import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/Ui";
import { Author, BookWithAuthor } from "@/types";

async function getAuthor(id: string): Promise<Author & { books: BookWithAuthor[] } | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/authors/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  return res.json();
}

export default async function AuthorDetailPage({ params }: { params: { id: string } }) {
  const author = await getAuthor(params.id);
  if (!author) notFound();
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <PageTitle title={author.name} text={author.bio || "Без биографии"} />
      <p><b>Email:</b> {author.email}</p><p><b>Возраст:</b> {author.age}</p><p><b>Активен:</b> {author.isActive ? "Да" : "Нет"}</p>
      <h2 className="mt-6 text-xl font-semibold">Книги автора</h2>
      <ul className="mt-3 list-inside list-disc">{author.books.map((book) => <li key={book.id}><Link className="text-brand-700" href={`/books/${book.id}/edit`}>{book.title}</Link></li>)}</ul>
      <Link className="mt-6 inline-flex rounded-xl bg-brand-600 px-4 py-2 text-white" href={`/authors/${author.id}/edit`}>Редактировать</Link>
    </section>
  );
}
