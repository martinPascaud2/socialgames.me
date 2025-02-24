"use client";

import { useEffect, useState } from "react";

export default function Home({ setCookie, user }) {
  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    const set = async () => {
      await setCookie();
      setIsCookie(true);
    };
    set();
  }, []);

  if (!isCookie) return null;

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      connecté
    </div>
  );
}
