
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
    'index.csr.html': {size: 28202, hash: '1f8a7d01204e80abdd127a4d25b934a587d9e87d77ddc85d838eeb5a71c20ce3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 20292, hash: 'cf8dc26b8fbb08187195f1fd623e30f18dfb24e170404e2eb7e4c6cee9927806', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 43028, hash: 'f76a979351f6d463d5a554cfd3d4794979eb38da26b0cabc5528c3509e6ffddc', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-62YNPYSQ.css': {size: 83331, hash: 'xIuM4QANj5g', text: () => import('./assets-chunks/styles-62YNPYSQ_css.mjs').then(m => m.default)}
  },
};
