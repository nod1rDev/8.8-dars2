import { NextResponse } from "next/server";
import { delateTodo, getTodos, upteDate } from "../db";

export function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(getTodos(+params.id));
}

export function DELETE(_: Request, { params }: { params: { id: string } }) {
  delateTodo(+params.id);

  return NextResponse.json("delated");
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  upteDate(+params.id, body.text);
  return NextResponse.json("Uptadet");
}
