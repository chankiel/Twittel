'use server';

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function createPost(formData: FormData){
    await prisma.post.create({
        data:{
            content: formData.get("content") as string,
            author_id: 1
        }
    })
    revalidatePath("/home")
}

export async function deletePost(post_id:number){
    await prisma.post.delete({
        where: {
            id: post_id
        }
    })
    revalidatePath("/home")
}

export async function updatePost(id:number,formData: FormData){
    await prisma.post.update({
        where: {
            id: id,
        },
        data: {
            content: formData.get("content") as string,
        }
    })
    revalidatePath("/home")
}