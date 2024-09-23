import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/db";
import { generateSlug } from "./lib/utils";
import { z } from "zod";
import bcrypt from "bcrypt";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing github oauth credentials");
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailUsername: {
          label: "Email",
          type: "text",
          placeholder: "John Smith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ emailUsername: z.string(), password: z.string().min(8) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { emailUsername, password } = parsedCredentials.data;
          const user = await prisma.user.findFirst({
            where: {
              OR: [{ email: emailUsername }, { addname: emailUsername }],
            },
          });
          if (!user) return null;
          if (!user.hashedPassword) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (session && token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const addname = generateSlug(user.name || "");
      const username = user.name?.substring(0, 10) || "";

      await prisma.user.update({
        where: { id: user.id },
        data: { addname, username },
      });
    },
  },
});
