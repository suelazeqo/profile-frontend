
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/profile-frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/profile-frontend"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28202, hash: '5ed2f0e988daa0247998124782caee45f32189d0ca5fa0bddc7ab1cd48fefa2a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 20292, hash: '77645d4cdad61df32d94d343047086b982e9348afed49da09a38129e906e4a5d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 43028, hash: 'a1f6f9a40c1ba8c922058e7270e53b3099ad809981eebe8ce43b4410a2430648', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-62YNPYSQ.css': {size: 83331, hash: 'xIuM4QANj5g', text: () => import('./assets-chunks/styles-62YNPYSQ_css.mjs').then(m => m.default)}
  },
};
