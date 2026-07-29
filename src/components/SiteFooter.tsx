import { Clock3, ExternalLink, MapPin } from 'lucide-react';

import { BrandMark } from './BrandMark';

const solutionLinks = [
  ['Talhas elétricas', '/solucoes/talhas-eletricas/'],
  ['Lavadoras industriais', '/solucoes/lavadoras-industriais/'],
  ['Ferrovia', '/solucoes/ferrovia/'],
  ['Mecânica', '/solucoes/mecanica-industrial/'],
  ['Hidráulica', '/solucoes/hidraulica-industrial/'],
  ['Pneumática', '/solucoes/pneumatica-industrial/'],
  ['Elétrica', '/solucoes/eletrica-industrial/'],
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-location" aria-labelledby="location-title">
        <div className="footer-location__map">
          <iframe
            title="Localização da Jotta Manutenções"
            src="https://maps.google.com/maps?q=Jotta+Manuten%C3%A7%C3%B5es,+Rua+Sebasti%C3%A3o+Sim%C3%A3o+Almeida,+10,+Sion,+Jo%C3%A3o+Monlevade,+MG&z=16&output=embed&hl=pt-BR"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="container footer-location__panel">
          <div>
            <span className="technical-code">ONDE ESTAMOS</span>
            <h2 id="location-title">João Monlevade, no centro da operação industrial.</h2>
          </div>
          <address>
            <MapPin aria-hidden="true" />
            <span>
              R. Sebastião Simão Almeida, 10 · Sion
              <small>João Monlevade · MG · 35931-209</small>
            </span>
          </address>
          <div className="footer-location__hours">
            <Clock3 aria-hidden="true" />
            <span>
              Segunda a quinta · 07h–17h
              <small>Sexta · 07h–16h</small>
            </span>
          </div>
          <a
            className="footer-location__route"
            href="https://www.google.com/maps/dir/?api=1&destination=Rua+Sebasti%C3%A3o+Sim%C3%A3o+Almeida,+10,+Sion,+Jo%C3%A3o+Monlevade,+MG,+35931-209"
            target="_blank"
            rel="noreferrer"
          >
            Traçar rota
            <ExternalLink aria-hidden="true" size={17} />
          </a>
        </div>
      </section>
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <BrandMark inverted />
          <p>Manutenção industrial com método, documentação e rastreabilidade.</p>
          <span className="technical-code">JOTTA · DESDE 1994</span>
        </div>
        <div>
          <h2>Soluções</h2>
          <ul>
            {solutionLinks.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Contato</h2>
          <address>
            <a href="tel:+553138511365">(31) 3851-1365</a>
            <a href="https://wa.me/5531986480098">(31) 98648-0098</a>
            <a href="mailto:jotta@jottamanutencoes.com.br">
              jotta@jottamanutencoes.com.br
            </a>
            <span>R. Sebastião Simão Almeida, 10 · Sion</span>
          </address>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} Jotta Manutenções</span>
        <div>
          <a href="/privacidade/">Privacidade</a>
          <a href="/cookies/">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
