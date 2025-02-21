import { NextResponse } from "next/server";

import { jwtVerify } from "@/utils/jwtVerify";

export async function middleware(request) {
  const token = request.cookies.get("SG_token");

  if (!token && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { userStatus } = await jwtVerify(token);

  if (userStatus !== "User" && userStatus !== "Admin") {
    console.log("userStatus", userStatus);
    console.log("request", request);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.next();
}
