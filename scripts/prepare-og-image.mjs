/**
 * Rasteriza public/og-jotta.svg em public/og-jotta.png (1200x630).
 *
 * WhatsApp, Facebook e LinkedIn não renderizam SVG em preview de link — o card
 * saía vazio em todo compartilhamento, que é justamente por onde a Jotta
 * conversa com cliente. O PNG é só uma conversão do SVG existente, sem mudar
 * desenho. Rodar quando o og-jotta.svg mudar.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const svgPath = resolve('public/og-jotta.svg');
const outPath = resolve('public/og-jotta.png');
const svg = await readFile(svgPath, 'utf8');

const width = Number(svg.match(/width="(\d+)"/)?.[1] ?? 1200);
const height = Number(svg.match(/height="(\d+)"/)?.[1] ?? 630);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
});

// file:// para que qualquer fonte ou asset relativo do SVG continue resolvendo.
await page.goto(pathToFileURL(svgPath).href, { waitUntil: 'load' });
await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width, height } });
await browser.close();

console.log(`✓ og-jotta.png ${width}x${height} gerado a partir de og-jotta.svg`);
