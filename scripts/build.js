import { build } from 'esbuild';
import { mkdirSync, statSync } from 'node:fs';

mkdirSync('dist/esm', { recursive: true });

const shared = {
    entryPoints: ['src/index.js'],
    bundle: true,
};

// Browser script tag build: exposes the API as window.Bonfire
const browser = {
    ...shared,
    platform: 'browser',
    format: 'iife',
    globalName: 'Bonfire',
    footer: { js: 'Bonfire = Bonfire.default;' },
};

const outputs = [
    { ...browser, outfile: 'dist/bonfire.js', sourcemap: 'linked' },
    { ...browser, outfile: 'dist/bonfire.min.js', minify: true, sourcemap: 'linked' },
    { ...shared, outfile: 'dist/esm/bonfire.mjs', platform: 'neutral', format: 'esm', sourcemap: 'linked' },
    { ...shared, outfile: 'dist/bonfire.cjs', platform: 'node', format: 'cjs', footer: { js: 'module.exports = module.exports.default;' } },
];

await Promise.all(outputs.map((options) => build(options)));

for (const { outfile } of outputs) {
    console.log(`${outfile}  ${(statSync(outfile).size / 1024).toFixed(1)} KB`);
}
