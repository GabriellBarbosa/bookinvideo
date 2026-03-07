import { Logo } from "../../../components/Logo";
import { LoginButton } from "../../../components/LoginButton";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <LoginButton />
      </div>
    </header>
  );
}
