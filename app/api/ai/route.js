export const runtime = "edge";
export const preferredRegion = "sin1";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, model } = body || {};

    const whitelist = (process.env.MODEL_WHITELIST || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (!model || (whitelist.length && !whitelist.includes(model))) {
      return new Response(JSON.stringify({ error: "Model not allowed or missing." }), { status: 400 });
    }

    const resp = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.APP_ORIGIN || "http://localhost:3000",
        "X-Title": "Prompta",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: text }), { status: resp.status });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), { status: 500 });
  }
}
