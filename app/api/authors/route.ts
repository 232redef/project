import { NextRequest, NextResponse } from "next/server";
import { getAuthors, addAuthor, saveAuthors } from "@/lib/store";
import { createId, paginate, parsePagination, readJson, validateAuthorInput } from "@/lib/validation";
import { AuthorInput } from "@/types";

export async function GET(request: NextRequest) {
  const { page, limit } = parsePagination(request.nextUrl.searchParams);
  const authors = getAuthors();
  return NextResponse.json(paginate(authors, page, limit));
}

export async function POST(request: Request) {
  const data = await readJson<AuthorInput>(request);
  if (!data) return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  
  const error = validateAuthorInput(data);
  if (error) return NextResponse.json({ error }, { status: 422 });
  
  const date = new Date().toISOString();
  const author = { 
    ...data, 
    id: createId(), 
    age: Number(data.age), 
    createdAt: date, 
    updatedAt: date 
  };
  
  addAuthor(author);
  console.log("Author saved to persistent storage:", author);
  
  return NextResponse.json(author, { status: 201 });
}