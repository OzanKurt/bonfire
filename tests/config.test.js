import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Bonfire from '../src/index.js';
import { resetDefaults } from '../src/config.js';
import { resetDom } from './helpers.js';

const styleText = () => document.getElementById('darksouls-styles').textContent;

describe('configure', () => {
    beforeEach(() => {
        resetDom();
        resetDefaults();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('changes the notify default duration', () => {
        Bonfire.configure({ duration: 5000 });
        Bonfire.notify('X');

        vi.advanceTimersByTime(4999);
        expect(document.querySelector('.darksouls-overlay')).not.toBeNull();

        vi.advanceTimersByTime(501);
        expect(document.querySelector('.darksouls-overlay')).toBeNull();
    });

    it('changes the online default duration', () => {
        Bonfire.configure({ duration: 5000 });
        Bonfire.online('X');

        vi.advanceTimersByTime(4999);
        expect(document.querySelector('.darksouls-online-overlay')).not.toBeNull();
    });

    it('keeps an explicit duration 0 over the configured default', () => {
        Bonfire.configure({ duration: 5000 });
        Bonfire.notify('X', { duration: 0 });

        vi.advanceTimersByTime(60000);
        expect(document.querySelector('.darksouls-overlay')).not.toBeNull();
    });

    it('imports the Google font by default', () => {
        Bonfire.notify('X');

        expect(styleText()).toContain("@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap');");
    });

    it('omits the font import when fontUrl is null', () => {
        Bonfire.configure({ fontUrl: null });
        Bonfire.notify('X');

        expect(styleText()).not.toContain('@import');
        expect(styleText()).not.toContain('fonts.googleapis.com');
    });

    it('uses a custom fontUrl', () => {
        Bonfire.configure({ fontUrl: '/fonts/eb-garamond.css' });
        Bonfire.notify('X');

        expect(styleText()).toContain("@import url('/fonts/eb-garamond.css');");
    });
});

describe('configure input validation', () => {
    beforeEach(() => {
        resetDom();
        resetDefaults();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it.each([undefined, null, -5, NaN, '5000'])('ignores invalid duration %s', (duration) => {
        Bonfire.configure({ duration });
        Bonfire.notify('X');

        vi.advanceTimersByTime(3000 + 500);
        expect(document.querySelector('.darksouls-overlay')).toBeNull();
    });

    it('keeps the default font when fontUrl is undefined', () => {
        Bonfire.configure({ fontUrl: undefined });
        Bonfire.notify('X');

        expect(document.getElementById('darksouls-styles').textContent).toContain('fonts.googleapis.com');
    });
});
