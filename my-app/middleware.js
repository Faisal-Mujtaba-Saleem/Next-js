import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    /*
    Note:
     Its the developer choice that if he want to match a specific path/s with-inside middleware through if-else conditionals or he want to match them inside a seperate object with in a matcher key.
    */

    // Matching paths with in middleware will be handled here through conditionals.

    if (request.nextUrl.pathname.startsWith('/next-features')) {
        return NextResponse.rewrite(new URL('/', request.url))
    }

    return NextResponse.redirect(new URL('/', request.url))

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/next-features/:path*', '/home/:path*',]
}