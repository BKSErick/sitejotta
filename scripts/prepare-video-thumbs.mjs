/**
 * Baixa a thumbnail de cada vídeo do YouTube usado em /conteudo/.
 *
 * Entrada:  videoRecords em src/data/site-content.ts
 * Saída:    public/media/videos/<id>.jpg
 *
 * O VideoRecords.tsx é um facade: mostra a thumb local e só injeta o iframe no
 * clique, para não gravar cookie de terceiro em quem nunca deu play. Servir a
 * thumb do i.ytimg.com em runtime derrubaria metade desse ganho, então o arquivo
 * fica hospedado junto com o site. Rodar quando entrar ou sair vídeo da lista.
 */
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const outDir = resolve('public/media/videos');
await mkdir(outDir, { recursive: true });

// Lê os ids direto do TS para não duplicar a lista num segundo lugar.
const source = await readFile(resolve('src/data/site-content.ts'), 'utf8');
const block = source.slice(source.indexOf('export const videoRecords'));
const ids = [...block.matchAll(/id:\s*'([\w-]{11})'/g)].map((m) => m[1]);

if (!ids.length) {
  console.error('Nenhum id de vídeo encontrado em videoRecords.');
  process.exit(1);
}

// maxres não existe para todo vídeo; hq sempre existe.
const candidates = (id) => [
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
];

let ok = 0;
for (const id of ids) {
  const target = resolve(outDir, `${id}.jpg`);

  if (process.argv.includes('--skip-existing')) {
    try {
      await access(target);
      console.log(`· ${id} já existe`);
      ok += 1;
      continue;
    } catch {
      // segue e baixa
    }
  }

  let saved = false;
  for (const url of candidates(id)) {
    const res = await fetch(url);
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    // O YouTube responde 200 com um placeholder cinza de ~1KB quando a
    // resolução pedida não existe; descarta pelo tamanho.
    if (buf.byteLength < 3000) continue;
    await writeFile(target, buf);
    console.log(`✓ ${id} (${(buf.byteLength / 1024).toFixed(0)} KB) ${url.includes('maxres') ? 'maxres' : 'hq'}`);
    saved = true;
    ok += 1;
    break;
  }

  if (!saved) console.error(`✗ ${id}: nenhuma thumbnail disponível`);
}

console.log(`\n${ok}/${ids.length} thumbnails em ${outDir}`);
if (ok < ids.length) process.exit(1);
