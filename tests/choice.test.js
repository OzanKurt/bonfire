import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Bonfire from '../src/index.js';
import { press, resetDom } from './helpers.js';

const settle = async (promise) => {
    await vi.advanceTimersByTimeAsync(1000);
    return promise;
};

describe('confirm and choice', () => {
    beforeEach(() => {
        resetDom();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('confirm defaults to No', async () => {
        const onNo = vi.fn();
        const result = Bonfire.confirm('Sure?', { onNo });

        expect(document.querySelector('.darksouls-confirm-btn.selected').textContent).toBe('No');

        press('Enter');

        expect(await settle(result)).toBe(false);
        expect(onNo).toHaveBeenCalledTimes(1);
    });

    it('choice navigates with arrow keys', async () => {
        const result = Bonfire.choice('Pick', {
            options: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' },
            ],
            defaultIndex: 0,
        });

        press('ArrowRight');
        press('Enter');

        expect(await settle(result)).toBe('b');
    });

    it('choice resolves once when click and Escape race', async () => {
        const onSelect = vi.fn();
        const onCancel = vi.fn();
        const result = Bonfire.choice('Pick', {
            options: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
            ],
            onSelect,
            onCancel,
        });

        document.querySelectorAll('.darksouls-confirm-btn')[1].click();
        press('Escape');

        expect(await settle(result)).toBe('b');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onCancel).not.toHaveBeenCalled();

        press('Enter');
        await vi.advanceTimersByTimeAsync(1000);
        expect(onSelect).toHaveBeenCalledTimes(1);
    });
});
