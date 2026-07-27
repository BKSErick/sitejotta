import { ArrowLink } from '../components/ArrowLink';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { SolutionGrid } from '../components/SolutionGrid';
import type { PublicRoute } from '../data/site-content';

const evidence = [
  ['1994', 'início da trajetória'],
  ['07', 'frentes de atuação'],
  ['01', 'fluxo técnico rastreável'],
];

const method = [
  'Solicitação',
  'Diagnóstico',
  'Orçamento',
  'Execução',
  'Teste',
  'Documentação',
  'Entrega',
];

export function HomePage({ route }: { route: PublicRoute }) {
  return (
    <>
      <PageHero route={route} marker="JM / OPERAÇÃO INDUSTRIAL" />
      <section className="evidence-strip" aria-label="Indicadores institucionais">
        <div className="container evidence-strip__grid">
          {evidence.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--statement">
        <div className="container statement-grid">
          <SectionHeading
            index="01"
            eyebrow="O RISCO NÃO TERMINA NO REPARO"
            title="O equipamento precisa voltar. A informação precisa voltar com ele."
          />
          <div className="statement-copy">
            <p>
              Um reparo sem contexto deixa perguntas abertas: o que falhou, o que foi
              verificado, o que foi substituído e em quais condições o equipamento foi
              liberado?
            </p>
            <p>
              A Jotta organiza o atendimento para que a execução técnica seja acompanhada
              por testes, registros e referências úteis à operação.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--solutions">
        <div className="container">
          <SectionHeading
            index="02"
            eyebrow="CAPACIDADE MULTIDISCIPLINAR"
            title="Sete frentes. Uma mesma disciplina de trabalho."
            body="Escolha a área mais próxima da sua necessidade. A confirmação do escopo acontece durante a triagem."
          />
          <SolutionGrid />
        </div>
      </section>

      <section className="section section--method">
        <div className="container method-layout">
          <div>
            <SectionHeading
              index="03"
              eyebrow="MÉTODO JOTTA"
              title="Da entrada à entrega, cada etapa deixa uma evidência."
            />
            <ArrowLink href="/metodo/" variant="secondary">
              Ver como a Jotta trabalha
            </ArrowLink>
          </div>
          <ol className="method-list">
            {method.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--photo">
        <div className="container photo-panel">
          <figure>
            <img
              src="/media/jotta-estrutura-aerea.jpg"
              alt="Vista aérea da estrutura da Jotta Manutenções em João Monlevade"
              width="1600"
              height="1067"
              loading="lazy"
            />
            <figcaption>Estrutura operacional · João Monlevade, Minas Gerais</figcaption>
          </figure>
          <div>
            <span className="eyebrow">ESTRUTURA + HISTÓRIA</span>
            <h2>Experiência de oficina traduzida em processo.</h2>
            <p>
              Desde 1994, a Jotta atua na manutenção e recuperação de equipamentos
              utilizados em ambientes industriais.
            </p>
            <ArrowLink href="/empresa/" variant="text">
              Conhecer a empresa
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="section section--final-cta">
        <div className="container final-cta">
          <span className="technical-code">INÍCIO DA TRIAGEM</span>
          <h2>Qual equipamento precisa de avaliação?</h2>
          <p>
            Descreva a empresa, o equipamento e a condição operacional para orientar o
            primeiro contato.
          </p>
          <ArrowLink href="/contato/">Solicitar avaliação técnica</ArrowLink>
        </div>
      </section>
    </>
  );
}
