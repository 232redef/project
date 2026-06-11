import { NextResponse } from "next/server";
import { getAuthors, getBooks, updateBook, deleteBook } from "@/lib/store";
import { readJson, validateBookInput } from "@/lib/validation";
import { BookInput } from "@/types";

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const books = getBooks();
  const book = books.find((item) => item.id === params.id);
  if (!book) return NextResponse.json({ error: "Книга не найдена" }, { status: 404 });
  const authors = getAuthors();
  const author = authors.find((item) => item.id === book.authorId) || null;
  return NextResponse.json({ ...book, author });
}

export async function PATCH(request: Request, { params }: Params) {
  const books = getBooks();
  const index = books.findIndex((item) => item.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Книга не найдена" }, { status: 404 });
  
  const data = await readJson<BookInput>(request);
  if (!data) return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  
  const merged = { ...books[index], ...data, pages: Number(data.pages) };
  const error = validateBookInput(merged, params.id);
  if (error) return NextResponse.json({ error }, { status: 422 });
  
  const updatedBook = { ...merged, updatedAt: new Date().toISOString() };
  updateBook(params.id, updatedBook);
  
  const authors = getAuthors();
  const author = authors.find((item) => item.id === updatedBook.authorId) || null;
  return NextResponse.json({ ...updatedBook, author });
}

export async function DELETE(_: Request, { params }: Params) {
  const books = getBooks();
  const index = books.findIndex((item) => item.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Книга не найдена" }, { status: 404 });
  
  deleteBook(params.id);
  return NextResponse.json({ success: true });
}
