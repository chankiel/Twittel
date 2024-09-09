import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "hehe@gmail.com",
        username: "user",
        addname: "user",
        birthdate: new Date("1990-01-01T00:00:00Z"),
      },
    ],
  });
  await prisma.post.createMany({
    data: [
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex dignissimos asperiores sapiente facilis quidem molestiae natus illo ratione placeat. Laudantium repudiandae, voluptate natus cum nemo vitae perspiciatis? Pariatur, eius!",
        author_id: 1,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex dignissimos asperiores sapiente facilis quidem molestiae natus illo ratione placeat. Laudantium repudiandae, voluptate natus cum nemo vitae perspiciatis? Pariatur, eius!",
        author_id: 1,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex dignissimos asperiores sapiente facilis quidem molestiae natus illo ratione placeat. Laudantium repudiandae, voluptate natus cum nemo vitae perspiciatis? Pariatur, eius!",
        author_id: 1,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex dignissimos asperiores sapiente facilis quidem molestiae natus illo ratione placeat. Laudantium repudiandae, voluptate natus cum nemo vitae perspiciatis? Pariatur, eius!",
        author_id: 1,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex dignissimos asperiores sapiente facilis quidem molestiae natus illo ratione placeat. Laudantium repudiandae, voluptate natus cum nemo vitae perspiciatis? Pariatur, eius!",
        author_id: 1,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex dignissimos asperiores sapiente facilis quidem molestiae natus illo ratione placeat. Laudantium repudiandae, voluptate natus cum nemo vitae perspiciatis? Pariatur, eius!",
        author_id: 1,
      },
    ],
  });
}

main().catch((e) => console.error(e));

// model Post{
//     id Int @id @default(autoincrement())
//     content String
//     datetime_post DateTime @default(now())
//     author_id Int
//     parent_post_id Int?
//   }
