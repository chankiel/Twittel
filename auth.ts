import NextAuth from "next-auth";
import Github from 'next-auth/providers/github';
import {PrismaAdapter} from "@auth/prisma-adapter"
import prisma from "./lib/db";
import { generateSlug } from "./lib/utils";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if( !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error("Missing github oauth credentials");
}

export const {handlers:{GET,POST}, auth, signOut, signIn} = NextAuth({
    pages:{
        signIn: '/',
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })
    ],
    callbacks:{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({session,user}:any){
            if(session && user){
                session.user.id = user.id;
                session.user.addname = user.addname;
            }
            return session;
        },

        authorized({auth,request:{nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isRoot = nextUrl.pathname === '/';

            if(!isLoggedIn && !isRoot) {
               return false; 
            }
            
            return true;
        }
    },
    events: {
        async createUser({ user }) {
          const addname = generateSlug(user.name || "");
          const username = user.name?.substring(0,10) || "";
          
          await prisma.user.update({
            where: { id: user.id },
            data: { addname,username },
          });
        },
      },
})