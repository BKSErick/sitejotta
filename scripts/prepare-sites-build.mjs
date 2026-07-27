import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('.');
await mkdir(resolve(root, 'dist/server'), { recursive: true });
await mkdir(resolve(root, 'dist/.openai'), { recursive: true });
await cp(resolve(root, 'sites/server'), resolve(root, 'dist/server'), {
  recursive: true,
  filter: (source) => !source.endsWith('.test.js'),
});
await cp(resolve(root, '.openai/hosting.json'), resolve(root, 'dist/.openai/hosting.json'));

console.log('Build Sites preparado em dist/server e dist/client.');
