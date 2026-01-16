import { Logo } from "../../../components/Logo";
import { LoginButton } from "../../../components/LoginButton";

export function Header() {
  return (
    <header className="relative border-b border-white/5 bg-black/20 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <LoginButton />
      </div>
    </header>
  );
}
