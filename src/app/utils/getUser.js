"use server";

import { cookies } from "next/headers";

import { jwtVerify } from "./jwtVerify";
import prisma from "./prisma";

export default async function getUser({ userId, tmpToken }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("SG_token");

  if (!token) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    const { tmpToken: dataToken } = user;

    if (tmpToken !== dataToken) return null;
    else {
      return user;
    }
  } else {
    const { userMail } = await jwtVerify(token);
    let user;

    if (userMail) {
      user = await prisma.user.findFirst({
        where: {
          email: userMail,
        },
      });

      return user;
    } else return null;
  }
}
