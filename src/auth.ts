import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prismaClient } from "./lib/prisma-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    callbacks: {
        async signIn({ user, profile, account }) {

            const existingUser = await prismaClient.user.findUnique({
                where: {
                    email: user.email as string
                }
            });

            if (existingUser) return false;

            await prismaClient.user.create({
                data: {
                    email: user.email as string,
                    continueWith: "google"
                }
            });

            return true;
        },

        async authorized({ auth }) {
            return !!auth;
        },
    }
})