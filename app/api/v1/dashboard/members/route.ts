import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      groupMember: {
        select: {
          group: {
            select: {
              id: true,
              projectName: true,
              projectDescription: true,
              createdAt: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(user);
}
