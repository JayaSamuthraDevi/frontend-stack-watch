// middleware.ts
import { NextResponse } from 'next/server'

// const PUBLIC_PATHS = ['/login', '/signup', '/'];

export function middleware() {
  //  const { pathname } = request.nextUrl;
  // const token = request.cookies.get('access_token')?.value;

  // const isPublicPath = PUBLIC_PATHS.includes(pathname);
  // if (!isPublicPath && !token) {
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('from', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }
  // else if(isPublicPath && token) {
  //   const redirectUrl = new URL('/dashboard', request.url);
  //   const fromUrl = request.nextUrl.searchParams.get('from');
  //   if (fromUrl) {
  //     redirectUrl.pathname = fromUrl;
  //   }
  //   return NextResponse.redirect(redirectUrl);

  // }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.css|.*\\.js).*)',
  ],
};
