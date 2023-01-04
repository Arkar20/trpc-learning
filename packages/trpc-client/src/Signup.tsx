import React, { FormEvent, useMemo, useRef, useState } from "react";
import "./signup.css";
import { trpc } from "./trpc";

export default function Signup() {
  const utils = trpc.useContext();

  const signUp = trpc.createUser.useMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signUp.mutateAsync({ email, password }).then((result) => {
      utils.users.refetch();
      utils.getSingleUser.refetch();
    });
  };

  const errors = useMemo(() => {
    if (signUp.error) {
      return JSON.parse(signUp.error.message);
    }
    return false;
  }, [signUp.error]);

  return (
    <>
      {errors && (
        <ul>
          {errors.map((error: any, index: number) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <legend>Sign Up</legend>
        <input
          type="text"
          placeholder="email"
          value={email}
          onFocus={() => signUp.reset()}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onFocus={() => signUp.reset()}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Signup</button>
      </form>
      {signUp.isSuccess && <p>Sign Up successful</p>}
    </>
  );
}
