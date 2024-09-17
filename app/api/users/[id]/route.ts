// app/api/users/[id]/route.ts

import prisma from "@/lib/db";


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return new Response(JSON.stringify({ message: 'Invalid user ID' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id, 
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
