import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = request.cookies.get("__serviceToken__");

  // Redirect to /login if there's no token and the user is at the root path
  if (!token || token === undefined) {
    if (url.pathname.includes("/hifazat")) {
      return NextResponse.redirect(new URL("/login", url.origin));
    }
    return NextResponse.next();
  }

  // Allow access to /hifazat if the token exists
  if (url.pathname.includes("/hifazat")) {
    return NextResponse.next();
  }

  // Redirect to /hifazat for all other cases under
  return NextResponse.redirect(new URL("/hifazat", url.origin));
}

export const config = {
  matcher: ["/"], // Include the root path in the matcher
};
