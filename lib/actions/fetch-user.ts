'use server';

import prisma from "../db";
import { FetchPostsOptions } from "./type-data";

const selectQuery = {
  _count: {
    select: {
      posts: true,
      followedBy: true,
      following: true,
    },
  },
  id: true,
  username: true,
  addname: true,
  bio: true,
  location: true,
  website: true,
  birthdate: true,
  image: true,
  createdAt: true,
};

export async function fetchUsers(userId: string, options: FetchPostsOptions = {}){
    const { where, orderBy } = options;
  const users = await prisma.user.findMany({
    where: where || {
    },
    orderBy: orderBy || { createdAt: "desc" },
    select: {
      ...selectQuery,
      followedBy: {
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });
  return users;
}

export async function fetchUserWithAddname(userId: string, addname: string) {
  const user = await prisma.user.findFirst({
    where: {
      addname: addname,
    },
    select: {
      ...selectQuery,
      followedBy: {
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });
  return user;
}

export async function fetchUserWithId(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: selectQuery,
  });
  return user;
}