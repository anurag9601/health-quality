"use server"

import { auth, signIn } from "@/auth"

export async function handleUserGoogleAuth() {
    await signIn("google", { redirectTo: "/" });
}