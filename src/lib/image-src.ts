/**
 * Percent-encodes local image paths so the Next.js image optimizer can
 * re-fetch them internally.
 *
 * Next 14 decodes the `url` query param of `/_next/image` and then requests
 * that path from itself without re-encoding it. Paths containing non-ASCII
 * characters (for example "ñ") therefore fail with
 * "The requested resource isn't a valid image ... received null".
 * Pre-encoding the `src` sidesteps that: the browser sends the encoded form,
 * Next decodes it once, and the internal fetch receives a valid URL.
 *
 * Remote URLs are left untouched: the optimizer builds them with `new URL()`,
 * which already encodes them correctly.
 */
export function encodeLocalImageSrc(src: string): string {
  if (!src || !src.startsWith('/') || src.startsWith('//')) {
    return src;
  }

  return encodeURI(safeDecodeURI(src));
}

/**
 * Decodes an already-encoded path so encoding it again is idempotent.
 * A path with a stray "%" that is not a valid escape is returned as-is.
 */
function safeDecodeURI(value: string): string {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}
