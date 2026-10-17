export const press = (key) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
};

export const resetDom = () => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
};
