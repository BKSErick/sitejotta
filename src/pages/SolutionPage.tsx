import { ArrowLink } from '../components/ArrowLink';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import type { PublicRoute, Solution } from '../data/site-content';

export function SolutionPage({ route, solution }: { route: PublicRoute; solution: Solution }) {
  return (
    <>
      <Breadcrumbs current={solution.shortName} parent={{ label: 'Soluções', href: '/solucoes/' }} />
      <PageHero route={route} marker={`JM / SOLUÇÃO ${solution.number}`} />
      <section className="section">
        <div className="container split-editorial">
          <SectionHeading
            index="01"
            eyebrow="LEITURA DO EQUIPAMENTO"
            title="O sintoma é o início da investigação, não a conclusão."
          />
          <p className="lead-copy">{solution.context}</p>
        </div>
      </section>
      <section className="section section--blueprint">
        <div className="container blueprint-grid">
          <div>
            <span className="technical-code">APLICAÇÕES RELACIONADAS</span>
            <h2>Equipamentos e conjuntos</h2>
            <ul className="indexed-list">
              {solution.applications.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="technical-code">SINAIS PARA TRIAGEM</span>
            <h2>Condições observáveis</h2>
            <ul className="indexed-list">
              {solution.warningSigns.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container process-band">
          {['Diagnóstico', 'Escopo', 'Execução', 'Teste', 'Registro'].map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="section section--final-cta">
        <div className="container final-cta">
          <span className="technical-code">SOLICITAÇÃO CONTEXTUAL</span>
          <h2>{solution.cta}</h2>
          <p>Informe marca, modelo, condição operacional e os sintomas já observados.</p>
          <ArrowLink href={`/contato/?area=${solution.slug}`}>{solution.cta}</ArrowLink>
        </div>
      </section>
    </>
  );
}
