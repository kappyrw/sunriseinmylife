import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/comments — fetch all comments
export async function GET() {
  if (!sql) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const rows = await sql`SELECT * FROM comments ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/comments — create a new comment
export async function POST(request: Request) {
  if (!sql) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, message, language } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const trimmedName = String(name).trim().substring(0, 50);
    const trimmedMessage = String(message).trim().substring(0, 500);

    if (!trimmedName || !trimmedMessage) {
      return NextResponse.json(
        { error: "Name and message cannot be empty" },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO comments (name, message, language)
      VALUES (${trimmedName}, ${trimmedMessage}, ${language || "en"})
      RETURNING *
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
