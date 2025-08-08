export const runtime = "edge";

export async function POST(req) {
  const body = await req.text();

  const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.APP_ORIGIN || "",
      "X-Title": "Prompta",
      "Content-Type": "application/json"
    },
    body
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: { "Content-Type": "application/json" }
  });
}
