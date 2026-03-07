"use client";

import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  LockOpen,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "./_components/Header";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

const highlights = [
  {
    icon: Sparkles,
    title: "Código que vive bem",
    description:
      "Aprenda a escrever e refatorar código que se mantém simples, legível e pronto para crescer.",
  },
  {
    icon: ShieldCheck,
    title: "Boas práticas na prática",
    description:
      "Aplicação direta de princípios SOLID, design leve e nomes claros com exemplos reais.",
  },
  {
    icon: LayoutDashboard,
    title: "Para o time inteiro",
    description:
      "Fluxos que ajudam devs, reviewers e quem dá manutenção a colaborar melhor e mais rápido.",
  },
];

const modules = [
  {
    title: "Fundamentos do Clean Code",
    items: [
      "O que torna o código simples de ler",
      "Nomes, funções pequenas e intenção clara",
      "Como organizar arquivos e pastas",
    ],
  },
  {
    title: "Princípios e refatoração",
    items: [
      "Princípios SOLID sem formalidade excessiva",
      "Refatorando código legado com segurança",
      "Testes como guia de desenho",
    ],
  },
  {
    title: "Fluxos do dia a dia",
    items: [
      "Code review produtivo",
      "Feature toggles, dívidas e trade-offs",
      "Checklist pessoal para não esquecer nada",
    ],
  },
];

const bonuses = [
  "Aplicável em back e front",
  "Aulas curtas de 15-20 min",
  "Comunidade aberta",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />

      <main className="relative z-10 space-y-16 pb-14">
        <section className="relative max-w-6xl mx-auto px-6 pt-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative space-y-7">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                  Transforme código confuso em sistemas claros, seguros e fáceis
                  de evoluir.
                </h1>
                <p className="text-lg text-slate-200/80 sm:text-xl">
                  Um curso direto ao ponto para elevar a qualidade do seu
                  código, acelerar code reviews e reduzir retrabalho. Nada de
                  teoria solta: apenas práticas aplicáveis no dia seguinte.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-white/85">
                  <Clock3 className="h-4 w-4 text-amber-300" />
                  Aulas rápidas
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-white/85">
                  <LockOpen className="h-4 w-4 text-amber-300" />
                  Acesso imediato
                </span>
              </div>
              <Link
                href={ROUTES.course(
                  "clean-code",
                  "intro",
                  "clean-code-introduction",
                )}
              >
                <button className="rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:scale-[1.01] hover:shadow-amber-300/40">
                  Ver conteúdo completo
                </button>
              </Link>
            </div>
            <div className="relative grid gap-6 sm:grid-cols-3 lg:grid-cols-1 rounded-2xl bg-white/5 p-6">
              {highlights.map((highlight) => (
                <div
                  className="grid grid-cols-[auto_1fr] gap-x-2"
                  key={highlight.title}
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/20">
                    <highlight.icon className="h-4 w-4 text-amber-200" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {highlight.title}
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-6 space-y-6 rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur lg:px-10 lg:py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-200/70">
                O que você vai aprender
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Um programa para colocar disciplina no código.
              </h2>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {modules.map((module) => (
              <div
                key={module.title}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:-translate-y-0.5 hover:border-amber-200/30 hover:bg-black/40"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-amber-300" />
                  <p className="text-lg font-semibold text-white">
                    {module.title}
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-white/70">
                  {module.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-amber-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-6 w-full space-y-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Uma breve introdução.
          </h2>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-2 shadow-xl shadow-black/30">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/e2x4jSgm6xw?si=zS_IQR6bQNV0_K59"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 shadow-xl shadow-amber-400/10 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200/70">
              Por que agora
            </p>
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">
              Menos tempo apagando incêndio, mais tempo entregando valor.
            </h3>
            <p className="text-lg text-white/80">
              O curso reúne práticas testadas em produtos reais para que você
              consiga evoluir sistemas sem medo. Cada aula termina com um
              exercício guiado e material de apoio.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-amber-300" />
                  Aplicável em back e front
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Conceitos em linguagem neutra, com exemplos em JavaScript e
                  TypeScript.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-amber-300" />
                  Material vivo
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Atualizações e novos casos enviados para os alunos sem custo.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-b from-black/60 to-black/20 p-6 shadow-2xl shadow-amber-400/10 backdrop-blur">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2 text-4xl font-semibold text-white">
                Acesso gratuito
              </div>

              <div className="space-y-3">
                {bonuses.map((bonus) => (
                  <div key={bonus} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <p className="text-white/80">{bonus}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white">
                “Depois de seguir o método, nossas PRs ficaram menores e as
                discussões muito mais objetivas.”
                <div className="mt-2 text-xs text-white/70">
                  — Renan Victor, engenheiro de software
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                className="block"
                href={ROUTES.course(
                  "clean-code",
                  "intro",
                  "clean-code-introduction",
                )}
              >
                <button className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:scale-[1.01] hover:shadow-amber-300/40">
                  Acessar curso
                </button>
              </Link>

              <p className="text-center text-xs text-white/60">
                Acesso imediato ao material gravado.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 space-y-6 rounded-3xl border border-white/10 bg-white/5 py-10 text-white backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-200/70">
                Para quem é
              </p>
              <h3 className="text-3xl font-semibold sm:text-4xl">
                Desenvolvedores, líderes e revisores.
              </h3>
            </div>
            <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/80">
              Turmas pequenas para feedback individual
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-lg font-semibold">Devs em crescimento</p>
              <p className="mt-2 text-sm text-white/70">
                Para quem quer subir de nível escrevendo código legível e
                confiável que o time confia.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-lg font-semibold">Revisores e tech leads</p>
              <p className="mt-2 text-sm text-white/70">
                Estrutura para acelerar revisões, criar padrões e guiar o time a
                resolver dívidas sem paralisar entregas.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-lg font-semibold">
                Equipes multidisciplinares
              </p>
              <p className="mt-2 text-sm text-white/70">
                Linguagem comum para discutir design e tomada de decisão com
                produto e QA.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-amber-400/20 via-orange-500/15 to-amber-600/20 px-6 py-10 text-white shadow-2xl shadow-amber-400/10">
          <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/4 rounded-full bg-white/10 blur-3xl" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                Instrutor
              </p>
              <h3 className="text-3xl font-semibold sm:text-4xl">
                Gabriel Barbosa
              </h3>
              <p className="text-lg text-white/80">
                Engenheiro de software focado em produtos digitais, ajudando
                times a reduzir complexidade e acelerar entrega com código mais
                previsível.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                  <BadgeCheck className="h-4 w-4" />
                  Experiência prática construindo produtos
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/80 shadow-lg shadow-amber-400/10">
              “Sempre que refatoro algo agora, penso em como a pessoa que vai
              ler depois de mim vai se sentir. O curso me deu ferramentas
              objetivas para isso.”
              <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Aluna da última turma
                  </p>
                  <p>Squad de produto financeiro</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-6 space-y-6 overflow-hidden text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200/70">
            Pronto para começar?
          </p>
          <h3 className="text-3xl font-semibold sm:text-4xl">
            Vamos deixar seu código mais limpo, previsível e fácil de evoluir.
          </h3>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={ROUTES.course(
                "clean-code",
                "intro",
                "clean-code-introduction",
              )}
            >
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:scale-[1.01] hover:shadow-amber-300/40">
                Quero entrar agora
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
