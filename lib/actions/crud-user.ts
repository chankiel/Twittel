'use server';

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { z } from "zod";
import paths from "@/path";

export async function toggleFollow(
  userId1: string,
  userId2: string,
  addname: string
) {
  try {
    const user2 = await prisma.user.findUnique({
      where: { id: userId2 },
      include: { followedBy: true },
    });

    if (!user2) {
      throw new Error("User2 not found");
    }
    const isFollowed = user2.followedBy.some((user) => user.id === userId1);
    if (isFollowed) {
      await prisma.user.update({
        where: { id: userId1 },
        data: {
          following: {
            disconnect: { id: userId2 },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: userId1 },
        data: {
          following: {
            connect: { id: userId2 },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  revalidatePath(paths.profile(addname));
}

export type State = {
  errors?: {
    username?: string[];
    addname?: string[];
    bio?: string[];
    location?: string[];
    website?: string[];
  };
  message?: string | null;
};

const UserSchema = z.object({
  username: z.string(),
  addname: z.string(),
  bio: z.string(),
  location: z.string(),
  website: z.string(),
});

async function checkExistedUsername(username:string){
    const existedUsername = await prisma.user.count({
        where:{
            username: username,
        }
      })
    return existedUsername > 0;
}

async function checkExistedAddname(addname:string){
    const existedUsername = await prisma.user.count({
        where:{
            addname: addname,
        }
      })
    return existedUsername > 0;
}



export async function updateUserProfile(
  userId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  console.log(formData);
  const validatedFields = UserSchema.safeParse({
    username: formData.get("username"),
    addname: formData.get("addname"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    website: formData.get("website"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { username, addname, bio, location, website } =
    validatedFields.data;


  if(await checkExistedUsername(username)){
    return{
        errors: {
            username: ["A user with that username already exists."]
        }
    }
  }

  if(await checkExistedAddname(addname)){
    return{
        errors: {
            addname: ["A user with that Addname already exists."]
        }
    }
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: username,
      addname: addname,
      bio: bio,
      location: location,
      website: website,
    },
  });

  return{
    message: "User updated successfully.",
    errors: {},
  }
}