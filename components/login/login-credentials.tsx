"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginCredForm = () => {
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      emailUsername,
      password,
    });
    if (result?.error === "CredentialsSignin") {
      setError("Invalid Credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <Label htmlFor="emailUsername">Email or Username</Label>
          <Input
            type="text"
            id="emailUsername"
            name="emailUsername"
            value={emailUsername}
            onChange={(e) => setEmailUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="outline" className="w-full mt-5 rounded-full font-bold text-xl py-5 border-2 border-gray-700">Sign In</Button>
      </form>
    </div>
  );
};

export default LoginCredForm;
