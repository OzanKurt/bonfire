import { getDefaults } from './config.js';
import { injectStyles } from './styles.js';

/**
 * Elden Ring online-style status notification
 * Displays a subtle golden notification at the top of the screen
 * Auto-dismisses after duration
 *
 * @param {string} message - Main message to display
 * @param {object} options - Configuration options
 * @param {string} options.subtitle - Optional subtitle text
 * @param {number} options.duration - Display duration in ms (default: 3000)
 * @param {function} options.onComplete - Callback when animation completes
 * @returns {function} Cleanup function to remove notification immediately
 */
let online = (message, options = {}) => {
    injectStyles();

    const config = {
        subtitle: options.subtitle || null,
        duration: options.duration !== undefined ? options.duration : getDefaults().duration,
        onComplete: options.onComplete || null,
    };

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'darksouls-online-overlay';

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'darksouls-online-message';
    messageEl.textContent = message;
    overlay.appendChild(messageEl);

    // Create subtitle if provided
    if (config.subtitle) {
        const subtitleEl = document.createElement('div');
        subtitleEl.className = 'darksouls-online-subtitle';
        subtitleEl.textContent = config.subtitle;
        overlay.appendChild(subtitleEl);
    }

    // Add to DOM
    document.body.appendChild(overlay);

    // Track cleanup state
    let isCleanedUp = false;
    let fadeOutTimeout = null;

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

        // Start fade out
        overlay.classList.remove('visible');

        // Remove from DOM after transition
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            if (config.onComplete) {
                config.onComplete();
            }
        }, 600);
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

export default online;
