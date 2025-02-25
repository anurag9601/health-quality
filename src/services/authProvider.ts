"use server"

import { auth, signIn, signOut } from "@/auth"

export async function handleUserGoogleAuth() {
    await signIn("google", { redirectTo: "/" });
}

export async function getGoogleSignInUserData() {
    const session = await auth();

    return session
}

export async function handleUserGoogleSignOut() {
    await signOut()
}