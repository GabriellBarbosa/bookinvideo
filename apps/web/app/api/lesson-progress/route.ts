import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { API_URL } from "@/config/nest-api-url";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${API_URL}/course/lesson-progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-key": process.env.INTERNAL_API_KEY!,
    },
    body: JSON.stringify({
      userEmail: session.user.email,
      lessonId: body.lessonId,
      seconds: body.seconds,
    }),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
