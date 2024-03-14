import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from './helpers/jwtTokenControl'


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup'
  const isPrivatePath = path.startsWith('/profile/') || path === '/profile'

  const result = await isAuthenticated(request)

  if (!result && isPrivatePath) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
if (result && isPublicPath){
  return NextResponse.redirect(new URL('/', request.nextUrl))
}
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:path*',
  ],
};
