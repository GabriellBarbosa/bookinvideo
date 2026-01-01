import { BookOpen, LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { handleSignIn, handleSignOut } from "@/lib/auth";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="relative border-b border-white/5 bg-black/20 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3 max-w-[200px]">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-400/25">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Curso
            </p>
            <p className="text-lg font-semibold text-white">Código Limpo</p>
          </div>
        </div>

        {session ? (
          <Button onClick={handleSignOut}>
            <LogOut /> Sair
          </Button>
        ) : (
          <Button onClick={handleSignIn}>
            <User /> Entrar com Google
          </Button>
        )}
      </div>
    </header>
  );
}
