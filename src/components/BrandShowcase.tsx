import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

import { showcaseBrands } from '../data/site-content';

export function BrandShowcase() {
  const [active, setActive] = useState(0);
  const total = showcaseBrands.length;

  const go = useCallback(
    (direction: number) => {
      setActive((current) => (current + direction + total) % total);
    },
    [total]
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const brand = showcaseBrands[active];

  return (
    <section
      aria-label="Marcas atendidas com autorização de fábrica"
      aria-roledescription="carrossel"
      className="brand-showcase"
      data-ink={brand.ink}
      onKeyDown={onKeyDown}
      style={{ '--brand-color': brand.color } as CSSProperties}
      tabIndex={-1}
    >
      <div className="container brand-showcase__inner">
        <div className="brand-showcase__copy" key={`copy-${brand.name}`}>
          <span className="technical-code">
            ASSISTÊNCIA AUTORIZADA · {String(active + 1).padStart(2, '0')}/
            {String(total).padStart(2, '0')}
          </span>
          <img
            alt={`Logotipo ${brand.name}`}
            className="brand-showcase__logo"
            height={64}
            src={`/brand/marcas/${brand.logo}`}
            width={200}
          />
          <h2>{brand.line}</h2>
          <p>{brand.claim}</p>
          <dl className="brand-showcase__specs">
            {brand.specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="brand-showcase__stage" key={`stage-${brand.video}`}>
          {/* `key` no slug força o React a remontar o vídeo a cada troca,
              em vez de reaproveitar o elemento e manter o clipe anterior. */}
          <video
            aria-label={`${brand.line} — ${brand.motionLabel.toLowerCase()}`}
            autoPlay
            loop
            muted
            playsInline
            poster={`/media/marcas/${brand.video}.jpg`}
            preload="metadata"
          >
            <source src={`/media/marcas/${brand.video}.mp4`} type="video/mp4" />
          </video>
          <figcaption>{brand.motionLabel}</figcaption>
        </figure>
      </div>

      <div className="container brand-showcase__controls">
        <div className="brand-showcase__tabs" role="tablist">
          {showcaseBrands.map((item, index) => (
            <button
              aria-selected={index === active}
              className="brand-showcase__tab"
              key={item.name}
              onClick={() => setActive(index)}
              role="tab"
              type="button"
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="brand-showcase__arrows">
          <button aria-label="Marca anterior" onClick={() => go(-1)} type="button">
            <ArrowLeft aria-hidden="true" size={22} />
          </button>
          <button aria-label="Próxima marca" onClick={() => go(1)} type="button">
            <ArrowRight aria-hidden="true" size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
