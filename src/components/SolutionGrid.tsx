import { ArrowUpRight } from 'lucide-react';

import { solutions } from '../data/site-content';

export function SolutionGrid() {
  return (
    <div className="solution-grid">
      {solutions.map((solution) => (
        <a
          className="solution-card"
          href={`/solucoes/${solution.slug}/`}
          key={solution.slug}
        >
          <div className="solution-card__top">
            <span>{solution.number}</span>
            <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.7} />
          </div>
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
