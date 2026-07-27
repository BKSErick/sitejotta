import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { SolutionGrid } from '../components/SolutionGrid';
import type { PublicRoute } from '../data/site-content';

export function SolutionsPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <PageHero route={route} />
      <section className="section">
        <div className="container">
          <SectionHeading
            index="01"
            eyebrow="MAPA DE CAPACIDADE"
            title="Selecione a disciplina para aprofundar o contexto técnico."
            body="Se a classificação não estiver clara, envie a identificação e os sintomas do equipamento. A triagem ajuda a direcionar a demanda."
          />
          <SolutionGrid />
        </div>
      </section>
    </>
  );
}
