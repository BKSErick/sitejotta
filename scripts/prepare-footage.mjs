/**
 * Prepara o footage real da Jotta (canal do YouTube) para o site.
 *
 * Fonte: `Videos/youtube/3sIsyw65S-E.mp4` — "Capacidade que surpreende", o único
 * dos sete vídeos que é b-roll puro da operação: oficina, bancada, componentes,
 * manômetro, aérea da estrutura. Os outros seis têm locução, legenda queimada
 * ou são animação corporativa, e vão como embed do YouTube.
 *
 * Saída:
 *   public/media/hero-oficina.mp4  — loop mudo de fundo do herói
 *   public/media/hero-oficina.jpg  — poster do loop
 *   public/media/frames/*.jpg      — stills reais para as páginas
 *
 * Requer ffmpeg no PATH. Uso: node scripts/prepare-footage.mjs
 */
import { mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import process from 'node:process';

const source = 'Videos/youtube/3sIsyw65S-E.mp4';
const mediaDir = resolve('public/media');
const framesDir = resolve(mediaDir, 'frames');
await mkdir(framesDir, { recursive: true });

function run(args) {
  const result = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`ffmpeg falhou:\n${args.join(' ')}\n${result.stderr?.slice(-1000)}`);
  }
}

// Loop do herói: trabalho de precisão na bancada. Sem áudio — é o que permite
// o autoplay funcionar em todos os navegadores sem interação do usuário.
const HERO = { start: '44', duration: '8' };

// 1100px: o painel do herói exibe a ~500px, e o b-roll é câmera na mão —
// resolução alta só encarece o arquivo sem ganho visível no tamanho real.
run(['-v', 'error', '-y', '-ss', HERO.start, '-t', HERO.duration, '-i', source,
  '-vf', 'scale=1100:-2:flags=lanczos,fps=24', '-an',
  '-c:v', 'libx264', '-profile:v', 'high', '-crf', '31', '-preset', 'slow',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  resolve(mediaDir, 'hero-oficina.mp4')]);

run(['-v', 'error', '-y', '-ss', HERO.start, '-i', source,
  '-vf', 'scale=1100:-2:flags=lanczos', '-frames:v', '1', '-q:v', '4',
  resolve(mediaDir, 'hero-oficina.jpg')]);

/**
 * Stills do b-roll. O site rodava com duas fotos só, o que fazia 15 páginas
 * compartilharem o mesmo herói. Estes são registros reais da operação.
 */
const stills = [
  { at: '3', name: 'oficina-geral', width: 1600 },
  { at: '9', name: 'oficina-jateamento', width: 1600 },
  { at: '21', name: 'bancada-ferramenta', width: 1600 },
  { at: '24', name: 'cilindro-hidraulico', width: 1400 },
  { at: '36', name: 'compressor-oficina', width: 1600 },
  { at: '48', name: 'bancada-componente', width: 1400 },
  { at: '72', name: 'estrutura-externa', width: 1600 },
];

for (const still of stills) {
  run(['-v', 'error', '-y', '-ss', still.at, '-i', source,
    '-vf', `scale=${still.width}:-2:flags=lanczos`, '-frames:v', '1', '-q:v', '3',
    resolve(framesDir, `${still.name}.jpg`)]);
}

/**
 * Thumbnails dos vídeos que vão como facade do YouTube.
 *
 * Extraídas localmente de propósito: puxar de `i.ytimg.com` faria toda página
 * bater no Google já no primeiro carregamento, o que anula metade do motivo de
 * existir a facade.
 */
const posters = [
  { id: 'FbFb9d2CqxI', at: '4' },
  { id: 'YHC0VrAqHoo', at: '8' },
  { id: 'KdiIpVvG9-c', at: '8' },
  { id: 'wJ6IFrumids', at: '10' },
  { id: 'vqsPWl8DwgM', at: '8' },
];

const postersDir = resolve(mediaDir, 'videos');
await mkdir(postersDir, { recursive: true });

for (const poster of posters) {
  run(['-v', 'error', '-y', '-ss', poster.at, '-i', `Videos/youtube/${poster.id}.mp4`,
    '-vf', "scale='min(1000,iw)':-2:flags=lanczos", '-frames:v', '1', '-q:v', '5',
    resolve(postersDir, `${poster.id}.jpg`)]);
}

console.log(
  `Loop do herói, ${stills.length} stills e ${posters.length} thumbnails de vídeo gerados.`
);
process.exit(0);
