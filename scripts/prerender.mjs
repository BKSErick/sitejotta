import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
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
    <!--
      PNG, não SVG: WhatsApp, Facebook e LinkedIn ignoram SVG em preview de link
      e o card saía vazio. Gerar com: node scripts/prepare-og-image.mjs
    -->
    <meta property="og:image" content="${siteUrl}/og-jotta.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${siteUrl}/og-jotta.png" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <title>${escapeHtml(route.meta.title)}</title>`;
}

/**
 * Todo caminho de asset local que o HTML pré-renderizado pede, para conferência
 * depois. A página /conteudo/ passou a produção inteira servindo cinco imagens
 * quebradas (/media/videos/<id>.jpg nunca existiu) porque nada comparava o que
 * o markup referencia com o que existe em disco.
 */
const referencedAssets = new Map();

function collectAssets(html, routePath) {
  const pattern = /(?:src|href)="(\/[^"?#]+\.(?:jpg|jpeg|png|svg|webp|avif|mp4|webm|woff2?|pdf|ico))"/g;
  for (const [, asset] of html.matchAll(pattern)) {
    if (!referencedAssets.has(asset)) referencedAssets.set(asset, routePath);
  }
}

async function writePage(route) {
  const { html } = render(route.path);
  collectAssets(html, route.path);
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

collectAssets(notFoundHtml, '/404');

const missingAssets = [];
for (const [asset, routePath] of referencedAssets) {
  try {
    await access(resolve(clientDir, asset.slice(1)));
  } catch {
    missingAssets.push(`${asset}  (referenciado em ${routePath})`);
  }
}

if (missingAssets.length) {
  console.error(
    `\nAssets referenciados que não existem em dist/client (${missingAssets.length}):`
  );
  missingAssets.forEach((entry) => console.error(`  ✗ ${entry}`));
  console.error('\nSe forem thumbnails de vídeo: node scripts/prepare-video-thumbs.mjs');
  process.exit(1);
}

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
