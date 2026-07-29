import { useEffect } from 'react';

export function usePageMotion(pathname: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );
    const parallaxItems = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    );
    const header = document.querySelector<HTMLElement>('.site-header');

    root.classList.add('motion-ready');

    let observer: IntersectionObserver | undefined;

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      revealItems.forEach((item) => observer?.observe(item));
    }

    let frame = 0;
    const updateScrollMotion = () => {
      frame = 0;
      header?.classList.toggle('site-header--scrolled', window.scrollY > 18);

      if (reducedMotion) return;
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0.08);
        const rect = item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = (rect.top - window.innerHeight / 2) * speed;
        item.style.setProperty('--parallax-offset', `${offset.toFixed(1)}px`);
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('motion-ready');
    };
  }, [pathname]);
}
