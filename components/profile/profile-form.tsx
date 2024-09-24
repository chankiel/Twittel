"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { State } from "@/lib/actions/crud-user";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import paths from "@/path";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export function InputForm({
  defaultValue,
  htmlName,
  errors = [],
  setSubmitable,
  setPassword,
  maxLength,
}: {
  defaultValue: string;
  htmlName: string;
  errors?: string[];
  setSubmitable: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  maxLength?: number;
}) {
  const label = htmlName.charAt(0).toUpperCase() + htmlName.slice(1);
  const [value, setValue] = useState(defaultValue);
  const cantEmpty =
    htmlName === "username" ||
    htmlName === "addname" ||
    htmlName === "password" ||
    htmlName === "email";
  const warnEmpty = cantEmpty && value.length == 0;
  return (
    <div className="my-5">
      <Label
        htmlFor={htmlName}
        className={`text-lg text-gray-500 ${warnEmpty && "text-red-500"} `}
      >
        {label}
      </Label>
      <div className="relative">
        <Textarea
          value={value}
          id={htmlName}
          name={htmlName}
          typeof="password"
          className={`text-lg ${
            htmlName === "bio" ? "h-[100px]" : "h-[50px]"
          } ${
            warnEmpty &&
            "ring-red-500 ring-2 focus-visible:ring-2 focus-visible:ring-red-500"
          }`}
          spellCheck={false}
          onChange={(e) => {
            if (
              !maxLength ||
              (maxLength && Number(e.target.value.length) <= maxLength)
            ) {
              setValue(e.target.value);
              {
                setPassword && setPassword(e.target.value);
              }
              if (cantEmpty) {
                setSubmitable(e.target.value.length > 0);
              }
            }
          }}
        />
        {maxLength && (
          <p
            className={`absolute right-1 top-0 ${warnEmpty && "text-red-500"}`}
          >
            {value.length}/{maxLength}
          </p>
        )}
      </div>
      {warnEmpty && (
        <p className="mt-2 text-sm text-red-500">{label} can&apos;t be empty</p>
      )}
      {errors.map((error: string) => (
        <p className="mt-2 text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export default function ProfileForm({
  profileUser,
  crudUser,
  isRegister,
}: {
  profileUser: {
    id?: string;
    addname?: string | null;
    image?: string | null;
    username?: string | null;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
    birthdate?: Date | null;
  };
  crudUser: (prevState: State, formData: FormData) => Promise<State>;
  isRegister: boolean;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(crudUser, initialState);
  const [password, setPassword] = useState("");
  const [submitable, setSubmitable] = useState(true);
  const { replace } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formAction(formData);
    if (!isRegister) {
      const newAddname = formData.get("addname")?.toString() || "";
      replace(paths.profile(newAddname));
    }
  };

  useEffect(() => {
    const emailUsername = state.message;
    if (emailUsername) {
      if (isRegister) {
        (async () => {
          await signIn("credentials", {
            redirect: false,
            emailUsername,
            password,
          });
        })();
      }
      console.log(emailUsername);
      replace(paths.profile(emailUsername));
    }
  }, [state.message, isRegister, replace, password]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`rounded-full font-bold text-lg ${
            isRegister && "bg-blue-500 text-background w-full py-6 mt-1"
          }`}
        >
          {isRegister ? "Create Account" : "Edit Profile"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit} className="relative">
          <DialogHeader className="mb-5 flex items-center">
            <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400">
              <Cross2Icon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
            <DialogTitle className="text-2xl ml-10">
              {isRegister ? "Create Your Account" : "Edit profile"}
            </DialogTitle>
            {isRegister ? (
              <div></div>
            ) : (
              <DialogClose className="ml-auto">
                <Button
                  type="submit"
                  className="text-lg rounded-full font-extrabold border-2 border-foreground px-5"
                  disabled={!submitable}
                >
                  Save
                </Button>
              </DialogClose>
            )}
          </DialogHeader>
          <InputForm
            defaultValue={profileUser.username ?? ""}
            htmlName="username"
            errors={state.errors?.username}
            setSubmitable={setSubmitable}
            maxLength={50}
          />
          <InputForm
            defaultValue={profileUser.addname ?? ""}
            htmlName="addname"
            errors={state.errors?.addname}
            setSubmitable={setSubmitable}
            maxLength={10}
          />
          {isRegister ? (
            <>
              <InputForm
                defaultValue={""}
                htmlName="email"
                errors={state.errors?.email}
                setSubmitable={setSubmitable}
              />
              <InputForm
                defaultValue={""}
                htmlName="password"
                errors={state.errors?.password}
                setSubmitable={setSubmitable}
                setPassword={setPassword}
              />
            </>
          ) : (
            <>
              <InputForm
                defaultValue={profileUser.bio ?? ""}
                htmlName="bio"
                errors={state.errors?.bio}
                setSubmitable={setSubmitable}
                maxLength={160}
              />
              <InputForm
                defaultValue={profileUser.location ?? ""}
                htmlName="location"
                errors={state.errors?.location}
                setSubmitable={setSubmitable}
                maxLength={30}
              />
              <InputForm
                defaultValue={profileUser.website ?? ""}
                htmlName="website"
                errors={state.errors?.website}
                setSubmitable={setSubmitable}
                maxLength={100}
              />
            </>
          )}
          {isRegister && (
            <Button
              type="submit"
              className="text-lg rounded-full font-extrabold border-2 border-foreground px-5 w-full py-5"
              disabled={!submitable}
            >
              Sign Up
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
