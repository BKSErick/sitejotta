interface BrandMarkProps {
  inverted?: boolean;
}

export function BrandMark({ inverted = false }: BrandMarkProps) {
  return (
    <img
      className="brand-mark"
      src={inverted ? '/brand/jotta-logo-white.svg' : '/brand/jotta-logo.svg'}
      alt="Jotta Manutenções"
      width="164"
      height="58"
    />
  );
}
