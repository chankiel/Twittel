"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { userId } from "./placeholder-data";

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
  parentPost: {
    author: {
      addname: string;
    };
  } | null;
  parent_id: number | null;
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

const selectUserFields = {
  username: true,
  addname: true,
};

const selectCountFields = {
  likedBy: true,
  bookmarkedBy: true,
  replies: true,
};

const selectLikeAndBookmarkFields = {
  where: { id: userId },
  select: { id: true },
};

const selectQuery = {
  id: true,
  content: true,
  datetime_post: true,
  author: {
    select: selectUserFields,
  },
  _count: {
    select: selectCountFields,
  },
  likedBy: selectLikeAndBookmarkFields,
  bookmarkedBy: selectLikeAndBookmarkFields,
  parentPost: {
    select: {
      author: {
        select: {
          addname: true,
        },
      },
    },
  },
  parent_id: true,
};

// replies: {
//   select: {
//     id: true,
//     content: true,
//     datetime_post: true,
//     author: {
//       select: selectUserFields,
//     },
//     _count: {
//       select: selectCountFields,
//     },
//     likedBy: selectLikeAndBookmarkFields,
//     bookmarkedBy: selectLikeAndBookmarkFields,
//   },
// },

export async function fetchRepliesOwned(userId: number) {
  const posts = await fetchPosts({
    where:{
      author_id: userId,
      parent_id: {
        not: null
      }
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
    select: selectQuery,
  });

  // const post = await prisma.post.findMany({
  //   select: {
  //     parentPost: {
  //       select: {
  //         author: {
  //           select: {
  //             addname: true,
  //           },
  //         },
  //       },
  //     },
  //     parent_id: true,
  //   },
  // });

  return posts;
}

export async function fetchPost(options: FetchPostsOptions = {}) {
  const { where, orderBy } = options;

  const post = await prisma.post.findFirst({
    where: where || {},
    orderBy: orderBy || { datetime_post: "desc" },
    select: selectQuery,
  });

  return post;
}

export async function createPost(formData: FormData, parentId?: number) {
  await prisma.post.create({
    data: {
      content: formData.get("content") as string,
      author_id: userId,
      parent_id: parentId,
      ...(parentId !== undefined && { parent_id: parentId }),
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
