import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Bonfire from '../src/index.js';
import { resetDom } from './helpers.js';

describe('notify', () => {
    beforeEach(() => {
        resetDom();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('adds overlay with type class and removes it after duration', () => {
        const onComplete = vi.fn();
        Bonfire.notify('X', { type: 'death', onComplete });

        const message = document.querySelectorAll('.darksouls-overlay .darksouls-message.death');
        expect(message).toHaveLength(1);
        expect(message[0].textContent).toBe('X');

        vi.advanceTimersByTime(3000 + 500);

        expect(document.querySelector('.darksouls-overlay')).toBeNull();
        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('never auto-dismisses with duration 0', () => {
        const onComplete = vi.fn();
        const cleanup = Bonfire.notify('X', { duration: 0, onComplete });

        vi.advanceTimersByTime(60000);
        expect(document.querySelector('.darksouls-overlay')).not.toBeNull();

        cleanup();
        cleanup();
        vi.advanceTimersByTime(500);

        expect(document.querySelector('.darksouls-overlay')).toBeNull();
        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('uses default messages for death and success', () => {
        Bonfire.death();
        Bonfire.success();

        const texts = [...document.querySelectorAll('.darksouls-message')].map((el) => el.textContent);
        expect(texts).toEqual(['YOU DIED', 'VICTORY ACHIEVED']);
    });

    it('renders online notification with subtitle', () => {
        Bonfire.online('Online', { subtitle: 'Sub' });

        expect(document.querySelector('.darksouls-online-message').textContent).toBe('Online');
        expect(document.querySelector('.darksouls-online-subtitle').textContent).toBe('Sub');
    });
});
