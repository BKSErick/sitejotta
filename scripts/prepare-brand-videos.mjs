/**
 * Prepara os vídeos das marcas para a vitrine da /assistencia/.
 *
 * Entrada: `Videos/<Marca>/<arquivo>` (renders originais, 720p ~8 MB cada).
 * Saída:   `public/media/marcas/<slug>.{mp4,webm,jpg}`
 *
 * O que faz por arquivo:
 *   1. remove a marca d'água ✦ do gerador (delogo, o fundo ali é gradiente liso);
 *   2. reduz para 960px de largura — a vitrine exibe a ~600px;
 *   3. exporta MP4 (H.264, sem áudio);
 *   4. extrai um poster JPG do primeiro quarto do clipe.
 *
 * Só MP4: H.264 toca em todos os navegadores atuais e os arquivos já saem em
 * ~300 KB. VP9 chegou a ficar maior que o H.264 nas fontes ruidosas.
 *
 * Requer ffmpeg no PATH. Uso: node scripts/prepare-brand-videos.mjs
 */
import { mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import process from 'node:process';

const outDir = resolve('public/media/marcas');
await mkdir(outDir, { recursive: true });

/** A marca d'água fica proporcionalmente no mesmo ponto em todos os clipes. */
const WATERMARK = { xRatio: 1140 / 1280, yRatio: 562 / 720, wRatio: 58 / 1280, hRatio: 68 / 720 };

const sources = [
  { slug: 'cattini', file: 'Videos/Catinni/Macaco_hidráulico_subindo_lentam…_202607281446.mp4', width: 1280, height: 720 },
  { slug: 'bovenau', file: 'Videos/Bovenau/Empilhadeira_subindo_e_descendo_202607281453.mp4', width: 1280, height: 720 },
  { slug: 'karcher', file: 'Videos/Katcher/Vacuum_extractor_with_swaying_hose_202607281500.mp4', width: 1280, height: 720 },
  {
    slug: 'makita',
    file: 'Videos/Makitta/Use_this_exact_product_image_as_the_main_refe.gif',
    width: 480,
    height: 270,
    // GIF palettizado: ampliar espalha o dithering e o ruído inflava o arquivo
    // em 15x. Mantém a largura nativa e suaviza o dithering antes de encodar.
    targetWidth: 480,
    denoise: true,
    crf: 30,
  },
];

function run(args) {
  const result = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`ffmpeg falhou:\n${args.join(' ')}\n${result.stderr?.slice(-1200)}`);
  }
}

function delogoFor({ width, height }) {
  const x = Math.round(WATERMARK.xRatio * width);
  const y = Math.round(WATERMARK.yRatio * height);
  const w = Math.max(12, Math.round(WATERMARK.wRatio * width));
  const h = Math.max(12, Math.round(WATERMARK.hRatio * height));
  return `delogo=x=${x}:y=${y}:w=${w}:h=${h}`;
}

for (const source of sources) {
  const chain = [
    delogoFor(source),
    source.denoise ? 'hqdn3d=4:3:6:4.5' : null,
    `scale=${source.targetWidth ?? 960}:-2:flags=lanczos`,
  ]
    .filter(Boolean)
    .join(',');
  const mp4 = resolve(outDir, `${source.slug}.mp4`);
  const poster = resolve(outDir, `${source.slug}.jpg`);

  run(['-v', 'error', '-y', '-i', source.file, '-vf', chain, '-an',
    '-c:v', 'libx264', '-profile:v', 'high', '-crf', String(source.crf ?? 26),
    '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);

  run(['-v', 'error', '-y', '-i', source.file, '-vf', `${chain},select=eq(n\\,12)`,
    '-frames:v', '1', '-q:v', '4', poster]);

  console.log(`${source.slug} pronto`);
}

console.log(`\nSaída em ${outDir}`);
process.exit(0);
