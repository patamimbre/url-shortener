import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { kv } from '@vercel/kv';
import { RedisKeys } from './app/lib/types';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const givenUrl = request.nextUrl.toString();
  const originalUrl = await kv.get<string>(RedisKeys.original(givenUrl))
  return NextResponse.redirect(new URL('/', originalUrl ?? request.url))
}

// Do not run middleware on '/' or public files
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|$).*)',
  ]
}