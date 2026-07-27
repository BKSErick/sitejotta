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
            <span>João Monlevade · MG</span>
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
