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
          <div className="contact-aside" data-reveal="right">
            <span className="technical-code">ANTES DE ENVIAR</span>
            <h2>Contexto reduz ida e volta.</h2>
            <p className="contact-aside__lead">
              Quatro informações bastam para a equipe saber com quem falar e qual
              equipamento está envolvido.
            </p>
            <ol>
              <li><span>01</span> Nome</li>
              <li><span>02</span> Telefone</li>
              <li><span>03</span> Empresa</li>
              <li><span>04</span> Tipo de equipamento</li>
            </ol>
            <span className="technical-code">CANAIS DIRETOS</span>
            <a href="tel:+553138511365">(31) 3851-1365</a>
            <a href="https://wa.me/5531986480098">(31) 98648-0098</a>
            <a href="mailto:jotta@jottamanutencoes.com.br">
              jotta@jottamanutencoes.com.br
            </a>
            <p>Segunda a quinta, 07h–17h.<br />Sexta, 07h–16h.</p>
          </div>
          <div data-reveal="left">
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
