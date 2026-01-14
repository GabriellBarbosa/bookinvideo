import { BookOpen } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-400/25">
        <BookOpen className="h-6 w-6" />
      </div>
      <div className="hidden sm:block">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
          Curso
        </p>
        <p className="text-lg font-semibold text-white">
          Código Limpo na Prática
        </p>
      </div>
    </div>
  );
}
