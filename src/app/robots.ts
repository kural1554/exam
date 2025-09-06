import { MetadataRoute } from 'next';

const URL = 'https://examplify-app.com';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${URL}/sitemap.xml`,
  };
}
