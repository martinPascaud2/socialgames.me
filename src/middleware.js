import { NextResponse } from "next/server";

import { jwtVerify } from "@/utils/jwtVerify";

export async function middleware(request) {
  //   console.log("request", request);
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  //   if (request.nextUrl.pathname !== "/") {
  //     console.log("request.nextUrl.pathname", request.nextUrl.pathname);
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  const SG_token = request.cookies.get("SG_token");

  const { searchParams } = request.nextUrl;
  //   const id = searchParams.get("id");
  //   const token = searchParams.get("token");
  //   console.log("token", token);

  //   if (!SG_token && id && token) {
  //     return NextResponse.redirect(
  //       new URL(`/?userId=${id}&tmpToken=${token}`, request.url)
  //     );

  // try {
  //   await checkSetToken({ userId, tmpToken });
  //   const test = await prisma.user.findFirst({ where: { id: userId } });
  //   console.log("test", test);
  // } catch (error) {
  //   console.log("error", error);
  // }
  //   }

  const userId = searchParams.get("i");
  const tmpToken = searchParams.get("t");
  const missParam = !userId || !tmpToken;
  //   if (!SG_token && missParam) {
  //     return NextResponse.next();
  //   }

  const { userStatus } = await jwtVerify(SG_token);

  if (userStatus !== "User" && userStatus !== "Admin" && missParam) {
    console.log("userStatus", userStatus);
    console.log("request", request);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.next();
}
