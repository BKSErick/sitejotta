import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from '../components/PageHero';
import { RequestForm } from '../components/RequestForm';
import type { PublicRoute } from '../data/site-content';

export function ContactPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <PageHero route={route} cta={false} marker="JM / INTAKE TÉCNICO" />
      <section className="section section--form">
        <div className="container contact-layout">
          <div className="contact-aside">
            <span className="technical-code">CANAIS DIRETOS</span>
            <h2>Prefere conversar primeiro?</h2>
            <a href="tel:+553138511365">(31) 3851-1365</a>
            <a href="https://wa.me/5531986480098">(31) 98648-0098</a>
            <a href="mailto:jotta@jottamanutencoes.com.br">
              jotta@jottamanutencoes.com.br
            </a>
            <p>Segunda a quinta, 07h–17h.<br />Sexta, 07h–16h.</p>
          </div>
          <RequestForm />
        </div>
      </section>
    </>
  );
}
