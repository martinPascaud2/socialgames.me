import { setCookieToken } from "./utils/setCookieToken";
import getUser from "./utils/getUser";
import Home from "./Home";

export default async function HomePage({ params, searchParams }) {
  const SP = await searchParams;
  const { t: tmpToken } = SP;
  const userId = parseInt(SP.i);

  const user = await getUser({ userId, tmpToken });

  const setCookie = async () => {
    "use server";
    if (!user) return;
    await setCookieToken("User", user.email);
  };

  if (!user) return <div>page de connexion</div>;

  return <Home setCookie={setCookie} user={user} />;
}
