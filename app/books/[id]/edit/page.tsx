import { notFound } from "next/navigation";
import BookForm from "@/components/BookForm";
import { PageTitle } from "@/components/Ui";
import { BookWithAuthor } from "@/types";

async function getBook(id: string): Promise<BookWithAuthor | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/books/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  return res.json();
}

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) notFound();
  return <><PageTitle title="Редактирование книги" /><BookForm book={book} /></>;
}
