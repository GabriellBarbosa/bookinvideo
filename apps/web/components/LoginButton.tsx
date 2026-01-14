import { handleSignIn, handleSignOut } from "@/lib/auth";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Button onClick={handleSignOut}>
          <LogOut /> Sair
        </Button>
      ) : (
        <Button onClick={handleSignIn}>
          <User /> Entrar com Google
        </Button>
      )}
    </>
  );
}
