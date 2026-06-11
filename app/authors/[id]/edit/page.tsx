import { notFound } from "next/navigation";
import AuthorForm from "@/components/AuthorForm";
import { PageTitle } from "@/components/Ui";
import { Author } from "@/types";

async function getAuthor(id: string): Promise<Author | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/authors/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  return res.json();
}

export default async function EditAuthorPage({ params }: { params: { id: string } }) {
  const author = await getAuthor(params.id);
  if (!author) notFound();
  return <><PageTitle title="Редактирование автора" /><AuthorForm author={author} /></>;
}
