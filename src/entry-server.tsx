import { renderToString } from 'react-dom/server';

import App from './App';
import { findRoute, publicRoutes } from './data/site-content';

export { publicRoutes };

export function render(pathname: string) {
  const route = findRoute(pathname);

  return {
    html: renderToString(<App initialPath={pathname} />),
    route,
  };
}
