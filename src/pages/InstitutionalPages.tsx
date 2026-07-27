import { ArrowLink } from '../components/ArrowLink';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import type { PublicRoute } from '../data/site-content';

const methodSteps = [
  ['Solicitação', 'Registro inicial para triagem.'],
  ['Diagnóstico', 'Definição técnica do problema e do escopo recomendado.'],
  ['Orçamento', 'Proposta para análise e aprovação.'],
  ['Execução', 'Intervenção conforme o escopo aprovado.'],
  ['Teste', 'Registro das verificações realizadas.'],
  ['Documentação', 'Laudo e documentos aplicáveis ao serviço.'],
  ['Entrega', 'Liberação formal, identificação e condições acordadas.'],
];

function CompanyContent() {
  return (
    <>
      <section className="section">
        <div className="container split-editorial">
          <SectionHeading
            index="01"
            eyebrow="TRAJETÓRIA"
            title="Três décadas próximas da realidade da manutenção industrial."
          />
          <div className="lead-stack">
            <p>
              A Jotta Manutenções iniciou sua trajetória em 1994, em João Monlevade,
              conectada às demandas de manutenção e recuperação de equipamentos.
            </p>
            <p>
              O novo site torna essa experiência legível por meio de capacidades,
              processo, documentação e canais claros de triagem.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--photo">
        <div className="container photo-panel photo-panel--reverse">
          <figure>
            <img
              src="/media/jotta-oficina.jpg"
              alt="Área interna da oficina da Jotta com equipamentos organizados para manutenção"
              width="1600"
              height="1067"
              loading="lazy"
            />
            <figcaption>Oficina e estrutura operacional Jotta Manutenções</figcaption>
          </figure>
          <div>
            <span className="eyebrow">COMPROMISSOS TÉCNICOS</span>
            <h2>Diagnosticar antes de prometer. Registrar antes de encerrar.</h2>
            <p>
              Clareza de escopo, execução controlada, verificação funcional e
              documentação compatível com o atendimento.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function AssistanceContent() {
  const items = [
    ['Peças e procedimentos', 'A aplicação considera o equipamento, o fabricante e o escopo aprovado.'],
    ['Laudo', 'O documento registra condições verificadas após a manutenção e os testes.'],
    ['ART', 'Pode ser emitida quando solicitada, aplicável e prevista no escopo.'],
    ['Garantia', 'As condições dependem do serviço, das peças e dos limites formalizados.'],
    ['Rastreabilidade', 'A identificação física conecta o equipamento ao registro de manutenção.'],
  ];

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="CADEIA DE EVIDÊNCIAS"
          title="A assistência precisa ser comprovável, não apenas declarada."
          body="A relação final de marcas será publicada somente depois da confirmação de vínculos e documentos vigentes."
        />
        <div className="evidence-grid">
          {items.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodContent() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="FLUXO TÉCNICO"
          title="Pressa sem contexto aumenta risco. Processo organiza a decisão."
        />
        <ol className="method-detail">
          {methodSteps.map(([title, output], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{output}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CasesContent() {
  return (
    <section className="section">
      <div className="container empty-editorial">
        <span className="technical-code">ARQUIVO EM CURADORIA</span>
        <h2>Os cases estão em processo de autorização editorial.</h2>
        <p>
          Cada registro público deverá apresentar contexto, condição de entrada,
          diagnóstico, intervenção, testes e documentação sem expor informações
          confidenciais.
        </p>
        <div className="button-row">
          <ArrowLink href="/book-tecnico/">Baixar o Book Técnico</ArrowLink>
          <ArrowLink href="/contato/" variant="secondary">
            Solicitar avaliação de capacidade
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

function ContentContent() {
  const topics = [
    'Diagnóstico',
    'Manutenção',
    'Equipamentos',
    'Assistência técnica',
    'Documentação',
    'Garantia',
  ];

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="LINHAS EDITORIAIS"
          title="Conhecimento técnico organizado para apoiar decisões."
          body="O arquivo editorial será migrado com autoria, data, revisão e relação clara com as soluções da Jotta."
        />
        <div className="topic-grid">
          {topics.map((topic, index) => (
            <article key={topic}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{topic}</h2>
              <p>Conteúdo em organização editorial para publicação.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookContent() {
  return (
    <section className="section">
      <div className="container book-layout">
        <div className="book-cover" aria-hidden="true">
          <span>JOTTA</span>
          <strong>BOOK<br />TÉCNICO</strong>
          <small>ESTRUTURA · CAPACIDADES · MÉTODO</small>
        </div>
        <div>
          <SectionHeading
            index="01"
            eyebrow="MATERIAL INSTITUCIONAL"
            title="O que você encontrará"
          />
          <ul className="indexed-list">
            {[
              'Apresentação institucional',
              'Estrutura',
              'Áreas de atuação',
              'Fluxo de trabalho',
              'Laudos, garantia e rastreabilidade',
              'Canais de contato',
            ].map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
          <ArrowLink href="/book-jotta.pdf">Baixar o Book Técnico</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function LegalContent({ kind }: { kind: 'privacy' | 'cookies' }) {
  return (
    <section className="section">
      <div className="container legal-copy">
        <p className="legal-copy__notice">
          Documento institucional em homologação. O texto jurídico final deverá ser
          validado pela empresa antes da troca do domínio oficial.
        </p>
        {kind === 'privacy' ? (
          <>
            <h2>Dados enviados em solicitações</h2>
            <p>
              Os dados informados devem ser utilizados para identificar o contato,
              compreender a necessidade e responder à solicitação técnica.
            </p>
            <h2>Controle e segurança</h2>
            <p>
              O envio deve ocorrer por conexão segura, com acesso restrito à equipe
              responsável e retenção compatível com a finalidade informada.
            </p>
            <h2>Direitos do titular</h2>
            <p>
              Solicitações sobre acesso, correção ou exclusão de dados poderão ser
              encaminhadas aos canais oficiais da Jotta.
            </p>
          </>
        ) : (
          <>
            <h2>Recursos essenciais</h2>
            <p>
              O site pode utilizar armazenamento estritamente necessário para manter
              segurança, preferências e funcionamento básico do formulário.
            </p>
            <h2>Medição e preferências</h2>
            <p>
              Recursos opcionais de análise somente devem ser ativados conforme a
              escolha do visitante e a configuração homologada do site.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export function InstitutionalPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <PageHero route={route} cta={route.kind !== 'legal'} />
      {route.kind === 'company' && <CompanyContent />}
      {route.kind === 'assistance' && <AssistanceContent />}
      {route.kind === 'method' && <MethodContent />}
      {route.kind === 'cases' && <CasesContent />}
      {route.kind === 'content' && <ContentContent />}
      {route.kind === 'book' && <BookContent />}
      {route.kind === 'legal' && (
        <LegalContent kind={route.path === '/privacidade/' ? 'privacy' : 'cookies'} />
      )}
    </>
  );
}
