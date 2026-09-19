import styles from "./page.module.css";

const stats = [
  ["12.4k", "JUNIORES"],
  ["38", "VOLUNTÁRIOS"],
  ["14", "REPOSITÓRIOS"],
];

const impactStats = [
  ["12.400", "PESSOAS IMPACTADAS"],
  ["14", "REPOSITÓRIOS MANTIDOS"],
  ["38", "VOLUNTÁRIOS ATIVOS"],
  ["1.280", "MENTORIAS ENTREGUES"],
];

const allocation = [
  {
    percentage: "35%",
    title: "Infra e domínios",
    description:
      "Servidores, deploys e o site no ar 24/7 pros projetos da comunidade.",
  },
  {
    percentage: "30%",
    title: "Mentorias e eventos",
    description:
      "Plataforma de encontros, gravações e materiais dos programas.",
  },
  {
    percentage: "20%",
    title: "Projetos e ferramentas",
    description:
      "Recursos para manter projetos open-source e ferramentas da comunidade.",
  },
  {
    percentage: "15%",
    title: "Bolsas e certificações",
    description:
      "Apoio direto para oportunidades de desenvolvimento profissional.",
  },
];

const plans = [
  {
    name: "FIRST COMMIT",
    price: "R$ 2",
    description:
      "Mantém o domínio e os servidores de pé. Seu nome na lista de apoiadores.",
  },
  {
    name: "CODE REVIEW",
    price: "R$ 10",
    description:
      "Paga uma sessão de mentoria por mês pra um júnior da fila.",
  },
  {
    name: "PAIR PROGRAMMING",
    price: "R$ 25",
    description:
      "Sustenta um squad open-source inteiro por um mês: infra, ferramentas e revisão.",
    featured: true,
  },
  {
    name: "TECH LEAD",
    price: "R$ 50+",
    description:
      "Bancam bolsas e certificações. Sua marca no relatório e no site.",
  },
];

const testimonials = [
  {
    quote:
      "Entrei sem portfólio e encontrei na SouJunior a primeira oportunidade de colocar a mão no código de verdade.",
    author: "Participante da comunidade",
  },
  {
    quote:
      "A mentoria me ajudou a entender o que faltava para transformar meus estudos em experiência prática.",
    author: "Participante da comunidade",
  },
];

export default function LandingPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="#inicio" className={styles.logo}>
          <span className={styles.logoMark}>
            <i />
            <i />
            <i />
            <i />
          </span>

          <span>SouJunior</span>
        </a>

        <nav className={styles.nav}>
          <a href="#causa">A causa</a>
          <a href="#impacto">Impacto</a>
          <a href="#niveis">Níveis</a>
          <a href="#trajetorias">Trajetórias</a>
        </nav>

        <a href="#niveis" className={styles.headerButton}>
          Apoiar
        </a>
      </header>

      <section id="inicio" className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span>■</span> APOIA.SE · COMUNIDADE VIVA
            </p>

            <h1>
              Cada R$ 2 vira
              <br />
              uma linha de
              <span> carreira júnior.</span>
            </h1>

            <p className={styles.heroText}>
              A SouJunior é mantida pela própria galera. Mentoria de graça,
              projetos open-source reais e a primeira oportunidade de milhares
              de juniores — tudo isso roda porque alguém apoia. Pode ser você,
              começando com o preço de um café pela metade.
            </p>

            <div className={styles.heroActions}>
              <a href="#niveis" className={styles.primaryButton}>
                APOIAR COM R$ 2
              </a>

              <a href="#apoio" className={styles.textButton}>
                Ver para onde vai o dinheiro →
              </a>
            </div>
          </div>

          <div className={styles.heroStats}>
            {stats.map(([value, label]) => (
              <div key={label} className={styles.heroStat}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="causa" className={styles.cause}>
        <div className={styles.sectionIntro}>
          <h2>
            Ninguém deveria precisar de 3 anos de experiência para ter o
            primeiro ano.
          </h2>

          <p>
            A SouJunior existe pra furar esse ciclo: mentoria de quem já está
            dentro, projetos de verdade no portfólio e uma rede que indica.
            Tudo gratuito pra quem participa — e sustentado por quem apoia.
          </p>
        </div>

        <div className={styles.causeStats}>
          <article>
            <strong>1.280</strong>
            <p>mentorias 1:1 realizadas, sem custo pro júnior</p>
          </article>

          <article>
            <strong>62%</strong>
            <p>
              dos participantes ativos foram contratados em até 8 meses
            </p>
          </article>

          <article>
            <strong>R$ 0</strong>
            <p>
              é o que custa entrar: a conta fecha com apoio da comunidade
            </p>
          </article>
        </div>
      </section>

      <section id="apoio" className={styles.allocation}>
        <div className={styles.sectionIntro}>
          <h2>Seu apoio tem endereço</h2>

          <p>
            Divisão média dos últimos 6 meses de arrecadação no Apoia.se.
          </p>
        </div>

        <div className={styles.allocationList}>
          {allocation.map((item) => (
            <article
              key={item.title}
              className={styles.allocationItem}
            >
              <div className={styles.allocationTop}>
                <strong>{item.percentage}</strong>

                <span className={styles.allocationLine}>
                  <span
                    style={{
                      width: item.percentage,
                    }}
                  />
                </span>
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="impacto" className={styles.impact}>
        <div className={styles.impactHeader}>
          <p className={styles.sectionNumber}>03 — IMPACTO</p>

          <h2>O que a comunidade construiu até aqui</h2>

          <p>
            números ilustrativos · atualizados no relatório mensal
          </p>
        </div>

        <div className={styles.impactGrid}>
          {impactStats.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="niveis" className={styles.levels}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionNumber}>
            04 — NÍVEIS DE APOIO
          </p>

          <h2>Escolha seu commit mensal</h2>

          <p>
            Qualquer valor a partir de R$ 2 entra no mesmo caixa transparente.
            Você cancela quando quiser, direto no Apoia.se.
          </p>
        </div>

        <div className={styles.plans}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`${styles.plan} ${
                plan.featured ? styles.featured : ""
              }`}
            >
              <div className={styles.planTop}>
                <span>{plan.name}</span>

                {plan.featured && (
                  <b>MAIS ESCOLHIDO</b>
                )}
              </div>

              <strong>{plan.price}</strong>

              <p>{plan.description}</p>

              <a
                href="#apoia-se"
                className={styles.planButton}
              >
                {plan.featured
                  ? `APOIAR COM ${plan.price}`
                  : "APOIAR"}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="trajetorias" className={styles.testimonials}>
        <div className={styles.testimonialHeader}>
          <p className={styles.sectionNumber}>
            05 — QUEM PASSOU POR AQUI
          </p>

          <h2>
            Primeira oportunidade. Experiência que fica.
          </h2>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.author}
              className={styles.quote}
            >
              <span>“</span>

              <blockquote>
                {testimonial.quote}
              </blockquote>

              <p>— {testimonial.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <p className={styles.sectionNumber}>
            06 — APOIE
          </p>

          <h2>Bora manter isso de pé?</h2>

          <p>
            R$ 2 hoje, cancelável amanhã, impacto que fica. A campanha oficial
            está no Apoia.se.
          </p>

          <a
            id="apoia-se"
            href="#"
            className={styles.finalButton}
          >
            Apoiar a SouJunior
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <a href="#inicio" className={styles.logo}>
              <span className={styles.logoMark}>
                <i />
                <i />
                <i />
                <i />
              </span>

              <span>SouJunior</span>
            </a>

            <p>
              Comunidade brasileira que abre a primeira porta de carreira em
              tecnologia.
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h3>Apoio</h3>

            <a href="#apoia-se">Apoia.se</a>
            <a href="#niveis">Níveis de apoio</a>
            <a href="#">Relatórios</a>
          </div>

          <div className={styles.footerColumn}>
            <h3>Comunidade</h3>

            <a href="#">Discord</a>
            <a href="#">WhatsApp</a>
            <a href="#">GitHub</a>
          </div>

          <div className={styles.footerColumn}>
            <h3>SouJunior</h3>

            <a href="#">soujunior.tech</a>
            <a href="#">Seja voluntário</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>SouJunior</span>

          <span>
            Comunidade construída por quem acredita na primeira oportunidade.
          </span>
        </div>
      </footer>
    </main>
  );
}