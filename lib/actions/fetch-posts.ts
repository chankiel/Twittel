"use server";

import prisma from "../db";
import { FetchPostsOptions } from "./type-data";

export async function fetchPostsLiked(userId: string, addname: string) {
  const posts = await fetchPosts({
    where: {
      likedBy: {
        some: { addname: addname },
      },
    },
    orderBy: { datetime_post: "desc" },
    selectLikeAndBookmarkFields: {
      where: { id: userId },
      select: { id: true },
    },
  });
  return posts;
}

export async function fetchPostsBookmarked(userId: string) {
  const posts = await fetchPosts({
    where: {
      bookmarkedBy: {
        some: { id: userId },
      },
    },
    orderBy: { datetime_post: "desc" },
    selectLikeAndBookmarkFields: {
      where: { id: userId },
      select: { id: true },
    },
  });
  return posts;
}

export async function fetchPostsOwned(userId: string, addname: string) {
  const posts = await fetchPosts({
    where: {
      author: {
        addname: addname,
      },
    },
    orderBy: { datetime_post: "desc" },
    selectLikeAndBookmarkFields: {
      where: { id: userId },
      select: { id: true },
    },
  });
  return posts;
}

export async function fetchPostsFollowed(userId: string) {
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
    selectLikeAndBookmarkFields: {
      where: { id: userId },
      select: { id: true },
    },
  });
  return posts;
}

const selectUserFields = {
  username: true,
  addname: true,
  image: true,
};

const selectCountFields = {
  likedBy: true,
  bookmarkedBy: true,
  replies: true,
};

export async function fetchRepliesOwned(userId: string, addname: string) {
  const posts = await fetchPosts({
    where: {
      author: {
        addname: addname,
      },
      parent_id: {
        not: null,
      },
    },
    orderBy: { datetime_post: "desc" },
    selectLikeAndBookmarkFields: {
      where: { id: userId },
      select: { id: true },
    },
  });
  return posts;
}

export async function fetchPosts(options: FetchPostsOptions = {}) {
  const { where, orderBy, selectLikeAndBookmarkFields } = options;

  const posts = await prisma.post.findMany({
    where: where || {},
    orderBy: orderBy || { datetime_post: "desc" },
    select: {
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
    },
  });

  return posts;
}

export async function fetchPost(options: FetchPostsOptions = {}) {
  const { where, orderBy, selectLikeAndBookmarkFields } = options;

  const post = await prisma.post.findFirst({
    where: where || {},
    orderBy: orderBy || { datetime_post: "desc" },
    select: {
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
    },
  });

  return post;
}
