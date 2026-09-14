import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isForgedServerActionRequest } from '@/lib/request-guard';

/**
 * Rejects forged Server Action requests before they reach the app router.
 * See `src/lib/request-guard.ts` for the rationale.
 */
export function middleware(request: NextRequest) {
  if (isForgedServerActionRequest(request.headers)) {
    return new NextResponse(null, { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets: they can never carry a Server Action.
  matcher: ['/((?!_next/static|_next/image|images/|favicon).*)'],
};
