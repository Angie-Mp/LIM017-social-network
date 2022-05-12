/* eslint-disable import/no-cycle */
import { routes } from './routesMain.js';

const root = document.getElementById('root') ? document.getElementById('root') : document.createElement('div');
routes[window.location.pathname](root);

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  routes[pathname](root);
};
