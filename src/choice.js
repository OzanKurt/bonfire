import { injectStyles } from './styles.js';

/**
 * Dark Souls style multiple choice dialog
 * Displays a menu of options with keyboard navigation
 *
 * @param {string} message - Main message/question to display
 * @param {object} options - Configuration options
 * @param {array} options.options - Array of {label, value} objects for choices
 * @param {string} options.subtitle - Optional subtitle text
 * @param {function} options.onSelect - Callback when option is selected (receives value)
 * @param {function} options.onCancel - Callback when dialog is cancelled
 * @param {number} options.defaultIndex - Index of initially selected option (default: 0)
 * @param {any} options.cancelValue - Value returned on cancel (default: null)
 * @returns {Promise<any>} Resolves with selected value, or cancelValue if cancelled
 */
let choice = (message, options = {}) => {
    injectStyles();

    return new Promise((resolve) => {
        const config = {
            options: options.options?.length ? options.options : [{ label: 'OK', value: true }],
            subtitle: options.subtitle || null,
            onSelect: options.onSelect || null,
            onCancel: options.onCancel || null,
            defaultIndex: options.defaultIndex !== undefined ? options.defaultIndex : 0,
            cancelValue: options.cancelValue !== undefined ? options.cancelValue : null,
        };

        let selectedIndex = config.defaultIndex;
        let isCleanedUp = false;

        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'darksouls-confirm-overlay';

        // Create confirm box
        const box = document.createElement('div');
        box.className = 'darksouls-confirm-box';

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'darksouls-confirm-message';
        messageEl.textContent = message;
        box.appendChild(messageEl);

        // Create subtitle if provided
        if (config.subtitle) {
            const subtitleEl = document.createElement('div');
            subtitleEl.className = 'darksouls-confirm-subtitle';
            subtitleEl.textContent = config.subtitle;
            box.appendChild(subtitleEl);
        }

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'darksouls-confirm-buttons';

        // Create buttons for each option
        const buttons = [];
        config.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'darksouls-confirm-btn';
            btn.textContent = option.label;
            btn.dataset.index = index;
            btn.dataset.value = JSON.stringify(option.value);

            if (index === selectedIndex) {
                btn.classList.add('selected');
            }

            buttons.push(btn);
            buttonsContainer.appendChild(btn);
        });

        box.appendChild(buttonsContainer);
        overlay.appendChild(box);

        // Update selected state
        const updateSelection = (newIndex) => {
            if (newIndex < 0) {
                newIndex = buttons.length - 1;
            } else if (newIndex >= buttons.length) {
                newIndex = 0;
            }

            buttons[selectedIndex].classList.remove('selected');
            selectedIndex = newIndex;
            buttons[selectedIndex].classList.add('selected');
            buttons[selectedIndex].focus();
        };

        // Cleanup function
        const cleanup = (value, cancelled = false) => {
            if (isCleanedUp) {
                return;
            }
            isCleanedUp = true;

            // Remove event listeners
            document.removeEventListener('keydown', handleKeydown);

            // Start fade out
            overlay.classList.remove('visible');

            // Remove from DOM after transition
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }

                if (cancelled && config.onCancel) {
                    config.onCancel();
                } else if (!cancelled && config.onSelect) {
                    config.onSelect(value);
                }

                resolve(value);
            }, 300);
        };

        // Keyboard handler
        const handleKeydown = (e) => {
            if (isCleanedUp) {
                return;
            }

            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    updateSelection(selectedIndex - 1);
                    break;

                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    updateSelection(selectedIndex + 1);
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    const selectedValue = config.options[selectedIndex].value;
                    cleanup(selectedValue, false);
                    break;

                case 'Escape':
                    e.preventDefault();
                    cleanup(config.cancelValue, true);
                    break;
            }
        };

        // Button click handlers
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const value = config.options[index].value;
                cleanup(value, false);
            });

            btn.addEventListener('mouseenter', () => {
                updateSelection(index);
            });
        });

        // Add keyboard listener
        document.addEventListener('keydown', handleKeydown);

        // Add to DOM
        document.body.appendChild(overlay);

        // Trigger fade in after a brief delay (for CSS transition to work)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.add('visible');
                // Focus the selected button
                buttons[selectedIndex].focus();
            });
        });
    });
};

export default choice;
