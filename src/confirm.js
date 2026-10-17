import choice from './choice.js';

/**
 * Dark Souls style confirmation dialog
 * Displays a Yes/No dialog with the default selection on "No" (safer)
 *
 * @param {string} message - Message/question to display
 * @param {object} options - Configuration options
 * @param {function} options.onYes - Callback when Yes is selected
 * @param {function} options.onNo - Callback when No is selected
 * @param {string} options.subtitle - Optional subtitle text
 * @param {string} options.yesLabel - Label for Yes button (default: 'Yes')
 * @param {string} options.noLabel - Label for No button (default: 'No')
 * @returns {Promise<boolean>} Resolves with true for Yes, false for No/Cancel
 */
let confirm = (message, options = {}) => {
    const config = {
        onYes: options.onYes || null,
        onNo: options.onNo || null,
        subtitle: options.subtitle || null,
        yesLabel: options.yesLabel || 'Yes',
        noLabel: options.noLabel || 'No',
    };

    return choice(message, {
        options: [
            { label: config.yesLabel, value: true },
            { label: config.noLabel, value: false },
        ],
        subtitle: config.subtitle,
        defaultIndex: 1, // Default to "No" for safety
        cancelValue: false,
        onSelect: (value) => {
            if (value === true && config.onYes) {
                config.onYes();
            } else if (value === false && config.onNo) {
                config.onNo();
            }
        },
        onCancel: () => {
            if (config.onNo) {
                config.onNo();
            }
        },
    });
};

export default confirm;
