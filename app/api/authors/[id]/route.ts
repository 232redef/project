import { NextResponse } from "next/server";
import { getAuthors, getBooks, updateAuthor, deleteAuthor } from "@/lib/store";
import { readJson, validateAuthorInput } from "@/lib/validation";
import { AuthorInput } from "@/types";

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const authors = getAuthors();
  const author = authors.find((item) => item.id === params.id);
  if (!author) return NextResponse.json({ error: "Автор не найден" }, { status: 404 });
  const books = getBooks();
  const authorBooks = books.filter((book) => book.authorId === author.id).map((book) => ({ ...book, author }));
  return NextResponse.json({ ...author, books: authorBooks });
}

export async function PATCH(request: Request, { params }: Params) {
  const authors = getAuthors();
  const index = authors.findIndex((item) => item.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Автор не найден" }, { status: 404 });
  
  const data = await readJson<AuthorInput>(request);
  if (!data) return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  
  const merged = { ...authors[index], ...data, age: Number(data.age) };
  const error = validateAuthorInput(merged, params.id);
  if (error) return NextResponse.json({ error }, { status: 422 });
  
  const updatedAuthor = { ...merged, updatedAt: new Date().toISOString() };
  updateAuthor(params.id, updatedAuthor);
  
  return NextResponse.json(updatedAuthor);
}

export async function DELETE(_: Request, { params }: Params) {
  const books = getBooks();
  if (books.some((book) => book.authorId === params.id)) {
    return NextResponse.json({ error: "Нельзя удалить автора, пока у него есть книги" }, { status: 400 });
  }
  
  deleteAuthor(params.id);
  return NextResponse.json({ success: true });
}