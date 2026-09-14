/**
 * Header that Next.js attaches to Server Action calls.
 * This app defines no Server Actions, so any request carrying it is forged
 * (bots and scanners send `Next-Action: x`) and would only make Next 14 log
 * "Failed to find Server Action" errors.
 */
export const SERVER_ACTION_HEADER = 'next-action';

interface HeaderReader {
  get(name: string): string | null;
}

export function isForgedServerActionRequest(headers: HeaderReader): boolean {
  const value = headers.get(SERVER_ACTION_HEADER);
  return value !== null && value.length > 0;
}
