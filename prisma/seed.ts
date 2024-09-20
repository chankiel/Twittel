import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany()
  const users = [];
  const usersData = [
    {
      email: "user1@gmail.com",
      name: "John",
      username: "John",
      addname: "johnny",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1990-01-01T00:00:00Z"),
    },
    {
      email: "user2@gmail.com",
      name: "Alice",
      username: "Alice",
      addname: "al",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1992-03-12T00:00:00Z"),
    },
    {
      email: "user3@gmail.com",
      name: "Michael",
      username: "Michael",
      addname: "mike",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1985-06-23T00:00:00Z"),
    },
    {
      email: "user4@gmail.com",
      name: "Sarah",
      username: "Sarah",
      addname: "sally",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1993-08-15T00:00:00Z"),
    },
    {
      email: "user5@gmail.com",
      name: "David",
      username: "David",
      addname: "dave",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1988-12-05T00:00:00Z"),
    },
    {
      email: "user6@gmail.com",
      name: "Emily",
      username: "Emily",
      addname: "em",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1991-04-22T00:00:00Z"),
    },
    {
      email: "user7@gmail.com",
      name: "James",
      username: "James",
      addname: "jim",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1986-07-30T00:00:00Z"),
    },
    {
      email: "user8@gmail.com",
      name: "Sophia",
      username: "Sophia",
      addname: "sophie",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1994-09-09T00:00:00Z"),
    },
    {
      email: "user9@gmail.com",
      name: "Daniel",
      username: "Daniel",
      addname: "dan",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1987-11-18T00:00:00Z"),
    },
    {
      email: "user10@gmail.com",
      name: "Olivia",
      username: "Olivia",
      addname: "liv",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1995-02-28T00:00:00Z"),
    },
    {
      email: "user11@gmail.com",
      name: "Henry",
      username: "Henry",
      addname: "hank",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1989-05-10T00:00:00Z"),
    },
    {
      email: "user12@gmail.com",
      name: "Isabella",
      username: "Isabella",
      addname: "bella",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1993-06-16T00:00:00Z"),
    },
    {
      email: "user13@gmail.com",
      name: "William",
      username: "William",
      addname: "will",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1984-08-25T00:00:00Z"),
    },
    {
      email: "user14@gmail.com",
      name: "Mia",
      username: "Mia",
      addname: "mi",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1996-03-04T00:00:00Z"),
    },
    {
      email: "user15@gmail.com",
      name: "Alexander",
      username: "Alexander",
      addname: "alex",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1987-10-12T00:00:00Z"),
    },
    {
      email: "user16@gmail.com",
      name: "Ava",
      username: "Ava",
      addname: "ave",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1992-12-21T00:00:00Z"),
    },
    {
      email: "user17@gmail.com",
      name: "Noah",
      username: "Noah",
      addname: "noe",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1990-07-19T00:00:00Z"),
    },
    {
      email: "user18@gmail.com",
      name: "Harper",
      username: "Harper",
      addname: "harp",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1995-01-13T00:00:00Z"),
    },
    {
      email: "user19@gmail.com",
      name: "Liam",
      username: "Liam",
      addname: "lee",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1986-06-05T00:00:00Z"),
    },
    {
      email: "user20@gmail.com",
      name: "Charlotte",
      username: "Charlotte",
      addname: "charlie",
      image: "https://avatars.githubusercontent.com/u/88670080?v=4",
      birthdate: new Date("1993-03-20T00:00:00Z"),
    },
  ];
  for (const userData of usersData) {
    const createdUser = await prisma.user.create({
      data: userData,
    });
    users.push(createdUser);
  }

  const postsData = [];
  for(let i=0;i<20;i++){
    postsData.push(
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ex dignissimos asperiores sapiente facilis quidem molestiae natus illo ratione placeat. Laudantium repudiandae, voluptate natus cum nemo vitae perspiciatis? Pariatur, eius!",
        author_id: users[Math.floor(Math.random()*20)].id
      }
    )
  }

  await prisma.post.createMany({
    data: postsData,
  });
}

main().catch((e) => console.error(e));
