import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve('.');
const clientDir = resolve(root, 'dist/client');
const entryPath = resolve(root, 'dist/ssr/entry-server.js');
const template = await readFile(resolve(clientDir, 'index.html'), 'utf8');
const { publicRoutes, render } = await import(pathToFileURL(entryPath).href);

const siteUrl = (process.env.SITE_URL || 'https://www.jottamanutencoes.com.br').replace(
  /\/$/,
  ''
);
const isIndexable = process.env.PUBLIC_INDEXING === 'true';

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function pageHead(route) {
  const canonical = `${siteUrl}${route.path}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': route.kind === 'solution' ? 'Service' : 'WebPage',
    name: route.meta.title,
    description: route.meta.description,
    url: canonical,
    provider:
      route.kind === 'solution'
        ? {
            '@type': 'Organization',
            name: 'Jotta Manutenções',
            url: siteUrl,
          }
        : undefined,
  };

  return `
    <meta name="description" content="${escapeHtml(route.meta.description)}" />
    <meta name="robots" content="${isIndexable ? 'index,follow' : 'noindex,nofollow'}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:title" content="${escapeHtml(route.meta.title)}" />
    <meta property="og:description" content="${escapeHtml(route.meta.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/og-jotta.svg" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <title>${escapeHtml(route.meta.title)}</title>`;
}

async function writePage(route) {
  const { html } = render(route.path);
  const output = template
    .replace('<!--app-head-->', pageHead(route))
    .replace('<title>Jotta Manutenções</title>', '')
    .replace('<!--app-html-->', html);
  const outputPath =
    route.path === '/'
      ? resolve(clientDir, 'index.html')
      : resolve(clientDir, route.path.slice(1), 'index.html');

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, 'utf8');
}

for (const route of publicRoutes) {
  await writePage(route);
}

const { html: notFoundHtml } = render('/pagina-nao-encontrada/');
const notFound = template
  .replace(
    '<!--app-head-->',
    '<meta name="robots" content="noindex,nofollow" /><title>Página não encontrada | Jotta Manutenções</title>'
  )
  .replace('<title>Jotta Manutenções</title>', '')
  .replace('<!--app-html-->', notFoundHtml);
await writeFile(resolve(clientDir, '404.html'), notFound, 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes.map((route) => `  <url><loc>${siteUrl}${route.path}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(resolve(clientDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(
  resolve(clientDir, 'robots.txt'),
  isIndexable
    ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
  'utf8'
);

await rm(resolve(root, 'dist/ssr'), { recursive: true, force: true });
console.log(`Pré-render concluído: ${publicRoutes.length} rotas + 404.`);
