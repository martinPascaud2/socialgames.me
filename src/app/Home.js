"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";

import { updatePassword } from "./actions";

const PasswordForm = ({ user }) => {
  const updateWithUserId = updatePassword.bind(null, user.id);
  const [state, formAction] = useActionState(updateWithUserId, {
    status: 200,
    message: null,
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        action={(formData) => formAction(formData)}
        className="flex flex-col items-center"
      >
        <label className="text-sky-900">Ancien mot de passe</label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          className="text-sky-900 focus:outline-none"
          style={{ backgroundColor: "#e0f2fe" }}
          autoComplete=""
        />

        <label className="text-sky-900">Nouveau mot de passe</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          className="text-sky-900 focus:outline-none"
          style={{ backgroundColor: "#e0f2fe" }}
          autoComplete=""
        />

        <label className="text-sky-900">Confirmer</label>
        <input
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
          className="text-sky-900 focus:outline-none"
          style={{ backgroundColor: "#e0f2fe" }}
          autoComplete=""
        />

        <button
          type="submit"
          className="border border-sky-200 bg-sky-400 text-sky-900 mt-2 p-1"
        >
          Valider
        </button>

        <div
          className="font-semibold mt-2"
          style={{ color: state.status !== 200 ? "#7f1d1d" : "#064e3b" }}
        >
          {state.message}
        </div>
      </form>
    </div>
  );
};

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
      <PasswordForm user={user} />
    </div>
  );
}
