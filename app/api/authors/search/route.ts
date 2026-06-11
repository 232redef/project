import { NextRequest, NextResponse } from "next/server";
import { getAuthors } from "@/lib/store";
import { paginate, parsePagination } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") || "").toLowerCase();
  const { page, limit } = parsePagination(request.nextUrl.searchParams);
  const authorsList = getAuthors();
  const result = authorsList.filter((author) => 
    author.name.toLowerCase().includes(q) || 
    author.email.toLowerCase().includes(q) || 
    (author.bio || "").toLowerCase().includes(q)
  );
  return NextResponse.json(paginate(result, page, limit));
}