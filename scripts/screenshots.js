/**
 * The README's images, captured from examples/showcase.html.
 *
 * Run with `npm run screenshots`. Starts the examples server through Vite's
 * Node API, opens each scene with Playwright and writes PNGs into docs/images/.
 * One fixed viewport, deviceScaleFactor 2 and animations disabled, and every
 * wait is a condition, so re-runs give the same pixels.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'docs/images');
const VIEWPORT = { width: 1280, height: 720 };

// Banners are cropped to the band they occupy; dialogs keep the whole screen.
const BANNER = { x: 0, y: 200, width: 1280, height: 320 };
const ONLINE = { x: 0, y: 60, width: 1280, height: 320 };

const SHOTS = [
    { file: 'death.png', scene: 'death', clip: BANNER },
    { file: 'victory.png', scene: 'victory', clip: BANNER },
    { file: 'info.png', scene: 'info', clip: BANNER },
    { file: 'online.png', scene: 'online', clip: ONLINE },
    { file: 'confirm.png', scene: 'confirm' },
    { file: 'choice.png', scene: 'choice' },
];

const server = await createServer({ configFile: resolve(root, 'vite.examples.config.js'), logLevel: 'warn' });
await server.listen();
const base = server.resolvedUrls.local[0].replace(/\/$/, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });

mkdirSync(outDir, { recursive: true });

try {
    for (const shot of SHOTS) {
        await page.goto(`${base}/showcase.html?scene=${shot.scene}`, { waitUntil: 'load' });
        await page.locator('body[data-ready="true"]').waitFor();

        const png = await page.screenshot({ clip: shot.clip, animations: 'disabled', caret: 'hide' });
        writeFileSync(resolve(outDir, shot.file), png);
        console.log(`${shot.file.padEnd(14)} ${(png.length / 1024).toFixed(1)} KB`);
    }
} finally {
    await browser.close();
    await server.close();
}
