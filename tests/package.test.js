// @vitest-environment node
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const require = createRequire(import.meta.url);

describe('published package', () => {
    it('main entry exposes the API to CommonJS resolvers', () => {
        const api = require(`../${pkg.main}`);

        expect(Object.keys(api)).toContain('notify');
    });

    it('ships a readable ESM build with a source map', () => {
        const esm = readFileSync(new URL('../dist/esm/bonfire.mjs', import.meta.url), 'utf8');

        expect(esm).toContain('overlay.className = "darksouls-overlay"');
        expect(esm).toContain('//# sourceMappingURL=bonfire.mjs.map');
    });
});
