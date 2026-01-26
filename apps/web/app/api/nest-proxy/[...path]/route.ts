import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { API_URL } from "@/config/nest-api-url";

if (!API_URL) {
  throw new Error("Missing env API_URL");
}

if (!process.env.INTERNAL_API_KEY) {
  throw new Error("Missing env INTERNAL_API_KEY");
}

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
]);

function buildTargetUrl(req: NextRequest, pathParts: string[]) {
  const pathname = pathParts.join("/");
  const url = new URL(req.url);
  const target = new URL(`${API_URL.replace(/\/$/, "")}/${pathname}`);
  // repassa querystring
  target.search = url.search;
  return target;
}

async function handler(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const { path } = await ctx.params;

  // Monta URL destino no Nest
  const targetUrl = buildTargetUrl(req, path);

  // Clona headers e remove hop-by-hop
  const headers = new Headers(req.headers);
  for (const h of HOP_BY_HOP_HEADERS) headers.delete(h);
  headers.set("x-internal-key", process.env.INTERNAL_API_KEY!);

  // Injeta identidade do usuário (escolha um padrão)
  const session = await getServerSession();
  if (session?.user?.email) {
    headers.set("x-user-email", session.user.email ?? "");
  }

  // Encaminha body (só para métodos com body)
  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);

  const upstream = await fetch(targetUrl, {
    method,
    headers,
    body: hasBody ? req.body : undefined,
    cache: "no-store",
  });

  // Repassa status + headers + body de volta
  const resHeaders = new Headers(upstream.headers);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: resHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
