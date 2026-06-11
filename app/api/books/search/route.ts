import { NextRequest, NextResponse } from "next/server";
import { getAuthors, getBooks } from "@/lib/store";
import { paginate, parsePagination } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") || "").toLowerCase();
  const { page, limit } = parsePagination(request.nextUrl.searchParams);
  const booksList = getBooks();
  const authorsList = getAuthors();
  const result = booksList
    .filter((book) => 
      book.title.toLowerCase().includes(q) || 
      book.genre.toLowerCase().includes(q) || 
      book.isbn.toLowerCase().includes(q)
    )
    .map((book) => ({ 
      ...book, 
      author: authorsList.find((author) => author.id === book.authorId) || null 
    }));
  return NextResponse.json(paginate(result, page, limit));
}