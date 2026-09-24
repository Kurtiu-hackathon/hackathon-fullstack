import Image from "next/image";
import Link from "next/link";

import { BackButton } from "./back-button";
import { supporterStats } from "../_data/supporter-stats";

export function LoginVisualPanel() {
  return (
    <section className="auth-visual-grid relative hidden min-h-svh overflow-hidden text-background lg:sticky lg:top-0 lg:flex lg:min-h-[110svh] lg:flex-col">

      <header className="relative z-10 hidden items-center justify-between px-[3.75rem] pt-14 lg:flex">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 text-background no-underline transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-75 motion-reduce:transform-none"
          aria-label="SouJunior — início"
        >
          <Image
            src="/icos/icon-blue.svg"
            alt=""
            width={32}
            height={32}
            className="size-8"
          />
          <span className="text-3xl font-medium tracking-tight">SouJunior</span>
        </Link>

        <BackButton className="text-[var(--accent-300)] transition-[opacity,transform] duration-200 hover:-translate-x-1 hover:bg-transparent hover:text-[var(--accent-300)] hover:opacity-75 motion-reduce:transform-none" />
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-14 px-[3.75rem] pt-[17.5rem] pb-[clamp(2rem,6vh,4rem)]">
        <div className="grid max-w-3xl gap-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-4 motion-safe:duration-700">
          <p className="flex items-center gap-3 text-[0.9rem] font-semibold tracking-[0.22em] text-[var(--accent-300)] uppercase">
            <span className="size-2.5 bg-primary" aria-hidden="true" />
            Área do apoiador
          </p>

          <h1 className="max-w-none font-sans text-[5rem] leading-[1.1] font-bold tracking-[-0.045em] text-white">
            Entre pra ver o que seu apoio construiu.
          </h1>

          <p className="max-w-[34rem] text-[1.45rem] leading-10 text-background/80">
            Acompanhe o relatório mensal, seu histórico no Apoia.se e as
            mentorias que sua contribuição bancou.
          </p>
        </div>

        <dl className="grid grid-cols-3 border border-[var(--color-auth-panel-border)]">
          {supporterStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group/stat px-5 py-6 transition-colors duration-300 hover:bg-background/5 ${
                index < supporterStats.length - 1
                  ? "border-r border-[var(--color-auth-panel-border)]"
                  : ""
              }`}
            >
              <dd className="font-sans text-[2.3rem] leading-none font-bold tracking-[-0.035em] text-white transition-transform duration-300 motion-safe:group-hover/stat:-translate-y-1">
                {stat.value}
              </dd>
              <dt className="mt-2 text-[0.85rem] tracking-[0.16em] text-[var(--accent-300)] uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
