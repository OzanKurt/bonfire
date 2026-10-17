// @vitest-environment node
import { describe, expect, it } from 'vitest';

describe('import without DOM', () => {
    it('does not throw', async () => {
        const module = await import('../src/index.js');

        expect(Object.keys(module.default)).toEqual(['notify', 'death', 'success', 'info', 'online', 'confirm', 'choice', 'configure']);
    });
});
