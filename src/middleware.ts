// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
 
  const path = request.nextUrl.pathname;

  
  const isAdminPath = path.startsWith('/admin');

  if (isAdminPath) {
   
    const userRoleCookie = request.cookies.get('userRole');
    const userRole = userRoleCookie?.value;

    
    if (userRole !== 'admin') {
      // Redirect them to the login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/admin/:path*', 
    '/dashboard/:path*', 
  ],
};