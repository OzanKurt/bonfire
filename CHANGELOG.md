# Changelog

## 1.1.0

- The font loads through its own `<link id="darksouls-font">` instead of an `@import` inside the stylesheet: it no longer blocks the styles, and quotes or brackets in `fontUrl` cannot break the CSS.
- `choice()` with an empty `options` list shows the single OK option instead of failing.
- TypeScript declarations (`dist/bonfire.d.ts`); `exports` adds `./dist/*` and `./package.json`; CHANGELOG ships in the package.

## 1.0.0

- Initial release.
- Styles are injected on first use, not at import time, so the module can be imported where no DOM exists (SSR, Node tests).
- Loading the library twice on one page adds the stylesheet only once.
- New `configure({ duration, fontUrl })` to change the default display time and the font stylesheet URL; `fontUrl: null` skips the Google Fonts import so the font can be self-hosted.
