import { ArrowLink } from '../components/ArrowLink';
import { BrandStrip } from '../components/BrandStrip';
import { HomeHero } from '../components/HomeHero';
import { RequestForm } from '../components/RequestForm';
import { SectionHeading } from '../components/SectionHeading';
import { SolutionGrid } from '../components/SolutionGrid';
import type { PublicRoute } from '../data/site-content';

const evidence = [
  ['1994', 'início da trajetória'],
  ['07', 'frentes de atuação'],
  ['15', 'marcas com autorização de fábrica'],
  ['90', 'dias de garantia no serviço'],
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
      <HomeHero route={route} />
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

      <section className="brand-strip" aria-labelledby="marcas-autorizadas">
        <div className="container brand-strip__inner">
          <div className="brand-strip__intro">
            <span className="technical-code">ASSISTÊNCIA TÉCNICA AUTORIZADA</span>
            <h2 id="marcas-autorizadas">
              Autorizada por 15 fabricantes. Peça original e laudo no fim do serviço.
            </h2>
            <ArrowLink href="/assistencia/" variant="text">
              Ver as assistências autorizadas
            </ArrowLink>
          </div>
          <BrandStrip />
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

      <section className="section home-request-section" id="solicitacao">
        <div className="container home-request">
          <aside className="home-request__context">
            <span className="technical-code">CONTATO TÉCNICO · CRM</span>
            <h2>Quatro dados. Nenhuma etapa escondida.</h2>
            <p>
              A Jotta precisa apenas do essencial para iniciar a conversa e entender
              onde a demanda começa.
            </p>
            <ol>
              <li>
                <span>01</span>
                <strong>Nome</strong>
              </li>
              <li>
                <span>02</span>
                <strong>Telefone</strong>
              </li>
              <li>
                <span>03</span>
                <strong>Empresa</strong>
              </li>
              <li>
                <span>04</span>
                <strong>Tipo de equipamento</strong>
              </li>
            </ol>
            <small>
              A solicitação entra em triagem. Ela não abre automaticamente uma ordem
              de serviço.
            </small>
          </aside>
          <RequestForm />
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
            Informe seu contato, a empresa e o tipo de equipamento para iniciar a
            conversa.
          </p>
          <ArrowLink href="/contato/">Solicitar avaliação técnica</ArrowLink>
        </div>
      </section>
    </>
  );
}
