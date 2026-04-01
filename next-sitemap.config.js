const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  include: [
    '/',
    '/service',
    '/about-us',
    '/golf-center',
    '/blog-and-news',
    '/product',
    '/contact-us',
  ],
  exclude: [
    '/admin/*',
    '/api/*',
    '/service-sitemap.xml',
    '/product-sitemap.xml',
    '/blog-and-news-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/service-sitemap.xml`,
      `${SITE_URL}/product-sitemap.xml`,
      `${SITE_URL}/blog-and-news-sitemap.xml`,
    ],
  },
}
