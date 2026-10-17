/**
 * Library-wide defaults, changed through Bonfire.configure()
 */

const initialDefaults = {
    duration: 3000,
    fontUrl: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap',
};

let defaults = { ...initialDefaults };

let getDefaults = () => defaults;

// Invalid values are ignored so a missing option never wipes a default.
// fontUrl accepts null on purpose: it disables the font import.
const validators = {
    duration: (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0,
    fontUrl: (value) => value === null || typeof value === 'string',
};

let setDefaults = (partial = {}) => {
    Object.entries(validators).forEach(([key, isValid]) => {
        if (isValid(partial[key])) {
            defaults = { ...defaults, [key]: partial[key] };
        }
    });
};

let resetDefaults = () => {
    defaults = { ...initialDefaults };
};

export { getDefaults, setDefaults, resetDefaults };
