import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Hugging Face integration disabled
  return NextResponse.json(
    { error: "Hugging Face integration has been disabled" },
    { status: 503 }
  );
}
