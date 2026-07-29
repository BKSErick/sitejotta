# Story 003 — Meta Pixel nos sites de demonstração

## Status

In Progress

## Story

Como Erick, quero formar uma audiência Meta com visitantes dos sites que envio
em follow-ups, sem poluir os eventos com minhas próprias visitas.

## Acceptance Criteria

- [x] Jotta e Metalthec usam o Pixel `1175331711422463`.
- [x] `PageView` e `ViewContent` diferenciam os dois projetos.
- [x] O Pixel depende de consentimento opcional.
- [x] `crm_no_track=1` bloqueia este navegador antes do carregamento.
- [x] `crm_track=1` remove a exclusão interna.
- [x] Nenhum token Meta secreto é enviado ao navegador.
- [x] Testes e quality gates aplicáveis passam.
- [ ] GitHub e Vercel refletem os commits validados.

## File List

- `docs/plans/2026-07-29-meta-pixel-case-sites-design.md`
- `docs/plans/2026-07-29-meta-pixel-case-sites.md`
- `docs/stories/story-003-meta-pixel-case-sites.md`
- `src/App.tsx`
- `src/components/MetaTracking.tsx`
- `src/lib/metaPixel.test.ts`
- `src/lib/metaPixel.ts`
- `src/pages/InstitutionalPages.tsx`
- `src/styles/components.css`

## Validation Log

- `npm.cmd run lint`
- `npm.cmd run typecheck`
- `npm.cmd test` — 21 testes aprovados
- `npm.cmd run build` — 18 rotas e página 404 geradas
- `npm.cmd run smoke:visual` — 18 rotas desktop e 18 mobile aprovadas
