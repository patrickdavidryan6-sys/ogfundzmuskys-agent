export const runtime = "nodejs";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "AI service is not configured. Add GEMINI_API_KEY to the deployment environment." }, { status: 503 });
  }

  let body: { payload?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!body.payload || typeof body.payload !== "object") {
    return Response.json({ error: "A valid Gemini request payload is required." }, { status: 400 });
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body.payload),
        signal: AbortSignal.timeout(90_000),
        cache: "no-store",
      },
    );
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const message = typeof data?.error?.message === "string" ? data.error.message : "The AI provider rejected the request.";
      return Response.json({ error: message }, { status: upstream.status });
    }
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error && error.name === "TimeoutError"
      ? "The AI request timed out. Please try again."
      : "Could not reach the AI provider. Please try again later.";
    return Response.json({ error: message }, { status: 502 });
  }
}
