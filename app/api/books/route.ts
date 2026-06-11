import { NextRequest, NextResponse } from "next/server";
import { authors as getAuthors, books as getBooks, addBook } from "@/lib/store";
import { createId, paginate, parsePagination, readJson, validateBookInput } from "@/lib/validation";
import { BookInput } from "@/types";

export async function GET(request: NextRequest) {
  const { page, limit } = parsePagination(request.nextUrl.searchParams);
  const q = (request.nextUrl.searchParams.get("q") || "").toLowerCase();
  const authorId = request.nextUrl.searchParams.get("authorId") || "";
  
  let result = getBooks.map((book) => ({
    ...book,
    author: getAuthors.find((author) => author.id === book.authorId) || null
  }));
  
  if (q) {
    result = result.filter((book) => 
      book.title.toLowerCase().includes(q) || 
      book.genre.toLowerCase().includes(q) || 
      book.isbn.toLowerCase().includes(q)
    );
  }
  if (authorId) {
    result = result.filter((book) => book.authorId === authorId);
  }
  
  return NextResponse.json(paginate(result, page, limit));
}

export async function POST(request: Request) {
  try {
    const data = await readJson<BookInput>(request);
    if (!data) {
      return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
    }
    
    const normalized = { 
      ...data, 
      pages: Number(data.pages),
      publishedAt: data.publishedAt || ""
    };
    
    const error = validateBookInput(normalized);
    if (error) {
      return NextResponse.json({ error }, { status: 422 });
    }
    
    const date = new Date().toISOString();
    const newBook = {
      ...normalized,
      id: createId(),
      createdAt: date,
      updatedAt: date
    };
    
    addBook(newBook);
    
    const author = getAuthors.find((item) => item.id === newBook.authorId) || null;
    
    return NextResponse.json({ ...newBook, author }, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
