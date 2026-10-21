// Compiled by `npm run typecheck` (tsc --noEmit); never run.
import Bonfire from '@ozankurt/bonfire';

const stop: () => void = Bonfire.death();
stop();
Bonfire.notify('Saved', { type: 'success', duration: 0 });

const yes: Promise<boolean> = Bonfire.confirm('Abandon?', { yesLabel: 'Leave' });
void yes;

const where: Promise<'ferry' | 'tower' | null> = Bonfire.choice('Where?', {
    options: [
        { label: 'Sunken Ferry', value: 'ferry' as const },
        { label: 'Bell Tower', value: 'tower' as const },
    ],
});
void where;

Bonfire.configure({ duration: 5000, fontUrl: null });

// @ts-expect-error unknown notify type
Bonfire.notify('x', { type: 'warning' });
