/**
 * Dark Souls Notification System
 * A dramatic notification system inspired by Dark Souls and Elden Ring
 *
 * Features:
 * - Full-screen death/success/info notifications with glow effects
 * - Elden Ring style online status notifications
 * - Dark Souls style confirmation dialogs
 * - Multiple choice dialogs with keyboard navigation
 * - Promise-based API for confirm/choice
 * - Uses EB Garamond font for authentic styling
 */

import { setDefaults } from './config.js';
import notify from './notify.js';
import confirm from './confirm.js';
import choice from './choice.js';
import online from './online.js';

const DarkSouls = {
    /**
     * Generic notification with customizable type
     * @param {string} message - Message to display
     * @param {object} options - { type: 'death'|'success'|'info', duration: 3000, backdrop: true, onComplete: null }
     * @returns {function} Cleanup function
     */
    notify,

    /**
     * Death notification (red glow)
     * @param {string} message - Message to display (default: 'YOU DIED')
     * @param {object} options - { duration: 3000, backdrop: true, onComplete: null }
     * @returns {function} Cleanup function
     */
    death: (message = 'YOU DIED', options = {}) => notify(message, { ...options, type: 'death' }),

    /**
     * Success notification (gold glow)
     * @param {string} message - Message to display (default: 'VICTORY ACHIEVED')
     * @param {object} options - { duration: 3000, backdrop: true, onComplete: null }
     * @returns {function} Cleanup function
     */
    success: (message = 'VICTORY ACHIEVED', options = {}) => notify(message, { ...options, type: 'success' }),

    /**
     * Info notification (silver glow)
     * @param {string} message - Message to display
     * @param {object} options - { duration: 3000, backdrop: true, onComplete: null }
     * @returns {function} Cleanup function
     */
    info: (message, options = {}) => notify(message, { ...options, type: 'info' }),

    /**
     * Elden Ring style online status notification
     * @param {string} message - Main message
     * @param {object} options - { subtitle: null, duration: 3000, onComplete: null }
     * @returns {function} Cleanup function
     */
    online,

    /**
     * Yes/No confirmation dialog
     * @param {string} message - Question to display
     * @param {object} options - { onYes, onNo, subtitle, yesLabel, noLabel }
     * @returns {Promise<boolean>}
     */
    confirm,

    /**
     * Multiple choice dialog
     * @param {string} message - Question to display
     * @param {object} options - { options: [{label, value}], subtitle, onSelect, onCancel, defaultIndex, cancelValue }
     * @returns {Promise<any>}
     */
    choice,

    /**
     * Change library-wide defaults. Call before the first notification,
     * because the stylesheet (and its font import) is injected once.
     * @param {object} options - { duration: 3000, fontUrl: '<Google Fonts URL>' | null }
     */
    configure: (options = {}) => setDefaults(options),
};

export default DarkSouls;
