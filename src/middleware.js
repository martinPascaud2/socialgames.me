import { NextResponse } from "next/server";

import { jwtVerify } from "@/utils/jwtVerify";

export async function middleware(request) {
  const token = request.cookies.get("SG_token");
  const { userStatus } = await jwtVerify(token);

  if (userStatus !== "User" && userStatus !== "Admin") {
    console.log("userStatus", userStatus);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.next();
}
