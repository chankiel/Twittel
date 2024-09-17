'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../db";
import paths from "@/path";

export async function createPost(
  formData: FormData,
  userId: string,
  parentId?: number
) {
  await prisma.post.create({
    data: {
      content: formData.get("content") as string,
      author_id: userId,
      ...(parentId !== undefined && { parent_id: parentId }),
    },
  });
  revalidatePath(paths.home());
}

export async function deletePost(post_id: number) {
  await prisma.post.delete({
    where: {
      id: post_id,
    },
  });
  revalidatePath(paths.home());
  redirect(paths.home());
}

export async function updatePost(id: number, formData: FormData) {
  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      content: formData.get("content") as string,
    },
  });
  revalidatePath(paths.home());
}

export async function toggleLike(user_id: string, post_id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: post_id },
      include: { likedBy: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }
    const isLiked = post.likedBy.some((user) => user.id === user_id);
    if (isLiked) {
      await prisma.post.update({
        where: { id: post_id },
        data: {
          likedBy: {
            disconnect: { id: user_id },
          },
        },
      });
    } else {
      await prisma.post.update({
        where: { id: post_id },
        data: {
          likedBy: {
            connect: { id: user_id },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath(paths.home());
}

export async function toggleBookmark(user_id: string, post_id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: post_id },
      include: { bookmarkedBy: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const isBookmarked = post.bookmarkedBy.some((user) => user.id === user_id);
    if (isBookmarked) {
      await prisma.post.update({
        where: { id: post_id },
        data: {
          bookmarkedBy: {
            disconnect: { id: user_id },
          },
        },
      });
    } else {
      await prisma.post.update({
        where: { id: post_id },
        data: {
          bookmarkedBy: {
            connect: { id: user_id },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath(paths.bookmarks());
}
