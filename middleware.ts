import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirigir URLs de categorías con espacios a URLs con guiones
  if (pathname.startsWith('/categoria/')) {
    const categoryPath = pathname.replace('/categoria/', '')
    
    // Si la ruta contiene espacios, convertir a formato slug
    if (categoryPath.includes(' ')) {
      const slug = categoryPath
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      
      const newUrl = new URL(`/categoria/${slug}`, request.url)
      return NextResponse.redirect(newUrl, 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/categoria/:path*'
}
