import { prisma } from "@/lib/prisma";

export async function GET() {
    const groups = await prisma.group.findMany({
        select: {
            title: true,
            
        }
    })
}