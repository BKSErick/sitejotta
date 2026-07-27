import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

import { chromium } from 'playwright';

const root = resolve('.');
const port = 4187;
const baseUrl = `http://127.0.0.1:${port}`;
const browserExecutable =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const viteExecutable = resolve(root, '../../node_modules/vite/bin/vite.js');
const routes = [
  '/',
  '/empresa/',
  '/solucoes/',
  '/solucoes/talhas-eletricas/',
  '/solucoes/lavadoras-industriais/',
  '/solucoes/ferrovia/',
  '/solucoes/mecanica-industrial/',
  '/solucoes/hidraulica-industrial/',
  '/solucoes/pneumatica-industrial/',
  '/solucoes/eletrica-industrial/',
  '/assistencia/',
  '/metodo/',
  '/cases/',
  '/conteudo/',
  '/book-tecnico/',
  '/contato/',
  '/privacidade/',
  '/cookies/',
];

const server = spawn(
  process.execPath,
  [
    viteExecutable,
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    String(port),
    '--strictPort',
    '--outDir',
    'dist/client',
  ],
  {
    cwd: root,
    stdio: 'pipe',
  }
);
let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The preview process is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  throw new Error(
    `Vite preview did not start\nroot=${root}\nvite=${viteExecutable}\n${serverOutput}`
  );
}

async function validatePage(page, route, viewportName) {
  const consoleErrors = [];
  const onConsole = (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  };
  page.on('console', onConsole);

  const response = await page.goto(`${baseUrl}${route}`, {
    waitUntil: 'domcontentloaded',
    timeout: 8_000,
  });
  if (!response?.ok()) throw new Error(`${route} returned ${response?.status()}`);

  const result = await page.evaluate(() => {
    const bodyText = document.body.innerText.toLowerCase();
    const description = document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');
    return {
      hasH1: document.querySelectorAll('h1').length === 1,
      title: document.title,
      description,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      unresolvedClaim: bodyText.includes('[validar]'),
      mojibake: bodyText.includes('�') || bodyText.includes('ãƒ'),
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
    };
  });

  if (!result.hasH1) throw new Error(`${route} must contain exactly one h1`);
  if (!result.title || result.title === 'Jotta Manutenções') {
    throw new Error(`${route} is missing a unique title`);
  }
  if (!result.description || result.description.length < 80) {
    throw new Error(`${route} has an invalid meta description`);
  }
  if (result.overflow > 1) {
    throw new Error(`${route} overflows ${viewportName} by ${result.overflow}px`);
  }
  if (result.unresolvedClaim) throw new Error(`${route} exposes a validation marker`);
  if (result.mojibake) throw new Error(`${route} contains mojibake`);
  if (result.brokenImages.length) {
    throw new Error(`${route} has broken images: ${result.brokenImages.join(', ')}`);
  }
  if (consoleErrors.length) {
    throw new Error(`${route} logged console errors: ${consoleErrors.join(' | ')}`);
  }

  page.off('console', onConsole);
}

let browser;

try {
  await waitForServer();
  browser = await chromium.launch({ executablePath: browserExecutable, headless: true });
  await mkdir(resolve(root, 'artifacts'), { recursive: true });

  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5_000);

    for (const route of routes) {
      await validatePage(page, route, viewport.name);
    }
    console.log(`${viewport.name}: ${routes.length} rotas validadas.`);

    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: resolve(root, `artifacts/home-${viewport.name}.png`),
      fullPage: false,
    });

    if (viewport.name === 'mobile') {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      if (!(await page.getByRole('navigation', { name: 'Principal' }).isVisible())) {
        throw new Error('Mobile navigation did not open');
      }
    }

    await context.close();
  }

  const response404 = await fetch(`${baseUrl}/rota-inexistente/`);
  if (!response404.ok) {
    throw new Error(`404 fallback returned ${response404.status}`);
  }

  console.log(`Smoke aprovado: ${routes.length} rotas em desktop e mobile.`);
} finally {
  await browser?.close();
  server.kill();
}
