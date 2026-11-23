import type { Metadata } from "next";
import { NotFoundBody } from "@/components/not-found-body";

// Next.js adds <meta name="robots" content="noindex"> to not-found pages itself (and answers with a 404 status).
export const metadata: Metadata = { title: { absolute: "Page not found | GrowX" } };

export default function NotFound() {
  return <NotFoundBody />;
}
