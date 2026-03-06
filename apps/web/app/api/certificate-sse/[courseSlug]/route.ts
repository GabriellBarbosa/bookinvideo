import { getServerSession } from "next-auth";
import { API_URL } from "@/config/nest-api-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ courseSlug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { courseSlug } = await context.params;

  const headers = new Headers({
    Accept: "text/event-stream",
    Cookie: request.headers.get("cookie") ?? "",
    Authorization: request.headers.get("authorization") ?? "",
    "x-internal-key": process.env.INTERNAL_API_KEY!,
  });

  const session = await getServerSession();
  if (session?.user?.email) {
    headers.set("x-user-email", session.user.email);
  }

  console.log("API URL: ", `${API_URL}/certificate/stream/${courseSlug}`);

  const upstream = await fetch(`${API_URL}/certificate/stream/${courseSlug}`, {
    headers,
    cache: "no-store",
  });

  if (!upstream.ok) {
    return new Response("Unable to connect to SSE upstream", {
      status: upstream.status,
    });
  }

  if (!upstream.body) {
    return new Response("Missing SSE body from upstream", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
