import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname === '/' || 
                     request.nextUrl.pathname === '/register';
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');

  // Allow API auth routes and static files
  if (isApiAuthRoute || request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Redirect to login if no token and trying to access protected route
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to chat if has token and trying to access auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)']
}; 