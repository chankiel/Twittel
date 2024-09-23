"use server";

import * as auth from "@/auth";

export async function signInGithub() {
  return auth.signIn("github");
}

export async function signOut() {
  return auth.signOut();
}

// export async function signIn(formData: FormData){
//   const provider = formData.get("provider") as string;
//   return auth.signIn(provider);
// }
