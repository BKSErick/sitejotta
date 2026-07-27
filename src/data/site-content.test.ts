import { describe, expect, it } from 'vitest';

import { publicRoutes, solutions } from './site-content';

describe('site content contract', () => {
  it('contains every approved public route', () => {
    const paths = publicRoutes.map((route) => route.path);

    expect(paths).toEqual(
      expect.arrayContaining([
        '/',
        '/empresa/',
        '/solucoes/',
        '/assistencia/',
        '/metodo/',
        '/cases/',
        '/conteudo/',
        '/book-tecnico/',
        '/contato/',
        '/privacidade/',
        '/cookies/',
      ])
    );
    expect(paths).toHaveLength(18);
  });

  it('contains exactly seven approved solution disciplines', () => {
    expect(solutions).toHaveLength(7);
    expect(solutions.map((solution) => solution.slug)).toEqual([
      'talhas-eletricas',
      'lavadoras-industriais',
      'ferrovia',
      'mecanica-industrial',
      'hidraulica-industrial',
      'pneumatica-industrial',
      'eletrica-industrial',
    ]);
  });

  it('provides unique SEO metadata for every route', () => {
    const titles = publicRoutes.map((route) => route.meta.title);
    const descriptions = publicRoutes.map((route) => route.meta.description);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(descriptions.every((description) => description.length >= 80)).toBe(true);
  });

  it('never exposes unresolved validation markers or prohibited promises', () => {
    const serializedContent = JSON.stringify({ publicRoutes, solutions }).toLowerCase();

    expect(serializedContent).not.toContain('[validar]');
    expect(serializedContent).not.toContain('resultado garantido');
    expect(serializedContent).not.toContain('zero parada');
    expect(serializedContent).not.toContain('90 dias');
    expect(serializedContent).not.toContain('14 marcas');
  });
});
