import "next-auth";
import { DefaultSession } from "next-auth";
import { UserRole } from "../generated/prisma";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      image: string;
      role: UserRole;
      isVerified: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    email: string;
    image: string;
    role: UserRole;
    isVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    image: string;
    role: UserRole;
    isVerified: boolean;
  }
}
