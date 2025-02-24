"use server";

const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function updatePassword(userId, prevState, formData) {
  const oldPassword = formData.get("oldPassword");
  const newPassword = formData.get("newPassword");
  const confirmedPassword = formData.get("confirmedPassword");

  const hashedPassword = (
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    })
  ).password;

  const isValidPassword = await bcrypt.compare(oldPassword, hashedPassword);

  if (!isValidPassword) {
    return { status: 401, message: "Mot de passe incorrect" };
  } else {
    if (newPassword !== confirmedPassword) {
      return { status: 401, message: "Mots de passe différents" };
    } else if (newPassword.length < 5) {
      return { status: 400, message: "Nouveau mot de passe trop court" };
    } else {
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await prisma.user.update({
        where: { id: userId },
        data: {
          password: newHashedPassword,
        },
      });

      return { status: 200, message: "Mot de passe modifié" };
    }
  }
}
