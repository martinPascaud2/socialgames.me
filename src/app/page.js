import prisma from "./utils/prisma";
import getUser from "./utils/getUser";

export default async function Home() {
  const test = await getUser();
  console.log("test", test);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      coucou
    </div>
  );
}
