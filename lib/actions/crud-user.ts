"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { z } from "zod";
import paths from "@/path";
import bcrypt from "bcrypt";

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
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const UserSchema = z.object({
  username: z.string().min(1,{message: 'Username can\'t be empty.'}),
  addname: z.string().min(1,{message: "Addname can\'t be empty."}),
  email: z.string().email({message: "Email invalid!"}),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  password: z.string().superRefine((value, ctx) => {
    const errors = [];
  
    if (value.length < 8) {
      errors.push("at least 8 characters long");
    }
    if (!/[a-z]/.test(value)) {
      errors.push("at least 1 lowercase letter");
    }
    if (!/[A-Z]/.test(value)) {
      errors.push("at least 1 uppercase letter");
    }
    if (!/\d/.test(value)) {
      errors.push("at least 1 number");
    }
    if (!/[\W_]/.test(value)) {
      errors.push("at least 1 special character");
    }
  
    if (errors.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Password must contain ${errors.join(", ")}.`,
      });
    }
  })
  
});

async function checkExistedAddname(addname: string, userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      addname,
      NOT: { id: userId },
    },
  });
  return !!user;
}

async function checkExistedEmail(email: string, userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
      NOT: { id: userId },
    },
  });
  return !!user;
}

export async function createUserProfile(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = UserSchema.safeParse({
    username: formData.get("username"),
    addname: formData.get("addname"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    website: formData.get("website"),
    password: formData.get('password'),
    email: formData.get('email'),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, addname, bio, location, website, password, email } = validatedFields.data;
  if (await checkExistedAddname(addname,"")) {
    return {
      errors: {
        addname: ["A user with that addname already exists."],
      },
    };
  }
  if (await checkExistedEmail(email,"")) {
    return {
      errors: {
        email: ["A user with that email already exists."],
      },
    };
  }
  
  const hashedPassword = await bcrypt.hash(password.toString(),10);
  try {
    await prisma.user.create({
      data: {
        username,
        addname,
        bio,
        location,
        website,
        hashedPassword,
        email,
      },
    });
  } catch (error) {
    console.error("Prisma create error:", error);
  }

  return {
    message: addname,
    errors: {},
  };
}

const UpdateSchema = UserSchema.omit({password:true,email:true});

export async function updateUserProfile(
  userId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = UpdateSchema.safeParse({
    username: formData.get("username"),
    addname: formData.get("addname"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    website: formData.get("website"),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, addname, bio, location, website } = validatedFields.data;

  if (await checkExistedAddname(addname,userId)) {
    return {
      errors: {
        addname: ["A user with that addname already exists."],
      },
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        addname,
        bio,
        location,
        website,
      },
    });
  } catch (error) {
    console.error("Prisma update error:", error);
  }
  revalidatePath(paths.profile(addname));
  return {
    message: addname,
    errors: {},
  };
}
