import { beforeEach, describe, expect, it } from 'vitest';
import Bonfire from '../src/index.js';
import { resetDom } from './helpers.js';

describe('styles', () => {
    beforeEach(() => {
        resetDom();
    });

    it('injects once by element id', () => {
        const existing = document.createElement('style');
        existing.id = 'darksouls-styles';
        document.head.appendChild(existing);

        Bonfire.notify('X');

        expect(document.querySelectorAll('#darksouls-styles')).toHaveLength(1);
    });

    it('injects styles on first use', () => {
        Bonfire.notify('X');

        expect(document.querySelectorAll('#darksouls-styles')).toHaveLength(1);
    });
});
