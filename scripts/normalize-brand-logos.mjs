/**
 * Normaliza os logos das marcas autorizadas para uso sobre fundo colorido.
 *
 * Os arquivos vieram do site antigo em estados diferentes: alguns com alfa real,
 * outros com fundo branco chapado, e vários com padding transparente sobrando
 * (o Cattini tinha 67% de altura vazia, o que fazia o logo renderizar minúsculo
 * sob `object-fit: contain`).
 *
 * O que o script faz, por arquivo:
 *   1. flood fill a partir das bordas, tornando transparente só o branco
 *      conectado à moldura — branco interno do logotipo é preservado;
 *   2. trim do padding transparente;
 *   3. reexporta PNG.
 *
 * Uso: node scripts/normalize-brand-logos.mjs   (precisa do dev server de pé)
 */
import { readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

import { chromium } from 'playwright';

const dir = resolve('public/brand/marcas');
const browserExecutable =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const origin = process.env.SITE_ORIGIN || 'http://localhost:5173';

const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f));

const browser = await chromium.launch({ executablePath: browserExecutable, headless: true });
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(origin);

const results = await page.evaluate(async (list) => {
  const report = [];

  for (const file of list) {
    const img = new Image();
    img.src = `/brand/marcas/${file}`;
    try {
      await img.decode();
    } catch {
      report.push({ file, status: 'erro ao decodificar' });
      continue;
    }

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);

    const { width: w, height: h } = canvas;
    const image = ctx.getImageData(0, 0, w, h);
    const d = image.data;

    // Alfa baixo também é fundo: os arquivos originais trazem um halo
    // semitransparente da composição que, sobre cor, aparece como caixa pálida.
    const isBackground = (i) => {
      if (d[i + 3] < 90) return true;
      return d[i] > 232 && d[i + 1] > 232 && d[i + 2] > 232;
    };

    // Flood fill pelas bordas: só o fundo conectado à moldura vira transparente.
    const seen = new Uint8Array(w * h);
    const stack = [];
    for (let x = 0; x < w; x++) {
      stack.push(x, (h - 1) * w + x);
    }
    for (let y = 0; y < h; y++) {
      stack.push(y * w, y * w + w - 1);
    }

    let cleared = 0;
    while (stack.length) {
      const p = stack.pop();
      if (seen[p]) continue;
      seen[p] = 1;
      const i = p * 4;
      if (!isBackground(i)) continue;
      if (d[i + 3] !== 0) {
        d[i + 3] = 0;
        cleared++;
      }
      const x = p % w;
      const y = (p - x) / w;
      if (x > 0) stack.push(p - 1);
      if (x < w - 1) stack.push(p + 1);
      if (y > 0) stack.push(p - w);
      if (y < h - 1) stack.push(p + w);
    }
    ctx.putImageData(image, 0, 0);

    // Trim do padding transparente.
    let minX = w;
    let maxX = -1;
    let minY = h;
    let maxY = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] > 16) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) {
      report.push({ file, status: 'vazio apos limpeza — mantido' });
      continue;
    }

    const bw = maxX - minX + 1;
    const bh = maxY - minY + 1;
    const trimmed = document.createElement('canvas');
    trimmed.width = bw;
    trimmed.height = bh;
    trimmed.getContext('2d').drawImage(canvas, minX, minY, bw, bh, 0, 0, bw, bh);

    report.push({
      file,
      status: 'ok',
      from: `${w}x${h}`,
      to: `${bw}x${bh}`,
      cleared,
      dataUrl: trimmed.toDataURL('image/png'),
    });
  }

  return report;
}, files);

for (const item of results) {
  if (item.status !== 'ok') {
    console.log(`${item.file.padEnd(18)} ${item.status}`);
    continue;
  }
  const base64 = item.dataUrl.split(',')[1];
  const target = resolve(dir, item.file.replace(/\.jpe?g$/i, '.png'));
  await writeFile(target, Buffer.from(base64, 'base64'));
  console.log(
    `${item.file.padEnd(18)} ${item.from} -> ${item.to}  ${item.cleared} px de fundo removidos`
  );
}

await browser.close();
