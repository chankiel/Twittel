"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export interface PostDataFormat {
  id: number;
  content: string;
  datetime_post: Date;
  author: {
    username: string;
    addname: string;
  };
  _count: {
    likedBy: number;
    bookmarkedBy: number;
    replies: number;
  };
  likedBy: {
    id: number;
  }[];
  bookmarkedBy: {
    id: number;
  }[];
}

export interface FetchPostsOptions {
  where?: object;
  orderBy?: object;
}

export async function fetchPostsLiked(userId: number) {
  const posts = await fetchPosts({
    where: {
      likedBy: {
        some: { id: userId },
      },
    },
    orderBy: { datetime_post: "desc" },
  });
  return posts;
}

export async function fetchPostsBookmarked(userId: number) {
  const posts = await fetchPosts({
    where: {
      bookmarkedBy: {
        some: { id: userId },
      },
    },
    orderBy: { datetime_post: "desc" },
  });
  return posts;
}

export async function fetchPostsOwned(userId: number) {
  const posts = await fetchPosts({
    where: {
      author: {
        id: userId,
      },
    },
    orderBy: { datetime_post: "desc" },
  });
  return posts;
}

export async function fetchPostsFollowed(userId: number) {
  const posts = await fetchPosts({
    where: {
      author: {
        followedBy: {
          some: {
            id: userId,
          },
        },
      },
    },
    orderBy: { datetime_post: "desc" },
  });
  return posts;
}

export async function fetchPosts(options: FetchPostsOptions = {}) {
  const { where, orderBy } = options;

  const posts = await prisma.post.findMany({
    where: where || {},
    orderBy: orderBy || { datetime_post: "desc" },
    select: {
      id: true,
      content: true,
      datetime_post: true,
      author: {
        select: {
          username: true,
          addname: true,
        },
      },
      _count: {
        select: { likedBy: true, bookmarkedBy: true, replies: true },
      },
      likedBy: {
        where: { id: 1 },
        select: { id: true },
      },
      bookmarkedBy: {
        where: { id: 1 },
        select: { id: true },
      },
    },
  });

  return posts;
}

export async function fetchPost(options: FetchPostsOptions = {}) {
  const { where, orderBy } = options;

  const post = await prisma.post.findFirst({
    where: where || {},
    orderBy: orderBy || { datetime_post: "desc" },
    select: {
      id: true,
      content: true,
      datetime_post: true,
      author: {
        select: {
          username: true,
          addname: true,
        },
      },
      _count: {
        select: { likedBy: true, bookmarkedBy: true, replies: true },
      },
      likedBy: {
        where: { id: 1 },
        select: { id: true },
      },
      bookmarkedBy: {
        where: { id: 1 },
        select: { id: true },
      },
    },
  });

  return post;
}

export async function createPost(formData: FormData) {
  await prisma.post.create({
    data: {
      content: formData.get("content") as string,
      author_id: 1,
    },
  });
  revalidatePath("/home");
}

export async function deletePost(post_id: number) {
  await prisma.post.delete({
    where: {
      id: post_id,
    },
  });
  revalidatePath("/home");
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
  revalidatePath("/home");
}

export async function toggleLike(user_id: number, post_id: number) {
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

  revalidatePath("/home");
}

export async function toggleBookmark(user_id: number, post_id: number) {
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

  revalidatePath("/home");
}
