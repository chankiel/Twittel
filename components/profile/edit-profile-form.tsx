"use client";

import {
  Dialog,
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
import React from "react";
import { useFormState } from "react-dom";

export function InputForm({
  defaultValue,
  htmlName,
}: {
  defaultValue: string;
  htmlName: string;
}) {
  return (
    <div>
      <Label htmlFor={htmlName} className="text-lg">
        {htmlName}
      </Label>
      <Textarea
        defaultValue={defaultValue}
        id={htmlName}
        name={htmlName}
        className="text-lg"
      />
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
  console.log(state);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full font-bold text-lg">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit profile</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <InputForm
            defaultValue={profileUser.username ?? ""}
            htmlName="username"
          />
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.username &&
              state.errors.username.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          <InputForm
            defaultValue={profileUser.addname ?? ""}
            htmlName="addname"
          />
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.addname &&
              state.errors.addname.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          <InputForm defaultValue={profileUser.bio ?? ""} htmlName="bio" />
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.bio &&
              state.errors.bio.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          <InputForm
            defaultValue={profileUser.location ?? ""}
            htmlName="location"
          />
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.location &&
              state.errors.location.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          <InputForm
            defaultValue={profileUser.website ?? ""}
            htmlName="website"
          />
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.website &&
              state.errors.website.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          <Button type="submit">Save</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
