/**
 * The IndexNow key file, https://www.growxapp.org/<key>.txt (next.config.ts rewrites /<key>.txt here). IndexNow checks
 * that this file contains the key a submission uses (scripts/indexnow.ts). The key comes from the INDEXNOW_KEY env var;
 * any other name is a 404. A key file already in public/ (the earlier key) is served directly and keeps working.
 */
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const expected = (process.env.INDEXNOW_KEY ?? "").trim();
  if (!expected || key !== expected) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(expected, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
