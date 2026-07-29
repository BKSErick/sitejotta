# Site Jotta Manutenções

Site institucional multipágina da Jotta Manutenções, construído com React,
TypeScript e Vite.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

O build pré-renderiza as rotas públicas em `dist/client`. O `vercel.json`
configura esse diretório como saída da publicação.

## Integração do formulário

A função `api/solicitacoes.js` recebe as solicitações na Vercel e reutiliza o
mesmo contrato validado pelo servidor do site.

Configure as variáveis abaixo no projeto da Vercel para encaminhar solicitações
ao endpoint autorizado:

- `JOTTA_INTAKE_URL`
- `JOTTA_INTAKE_TOKEN` (opcional)

Sem `JOTTA_INTAKE_URL`, o endpoint responde como não configurado e não simula
persistência.

## Indexação

O ambiente de prospecção permanece `noindex` por padrão. Para liberar indexação
em um domínio aprovado, configure:

- `PUBLIC_INDEXING=true`
- `SITE_URL=https://dominio-aprovado.example`
