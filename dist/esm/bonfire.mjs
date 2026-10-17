// src/config.js
var initialDefaults = {
  duration: 3e3,
  fontUrl: "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap"
};
var defaults = { ...initialDefaults };
var getDefaults = () => defaults;
var validators = {
  duration: (value) => typeof value === "number" && Number.isFinite(value) && value >= 0,
  fontUrl: (value) => value === null || typeof value === "string"
};
var setDefaults = (partial = {}) => {
  Object.entries(validators).forEach(([key, isValid]) => {
    if (isValid(partial[key])) {
      defaults = { ...defaults, [key]: partial[key] };
    }
  });
};

// src/styles.js
var styles = `

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
var injectStyles = () => {
  if (typeof document === "undefined" || document.getElementById("darksouls-styles")) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.id = "darksouls-styles";
  const { fontUrl } = getDefaults();
  styleElement.textContent = (fontUrl ? `@import url('${fontUrl}');
` : "") + styles;
  document.head.appendChild(styleElement);
};

// src/notify.js
var notify = (message, options = {}) => {
  injectStyles();
  const config = {
    type: options.type || "info",
    duration: options.duration !== void 0 ? options.duration : getDefaults().duration,
    backdrop: options.backdrop !== void 0 ? options.backdrop : true,
    onComplete: options.onComplete || null
  };
  const overlay = document.createElement("div");
  overlay.className = "darksouls-overlay";
  if (config.backdrop) {
    const backdrop = document.createElement("div");
    backdrop.className = "darksouls-backdrop";
    overlay.appendChild(backdrop);
  }
  const messageEl = document.createElement("div");
  messageEl.className = `darksouls-message ${config.type}`;
  messageEl.textContent = message;
  overlay.appendChild(messageEl);
  document.body.appendChild(overlay);
  let isCleanedUp = false;
  let fadeOutTimeout = null;
  let removeTimeout = null;
  const cleanup = () => {
    if (isCleanedUp) {
      return;
    }
    isCleanedUp = true;
    if (fadeOutTimeout) {
      clearTimeout(fadeOutTimeout);
    }
    if (removeTimeout) {
      clearTimeout(removeTimeout);
    }
    overlay.classList.remove("visible");
    overlay.classList.add("fade-out");
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      if (config.onComplete) {
        config.onComplete();
      }
    }, 500);
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
    });
  });
  if (config.duration > 0) {
    fadeOutTimeout = setTimeout(() => {
      cleanup();
    }, config.duration);
  }
  return cleanup;
};
var notify_default = notify;

// src/choice.js
var choice = (message, options = {}) => {
  injectStyles();
  return new Promise((resolve) => {
    const config = {
      options: options.options || [{ label: "OK", value: true }],
      subtitle: options.subtitle || null,
      onSelect: options.onSelect || null,
      onCancel: options.onCancel || null,
      defaultIndex: options.defaultIndex !== void 0 ? options.defaultIndex : 0,
      cancelValue: options.cancelValue !== void 0 ? options.cancelValue : null
    };
    let selectedIndex = config.defaultIndex;
    let isCleanedUp = false;
    const overlay = document.createElement("div");
    overlay.className = "darksouls-confirm-overlay";
    const box = document.createElement("div");
    box.className = "darksouls-confirm-box";
    const messageEl = document.createElement("div");
    messageEl.className = "darksouls-confirm-message";
    messageEl.textContent = message;
    box.appendChild(messageEl);
    if (config.subtitle) {
      const subtitleEl = document.createElement("div");
      subtitleEl.className = "darksouls-confirm-subtitle";
      subtitleEl.textContent = config.subtitle;
      box.appendChild(subtitleEl);
    }
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "darksouls-confirm-buttons";
    const buttons = [];
    config.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.className = "darksouls-confirm-btn";
      btn.textContent = option.label;
      btn.dataset.index = index;
      btn.dataset.value = JSON.stringify(option.value);
      if (index === selectedIndex) {
        btn.classList.add("selected");
      }
      buttons.push(btn);
      buttonsContainer.appendChild(btn);
    });
    box.appendChild(buttonsContainer);
    overlay.appendChild(box);
    const updateSelection = (newIndex) => {
      if (newIndex < 0) {
        newIndex = buttons.length - 1;
      } else if (newIndex >= buttons.length) {
        newIndex = 0;
      }
      buttons[selectedIndex].classList.remove("selected");
      selectedIndex = newIndex;
      buttons[selectedIndex].classList.add("selected");
      buttons[selectedIndex].focus();
    };
    const cleanup = (value, cancelled = false) => {
      if (isCleanedUp) {
        return;
      }
      isCleanedUp = true;
      document.removeEventListener("keydown", handleKeydown);
      overlay.classList.remove("visible");
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
    const handleKeydown = (e) => {
      if (isCleanedUp) {
        return;
      }
      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          updateSelection(selectedIndex - 1);
          break;
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          updateSelection(selectedIndex + 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          const selectedValue = config.options[selectedIndex].value;
          cleanup(selectedValue, false);
          break;
        case "Escape":
          e.preventDefault();
          cleanup(config.cancelValue, true);
          break;
      }
    };
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const value = config.options[index].value;
        cleanup(value, false);
      });
      btn.addEventListener("mouseenter", () => {
        updateSelection(index);
      });
    });
    document.addEventListener("keydown", handleKeydown);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add("visible");
        buttons[selectedIndex].focus();
      });
    });
  });
};
var choice_default = choice;

// src/confirm.js
var confirm = (message, options = {}) => {
  const config = {
    onYes: options.onYes || null,
    onNo: options.onNo || null,
    subtitle: options.subtitle || null,
    yesLabel: options.yesLabel || "Yes",
    noLabel: options.noLabel || "No"
  };
  return choice_default(message, {
    options: [
      { label: config.yesLabel, value: true },
      { label: config.noLabel, value: false }
    ],
    subtitle: config.subtitle,
    defaultIndex: 1,
    // Default to "No" for safety
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
    }
  });
};
var confirm_default = confirm;

// src/online.js
var online = (message, options = {}) => {
  injectStyles();
  const config = {
    subtitle: options.subtitle || null,
    duration: options.duration !== void 0 ? options.duration : getDefaults().duration,
    onComplete: options.onComplete || null
  };
  const overlay = document.createElement("div");
  overlay.className = "darksouls-online-overlay";
  const messageEl = document.createElement("div");
  messageEl.className = "darksouls-online-message";
  messageEl.textContent = message;
  overlay.appendChild(messageEl);
  if (config.subtitle) {
    const subtitleEl = document.createElement("div");
    subtitleEl.className = "darksouls-online-subtitle";
    subtitleEl.textContent = config.subtitle;
    overlay.appendChild(subtitleEl);
  }
  document.body.appendChild(overlay);
  let isCleanedUp = false;
  let fadeOutTimeout = null;
  const cleanup = () => {
    if (isCleanedUp) {
      return;
    }
    isCleanedUp = true;
    if (fadeOutTimeout) {
      clearTimeout(fadeOutTimeout);
    }
    overlay.classList.remove("visible");
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      if (config.onComplete) {
        config.onComplete();
      }
    }, 600);
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
    });
  });
  if (config.duration > 0) {
    fadeOutTimeout = setTimeout(() => {
      cleanup();
    }, config.duration);
  }
  return cleanup;
};
var online_default = online;

// src/index.js
var DarkSouls = {
  /**
   * Generic notification with customizable type
   * @param {string} message - Message to display
   * @param {object} options - { type: 'death'|'success'|'info', duration: 3000, backdrop: true, onComplete: null }
   * @returns {function} Cleanup function
   */
  notify: notify_default,
  /**
   * Death notification (red glow)
   * @param {string} message - Message to display (default: 'YOU DIED')
   * @param {object} options - { duration: 3000, backdrop: true, onComplete: null }
   * @returns {function} Cleanup function
   */
  death: (message = "YOU DIED", options = {}) => notify_default(message, { ...options, type: "death" }),
  /**
   * Success notification (gold glow)
   * @param {string} message - Message to display (default: 'VICTORY ACHIEVED')
   * @param {object} options - { duration: 3000, backdrop: true, onComplete: null }
   * @returns {function} Cleanup function
   */
  success: (message = "VICTORY ACHIEVED", options = {}) => notify_default(message, { ...options, type: "success" }),
  /**
   * Info notification (silver glow)
   * @param {string} message - Message to display
   * @param {object} options - { duration: 3000, backdrop: true, onComplete: null }
   * @returns {function} Cleanup function
   */
  info: (message, options = {}) => notify_default(message, { ...options, type: "info" }),
  /**
   * Elden Ring style online status notification
   * @param {string} message - Main message
   * @param {object} options - { subtitle: null, duration: 3000, onComplete: null }
   * @returns {function} Cleanup function
   */
  online: online_default,
  /**
   * Yes/No confirmation dialog
   * @param {string} message - Question to display
   * @param {object} options - { onYes, onNo, subtitle, yesLabel, noLabel }
   * @returns {Promise<boolean>}
   */
  confirm: confirm_default,
  /**
   * Multiple choice dialog
   * @param {string} message - Question to display
   * @param {object} options - { options: [{label, value}], subtitle, onSelect, onCancel, defaultIndex, cancelValue }
   * @returns {Promise<any>}
   */
  choice: choice_default,
  /**
   * Change library-wide defaults. Call before the first notification,
   * because the stylesheet (and its font import) is injected once.
   * @param {object} options - { duration: 3000, fontUrl: '<Google Fonts URL>' | null }
   */
  configure: (options = {}) => setDefaults(options)
};
var index_default = DarkSouls;
export {
  index_default as default
};
//# sourceMappingURL=bonfire.mjs.map
