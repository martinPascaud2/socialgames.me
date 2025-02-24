import { NextResponse } from "next/server";

import { jwtVerify } from "@/utils/jwtVerify";

export async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("i");
  const tmpToken = searchParams.get("t");
  const missParam = !userId || !tmpToken;

  const SG_token = request.cookies.get("SG_token");
  const { userStatus } = await jwtVerify(SG_token);

  if (userStatus !== "User" && userStatus !== "Admin" && missParam) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.next();
}
