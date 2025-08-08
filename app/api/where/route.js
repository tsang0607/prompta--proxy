export const runtime = "edge"; // 需要 Edge 才有地理資訊

export async function GET(req) {
  const headers = req.headers;
  const info = {
    edgeRegion: headers.get("x-vercel-edge-region") || null,
    country: headers.get("x-vercel-ip-country") || null,
    region: headers.get("x-vercel-ip-country-region") || null,
    city: headers.get("x-vercel-ip-city") || null,
    ip: headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null
  };
  return new Response(JSON.stringify(info), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
