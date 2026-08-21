/**
 * Serialize structured data for embedding in <script type="application/ld+json">.
 * Escapes characters that can break out of a script element even after JSON.stringify.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
