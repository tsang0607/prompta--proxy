export const runtime = "edge";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 準備 OpenRouter 所需格式
    const body = JSON.stringify({
      model: "deepseek-chat", // 可以改成你想用的模型
      messages: [
        { role: "user", content: prompt }
      ]
    });

    // 發送到 OpenRouter
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

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
