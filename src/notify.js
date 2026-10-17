import { getDefaults } from './config.js';
import { injectStyles } from './styles.js';

/**
 * Dark Souls style notification
 * Displays a dramatic full-screen message with fade in/out animations
 *
 * @param {string} message - Message to display
 * @param {object} options - Configuration options
 * @param {string} options.type - 'death'|'success'|'info' (default: 'info')
 * @param {number} options.duration - Display duration in ms (default: 3000)
 * @param {boolean} options.backdrop - Show dark backdrop band (default: true)
 * @param {function} options.onComplete - Callback when animation completes
 * @returns {function} Cleanup function to remove notification immediately
 */
let notify = (message, options = {}) => {
    injectStyles();

    const config = {
        type: options.type || 'info',
        duration: options.duration !== undefined ? options.duration : getDefaults().duration,
        backdrop: options.backdrop !== undefined ? options.backdrop : true,
        onComplete: options.onComplete || null,
    };

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'darksouls-overlay';

    // Create backdrop if enabled
    if (config.backdrop) {
        const backdrop = document.createElement('div');
        backdrop.className = 'darksouls-backdrop';
        overlay.appendChild(backdrop);
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `darksouls-message ${config.type}`;
    messageEl.textContent = message;
    overlay.appendChild(messageEl);

    // Add to DOM
    document.body.appendChild(overlay);

    // Track cleanup state
    let isCleanedUp = false;
    let fadeOutTimeout = null;
    let removeTimeout = null;

    // Cleanup function
    const cleanup = () => {
        if (isCleanedUp) {
            return;
        }
        isCleanedUp = true;

        // Clear any pending timeouts
        if (fadeOutTimeout) {
            clearTimeout(fadeOutTimeout);
        }
        if (removeTimeout) {
            clearTimeout(removeTimeout);
        }

        // Start fade out
        overlay.classList.remove('visible');
        overlay.classList.add('fade-out');

        // Remove from DOM after transition
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            if (config.onComplete) {
                config.onComplete();
            }
        }, 500);
    };

    // Trigger fade in after a brief delay (for CSS transition to work)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.classList.add('visible');
        });
    });

    // Schedule fade out
    if (config.duration > 0) {
        fadeOutTimeout = setTimeout(() => {
            cleanup();
        }, config.duration);
    }

    // Return cleanup function for manual dismissal
    return cleanup;
};

export default notify;
