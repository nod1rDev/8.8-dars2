import { NextResponse } from "next/server";
import { createTodo, getTodos } from "./db";

export async function GET() {
  return NextResponse.json(getTodos());
}

export async function POST(request: Request) {
  const body = await request.json();

  createTodo(body.text);

  return NextResponse.json("Add todo");
}
