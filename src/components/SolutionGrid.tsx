import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

import { solutions } from '../data/site-content';

export function SolutionGrid() {
  return (
    <div className="solution-grid">
      {solutions.map((solution, index) => (
        <a
          className="solution-card"
          data-reveal="up"
          href={`/solucoes/${solution.slug}/`}
          key={solution.slug}
          style={{ '--reveal-delay': `${index * 55}ms` } as CSSProperties}
        >
          <div className="solution-card__top">
            <span>{solution.number}</span>
            <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.7} />
          </div>
          <img
            alt=""
            aria-hidden="true"
            className="solution-card__icon"
            height={72}
            loading="lazy"
            src={`/icons/${solution.slug}.svg`}
            width={72}
          />
          <div>
            <span className="technical-code">{solution.eyebrow}</span>
            <h3>{solution.shortName}</h3>
            <p>{solution.introduction}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
