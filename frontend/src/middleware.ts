import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("TOKEN");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // It's not possible use group routes
  matcher: ["/payable/:path*", "/assignor/:path*"],
};
