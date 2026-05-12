import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CdMwXTpG.mjs';
import { manifest } from './manifest_lNewjY5j.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/send-mail.astro.mjs');
const _page2 = () => import('./pages/plan-aventura.astro.mjs');
const _page3 = () => import('./pages/plan-ballenas.astro.mjs');
const _page4 = () => import('./pages/plan-surf.astro.mjs');
const _page5 = () => import('./pages/politicas-de-cancelacion.astro.mjs');
const _page6 = () => import('./pages/politicas-de-privacidad.astro.mjs');
const _page7 = () => import('./pages/terminos-y-condiciones.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/send-mail.ts", _page1],
    ["src/pages/plan-aventura.astro", _page2],
    ["src/pages/plan-ballenas.astro", _page3],
    ["src/pages/plan-surf.astro", _page4],
    ["src/pages/politicas-de-cancelacion.astro", _page5],
    ["src/pages/politicas-de-privacidad.astro", _page6],
    ["src/pages/terminos-y-condiciones.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8db20bab-16cf-4bfb-a3cd-1d6dfd7a1c0e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
