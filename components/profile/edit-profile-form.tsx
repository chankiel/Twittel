"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { State, updateUserProfile } from "@/lib/actions/crud-user";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export function InputForm({
  defaultValue,
  htmlName,
  errors = [],
  setSubmitable,
}: {
  defaultValue: string;
  htmlName: string;
  errors?: string[];
  setSubmitable: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const label = htmlName.charAt(0).toUpperCase() + htmlName.slice(1);
  const [value, setValue] = useState(defaultValue);
  const cantEmpty = htmlName === "username" || htmlName === "addname";
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
          className={`text-lg ${
            htmlName === "bio" ? "h-[100px]" : "h-[50px]"
          } ${
            warnEmpty &&
            "ring-red-500 ring-2 focus-visible:ring-2 focus-visible:ring-red-500"
          }`}
          spellCheck={false}
          onChange={(e) => {
            setValue(e.target.value);
            if(cantEmpty){
              setSubmitable(
                e.target.value.length > 0
              );
            }
          }}
        />
        <p className={`absolute right-1 top-0 ${warnEmpty && "text-red-500"}`}>
          {value.length}/50
        </p>
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

export default function EditProfileForm({
  profileUser,
}: {
  profileUser: {
    id: string;
    addname: string | null;
    image: string | null;
    username: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    birthdate: Date | null;
  };
}) {
  const initialState: State = { message: null, errors: {} };
  const updateUserWithId = updateUserProfile.bind(null, profileUser.id);
  const [state, formAction] = useFormState(updateUserWithId, initialState);
  const [submitable, setSubmitable] = useState(true);
  console.log(submitable);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full font-bold text-lg">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form action={formAction} className="relative">
          <DialogHeader className="mb-5 flex items-center">
            <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400">
              <Cross2Icon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
            <DialogTitle className="text-2xl ml-10">Edit profile</DialogTitle>
            <DialogClose className="ml-auto">
              <Button
                type="submit"
                className="text-lg rounded-full font-extrabold border-2 border-foreground px-5"
                disabled={!submitable}
              >
                Save
              </Button>
            </DialogClose>
          </DialogHeader>
          <InputForm
            defaultValue={profileUser.username ?? ""}
            htmlName="username"
            errors={state.errors?.username}
            setSubmitable={setSubmitable}
          />
          <InputForm
            defaultValue={profileUser.addname ?? ""}
            htmlName="addname"
            errors={state.errors?.addname}
            setSubmitable={setSubmitable}
          />
          <InputForm
            defaultValue={profileUser.bio ?? ""}
            htmlName="bio"
            errors={state.errors?.bio}
            setSubmitable={setSubmitable}
          />
          <InputForm
            defaultValue={profileUser.location ?? ""}
            htmlName="location"
            errors={state.errors?.location}
            setSubmitable={setSubmitable}
          />
          <InputForm
            defaultValue={profileUser.website ?? ""}
            htmlName="website"
            errors={state.errors?.website}
            setSubmitable={setSubmitable}
          />
        </form>
        <DialogFooter>
          <DialogClose></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
