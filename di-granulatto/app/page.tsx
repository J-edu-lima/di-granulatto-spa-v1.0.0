export default function Home() {
  const features = [
    {
      title: "Qualidade Garantida",
      description: "Ingredientes premium e receitas testadas para entregar sabor e consistencia em cada pedido.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
          <path d="M12 3l6 2v5c0 4.2-2.6 8.1-6 9.6C8.6 18.1 6 14.2 6 10V5l6-2z" />
          <path d="M9.5 11.5l1.7 1.7 3.3-3.4" />
        </svg>
      ),
    },
    {
      title: "Feito com Amor",
      description: "Cada doce e finalizado manualmente para preservar cuidado, textura e identidade artesanal.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
          <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.4A4 4 0 0119 10c0 5.6-7 10-7 10z" />
        </svg>
      ),
    },
    {
      title: "Entrega Pontual",
      description: "Planejamento e compromisso com horario para que seu pedido chegue no momento certo.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)]">
      <header className="border-b border-[var(--neutral-soft)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-xl tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
            Di Granulatto
          </a>
          <nav className="hidden items-center gap-8 text-sm text-[var(--text-muted)] md:flex">
            <a href="#produtos" className="transition-colors hover:text-[var(--brand-accent)]">
              Produtos
            </a>
            <a href="#sobre" className="transition-colors hover:text-[var(--brand-accent)]">
              Sobre
            </a>
            <a href="#contato" className="transition-colors hover:text-[var(--brand-accent)]">
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-[var(--surface-soft)] px-6 py-20 text-center md:min-h-[86vh]">
          <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[color:var(--brand-soft)] blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-[color:var(--brand-soft)] blur-3xl" />

          <div className="relative mx-auto w-full max-w-4xl">
            <h1 className="text-4xl leading-tight text-[var(--foreground)] md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              Docura Artesanal que{" "}
              <span className="inline-block align-middle text-[color:var(--brand-primary)]" style={{ fontFamily: "var(--font-accent)" }}>
                Encanta
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)] md:text-lg">
              Bolos, tortas e doces feitos com amor, ingredientes selecionados e cuidado em cada detalhe para transformar momentos simples em memorias inesqueciveis.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#produtos"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(168,85,247,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                style={{ background: "var(--hero-gradient)" }}
              >
                Ver Produtos {">"}
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center justify-center rounded-full border border-[var(--neutral-soft)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors duration-300 hover:bg-[var(--neutral-soft)]"
              >
                Conheca Nossa Historia
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20" aria-label="Proposta de valor">
          <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand-accent)]">
                  {feature.icon}
                </div>
                <h2 className="text-xl text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                  {feature.title}
                </h2>
                <p className="mt-2 max-w-64 text-sm leading-7 text-[var(--text-muted)]">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="produtos" className="bg-[var(--surface-soft)] px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">FeaturedProducts</p>
          <h2 className="mt-3 text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            Secao em construcao
          </h2>
        </section>

        <section id="sobre" className="bg-white px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">AboutSection</p>
          <h2 className="mt-3 text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            Secao em construcao
          </h2>
        </section>

        <section id="contato" className="bg-[var(--surface-soft)] px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">PreFooter</p>
          <h2 className="mt-3 text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            Secao em construcao
          </h2>
        </section>
      </main>

      <footer className="border-t border-[var(--neutral-soft)] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-center text-sm text-[var(--text-muted)] md:flex-row md:text-left">
          <p>Di Granulatto - Docura artesanal premium</p>
          <p>Atendimento via WhatsApp e retirada programada</p>
        </div>
      </footer>
    </div>
  );
}
