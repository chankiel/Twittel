"use server";

import * as auth from "@/auth";
import { revalidatePath } from "next/cache";

export async function signInGithub() {
  return auth.signIn("github");
}

export async function signOut() {
  revalidatePath("/");
  return auth.signOut();
}

// export async function signIn(formData: FormData){
//   const provider = formData.get("provider") as string;
//   return auth.signIn(provider);
// }
