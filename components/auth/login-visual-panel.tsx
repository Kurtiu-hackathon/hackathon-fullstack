import Link from "next/link";

import { BackButton } from "@/components/auth/back-button";
import { BrandMark } from "@/components/common/brand-mark";

const supporterStats = [
  { label: "Apoiadores", value: "214" },
  { label: "Entrada", value: "R$ 2" },
  { label: "Voluntário", value: "100%" },
];

export function LoginVisualPanel() {
  return (
    <section className="auth-visual-grid relative hidden h-svh overflow-hidden text-background lg:sticky lg:top-0 lg:flex lg:flex-col">

      <header className="sr-only">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 text-background no-underline transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-75 motion-reduce:transform-none"
          aria-label="SouJunior — início"
        >
          <BrandMark tone="inverse" />
          <span className="text-2xl font-medium tracking-tight">SouJunior</span>
        </Link>

        <BackButton className="text-[var(--accent-300)] transition-[opacity,transform] duration-200 hover:-translate-x-1 hover:bg-transparent hover:text-[var(--accent-300)] hover:opacity-75 motion-reduce:transform-none" />
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-14 px-16 pt-[14rem] pb-[clamp(2rem,6vh,4rem)]">
        <div className="grid max-w-3xl gap-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-4 motion-safe:duration-700">
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.24em] text-[var(--accent-300)] uppercase">
            <span className="size-2 bg-primary" aria-hidden="true" />
            Área do apoiador
          </p>

          <h1 className="max-w-[50rem] font-sans text-[3.25rem] leading-[1.12] font-bold tracking-[-0.035em]">
            <span className="block">Entra pra ver o que seu apoio</span>
            <span className="block">construiu.</span>
          </h1>

          <p className="max-w-[25rem] text-lg leading-8 text-background/75">
            Acompanhe o relatório mensal, seu histórico no Apoia.se e as
            mentorias que sua contribuição bancou.
          </p>
        </div>

        <dl className="grid grid-cols-3 border border-background/20">
          {supporterStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group/stat px-5 py-6 transition-colors duration-300 hover:bg-background/5 ${
                index < supporterStats.length - 1
                  ? "border-r border-background/20"
                  : ""
              }`}
            >
              <dd className="font-heading text-2xl font-semibold transition-transform duration-300 motion-safe:group-hover/stat:-translate-y-1">
                {stat.value}
              </dd>
              <dt className="mt-1 text-[0.5rem] tracking-[0.18em] text-background/55 uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
