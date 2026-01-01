import { signIn, signOut } from "next-auth/react";

export const handleSignIn = async () => signIn("google");

export const handleSignOut = () => signOut();
