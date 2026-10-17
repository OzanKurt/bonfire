import Bonfire from '@ozankurt/bonfire';

const scene = new URLSearchParams(location.search).get('scene') ?? 'death';

// duration: 0 keeps the banners on screen until dismissed, so they can be captured.
const scenes = {
    death: () => Bonfire.death('YOU DIED', { duration: 0 }),
    victory: () => Bonfire.success('VICTORY ACHIEVED', { duration: 0 }),
    info: () => Bonfire.info('BONFIRE LIT', { duration: 0 }),
    online: () => Bonfire.online('Summoned to another world', { subtitle: 'Phantom of Ashen Road', duration: 0 }),
    confirm: () => Bonfire.confirm('Abandon the expedition?', { subtitle: 'Unbanked embers are lost.' }),
    choice: () => Bonfire.choice('Where do you travel?', {
        options: [
            { label: 'Ember Watch', value: 'watch' },
            { label: 'Sunken Ferry', value: 'ferry' },
            { label: 'Bell Tower', value: 'tower' },
        ],
        defaultIndex: 1,
    }),
};

document.body.dataset.scene = scene;
scenes[scene]();

const twoFrames = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));

// Wait for the overlay to be shown and its web font to load before a screenshot.
await twoFrames();
await document.fonts.ready;
await twoFrames();
document.body.dataset.ready = 'true';
