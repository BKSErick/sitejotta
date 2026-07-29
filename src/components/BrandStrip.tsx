import { authorizedBrands } from '../data/site-content';

interface BrandStripProps {
  /** `strip` = faixa compacta de logos. `grid` = cartões com escopo declarado. */
  variant?: 'strip' | 'grid';
}

export function BrandStrip({ variant = 'strip' }: BrandStripProps) {
  if (variant === 'grid') {
    return (
      <ul className="brand-grid">
        {authorizedBrands.map((brand) => (
          <li className="brand-grid__item" key={brand.name}>
            <img
              alt={`Logotipo ${brand.name}`}
              height={48}
              loading="lazy"
              src={`/brand/marcas/${brand.file}`}
              width={120}
            />
            <strong>{brand.name}</strong>
            <span>{brand.scope}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="brand-strip__list">
      {authorizedBrands.map((brand) => (
        <li key={brand.name}>
          <img
            alt={`Logotipo ${brand.name}`}
            height={40}
            loading="lazy"
            src={`/brand/marcas/${brand.file}`}
            width={104}
          />
        </li>
      ))}
    </ul>
  );
}
