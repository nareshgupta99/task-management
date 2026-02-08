
import { NextResponse } from "next/server";

export function middleware(request) {
  // const token = localStorage.getItem("token");
   const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  
 if (pathname === "/logout") {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    // If token exists → remove it
    if (token) {
      response.cookies.set("token", "", {
        maxAge: 0,
        path: "/",
      });
    }

    // If token does NOT exist → just redirect
  return response; }
          

  // Protected routes
  if (pathname.startsWith("/task") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Auth routes
  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/task", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/task/:path*", "/login","/logout"],
};
