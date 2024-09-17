'use server';

import prisma from "../db";

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
  bio: true,
  location: true,
  website: true,
  birthdate: true,
  image: true,
  createdAt: true,
};

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
