# Plano — Meta Pixel nos sites de demonstração

## Tarefa 1 — Política de rastreamento da Jotta

**Arquivos:** `src/lib/metaPixel.ts`, `src/lib/metaPixel.test.ts`

Criar funções testáveis para consentimento, exclusão interna, limpeza dos
parâmetros de controle e carregamento único do Pixel.

**Verificação:** o teste deve falhar antes da implementação e passar depois.

## Tarefa 2 — Interface e documentação da Jotta

**Arquivos:** `src/components/MetaTracking.tsx`, `src/App.tsx`,
`src/pages/InstitutionalPages.tsx`, `src/styles/index.css`, `.env.example`

Adicionar banner acessível, integrar o rastreamento ao app e documentar as
preferências na página de cookies.

**Verificação:** `npm.cmd test`, `npm.cmd run lint`,
`npm.cmd run typecheck`, `npm.cmd run build`.

## Tarefa 3 — Política de rastreamento da Metalthec

**Arquivos:** `meta-pixel.mjs`, `meta-pixel.test.mjs`, `app.js`

Criar módulo testável, inicializá-lo no script existente e conectar a aceitação
do banner LGPD ao carregamento do Pixel, sem tocar nas alterações locais já
existentes de `index.html` e `README.md`.

**Verificação:** `node --test meta-pixel.test.mjs`,
`node --check meta-pixel.mjs`, `node --check app.js`.

## Tarefa 4 — Publicação

Publicar somente os arquivos desta story nos dois repositórios e confirmar os
SHAs remotos e os deployments Vercel.

**Verificação:** status Vercel `success`, páginas públicas HTTP 200 e controles
`crm_no_track`/`crm_track` presentes nos bundles publicados.
