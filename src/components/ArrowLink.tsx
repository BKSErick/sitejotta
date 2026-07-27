import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
}

export function ArrowLink({ href, children, variant = 'primary' }: ArrowLinkProps) {
  return (
    <a className={`arrow-link arrow-link--${variant}`} href={href}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
    </a>
  );
}
