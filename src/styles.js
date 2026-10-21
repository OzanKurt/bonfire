import { getDefaults } from './config.js';

/**
 * Dark Souls Notification System - Styles
 * Injects CSS styles for Dark Souls style notifications and dialogs
 */

const styles = `

/* Dark Souls Overlay - Full screen with vignette */
.darksouls-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.darksouls-overlay.visible {
    opacity: 1;
}

.darksouls-overlay.fade-out {
    opacity: 0;
}

/* Backdrop - Horizontal dark band behind text */
.darksouls-backdrop {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: 120px;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.6) 15%,
        rgba(0, 0, 0, 0.8) 50%,
        rgba(0, 0, 0, 0.6) 85%,
        transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.darksouls-overlay.visible .darksouls-backdrop {
    opacity: 1;
}

/* Main message with glow effects */
.darksouls-message {
    font-family: 'EB Garamond', 'Times New Roman', serif;
    font-size: 4rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    text-align: center;
    z-index: 1;
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.darksouls-overlay.visible .darksouls-message {
    opacity: 1;
    transform: scale(1);
}

/* Death type - Red glow */
.darksouls-message.death {
    color: #8B0000;
    text-shadow:
        0 0 10px rgba(139, 0, 0, 0.8),
        0 0 20px rgba(139, 0, 0, 0.6),
        0 0 40px rgba(139, 0, 0, 0.4),
        0 0 60px rgba(139, 0, 0, 0.3),
        0 0 80px rgba(139, 0, 0, 0.2);
}

/* Success type - Gold glow */
.darksouls-message.success {
    color: #DAA520;
    text-shadow:
        0 0 10px rgba(218, 165, 32, 0.8),
        0 0 20px rgba(218, 165, 32, 0.6),
        0 0 40px rgba(218, 165, 32, 0.4),
        0 0 60px rgba(218, 165, 32, 0.3),
        0 0 80px rgba(218, 165, 32, 0.2);
}

/* Info type - Silver glow */
.darksouls-message.info {
    color: #C0C0C0;
    text-shadow:
        0 0 10px rgba(192, 192, 192, 0.8),
        0 0 20px rgba(192, 192, 192, 0.6),
        0 0 40px rgba(192, 192, 192, 0.4),
        0 0 60px rgba(192, 192, 192, 0.3),
        0 0 80px rgba(192, 192, 192, 0.2);
}

/* Elden Ring Online style notification */
.darksouls-online-overlay {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    pointer-events: none;
    text-align: center;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
}

.darksouls-online-overlay.visible {
    opacity: 1;
}

.darksouls-online-message {
    font-family: 'EB Garamond', 'Times New Roman', serif;
    font-size: 2.5rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    color: #DAA520;
    text-shadow:
        0 0 8px rgba(218, 165, 32, 0.6),
        0 0 16px rgba(218, 165, 32, 0.4),
        2px 2px 4px rgba(0, 0, 0, 0.8);
}

.darksouls-online-subtitle {
    font-family: 'EB Garamond', 'Times New Roman', serif;
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: #B8860B;
    margin-top: 0.5rem;
    text-shadow:
        0 0 6px rgba(184, 134, 11, 0.5),
        1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Confirm/Choice Dialog - Elden Ring style */
.darksouls-confirm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.75);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.darksouls-confirm-overlay.visible {
    opacity: 1;
}

/* Confirm box - Brownish-gray horizontal band */
.darksouls-confirm-box {
    position: relative;
    width: 90%;
    max-width: 600px;
    padding: 40px 60px;
    background: linear-gradient(
        to bottom,
        rgba(45, 40, 35, 0.95) 0%,
        rgba(55, 50, 45, 0.98) 50%,
        rgba(45, 40, 35, 0.95) 100%
    );
    border-top: 2px solid rgba(139, 119, 101, 0.6);
    border-bottom: 2px solid rgba(139, 119, 101, 0.6);
    box-shadow:
        0 0 40px rgba(0, 0, 0, 0.8),
        inset 0 0 60px rgba(0, 0, 0, 0.3);
    transform: scaleY(0);
    transition: transform 0.25s ease-out;
}

.darksouls-confirm-overlay.visible .darksouls-confirm-box {
    transform: scaleY(1);
}

/* Confirm message - Cream colored text */
.darksouls-confirm-message {
    font-family: 'EB Garamond', 'Times New Roman', serif;
    font-size: 1.8rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    color: #F5E6D3;
    text-align: center;
    margin-bottom: 10px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.darksouls-confirm-subtitle {
    font-family: 'EB Garamond', 'Times New Roman', serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: #C4B5A5;
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.darksouls-confirm-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

/* Button styles with hover/selected states */
.darksouls-confirm-btn {
    font-family: 'EB Garamond', 'Times New Roman', serif;
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: #A09080;
    background: transparent;
    border: none;
    padding: 8px 40px;
    cursor: pointer;
    transition: all 0.15s ease-out;
    position: relative;
    outline: none;
}

.darksouls-confirm-btn::before,
.darksouls-confirm-btn::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    opacity: 0;
    transition: opacity 0.15s ease-out;
}

.darksouls-confirm-btn::before {
    left: 5px;
    border-width: 6px 8px 6px 0;
    border-color: transparent #DAA520 transparent transparent;
}

.darksouls-confirm-btn::after {
    right: 5px;
    border-width: 6px 0 6px 8px;
    border-color: transparent transparent transparent #DAA520;
}

.darksouls-confirm-btn:hover,
.darksouls-confirm-btn:focus {
    color: #F5E6D3;
}

.darksouls-confirm-btn.selected {
    color: #F5E6D3;
}

.darksouls-confirm-btn.selected::before,
.darksouls-confirm-btn.selected::after {
    opacity: 1;
}

.darksouls-confirm-btn:hover::before,
.darksouls-confirm-btn:hover::after,
.darksouls-confirm-btn:focus::before,
.darksouls-confirm-btn:focus::after {
    opacity: 0.7;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .darksouls-message {
        font-size: 2.5rem;
        letter-spacing: 0.2em;
    }

    .darksouls-online-message {
        font-size: 1.8rem;
    }

    .darksouls-online-subtitle {
        font-size: 1rem;
    }

    .darksouls-confirm-box {
        padding: 30px 40px;
    }

    .darksouls-confirm-message {
        font-size: 1.4rem;
    }

    .darksouls-confirm-btn {
        font-size: 1.2rem;
    }
}
`;

/**
 * Injects the Dark Souls styles into the document head
 * Only injects once, subsequent calls are no-ops
 */
let injectStyles = () => {
    if (typeof document === 'undefined' || document.getElementById('darksouls-styles')) {
        return;
    }

    // The font is a separate <link>: it does not block the stylesheet, and the
    // URL is set as an attribute, so quotes or brackets in it cannot break CSS.
    const { fontUrl } = getDefaults();
    if (fontUrl && !document.getElementById('darksouls-font')) {
        const link = document.createElement('link');
        link.id = 'darksouls-font';
        link.rel = 'stylesheet';
        link.href = fontUrl;
        document.head.appendChild(link);
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'darksouls-styles';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
};

export { injectStyles };
export default { injectStyles };
