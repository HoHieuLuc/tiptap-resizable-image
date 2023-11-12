import { ROUTES, Route, SITE_URL } from '@/config';
import { MetadataRoute } from 'next';

function flattenRoutes(routes: Array<Route>): Array<string> {
  let hrefs: Array<string> = [];

  routes.forEach(route => {
    if (route.subLinks) {
      hrefs = hrefs.concat(flattenRoutes(route.subLinks));
    } else {
      hrefs.push(route.href);
    }
  });

  return hrefs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = flattenRoutes(ROUTES)
    .filter((route) => route !== '/' && route.startsWith('/'));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
