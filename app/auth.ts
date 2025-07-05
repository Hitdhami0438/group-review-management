import NextAuth from "next-auth";
import { prisma } from "../lib/prisma";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  callbacks: {
    // Google login only to check to data base user alrady on ther or not or create user is alrady or not
    async signIn({ user, account, profile, email }) {
      // console.log("calback user", user)
      try {
        const allowedUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!allowedUser) {
          console.warn(`Unauthorized login attempt by ${user.email}`);
          return false;
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    // session or jwt handle hear
    async jwt({ token, user }) {
      // console.log("user", user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        // console.log("token", token)
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.name ?? "";
        session.user.image = token.image;
      }

      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
