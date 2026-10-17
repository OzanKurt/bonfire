# Changelog

## 1.0.0

- Initial release.
- Styles are injected on first use, not at import time, so the module can be imported where no DOM exists (SSR, Node tests).
- Loading the library twice on one page adds the stylesheet only once.
- New `configure({ duration, fontUrl })` to change the default display time and the font stylesheet URL; `fontUrl: null` skips the Google Fonts import so the font can be self-hosted.
