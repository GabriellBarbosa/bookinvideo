import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
  "Guia de revisão rápido para o time",
  "Templates de PR e de documentação de decisão",
  "Sessão ao vivo para dúvidas e revisão de código",
];

export default function HomeTemplate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.16),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.12),transparent_30%)]" />
      <header className="relative border-b border-white/5 bg-black/20 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-400/25">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
                Curso
              </p>
              <p className="text-lg font-semibold text-white">
                Código Limpo na Prática
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 sm:py-20">
        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Transforme código confuso em sistemas claros, seguros e fáceis
                de evoluir.
              </h1>
              <p className="text-lg text-slate-200/80 sm:text-xl">
                Um curso direto ao ponto para elevar a qualidade do seu código,
                acelerar code reviews e reduzir retrabalho. Nada de teoria
                solta: apenas práticas aplicáveis no dia seguinte.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:scale-[1.01] hover:shadow-amber-300/40">
                Garantir minha vaga
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-base font-semibold text-white transition hover:border-amber-400/60 hover:text-amber-100">
                Ver conteúdo completo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur ">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl p-2"
                >
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-amber-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur lg:px-10 lg:py-10">
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
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-6 shadow-lg shadow-amber-400/10"
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

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Uma breve introdução.
          </h2>
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 w-full h-full"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/e2x4jSgm6xw?si=zS_IQR6bQNV0_K59"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
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
                  Atualizações e novos casos enviados para os alunos sem custo
                  extra.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2">
                <Clock3 className="h-4 w-4" />
                Aulas curtas de 15-20 min
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2">
                <MessageSquare className="h-4 w-4" />
                Comunidade fechada
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2">
                <ShieldCheck className="h-4 w-4" />
                Garantia de 7 dias
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-b from-black/60 to-black/20 p-6 shadow-2xl shadow-amber-400/10 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200/70">
              Bônus da turma
            </p>
            <div className="flex items-baseline gap-2 text-4xl font-semibold text-white">
              R$ 497{" "}
              <span className="text-base font-medium text-white/60">
                ou 12x R$ 49
              </span>
            </div>
            <p className="text-sm text-white/60">
              Valor promocional para as primeiras vagas.
            </p>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
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
            <button className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:scale-[1.01] hover:shadow-amber-300/40">
              Entrar para a turma
            </button>
            <p className="text-center text-xs text-white/60">
              Acesso imediato ao material gravado.
            </p>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-white backdrop-blur">
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

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-amber-400/20 via-orange-500/15 to-amber-600/20 px-6 py-10 text-white shadow-2xl shadow-amber-400/10">
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

        <section className="space-y-6 text-center text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200/70">
            Pronto para começar?
          </p>
          <h3 className="text-3xl font-semibold sm:text-4xl">
            Vamos deixar seu código mais limpo, previsível e fácil de evoluir.
          </h3>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:scale-[1.01] hover:shadow-amber-300/40">
              Quero entrar agora
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-base font-semibold text-white transition hover:border-amber-400/60 hover:text-amber-100">
              Falar com o instrutor
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
