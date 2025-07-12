import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      projectName: true,
      codeRepositoryUri: true,
      teamName: true,
      projectTech: true,
      createdAt: true,
      groupProjectStatus: true,
      groupMembers: {
        select: {
          user: {
            select: {
              username: true,
              email: true,
              image: true,
              role: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(groups);
}
