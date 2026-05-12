import 'kleur/colors';
import { d as decodeKey } from './chunks/astro/server_CanqLNo9.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_uzzNN7ty.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/juantapias/Apps/pacific-waves-hostel/","cacheDir":"file:///Users/juantapias/Apps/pacific-waves-hostel/node_modules/.astro/","outDir":"file:///Users/juantapias/Apps/pacific-waves-hostel/dist/","srcDir":"file:///Users/juantapias/Apps/pacific-waves-hostel/src/","publicDir":"file:///Users/juantapias/Apps/pacific-waves-hostel/public/","buildClientDir":"file:///Users/juantapias/Apps/pacific-waves-hostel/dist/client/","buildServerDir":"file:///Users/juantapias/Apps/pacific-waves-hostel/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"plan-aventura/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/plan-aventura","isIndex":false,"type":"page","pattern":"^\\/plan-aventura\\/?$","segments":[[{"content":"plan-aventura","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/plan-aventura.astro","pathname":"/plan-aventura","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"plan-ballenas/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/plan-ballenas","isIndex":false,"type":"page","pattern":"^\\/plan-ballenas\\/?$","segments":[[{"content":"plan-ballenas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/plan-ballenas.astro","pathname":"/plan-ballenas","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"plan-surf/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/plan-surf","isIndex":false,"type":"page","pattern":"^\\/plan-surf\\/?$","segments":[[{"content":"plan-surf","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/plan-surf.astro","pathname":"/plan-surf","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"politicas-de-cancelacion/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politicas-de-cancelacion","isIndex":false,"type":"page","pattern":"^\\/politicas-de-cancelacion\\/?$","segments":[[{"content":"politicas-de-cancelacion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politicas-de-cancelacion.astro","pathname":"/politicas-de-cancelacion","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"politicas-de-privacidad/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politicas-de-privacidad","isIndex":false,"type":"page","pattern":"^\\/politicas-de-privacidad\\/?$","segments":[[{"content":"politicas-de-privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politicas-de-privacidad.astro","pathname":"/politicas-de-privacidad","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"terminos-y-condiciones/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terminos-y-condiciones","isIndex":false,"type":"page","pattern":"^\\/terminos-y-condiciones\\/?$","segments":[[{"content":"terminos-y-condiciones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terminos-y-condiciones.astro","pathname":"/terminos-y-condiciones","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send-mail","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send-mail\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send-mail","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send-mail.ts","pathname":"/api/send-mail","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/juantapias/Apps/pacific-waves-hostel/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/juantapias/Apps/pacific-waves-hostel/src/pages/plan-aventura.astro",{"propagation":"none","containsHead":true}],["/Users/juantapias/Apps/pacific-waves-hostel/src/pages/plan-ballenas.astro",{"propagation":"none","containsHead":true}],["/Users/juantapias/Apps/pacific-waves-hostel/src/pages/plan-surf.astro",{"propagation":"none","containsHead":true}],["/Users/juantapias/Apps/pacific-waves-hostel/src/pages/politicas-de-cancelacion.astro",{"propagation":"none","containsHead":true}],["/Users/juantapias/Apps/pacific-waves-hostel/src/pages/politicas-de-privacidad.astro",{"propagation":"none","containsHead":true}],["/Users/juantapias/Apps/pacific-waves-hostel/src/pages/terminos-y-condiciones.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/send-mail@_@ts":"pages/api/send-mail.astro.mjs","\u0000@astro-page:src/pages/plan-aventura@_@astro":"pages/plan-aventura.astro.mjs","\u0000@astro-page:src/pages/plan-ballenas@_@astro":"pages/plan-ballenas.astro.mjs","\u0000@astro-page:src/pages/plan-surf@_@astro":"pages/plan-surf.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/politicas-de-cancelacion@_@astro":"pages/politicas-de-cancelacion.astro.mjs","\u0000@astro-page:src/pages/politicas-de-privacidad@_@astro":"pages/politicas-de-privacidad.astro.mjs","\u0000@astro-page:src/pages/terminos-y-condiciones@_@astro":"pages/terminos-y-condiciones.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/juantapias/Apps/pacific-waves-hostel/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CWl4TSay.mjs","\u0000@astrojs-manifest":"manifest_tqId_h5c.mjs","/Users/juantapias/Apps/pacific-waves-hostel/src/components/banner/banner-page/BannerPage":"_astro/BannerPage.B-Oxtt3v.js","/Users/juantapias/Apps/pacific-waves-hostel/src/components/layouts/Header":"_astro/Header.CeSHYQjr.js","@astrojs/react/client.js":"_astro/client.BxCTEn3I.js","/Users/juantapias/Apps/pacific-waves-hostel/src/container/Plans":"_astro/Plans.DvUsr9Cp.js","/Users/juantapias/Apps/pacific-waves-hostel/src/container/Home":"_astro/Home.BV-gmKvw.js","/Users/juantapias/Apps/pacific-waves-hostel/src/components/newsletter/Newsletter":"_astro/Newsletter.CLyZIpF_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/cancellation-policy.DOkX9bSF.webp","/_astro/plan-ballenas.DrkUjUY5.webp","/_astro/plan-aventura.BdLzuY-u.webp","/_astro/plan-surf.BRLrbuV3.webp","/_astro/whale-tail.BJebLarn.webp","/_astro/Raleway-Light.DOs03ua0.ttf","/_astro/PlayfairDisplay.7tRKCQvy.ttf","/_astro/Raleway-Bold.BGWFlpii.ttf","/_astro/Raleway-Regular.avTyM9Qo.ttf","/_astro/Roboto-Light.r0KW6U_F.ttf","/_astro/Roboto-Medium.CwcsZ-zd.ttf","/_astro/Roboto-Bold._ZJd4Sbe.ttf","/_astro/pacific-waves-hostel-parallax.B6ZccmKN.webp","/_astro/surfer.DwY_CTpT.webp","/_astro/whale.Dc_AFGAn.webp","/_astro/logo-white.CKTaZJ64.webp","/_astro/logo.BJB4CHnn.webp","/_astro/icomoon.Di5h4KXc.svg","/_astro/index.BkyezQNr.css","/_astro/index.DR6rSiPp.css","/favicon.svg","/_astro/BannerPage.B-Oxtt3v.js","/_astro/Header.CeSHYQjr.js","/_astro/Home.BV-gmKvw.js","/_astro/Newsletter.-LiPh8xh.js","/_astro/Newsletter.CLyZIpF_.js","/_astro/Plans.DvUsr9Cp.js","/_astro/client.BxCTEn3I.js","/_astro/index.95d291e9.Db0cWjJz.js","/_astro/index.BJfUAbRs.js","/_astro/index.DKg2la6v.css","/_astro/index.c96a3ccd.DPhFM9e7.js","/_astro/index.wfI8hR-6.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/plan-aventura.17e1e7ea.UehmvUMV.js","/_astro/plan-aventura.mjNb8Ybc.css","/assets/images/gallery/pacific-waves-hostel-0_ijn9iy.webp","/assets/images/gallery/pacific-waves-hostel-10.webp","/assets/images/gallery/pacific-waves-hostel-11.webp","/assets/images/gallery/pacific-waves-hostel-12.webp","/assets/images/gallery/pacific-waves-hostel-13.webp","/assets/images/gallery/pacific-waves-hostel-14.webp","/assets/images/gallery/pacific-waves-hostel-1_reketn.webp","/assets/images/gallery/pacific-waves-hostel-2_va8zkr.webp","/assets/images/gallery/pacific-waves-hostel-3_rgfsbl.webp","/assets/images/gallery/pacific-waves-hostel-4_j9vi8e.webp","/assets/images/gallery/pacific-waves-hostel-5_xrrino.webp","/assets/images/gallery/pacific-waves-hostel-6_i44x8l.webp","/assets/images/gallery/pacific-waves-hostel-7_i1qgq8.webp","/assets/images/gallery/pacific-waves-hostel-8.webp","/assets/images/gallery/pacific-waves-hostel-9.webp","/assets/images/videos/11.5mb_nasibe.mp4","/assets/images/rooms/cabins-4/IMG_3903_nxzvfy.webp","/assets/images/rooms/cabins-4/IMG_3910_nopmpc.webp","/assets/images/rooms/cabins-4/IMG_3911_xvngxp.webp","/assets/images/rooms/cabins-4/IMG_3913_w5hzii.webp","/assets/images/rooms/cabins-4/IMG_3914_k5krwe.webp","/assets/images/rooms/cabins-4/IMG_3919_jgxisy.webp","/assets/images/rooms/cabins-4/IMG_3934_s31sfi.webp","/assets/images/rooms/cabins-4/IMG_3944_ax3x3o.webp","/assets/images/rooms/cabins-8/IMG_3908_itstxd.webp","/assets/images/rooms/cabins-8/IMG_4020_c7kwzb.webp","/assets/images/rooms/cabins-8/IMG_4022_abopdb.webp","/assets/images/rooms/cabins-8/IMG_4023_erlc8b.webp","/assets/images/rooms/cabins-8/IMG_4025_vfhud2.webp","/assets/images/rooms/cabins-8/IMG_4026_rcaxmk.webp","/assets/images/rooms/cabins-8/IMG_4028_vir9qm.webp","/assets/images/rooms/cabins-8/IMG_4029_niaj5i.webp","/assets/images/rooms/cabins-8/IMG_4031_jiue2e.webp","/assets/images/rooms/cabins-8/IMG_4033_wicj0n.webp","/assets/images/rooms/cabins-8/IMG_4034_ufn4xx.webp","/assets/images/rooms/cabins-8/IMG_4035_n9xtso.webp","/assets/images/rooms/cabins-8/IMG_4036_ra77vy.webp","/assets/images/rooms/cabins-brisa/IMG_3852_rjjpi6.webp","/assets/images/rooms/cabins-brisa/IMG_3861_wjvsjv.webp","/assets/images/rooms/cabins-brisa/IMG_3864_dkqemz.webp","/assets/images/rooms/cabins-brisa/IMG_3866_dfodzm.webp","/assets/images/rooms/cabins-brisa/IMG_3868_mkx45y.webp","/assets/images/rooms/cabins-brisa/IMG_3878_opfh1n.webp","/assets/images/rooms/cabins-brisa/IMG_3882_qvsjcq.webp","/assets/images/rooms/cabins-brisa/IMG_3886_cqgtuu.webp","/assets/images/rooms/cabins-brisa/IMG_3887_wee6z6.webp","/assets/images/rooms/cabins-brisa/IMG_3888_vkvwfs.webp","/assets/images/rooms/cabins-brisa/IMG_3893_lsgasf.webp","/assets/images/rooms/cabins-brisa/IMG_3896_tpe9gi.webp","/plan-aventura/index.html","/plan-ballenas/index.html","/plan-surf/index.html","/politicas-de-cancelacion/index.html","/politicas-de-privacidad/index.html","/terminos-y-condiciones/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"szq1FFWkYZTnoIJWDfBNRdOyrifGq8nawkUEnL/GDdY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
